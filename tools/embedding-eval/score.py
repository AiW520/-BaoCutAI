#!/usr/bin/env python3
"""Score cached G0 embeddings: retrieval, cross-backend, symmetric, glossary.

Reads <cache-dir>/<run>.npz written by embed-reference.py / embed-litert.py /
check-c-api.py, never runs a model. Writes a metrics JSON and an
UNCALIBRATED thresholds proposal. Fixture sizes are tiny (34 queries, ~50
pairs): every number here is a smoke-level signal, not a calibration.
"""

from __future__ import annotations

import argparse
import itertools
import json
import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import numpy as np  # noqa: E402

import profiles  # noqa: E402

DIMS = (768, 512)
KS = (1, 5, 10)


def renorm(v: np.ndarray) -> np.ndarray:
    return v / np.linalg.norm(v, axis=-1, keepdims=True)


class Run:
    def __init__(self, path: Path):
        z = np.load(path)
        self.id = path.stem
        self.index = {s: i for i, s in enumerate(z["strings"].tolist())}
        self.vectors = z["vectors"].astype(np.float32)

    def get(self, strings: list[str], dim: int) -> np.ndarray:
        v = self.vectors[[self.index[s] for s in strings], :dim]
        return renorm(v)


def stats(x) -> dict:
    x = np.asarray(x, dtype=np.float64)
    if x.size == 0:
        return {}
    return {
        "n": int(x.size),
        "min": round(float(x.min()), 4),
        "p25": round(float(np.percentile(x, 25)), 4),
        "median": round(float(np.median(x)), 4),
        "p75": round(float(np.percentile(x, 75)), 4),
        "max": round(float(x.max()), 4),
    }


def retrieval(data, doc_run: Run, q_run: Run, pair: str, dim: int) -> dict:
    tpl = profiles.RETRIEVAL_PAIRS[pair]
    groups = data["corpus"]
    queries = data["queries"]
    D = doc_run.get([profiles.fmt(tpl["document"], g["text"]) for g in groups], dim)
    Q = q_run.get([profiles.fmt(tpl["query"], q["text"]) for q in queries], dim)
    S = Q @ D.T
    ids = [g["id"] for g in groups]
    per_cat: dict[str, dict[str, list]] = {}
    top1_relevant_scores, noanswer_max, top10 = [], [], {}
    for qi, q in enumerate(queries):
        order = np.argsort(-S[qi])
        ranked = [ids[j] for j in order]
        top10[q["id"]] = ranked[:10]
        cat = per_cat.setdefault(q["category"], {})
        if not q["relevant"]:
            noanswer_max.append(float(S[qi, order[0]]))
            continue
        rel = set(q["relevant"])
        for k in KS:
            hit = len(rel & set(ranked[:k])) / len(rel)
            cat.setdefault(f"recall@{k}", []).append(hit)
        dcg = sum(1 / math.log2(r + 2) for r, d in enumerate(ranked[:10]) if d in rel)
        idcg = sum(1 / math.log2(r + 2) for r in range(min(len(rel), 10)))
        cat.setdefault("ndcg@10", []).append(dcg / idcg)
        first = next(r for r, d in enumerate(ranked) if d in rel)
        cat.setdefault("mrr", []).append(1 / (first + 1))
        best_rel = max(float(S[qi, ids.index(r)]) for r in rel)
        best_irrel = max(float(S[qi, j]) for j, d in enumerate(ids) if d not in rel)
        cat.setdefault("margin", []).append(best_rel - best_irrel)
        top1_relevant_scores.append(best_rel)
    out = {"byCategory": {}, "overall": {}}
    agg: dict[str, list] = {}
    for cat, m in per_cat.items():
        if not m:
            continue
        out["byCategory"][cat] = {k: round(float(np.mean(v)), 4) for k, v in m.items()}
        out["byCategory"][cat]["n"] = len(next(iter(m.values())))
        for k, v in m.items():
            agg.setdefault(k, []).extend(v)
    out["overall"] = {k: round(float(np.mean(v)), 4) for k, v in agg.items()}
    out["overall"]["n"] = len(agg.get("recall@1", []))
    out["noAnswerMaxScore"] = stats(noanswer_max)
    # How well a single score threshold separates answerable from no-answer queries.
    out["noAnswerSeparationAuc"] = round(auc(top1_relevant_scores, noanswer_max), 4)
    out["answerableBestRelevantScore"] = stats(top1_relevant_scores)
    out["_top10"] = top10
    out["_scores"] = S
    out["_bestRelevant"] = top1_relevant_scores
    out["_noAnswerMax"] = noanswer_max
    return out


