#!/usr/bin/env python3
"""Embed every G0 fixture input with the reference SentenceTransformers model.

Writes <cache-dir>/ref-<dtype>.npz (strings + 768-d float32 vectors, L2
normalized) and ref-<dtype>.json (versions, checks, latency). Text-only load:
vision and audio encoders are disabled via config_kwargs. Never FP16.
"""

from __future__ import annotations

import argparse
import json
import platform
import resource
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import numpy as np  # noqa: E402

import profiles  # noqa: E402


def renorm(v: np.ndarray) -> np.ndarray:
    v = v.astype(np.float32)
    return v / np.linalg.norm(v, axis=-1, keepdims=True)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--dtype", choices=["fp32", "bf16"], default="fp32")
    ap.add_argument("--device", default="cpu", help="torch device (cpu or mps)")
    ap.add_argument("--model-dir", type=Path, default=profiles.REFERENCE_MODEL_DIR)
    ap.add_argument("--cache-dir", type=Path, default=profiles.DEFAULT_CACHE_DIR)
    ap.add_argument("--batch-size", type=int, default=16)
    args = ap.parse_args()

    import sentence_transformers
    import torch
    import transformers
    from sentence_transformers import SentenceTransformer

    dtype = {"fp32": torch.float32, "bf16": torch.bfloat16}[args.dtype]
    t0 = time.perf_counter()
    model = SentenceTransformer(
        str(args.model_dir),
        device=args.device,
        config_kwargs={"vision_config": None, "audio_config": None},
        model_kwargs={"dtype": dtype},
    )
    load_s = time.perf_counter() - t0
    n_params = sum(p.numel() for p in model.parameters())

    def enc(texts: list[str], bs: int | None = None, **kw) -> np.ndarray:
        out = model.encode(
            texts,
            batch_size=bs or args.batch_size,
            normalize_embeddings=True,
            convert_to_numpy=False,
            convert_to_tensor=True,
            **kw,
        )
        return renorm(out.float().cpu().numpy())

    inputs = profiles.all_model_inputs()
    t0 = time.perf_counter()
    vecs = enc(inputs)
    embed_all_s = time.perf_counter() - t0

    checks: dict = {}
    raw_norms = model.encode(inputs[:64], normalize_embeddings=False, convert_to_tensor=True)
    raw_norms = np.linalg.norm(raw_norms.float().cpu().numpy(), axis=-1)
    checks["finite"] = bool(np.isfinite(vecs).all())
    checks["norm_min"] = float(np.linalg.norm(vecs, axis=-1).min())
    checks["norm_max"] = float(np.linalg.norm(vecs, axis=-1).max())
    checks["unnormalized_norm_range"] = [float(raw_norms.min()), float(raw_norms.max())]

    # Determinism: same inputs again (same batch shape), and batch-1 vs batched.
    again = enc(inputs[:64])
    checks["repeat_max_abs_diff"] = float(np.abs(again - vecs[:64]).max())
    single = enc(inputs[:32], bs=1)
    checks["batch1_vs_batched_max_abs_diff"] = float(np.abs(single - vecs[:32]).max())
    checks["batch1_vs_batched_min_cos"] = float((single * vecs[:32]).sum(-1).min())

    # MRL: library truncate_dim=512 vs manual truncate + renormalize.
    lib512 = enc(inputs[:64], truncate_dim=512)
    man512 = renorm(vecs[:64, :512])
    checks["truncate512_lib_vs_manual_max_abs_diff"] = float(np.abs(lib512 - man512).max())

    # Whitespace sensitivity: trailing space/newline after the formatted input.
    ws = [s + "  \n" for s in inputs[:16]]
    ws_v = enc(ws)
    checks["trailing_ws_min_cos"] = float((ws_v * vecs[:16]).sum(-1).min())

    # Tokenization sample (shows whether BOS/EOS are added by the library).
    sample = inputs[0]
    tok = model.tokenizer(sample)
    checks["tokenization_sample"] = {
        "input": sample,
        "tokens_head": model.tokenizer.convert_ids_to_tokens(tok["input_ids"])[:4],
        "tokens_tail": model.tokenizer.convert_ids_to_tokens(tok["input_ids"])[-2:],
    }

    # Latency (warm, per batch) on corpus-like strings.
    docs = [profiles.fmt(profiles.RETRIEVAL_PAIRS["modelcard-v1"]["document"], g["text"])
            for g in profiles.load_all()["corpus"]]
    latency = {}
    enc(docs[:4], bs=4)  # warm-up
    for bs in (1, 16, 64):
        batch = (docs * 2)[:bs]
        reps = 5 if bs <= 16 else 2
        t0 = time.perf_counter()
        for _ in range(reps):
            enc(batch, bs=bs)
        dt = (time.perf_counter() - t0) / reps
        latency[f"batch{bs}"] = {"batch_ms": dt * 1000, "per_text_ms": dt * 1000 / bs}

    run_id = f"ref-{args.dtype}" + ("" if args.device == "cpu" else f"-{args.device}")
    args.cache_dir.mkdir(parents=True, exist_ok=True)
    np.savez(profiles.cache_path(args.cache_dir, run_id), strings=np.array(inputs, dtype=np.str_), vectors=vecs)
    manifest = {
        "runId": run_id,
        "backend": "sentence-transformers",
        "dtype": args.dtype,
        "device": args.device,
        "modelDir": str(args.model_dir),
        "params": n_params,
        "versions": {
            "python": platform.python_version(),
            "torch": torch.__version__,
            "transformers": transformers.__version__,
            "sentence_transformers": sentence_transformers.__version__,
        },
        "machine": platform.machine(),
        "loadSeconds": load_s,
        "embedAllSeconds": embed_all_s,
        "numInputs": len(inputs),
        "maxRssMB": resource.getrusage(resource.RUSAGE_SELF).ru_maxrss / 1024 / 1024,
        "checks": checks,
        "latency": latency,
    }
    with open(args.cache_dir / f"{run_id}.json", "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
    print(json.dumps(manifest, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
