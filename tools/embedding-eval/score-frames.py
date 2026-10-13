#!/usr/bin/env python3
"""Score the multimodal G0 runs written by embed-frames.py.

Reads <frames-dir>/{manifest,labels}.json and runs/*.npz; prints and writes a
metrics JSON with no titles or paths (only categories and counts), so it can be
committed next to the report.

Settings:
  library — every query ranks all frames (按描述找素材, 画面相近).
  video   — a query whose relevant frames all sit in one video ranks only that
            video's frames (给这句话找配套画面, 补充画面, 插图).
Metrics: R@1, R@5, MRR per query kind; per category for visual queries;
score of the best relevant frame vs the best frame for no-answer queries;
cosine between runs (same space or not).
"""

from __future__ import annotations

import argparse
import json
import sys
from collections import defaultdict
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import numpy as np  # noqa: E402

import profiles  # noqa: E402


def ranks(scores: np.ndarray, cand: list[int], relevant: set[int]) -> tuple[int | None, float, float]:
    """Rank (1-based) of the first relevant candidate, best relevant score, best score."""
    order = sorted(cand, key=lambda i: -scores[i])
    first = next((n + 1 for n, i in enumerate(order) if i in relevant), None)
    best_rel = max((scores[i] for i in relevant if i in cand), default=float("nan"))
    return first, float(best_rel), float(scores[order[0]])


def summarize(rows: list[dict]) -> dict:
    if not rows:
        return {"n": 0}
    rk = [r["rank"] for r in rows]
    return {
        "n": len(rows),
        "r1": round(sum(1 for x in rk if x == 1) / len(rk), 3),
        "r5": round(sum(1 for x in rk if x is not None and x <= 5) / len(rk), 3),
        "mrr": round(float(np.mean([1 / x for x in rk])), 3),
    }


def pct(values: list[float]) -> dict:
    a = np.array(values)
    return {"min": round(float(a.min()), 3), "p10": round(float(np.percentile(a, 10)), 3),
            "median": round(float(np.median(a)), 3), "max": round(float(a.max()), 3)}


def score_run(npz, manifest: dict, labels: dict, pair: str) -> dict:
    frames = [str(x) for x in npz["frame_ids"]]
    index = {f: i for i, f in enumerate(frames)}
    video_of = {f["id"]: f["video"] for f in manifest["frames"]}
    category = {v["id"]: v["category"] for v in manifest["videos"]}
    by_video = defaultdict(list)
    for i, f in enumerate(frames):
        by_video[video_of[f]].append(i)
    F, Q = npz["frames"], npz[f"queries_{pair}"]
    out_rows = {"library": [], "video": []}
    none_best, pos_best, misses = [], [], []
    for qi, q in enumerate(labels["queries"]):
        scores = F @ Q[qi]
        if q["kind"] == "none":
            none_best.append(float(scores.max()))
            continue
        rel = {index[f] for f in q["relevant"]}
        vids = {video_of[f] for f in q["relevant"]}
        first, best_rel, _ = ranks(scores, list(range(len(frames))), rel)
        cat = category[next(iter(vids))]
        out_rows["library"].append({"kind": q["kind"], "lang": q["lang"], "category": cat, "rank": first})
        if first != 1:
            misses.append({"query": q["id"], "setting": "library", "kind": q["kind"], "rank": first,
                           "top1": frames[int(np.argmax(scores))]})
        if q["kind"] == "visual":
            pos_best.append(best_rel)
        if len(vids) == 1:
            cand = by_video[next(iter(vids))]
            if len(rel) < len(cand):
                first_v, _, _ = ranks(scores, cand, rel)
                if first_v != 1:
                    misses.append({"query": q["id"], "setting": "video", "kind": q["kind"], "rank": first_v,
                                   "top1": frames[max(cand, key=lambda i: scores[i])]})
                out_rows["video"].append({"kind": q["kind"], "lang": q["lang"], "category": cat,
                                          "rank": first_v, "candidates": len(cand), "relevant": len(rel)})
    result = {}
    for setting, rows in out_rows.items():
        kinds = defaultdict(list)
        for r in rows:
            kinds[r["kind"]].append(r)
            kinds[f"{r['kind']}/{r['lang']}"].append(r)
        result[setting] = {k: summarize(v) for k, v in sorted(kinds.items())}
        if setting == "library":
            cats = defaultdict(list)
            for r in rows:
                if r["kind"] == "visual":
                    cats[r["category"]].append(r)
            result["libraryVisualByCategory"] = {k: summarize(v) for k, v in sorted(cats.items())}
        else:
            big = [r for r in rows if r["candidates"] >= 20]
            result["video20FramesOnly"] = summarize(big)
            result["videoMeanCandidates"] = round(float(np.mean([r["candidates"] for r in rows])), 1)
    result["scores"] = {"visualBestRelevant": pct(pos_best), "noAnswerBest": pct(none_best)}
    result["misses"] = misses
    return result


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--frames-dir", type=Path, default=profiles.FRAMES_EVAL_DIR)
    ap.add_argument("--out", type=Path, required=True)
    args = ap.parse_args()
    manifest = json.loads((args.frames_dir / "manifest.json").read_text())
    labels = json.loads((args.frames_dir / "labels.json").read_text())
    runs_dir = args.frames_dir / "runs"
    runs = {p.stem: np.load(p) for p in sorted(runs_dir.glob("*.npz"))}
    info = {p.stem: json.loads(p.read_text()) for p in sorted(runs_dir.glob("*.json"))}

    cats = defaultdict(int)
    for v in manifest["videos"]:
        cats[v["category"]] += 1
    kinds = defaultdict(int)
    for q in labels["queries"]:
        kinds[q["kind"]] += 1
    metrics = {
        "corpus": {"videos": len(manifest["videos"]), "frames": len(manifest["frames"]),
                   "categories": dict(sorted(cats.items())), "queries": dict(sorted(kinds.items())),
                   "labeledBy": labels.get("labeledBy"), "humanVerified": labels.get("humanVerified")},
        "runs": info,
        "retrieval": {},
        "sameSpace": {},
    }
    for run, npz in runs.items():
        for pair in ("modelcard-v1", "litert-docs-v1", "no-prefix"):
            metrics["retrieval"][f"{run}/{pair}"] = score_run(npz, manifest, labels, pair)
    base = runs.get("cpu")
    if base is not None:
        for run, npz in runs.items():
            if run == "cpu":
                continue
            fc = (base["frames"] * npz["frames"]).sum(1)
            qc = (base["queries_modelcard-v1"] * npz["queries_modelcard-v1"]).sum(1)
            metrics["sameSpace"][f"cpu~{run}"] = {
                "frameCosMin": round(float(fc.min()), 4), "frameCosMean": round(float(fc.mean()), 4),
                "queryCosMin": round(float(qc.min()), 4),
            }
    args.out.write_text(json.dumps(metrics, ensure_ascii=False, indent=1) + "\n")
    print(json.dumps({k: metrics[k] for k in ("sameSpace",)}, indent=1))
    for key, r in metrics["retrieval"].items():
        lib, vid = r["library"], r["video"]
        brief = {k: (lib[k]["r1"], vid.get(k, {}).get("r1")) for k in ("visual", "narration", "transcript", "screen-text") if k in lib}
        print(key, "R@1 library/video", brief, "scores", r["scores"], "misses", len(r["misses"]))
    return 0


if __name__ == "__main__":
    sys.exit(main())
