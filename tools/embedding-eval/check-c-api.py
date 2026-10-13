#!/usr/bin/env python3
"""Run the C smoke binary against the xcframework dylib and compare vectors.

Builds c-smoke/embedding-smoke.c into <cache-dir>/../build (outside the repo),
embeds the same inputs as embed-litert.py, and compares against the Python
wheel results in <cache-dir>/litert-<backend>.npz. Also compares FP32 vs
default activation. Writes <cache-dir>/c-api.json.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import numpy as np  # noqa: E402

import profiles  # noqa: E402

XCF = profiles.DEFAULT_MODEL_ROOT / "litert-lm-0.18.0" / "CLiteRTLM_mac.xcframework" / "macos-arm64_x86_64"


def renorm(v: np.ndarray) -> np.ndarray:
    return v / np.linalg.norm(v, axis=-1, keepdims=True)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--cache-dir", type=Path, default=profiles.DEFAULT_CACHE_DIR)
    ap.add_argument("--xcframework-slice", type=Path, default=XCF)
    ap.add_argument("--model", type=Path, default=profiles.LITERT_MODEL_PATH)
    ap.add_argument("--backends", default="cpu,gpu")
    args = ap.parse_args()

    build = profiles.DEFAULT_MODEL_ROOT / "build"
    build.mkdir(parents=True, exist_ok=True)
    exe = build / "embedding-smoke"
    src = Path(__file__).resolve().parent / "c-smoke" / "embedding-smoke.c"
    lib = args.xcframework_slice
    subprocess.run(["clang", "-O2", "-Wall", f"-I{lib / 'Headers'}", f"-L{lib}", "-lCLiteRTLM_mac",
                    f"-Wl,-rpath,{lib}", "-o", str(exe), str(src)], check=True)

    inputs = profiles.all_model_inputs()
    assert all("\n" not in s for s in inputs)
    in_path = build / "inputs.txt"
    in_path.write_text("\n".join(inputs) + "\n", encoding="utf-8")
    engine_cache = profiles.DEFAULT_MODEL_ROOT / "litert-cache-c"
    engine_cache.mkdir(exist_ok=True)

    dylib = lib / "libCLiteRTLM_mac.dylib"
    result: dict = {
        "dylib": str(dylib),
        "dylibSha256": hashlib.sha256(dylib.read_bytes()).hexdigest(),
        "runs": {},
    }

    def run(backend: str, activation: str, output_size: int) -> np.ndarray | None:
        key = f"{backend}-{activation}-{output_size or 768}"
        out = build / f"c-{key}.f32"
        p = subprocess.run([str(exe), str(args.model), backend, activation, str(output_size),
                            str(engine_cache), str(in_path), str(out), "16"],
                           capture_output=True, text=True)
        entry = {"returncode": p.returncode,
                 "stdout": p.stdout.strip().splitlines()[-4:],
                 "stderrTail": p.stderr.strip().splitlines()[-3:]}
        result["runs"][key] = entry
        if p.returncode != 0:
            return None
        v = np.fromfile(out, dtype=np.float32)
        return v.reshape(len(inputs), -1)

    for backend in args.backends.split(","):
        wheel_path = profiles.cache_path(args.cache_dir, f"litert-{backend}")
        wheel = np.load(wheel_path)["vectors"] if wheel_path.exists() else None
        default = run(backend, "default", 0)
        fp32 = run(backend, "fp32", 0)
        o512 = run(backend, "default", 512)
        cmp: dict = {}
        if default is not None:
            cmp["c_default_norm_range"] = [float(np.linalg.norm(default, axis=-1).min()),
                                           float(np.linalg.norm(default, axis=-1).max())]
            cmp["c_default_finite"] = bool(np.isfinite(default).all())
            if wheel is not None:
                d = renorm(default)
                cmp["c_vs_wheel_max_abs_diff"] = float(np.abs(d - wheel).max())
                cmp["c_vs_wheel_min_cos"] = float((d * wheel).sum(-1).min())
        if default is not None and fp32 is not None:
            cos = (renorm(fp32) * renorm(default)).sum(-1)
            cmp["fp32_vs_default_activation_min_cos"] = float(cos.min())
            cmp["fp32_vs_default_activation_mean_cos"] = float(cos.mean())
            cmp["fp32_vs_default_activation_max_abs_diff"] = float(
                np.abs(renorm(fp32) - renorm(default)).max())
            np.savez(profiles.cache_path(args.cache_dir, f"litert-{backend}-fp32act"),
                     strings=np.array(inputs, dtype=np.str_), vectors=renorm(fp32).astype(np.float32))
        if default is not None and o512 is not None:
            cmp["output_size_512_dim"] = int(o512.shape[1])
            cmp["output_size_512_vs_truncate_renorm_max_abs_diff"] = float(
                np.abs(renorm(o512) - renorm(default[:, :512])).max())
        result[f"compare-{backend}"] = cmp

    with open(args.cache_dir / "c-api.json", "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
