"""Publish an immutable CPU prerelease from a validated Windows workflow run."""

import hashlib
import json
import os
from pathlib import Path
import re
import subprocess
import tempfile


def gh(*args):
    return subprocess.check_output(["gh", *args], text=True).strip()


def require(condition, message):
    if not condition:
        raise RuntimeError(message)


def main():
    repo = os.environ["GH_REPO"]
    run_id = os.environ["PREVIEW_RUN_ID"]
    tag = os.environ["PREVIEW_TAG"]
    require(re.fullmatch(r"[0-9]+", run_id), "Invalid run ID")
    match = re.fullmatch(r"openfox-v(\d+\.\d+\.\d+)-preview\.(\d+)", tag)
    require(match, "Invalid preview tag")
    run = json.loads(gh("api", f"repos/{repo}/actions/runs/{run_id}"))
    require(run["conclusion"] == "success", "Build run did not succeed")
    require(run["path"] == ".github/workflows/desktop-windows.yml", "Unexpected build workflow")
    require(run["head_branch"] == "main" and run["event"] == "workflow_dispatch", "Expected a main branch manual build")
    require(run["head_repository"]["full_name"].lower() == repo.lower(), "Unexpected source repository")
    jobs = json.loads(gh("api", f"repos/{repo}/actions/runs/{run_id}/jobs?per_page=100"))["jobs"]
    cpu = next(job for job in jobs if job["name"] == "Package Windows x64 (cpu)")
    required_steps = {
        "Self-check the unpacked app",
        "Install silently, update in place and self-check the installed app",
        "Self-check the zip",
        "Upload the packages",
    }
    passed = {step["name"] for step in cpu["steps"] if step["conclusion"] == "success"}
    require(required_steps <= passed, "Required package checks were skipped or failed")
    with tempfile.TemporaryDirectory(prefix="openfox-preview-") as directory:
        folder = Path(directory)
        gh("run", "download", run_id, "--name", "openfox-desktop-windows-x64-cpu", "--dir", directory)
        reports = list(folder.glob("*-release.json"))
        require(len(reports) == 1, "Expected one release report")
        report = json.loads(reports[0].read_text(encoding="utf-8-sig"))
        require(report["sourceCommit"] == run["head_sha"] == report["workflowCommit"], "Source commit mismatch")
        require(report["product"] == "OpenFox" and report["appId"] == "vip.openfox.app", "Unexpected product")
        require(report["version"] == match[1] and report["variant"] == "cpu", "Version or variant mismatch")
        require(report["target"] == "x86_64-pc-windows-msvc" and report["unsigned"] is True, "Unexpected target or signing status")
        files = [reports[0]]
        checksums = []
        for key, suffix in [("installer", "-setup.exe"), ("portable", ".zip")]:
            item = report[key]
            name = item["file"]
            require(Path(name).name == name and name.startswith("OpenFox-") and name.endswith(suffix), "Unexpected asset name")
            file = folder / name
            require(file.stat().st_size == item["size"], "Asset size mismatch")
            with file.open("rb") as stream:
                digest = hashlib.file_digest(stream, "sha256").hexdigest()
            require(digest == item["sha256"], "Asset checksum mismatch")
            checksums.append(f"{digest}  {name}")
            files.append(file)
        sums = folder / "SHA256SUMS.txt"
        sums.write_text("\n".join(checksums) + "\n", encoding="utf-8")
        files.append(sums)
        notes = folder / "release-notes.md"
        notes.write_text(os.environ["PREVIEW_NOTES"], encoding="utf-8")
        # Creating a new draft fails for existing releases; never replace published assets.
        gh("release", "create", tag, "--target", run["head_sha"], "--draft", "--prerelease",
           "--title", f"OpenFox {match[1]} Preview {match[2]}", "--notes-file", str(notes))
        gh("release", "upload", tag, *(str(file) for file in files))
        print(gh("release", "edit", tag, "--draft=false", "--prerelease", "--latest=false"))
        print("Verified source, installation checks, asset sizes and SHA-256; preview published.")


if __name__ == "__main__":
    main()
