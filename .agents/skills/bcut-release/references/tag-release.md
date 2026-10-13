# Tag release (default)

An ordinary request to release/publish BaoCut selects this workflow. Prepare the
version and frozen commit, then create/push the release tag to let Actions handle
packaging, signing, notarization, publication and update feeds. Do not build or
upload archives locally first, or manually dispatch platform publishers by default.
Follow current-task push authorization; source/tag pushes are external mutations.

## Prepare the source and tag

1. Inspect git status and actual GitHub releases/tags plus all platform appcasts.
   Choose the App version and a build higher than every current platform feed;
   never reuse an existing release identity or move an existing tag.
2. Update App/root versions and lockfile only if needed. The tag must be exactly
   `baocut-v<MAJOR>.<MINOR>.<PATCH>-build.<BUILD>`, e.g. `baocut-v3.0.1-build.61`:
   stable semantic version, no leading zeros, positive safe-integer build. Version
   must match root/desktop package.json and lockfile and must not go backwards.
3. Run the checks appropriate to the source change, review its diff, commit only
   task-owned changes and record full source SHA. Prepare and reconcile the full
   changelog using [release notes](release-notes.md) before pushing the tag.
   Local native toolchains and local App packaging are not prerequisites for
   this route; Actions builds them.
4. Ensure that frozen source is on remote `main` and contains the release workflow.
   Push needed source commits only when authorized. The tag must point to this
   exact commit, not whichever HEAD a later concurrent change produces. Check
   required GitHub Environment configuration without retrieving Secret values;
   Mac credential details are in [signing/backups](signing-backups.md).
5. Present the selected version/build, tag and source SHA before any required
   push approval. Then create an annotated tag and push that tag only, using the
   operator's Git credentials so its push event triggers GitHub Actions:

```bash
git tag -a "$release_tag" "$source_commit" -m "BaoCut $version build $build"
git push origin "$release_tag"
```

`release_tag`, `source_commit`, `version` and `build` above are the verified values
selected for this task. A request only to update this skill/configuration must not
create a release tag or trigger a release.

## Follow Actions to completion

Find the `desktop-release.yml` push run whose tag and full source SHA match this
release. Mac arm64 and Windows x64 CPU/CUDA/Vulkan build in parallel. The Mac
publisher depends only on the plan and Mac native job: publish its verified files
immediately, without waiting for Windows or CUDA. The Windows publisher waits for
its selected native jobs and the public Mac Release, then appends to that same
Release with public read-back before updating only its feeds. Preserve the previous
Latest until final completion, existing assets and unrelated feeds.

After the Mac publisher succeeds, merge the prepared full changelog into its Release
body and read it back following [release notes](release-notes.md). Verify the two
Mac links at baocut.com following [download links](download-links.md); Windows links
may still serve the prior release. Report Mac publication now, with the Release/run
URLs, full source SHA, actual checks and explicitly pending Windows variants. Do
not hold the Mac delivery until CUDA finishes or call the all-platform release
complete. When the user requests later completion, use an authorized follow-up
monitor to check remaining publishers and notify on completion, failure or required
action; stay quiet while their state is unchanged.

After remaining publishers finish, read back the existing Release, preserve its
changelog while incorporating platform notes, and verify each new asset/feed and
download link. Complete the shared [Latest step](../SKILL.md#complete-public-release)
only after all selected platforms pass. No README or site deployment is needed.
UI/export, real model/GPU inference and paid Agent calls are not automated and
must not be described as passed.

Already-running workflows keep the dependency graph from their frozen commit.
If the user requests Mac-first publication for such a run, reuse its successful
Mac job's six-file artifact on a native Apple Silicon publisher with the exact
candidate run, source SHA and signer. Use an isolated checkout and runner directory;
`macos-release.mjs publish` checks provenance, immutable bytes, public native
read-back and the feed. Do not rebuild the package, move the tag or run competing
publishers; the original publisher can later reuse identical assets. Keep the same
Release and continue its Windows publisher. This is staged publication of the
validated Actions candidate, not a new build or local packaging fallback.

If a job fails, diagnose it and fix within authorized scope, then rerun failed jobs
with their validated candidates where possible. Never silently switch to the
traditional route, move/delete the tag, overwrite assets or rebuild different bytes
under an already published build. Explain any remaining blocker; use a traditional
recovery workflow only when the user explicitly requests it.
