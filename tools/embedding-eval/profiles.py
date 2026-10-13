"""Prompt profiles and fixture loading shared by the G0 embedding scripts.

Every string that reaches a model is built here, so the reference and LiteRT
runs embed byte-identical inputs. Inputs are trimmed before the prefix is
prepended (LiteRT-LM embedding docs: trim leading/trailing whitespace first).
"""

from __future__ import annotations

import json
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent
FIXTURES = ROOT / "fixtures"

DEFAULT_MODEL_ROOT = Path(
    os.environ.get("BAOCUT_EMBED_EVAL_ROOT", "/Volumes/ExtremeSSD/Models/embeddinggemma-2")
)
DEFAULT_CACHE_DIR = DEFAULT_MODEL_ROOT / "eval-cache"
REFERENCE_MODEL_DIR = DEFAULT_MODEL_ROOT / "weights" / "google-embeddinggemma-2"
LITERT_MODEL_PATH = (
    DEFAULT_MODEL_ROOT / "weights" / "litert-text-270m" / "embeddinggemma-2-text-270m.litertlm"
)
# Full multimodal package (text + vision + audio towers); multimodal G0 only.
LITERT_740M_MODEL_PATH = (
    DEFAULT_MODEL_ROOT / "weights" / "litert-740m" / "embeddinggemma-2-740m.litertlm"
)
# Frames, manifest and labels from the user's own library: outside the repo.
FRAMES_EVAL_DIR = DEFAULT_MODEL_ROOT / "frames-eval"

# Retrieval prompt pairs (promptPairId candidates).
# Note the two official sources use "search result" for opposite roles:
#   model card:     query = "task: search result | query: ", document = "title: {title} | text: "
#   LiteRT-LM docs: query = "task: search query | text: ",   document = "task: search result | text: "
RETRIEVAL_PAIRS: dict[str, dict[str, str]] = {
    "modelcard-v1": {
        "query": "task: search result | query: {text}",
        "document": "title: {title} | text: {text}",
    },
    "litert-docs-v1": {
        "query": "task: search query | text: {text}",
        "document": "task: search result | text: {text}",
    },
    # Control: no prefix at all. Used to detect hidden prefixes and to show the
    # cost of omitting the template.
    "no-prefix": {
        "query": "{text}",
        "document": "{text}",
    },
}

# Symmetric profiles: the same template on both sides of a pair.
SYMMETRIC_PROFILES: dict[str, str] = {
    "sym-modelcard": "task: sentence similarity | query: {text}",
    "sym-litert": "task: sentence similarity | text: {text}",
    "sym-clustering": "task: clustering | query: {text}",
    # Comparison only: reuse the retrieval document template symmetrically.
    "sym-document": "title: none | text: {text}",
}

DOCUMENT_TITLE = "none"  # transcript sentence groups have no real title


def fmt(template: str, text: str, title: str = DOCUMENT_TITLE) -> str:
    return template.format(text=text.strip(), title=title)


def load_fixture(name: str) -> dict:
    with open(FIXTURES / name, encoding="utf-8") as f:
        return json.load(f)


def load_all() -> dict:
    return {
        "corpus": load_fixture("corpus.json")["groups"],
        "queries": load_fixture("queries.json")["queries"],
        "symmetric": load_fixture("symmetric-pairs.json")["pairs"],
        "glossary": load_fixture("glossary.json")["pairs"],
    }


def all_model_inputs(data: dict | None = None) -> list[str]:
    """Every formatted string any metric needs, deduplicated, stable order."""
    data = data or load_all()
    out: dict[str, None] = {}
    for pair in RETRIEVAL_PAIRS.values():
        for g in data["corpus"]:
            out[fmt(pair["document"], g["text"])] = None
        for q in data["queries"]:
            out[fmt(pair["query"], q["text"])] = None
    for tpl in SYMMETRIC_PROFILES.values():
        for p in data["symmetric"]:
            out[fmt(tpl, p["a"])] = None
            out[fmt(tpl, p["b"])] = None
        for p in data["glossary"]:
            out[fmt(tpl, p["term"])] = None
            out[fmt(tpl, p["variant"])] = None
    return list(out)


def cache_path(cache_dir: Path, run_id: str) -> Path:
    return Path(cache_dir) / f"{run_id}.npz"