def auc(pos, neg) -> float:
    pos, neg = np.asarray(pos), np.asarray(neg)
    if not len(pos) or not len(neg):
        return float("nan")
    wins = sum((p > n) + 0.5 * (p == n) for p in pos for n in neg)
    return float(wins / (len(pos) * len(neg)))


def pair_scores(run: Run, profile: str, pairs, a_key: str, b_key: str, dim: int):
    tpl = profiles.SYMMETRIC_PROFILES[profile]
    A = run.get([profiles.fmt(tpl, p[a_key]) for p in pairs], dim)
    B = run.get([profiles.fmt(tpl, p[b_key]) for p in pairs], dim)
    return (A * B).sum(-1)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--cache-dir", type=Path, default=profiles.DEFAULT_CACHE_DIR)
    ap.add_argument("--out", type=Path, required=True, help="metrics JSON path")
    ap.add_argument("--thresholds-out", type=Path, required=True)
    ap.add_argument("--product-run", default="litert-cpu")
    args = ap.parse_args()

    data = profiles.load_all()
    runs = {p.stem: Run(p) for p in sorted(args.cache_dir.glob("*.npz"))}
    if not runs:
        print("no cached runs", file=sys.stderr)
        return 1
    metrics: dict = {"runs": sorted(runs), "retrieval": {}, "crossBackend": {}, "agreement": {},
                     "symmetric": {}, "glossary": {}}

    # 1. Same-backend retrieval.
    cache: dict = {}
    for rid, run in runs.items():
        for pair in profiles.RETRIEVAL_PAIRS:
            for dim in DIMS:
                r = retrieval(data, run, run, pair, dim)
                cache[(rid, rid, pair, dim)] = r
                metrics["retrieval"][f"{rid}|{pair}|{dim}"] = {
                    k: v for k, v in r.items() if not k.startswith("_")}

    # 2. Mixed backends: documents indexed by A, queries encoded by B.
    combos = [(a, b) for a, b in itertools.permutations(runs, 2)]
    for a, b in combos:
        for pair in ("modelcard-v1", "litert-docs-v1"):
            for dim in DIMS:
                r = retrieval(data, runs[a], runs[b], pair, dim)
                base = cache[(a, a, pair, dim)]
                overlap = np.mean([len(set(r["_top10"][q]) & set(base["_top10"][q])) / 10
                                   for q in r["_top10"]])
                top1_same = np.mean([r["_top10"][q][0] == base["_top10"][q][0] for q in r["_top10"]])
                metrics["crossBackend"][f"docs={a}|queries={b}|{pair}|{dim}"] = {
                    "recall@10": r["overall"]["recall@10"],
                    "recall@1": r["overall"]["recall@1"],
                    "ndcg@10": r["overall"]["ndcg@10"],
                    "recall@10_delta_pp_vs_docs_backend": round(
                        100 * (r["overall"]["recall@10"] - base["overall"]["recall@10"]), 2),
                    "recall@1_delta_pp_vs_docs_backend": round(
                        100 * (r["overall"]["recall@1"] - base["overall"]["recall@1"]), 2),
                    "top10_overlap_vs_docs_backend": round(float(overlap), 4),
                    "top1_same_vs_docs_backend": round(float(top1_same), 4),
                    "noAnswerMaxScore": r["noAnswerMaxScore"],
                }

    # 3. Vector and score agreement on identical inputs.
    inputs = profiles.all_model_inputs(data)
    for a, b in itertools.combinations(runs, 2):
        for dim in DIMS:
            va, vb = runs[a].get(inputs, dim), runs[b].get(inputs, dim)
            cos = (va * vb).sum(-1)
            sa = cache[(a, a, "modelcard-v1", dim)]["_scores"].ravel()
            sb = cache[(b, b, "modelcard-v1", dim)]["_scores"].ravel()
            metrics["agreement"][f"{a}~{b}|{dim}"] = {
                "sameInputCosine": stats(cos),
                "sameInputCosineP05": round(float(np.percentile(cos, 5)), 4),
                "queryDocScorePearson": round(float(np.corrcoef(sa, sb)[0, 1]), 4),
                "queryDocScoreMeanAbsDiff": round(float(np.abs(sa - sb).mean()), 4),
            }

    # 4. Symmetric pairs and glossary.
    sym = data["symmetric"]
    cats = sorted({p["category"] for p in sym})
    gl_term = [p for p in data["glossary"] if p["scope"] == "term"]
    gl_sent = [p for p in data["glossary"] if p["scope"] == "sentence"]
    for rid, run in runs.items():
        for prof in profiles.SYMMETRIC_PROFILES:
            for dim in DIMS:
                s = pair_scores(run, prof, sym, "a", "b", dim)
                by = {c: s[[i for i, p in enumerate(sym) if p["category"] == c]] for c in cats}
                same = np.concatenate([by["retake"], by["tm-punctuation"]])
                entry = {"byCategory": {c: stats(v) for c, v in by.items()},
                         "aucSameVs": {c: round(auc(same, by[c]), 4)
                                       for c in cats if c not in ("retake", "tm-punctuation")}}
                metrics["symmetric"][f"{rid}|{prof}|{dim}"] = entry
                g = pair_scores(run, prof, gl_term, "term", "variant", dim)
                gs = pair_scores(run, prof, gl_sent, "term", "variant", dim)
                glab = {lab: g[[i for i, p in enumerate(gl_term) if p["label"] == lab]]
                        for lab in ("misheard", "related-term", "unrelated")}
                metrics["glossary"][f"{rid}|{prof}|{dim}"] = {
                    "term": {lab: stats(v) for lab, v in glab.items()},
                    "termPairs": {p["id"]: round(float(x), 4) for p, x in zip(gl_term, g)},
                    "aucMisheardVsRelated": round(auc(glab["misheard"], glab["related-term"]), 4),
                    "aucMisheardVsUnrelated": round(auc(glab["misheard"], glab["unrelated"]), 4),
                    "sentencePairs": {p["id"]: round(float(x), 4) for p, x in zip(gl_sent, gs)},
                }

    # 5. Manifests (checks, latency) for the report.
    metrics["manifests"] = {}
    for mf in sorted(args.cache_dir.glob("*.json")):
        with open(mf, encoding="utf-8") as f:
            metrics["manifests"][mf.stem] = json.load(f)

    # 6. Uncalibrated threshold proposals for the product run.
    prod = args.product_run if args.product_run in runs else sorted(runs)[0]
    proposal = {
        "status": "UNCALIBRATED-PROPOSAL",
        "warning": ("Derived from a tiny hand-written synthetic fixture set (34 queries, "
                    "54 symmetric pairs, 36 glossary pairs). Starting points for the "
                    "labeled calibration in spec v0.1 §18.1, not calibrated values."),
        "basedOnRun": prod,
        "recommendedProfiles": {
            "retrievalPromptPairId": "modelcard-v1",
            "retrievalQueryTemplate": profiles.RETRIEVAL_PAIRS["modelcard-v1"]["query"],
            "retrievalDocumentTemplate": profiles.RETRIEVAL_PAIRS["modelcard-v1"]["document"],
            "symmetricProfile": "sym-modelcard",
            "symmetricTemplate": profiles.SYMMETRIC_PROFILES["sym-modelcard"],
            "experimentalProfiles": ["litert-docs-v1", "sym-litert"],
            "rejectedForSymmetric": ["sym-clustering", "sym-document"],
        },
        "byDim": {},
    }
    for dim in DIMS:
        entry: dict = {}
        for pair in ("modelcard-v1", "litert-docs-v1"):
            r = cache[(prod, prod, pair, dim)]
            na_max = r["noAnswerMaxScore"]["max"]
            ans_min = r["answerableBestRelevantScore"]["min"]
            ans_p25 = r["answerableBestRelevantScore"]["p25"]
            thr = round((na_max + ans_p25) / 2, 3)
            entry[f"retrievalWeakHit[{pair}]"] = {
                "noAnswerMaxScore": na_max,
                "answerableBestRelevantMin": ans_min,
                "answerableBestRelevantP25": ans_p25,
                "proposed": thr,
                "separable": bool(ans_min > na_max),
                "answerableBelowProposed": int(sum(x < thr for x in r["_bestRelevant"])),
                "answerableTotal": len(r["_bestRelevant"]),
                "noAnswerAboveProposed": int(sum(x >= thr for x in r["_noAnswerMax"])),
                "noAnswerTotal": len(r["_noAnswerMax"]),
                "note": "weak-hit marks results as low confidence; it must not hide them",
            }
        for prof in ("sym-modelcard", "sym-litert"):
            sm = metrics["symmetric"][f"{prod}|{prof}|{dim}"]["byCategory"]
            retake_min = sm["retake"]["min"]
            tp_min = sm["tm-punctuation"]["min"]
            hard_diff_max = max(sm[c]["max"] for c in ("number-diff", "negation-diff", "proper-noun-diff"))
            tw_max = sm["tm-wording"]["max"]
            related_max = sm["related-topic"]["max"]
            unrelated_max = sm["unrelated"]["max"]
            gl = metrics["glossary"][f"{prod}|{prof}|{dim}"]["term"]
            entry[f"retake[{prof}]"] = {
                "retakeMin": retake_min,
                "relatedTopicMax": related_max,
                "numberNegationProperNounMax": hard_diff_max,
                "proposed": round(min(retake_min, tp_min) - 0.02, 3),
                "note": "pairs above threshold still need the literal number/negation/proper-noun diff check (design §3.8)",
            }
            entry[f"translationMemoryReuse[{prof}]"] = {
                "tmPunctuationMin": tp_min,
                "tmWordingMax": tw_max,
                "numberNegationProperNounMax": hard_diff_max,
                "separationGap": round(tp_min - max(tw_max, hard_diff_max), 4),
                "embeddingAloneSeparates": bool(tp_min > max(tw_max, hard_diff_max)),
                "proposed": (round((tp_min + max(tw_max, hard_diff_max)) / 2, 4)
                             if tp_min > max(tw_max, hard_diff_max) else None),
                "note": ("gap is too thin to trust; reuse should require equality after "
                         "punctuation/whitespace normalization, embedding score only ranks reference suggestions"),
            }
            entry[f"glossaryCandidate[{prof}]"] = {
                "misheardMin": gl["misheard"]["min"],
                "misheardMedian": gl["misheard"]["median"],
                "relatedTermMax": gl["related-term"]["max"],
                "unrelatedMax": gl["unrelated"]["max"],
                "proposed": round((gl["misheard"]["p25"] + gl["unrelated"]["max"]) / 2, 3),
                "note": "must be followed by character/phonetic similarity re-check (design §3.7)",
            }
        proposal["byDim"][str(dim)] = entry

    args.out.parent.mkdir(parents=True, exist_ok=True)
    with open(args.out, "w", encoding="utf-8") as f:
        json.dump(metrics, f, ensure_ascii=False, indent=1)
    with open(args.thresholds_out, "w", encoding="utf-8") as f:
        json.dump(proposal, f, ensure_ascii=False, indent=2)
    print(f"wrote {args.out} and {args.thresholds_out}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
