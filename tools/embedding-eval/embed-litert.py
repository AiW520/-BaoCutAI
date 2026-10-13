#!/usr/bin/env python3
"""Embed every G0 fixture input with LiteRT-LM (litert-lm-api wheel).

Writes <cache-dir>/litert-<backend>.npz (strings + 768-d vectors) and
litert-<backend>.json (versions, engine create times, checks, latency, RSS).
Inputs are passed already prefixed; the engine only adds BOS/EOS
(insert_special_tokens defaults to true).
"""

from __future__ import annotations

import argparse
import hashlib
import json
import platform
import resource
import shutil
import sys
import time
from importlib import metadata
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import numpy as np  # noqa: E402

import profiles  # noqa: E402


def renorm(v: np.ndarray) -> np.ndarray:
    v = np.asarray(v, dtype=np.float32)
    return v / np.linalg.norm(v, axis=-1, keepdims=True)


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--backend", choices=["cpu", "gpu"], default="cpu")
    ap.add_argument("--model", type=Path, default=profiles.LITERT_MODEL_PATH)
    ap.add_argument("--cache-dir", type=Path, default=profiles.DEFAULT_CACHE_DIR)
    ap.add_argument("--engine-cache-dir", type=Path,
                    default=profiles.DEFAULT_MODEL_ROOT / "litert-cache")
    ap.add_argument("--batch-size", type=int, default=16)
    ap.add_argument("--cold", action="store_true",
                    help="delete the engine cache dir first to time a cold create")
    args = ap.parse_args()

    import litert_lm
    from litert_lm import Backend, EmbeddingEngine, LogSeverity
    from litert_lm.embedding_engine import EmbeddingOptions
    from litert_lm.model_info import ModelInfo

    litert_lm.set_min_log_severity(LogSeverity.ERROR)
    backend = Backend.CPU() if args.backend == "cpu" else Backend.GPU()

    with ModelInfo(str(args.model)) as mi:
        model_info = {
            "modelType": int(mi.model_type),
            "embeddingDimension": mi.embedding.dimension,
            "signatureSelection": mi.embedding.signature_selection,
            "maxContextTokens": mi.max_context_tokens,
            "inputModalities": str(mi.input_modalities),
        }

    if args.cold and args.engine_cache_dir.exists():
        shutil.rmtree(args.engine_cache_dir)
    args.engine_cache_dir.mkdir(parents=True, exist_ok=True)  # must pre-exist

    def make_engine() -> tuple[EmbeddingEngine, float]:
        t0 = time.perf_counter()
        eng = EmbeddingEngine(str(args.model), backend=backend,
                              cache_dir=str(args.engine_cache_dir))
        return eng, time.perf_counter() - t0

    engine, create_first_s = make_engine()
    rss_after_create = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss / 1024 / 1024

    def enc(texts: list[str], bs: int | None = None, eng=None, **opt) -> np.ndarray:
        eng = eng or engine
        bs = bs or args.batch_size
        options = EmbeddingOptions(**opt)
        out = []
        for i in range(0, len(texts), bs):
            chunk = texts[i:i + bs]
            if bs == 1:
                out.append(eng.compute_embedding(chunk[0], options).embedding)
            else:
                out.extend(r.embedding for r in eng.compute_embedding_batch(chunk, options))
        return np.asarray(out, dtype=np.float32)

    inputs = profiles.all_model_inputs()
    t0 = time.perf_counter()
    raw = enc(inputs)
    embed_all_s = time.perf_counter() - t0
    vecs = renorm(raw)

    checks: dict = {}
    checks["finite"] = bool(np.isfinite(raw).all())
    checks["engine_norm_min"] = float(np.linalg.norm(raw, axis=-1).min())
    checks["engine_norm_max"] = float(np.linalg.norm(raw, axis=-1).max())
    unnorm = enc(inputs[:64], normalize=False)
    un_n = np.linalg.norm(unnorm, axis=-1)
    checks["unnormalized_norm_range"] = [float(un_n.min()), float(un_n.max())]
    checks["normalize_false_then_renorm_vs_default_max_abs_diff"] = float(
        np.abs(renorm(unnorm) - vecs[:64]).max())

    again = enc(inputs[:64])
    checks["repeat_same_engine_max_abs_diff"] = float(np.abs(again - raw[:64]).max())
    single = enc(inputs[:32], bs=1)
    checks["single_vs_batch_max_abs_diff"] = float(np.abs(single - raw[:32]).max())
    checks["single_vs_batch_min_cos"] = float((renorm(single) * vecs[:32]).sum(-1).min())

    engine2, create_warm_s = make_engine()
    fresh = enc(inputs[:64], eng=engine2)
    checks["recreated_engine_max_abs_diff"] = float(np.abs(fresh - raw[:64]).max())
    engine2.close()

    out512 = enc(inputs[:64], output_size=512)
    checks["output_size_512_dim"] = int(out512.shape[1])
    checks["output_size_512_norm_range"] = [float(np.linalg.norm(out512, axis=-1).min()),
                                            float(np.linalg.norm(out512, axis=-1).max())]
    checks["output_size_512_vs_manual_truncate_renorm_max_abs_diff"] = float(
        np.abs(renorm(out512) - renorm(vecs[:64, :512])).max())

    nospecial = enc(inputs[:16], insert_special_tokens=False)
    checks["insert_special_tokens_false_mean_cos_vs_default"] = float(
        (renorm(nospecial) * vecs[:16]).sum(-1).mean())

    ws = [s + "  \n" for s in inputs[:16]]
    checks["trailing_ws_min_cos"] = float((renorm(enc(ws)) * vecs[:16]).sum(-1).min())

    docs = [profiles.fmt(profiles.RETRIEVAL_PAIRS["modelcard-v1"]["document"], g["text"])
            for g in profiles.load_all()["corpus"]]
    latency = {}
    enc(docs[:4], bs=4)
    for bs in (1, 16, 64):
        batch = (docs * 2)[:bs]
        reps = 10 if bs == 1 else 3
        t0 = time.perf_counter()
        for _ in range(reps):
            enc(batch, bs=bs)
        dt = (time.perf_counter() - t0) / reps
        latency[f"batch{bs}"] = {"batch_ms": dt * 1000, "per_text_ms": dt * 1000 / bs}
    # Long input: ~1k tokens of mixed text (single call).
    # The default engine only loads signatures up to 1024 tokens and the default
    # overflow strategy errors out, so record each variant separately.
    from litert_lm import InputOverflowStrategy

    long_text = " ".join(g["text"] for g in profiles.load_all()["corpus"]) * 2
    long_checks: dict = {"chars": len(long_text)}

    def timed_long(label: str, eng=None, **opt) -> np.ndarray | None:
        try:
            v = enc([long_text], bs=1, eng=eng, **opt)
            t0 = time.perf_counter()
            for _ in range(3):
                enc([long_text], bs=1, eng=eng, **opt)
            long_checks[label] = {"ok": True, "ms": (time.perf_counter() - t0) / 3 * 1000}
            return renorm(v)[0]
        except RuntimeError as e:
            long_checks[label] = {"ok": False, "error": str(e)}
            return None

    timed_long("defaultEngine_defaultOverflow")
    v_trunc = timed_long("defaultEngine_truncate", input_overflow_strategy=InputOverflowStrategy.TRUNCATE)
    v_chunk = timed_long("defaultEngine_chunkAndAverage",
                         input_overflow_strategy=InputOverflowStrategy.CHUNK_AND_AVERAGE)
    try:
        t0 = time.perf_counter()
        eng_long = EmbeddingEngine(str(args.model), backend=backend,
                                   cache_dir=str(args.engine_cache_dir), max_input_length=2048)
        long_checks["maxInputLength2048_createSeconds"] = time.perf_counter() - t0
        v_full = timed_long("maxInputLength2048_defaultOverflow", eng=eng_long)
        eng_long.close()
    except RuntimeError as e:
        long_checks["maxInputLength2048_create"] = {"ok": False, "error": str(e)}
        v_full = None
    if v_full is not None:
        for label, v in (("truncate", v_trunc), ("chunkAndAverage", v_chunk)):
            if v is not None:
                long_checks[f"cos_full2048_vs_{label}"] = float(v @ v_full)
    checks["long_input"] = long_checks

    engine.close()

    cache_files = {p.name: p.stat().st_size for p in args.engine_cache_dir.iterdir()}
    run_id = f"litert-{args.backend}"
    args.cache_dir.mkdir(parents=True, exist_ok=True)
    np.savez(profiles.cache_path(args.cache_dir, run_id),
             strings=np.array(inputs, dtype=np.str_), vectors=vecs)
    lib_path = Path(litert_lm.__file__).parent / "liblitert-lm.dylib"
    manifest = {
        "runId": run_id,
        "backend": f"litert-lm/{args.backend}",
        "model": str(args.model),
        "modelSha256": sha256(args.model),
        "modelInfo": model_info,
        "versions": {
            "python": platform.python_version(),
            "litert_lm_api": metadata.version("litert-lm-api"),
            "liblitertLmSha256": sha256(lib_path) if lib_path.exists() else None,
        },
        "machine": platform.machine(),
        "cold": args.cold,
        "engineCreateSeconds": {"first": create_first_s, "secondWarm": create_warm_s},
        "engineCacheFiles": cache_files,
        "embedAllSeconds": embed_all_s,
        "numInputs": len(inputs),
        "maxRssMB": {
            "afterCreate": rss_after_create,
            "end": resource.getrusage(resource.RUSAGE_SELF).ru_maxrss / 1024 / 1024,
        },
        "checks": checks,
        "latency": latency,
    }
    with open(args.cache_dir / f"{run_id}.json", "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
    print(json.dumps(manifest, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
