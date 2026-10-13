#!/usr/bin/env python3
"""Embed sampled video frames and text queries with the 740m LiteRT-LM package.

Multimodal G0 (spec v0.1 §6.2, §18.3). Reads <frames-dir>/manifest.json and
<frames-dir>/labels.json (see fixtures/frame-labels.example.json), embeds every
frame with the vision tower and every query with the text tower under each
retrieval prompt pair, and writes <frames-dir>/runs/<run>.npz (frame ids,
frame vectors, query vectors per pair) and <run>.json (engine create time,
per-frame latency, RSS, engine cache size).

Images get no task prefix (spec §5.2). Runs: cpu, gpu (default activation),
gpu-fp32 (activation forced to FLOAT32 through the C API, which the wheel does
not expose for the embedding engine), and optional --vision-tokens variants.
Each run uses a fresh engine cache dir that is deleted afterwards.
"""

from __future__ import annotations

import argparse
import ctypes
import json
import resource
import shutil
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import numpy as np  # noqa: E402

import profiles  # noqa: E402

PAIRS = ["modelcard-v1", "litert-docs-v1", "no-prefix"]


def renorm(v: np.ndarray) -> np.ndarray:
    v = np.asarray(v, dtype=np.float32)
    return v / np.linalg.norm(v, axis=-1, keepdims=True)


def dir_size(path: Path) -> int:
    return sum(p.stat().st_size for p in path.rglob("*") if p.is_file())


def force_fp32_activation(lib) -> None:
    """Wrap engine_create so the settings get FLOAT32 activation first."""
    from litert_lm._ffi import ActivationDataType

    setter = lib.litert_lm_embedding_engine_settings_set_activation_data_type
    setter.argtypes = [ctypes.c_void_p, ctypes.c_int]
    setter.restype = None
    create = lib.litert_lm_embedding_engine_create

    def create_fp32(settings):
        setter(settings, int(ActivationDataType.FLOAT32))
        return create(settings)

    setattr(lib, "litert_lm_embedding_engine_create", create_fp32)
    return create


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--run", required=True, choices=["cpu", "gpu", "gpu-fp32"])
    ap.add_argument("--vision-tokens", type=int, default=None)
    ap.add_argument("--model", type=Path, default=profiles.LITERT_740M_MODEL_PATH)
    ap.add_argument("--frames-dir", type=Path, default=profiles.FRAMES_EVAL_DIR)
    args = ap.parse_args()

    import litert_lm
    from litert_lm import Backend, EmbeddingEngine, LogSeverity
    from litert_lm._ffi import _get_lib
    from litert_lm._messages import ImageFile
    from litert_lm.embedding_engine import EmbeddingOptions

    litert_lm.set_min_log_severity(LogSeverity.ERROR)
    manifest = json.loads((args.frames_dir / "manifest.json").read_text())
    labels = json.loads((args.frames_dir / "labels.json").read_text())
    frames = manifest["frames"]
    queries = labels["queries"]

    run_id = args.run + (f"-vt{args.vision_tokens}" if args.vision_tokens else "")
    out_dir = args.frames_dir / "runs"
    out_dir.mkdir(parents=True, exist_ok=True)
    cache = args.frames_dir / f"engine-cache-{run_id}"
    shutil.rmtree(cache, ignore_errors=True)
    cache.mkdir(parents=True)

    restore = None
    if args.run == "gpu-fp32":
        lib = _get_lib()
        restore = force_fp32_activation(lib)
    backend = Backend.CPU() if args.run == "cpu" else Backend.GPU()
    t0 = time.perf_counter()
    eng = EmbeddingEngine(str(args.model), backend=backend, vision_backend=backend,
                          cache_dir=str(cache), vision_tokens_per_image=args.vision_tokens)
    create_s = time.perf_counter() - t0
    if restore is not None:
        setattr(_get_lib(), "litert_lm_embedding_engine_create", restore)
    opts = EmbeddingOptions(normalize=True)

    vecs, lat = [], []
    for f in frames:
        path = args.frames_dir / "frames" / f"{f['id']}.jpg"
        t = time.perf_counter()
        vecs.append(eng.compute_embedding(ImageFile(absolute_path=str(path)), opts).embedding)
        lat.append(time.perf_counter() - t)
    frame_vecs = renorm(vecs)

    q_vecs, q_lat = {}, []
    for pair in PAIRS:
        template = profiles.RETRIEVAL_PAIRS[pair]["query"]
        rows = []
        for q in queries:
            t = time.perf_counter()
            rows.append(eng.compute_embedding(profiles.fmt(template, q["text"]), opts).embedding)
            q_lat.append(time.perf_counter() - t)
        q_vecs[pair] = renorm(rows)
    del eng

    cache_bytes = dir_size(cache)
    shutil.rmtree(cache, ignore_errors=True)
    np.savez(out_dir / f"{run_id}.npz", frame_ids=np.array([f["id"] for f in frames]),
             query_ids=np.array([q["id"] for q in queries]), frames=frame_vecs,
             **{f"queries_{p}": v for p, v in q_vecs.items()})
    rest = np.array(lat[1:]) * 1000
    info = {
        "run": run_id,
        "model": args.model.name,
        "visionTokensPerImage": args.vision_tokens,
        "engineCreateSec": round(create_s, 2),
        "frames": len(frames),
        "frameMsFirst": round(lat[0] * 1000),
        "frameMsMedian": round(float(np.median(rest))),
        "frameMsP90": round(float(np.percentile(rest, 90))),
        "queryMsMedian": round(float(np.median(q_lat)) * 1000),
        "maxRssMiB": round(resource.getrusage(resource.RUSAGE_SELF).ru_maxrss / 1048576),
        "engineCacheMiB": round(cache_bytes / 1048576),
    }
    (out_dir / f"{run_id}.json").write_text(json.dumps(info, indent=1))
    print(json.dumps(info))
    return 0


if __name__ == "__main__":
    sys.exit(main())
