#!/usr/bin/env python3
"""Sample still frames from local videos for the multimodal G0 (spec v0.1 §6.2, §18.3).

Input: a TSV with one video per line: <category>\t<frames>\t<title>\t<absolute path>.
For each video, takes <frames> evenly spaced timestamps (skipping the first and
last 5%), asks ffmpeg for one frame at each (input seek, long side scaled to
512 px, JPEG) and writes <out>/frames/<id>.jpg plus <out>/manifest.json.

Sources are only read. Nothing is written outside --out; the frames, manifest
and titles describe the user's library and stay out of the repository
(README「外部文件放在哪里」).
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path

SCALE = "scale='if(gt(iw,ih),512,-2)':'if(gt(iw,ih),-2,512)'"


def duration(path: Path) -> float:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)],
        check=True, capture_output=True, text=True,
    ).stdout.strip()
    return float(out)


def grab(path: Path, at: float, dest: Path) -> None:
    subprocess.run(
        ["ffmpeg", "-nostdin", "-v", "error", "-y", "-ss", f"{at:.3f}", "-i", str(path),
         "-frames:v", "1", "-vf", SCALE, "-q:v", "3", str(dest)],
        check=True,
    )


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("videos", type=Path, help="TSV: category, frames, title, path")
    ap.add_argument("--out", type=Path, required=True)
    args = ap.parse_args()

    frames_dir = args.out / "frames"
    frames_dir.mkdir(parents=True, exist_ok=True)
    videos, frames = [], []
    for v, line in enumerate(args.videos.read_text().splitlines()):
        if not line.strip() or line.startswith("#"):
            continue
        category, count, title, src = line.split("\t")
        path = Path(src)
        total = duration(path)
        n = int(count)
        lo, hi = total * 0.05, total * 0.95
        vid = f"v{v:02d}"
        videos.append({"id": vid, "category": category, "title": title, "path": str(path), "duration": round(total, 3)})
        for j in range(n):
            at = lo + (hi - lo) * (j + 0.5) / n
            fid = f"{vid}-f{j:02d}"
            dest = frames_dir / f"{fid}.jpg"
            grab(path, at, dest)
            if not dest.exists() or dest.stat().st_size == 0:
                print(f"no frame: {fid} at {at:.3f}s", file=sys.stderr)
                continue
            frames.append({"id": fid, "video": vid, "t": round(at, 3)})
        print(f"{vid} {category} {n} frames", file=sys.stderr)
    (args.out / "manifest.json").write_text(json.dumps({"videos": videos, "frames": frames}, ensure_ascii=False, indent=1))
    print(json.dumps({"videos": len(videos), "frames": len(frames)}))
    return 0


if __name__ == "__main__":
    sys.exit(main())
