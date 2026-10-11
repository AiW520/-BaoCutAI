# Download links

Run this after every public release or platform continuation, once the selected
publishers succeeded, their update feeds are on remote `main` and the public
downloads were read back. Skip it for local-only candidates and for variants that
failed or stayed unpublished.

## Source of truth

The four update feeds in `apps/desktop/releases/` on remote `main` decide what
each README platform row links to: `appcast-aarch64-apple-darwin.json` and
`appcast-x86_64-pc-windows-msvc{,-cuda,-vulkan}.json`. Each platform row shows
the version and build of its own feed. A variant whose feed did not advance keeps
its previous links; never link files that were not published and verified.
baocut.com resolves its links from GitHub Releases instead (see below).

## README

Update the download sections of `README.md` ("Download and install") and
`README.zh-Hans.md` (「下载与安装」) together:

- The intro sentence: version, build and the release tag link
  (`https://github.com/JimLiu/baocut/releases/tag/<tag>`). If platforms end up on
  different builds, name the newest one there.
- Each platform row's installer and ZIP links:
  `https://github.com/JimLiu/baocut/releases/download/<tag>/BaoCut-<VERSION>-build.<BUILD><suffix>`.

| Row | Installer suffix | ZIP suffix |
| --- | --- | --- |
| macOS · Apple Silicon | `-aarch64-apple-darwin.dmg` | `-aarch64-apple-darwin.zip` |
| Windows x64 · CPU | `-win-x64-setup.exe` | `-win-x64.zip` |
| Windows x64 · CUDA | `-win-x64-cuda-setup.exe` | `-win-x64-cuda.zip` |
| Windows x64 · Vulkan | `-win-x64-vulkan-setup.exe` | `-win-x64-vulkan.zip` |

Change only the version-bearing text and URLs. Keep the row descriptions unless
the release changed platform requirements, and then change both languages.

Before committing:

- Request every changed link and expect HTTP 200 after redirects.
- Grep both READMEs for the previous tag. Only rows that intentionally stay on it
  may remain.

Then rebase onto the latest `main`, because the publishers push feed commits there.
Commit only the two READMEs as `docs(release): refresh <VERSION> build <BUILD> download links`.
Push follows the current task's push authorization.

## baocut.com

The official site (`apps/portal`, Worker `baocut-portal`) reads GitHub Releases
itself, so a release needs no site change or redeploy. For each platform it links
the newest `baocut-v<VERSION>-build.<BUILD>` release whose installer and ZIP are
both uploaded, ignoring GitHub's Latest flag. Its version label and
`/download/<id>` redirects follow within about 5 minutes. The Worker refreshes in
the background, so the first request after that may still get the old answer.
[apps/portal/README.md](../../../../apps/portal/README.md) describes how it
resolves downloads.

After the publishers finish, verify:

```bash
curl -s https://baocut.com/api/release
curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' https://baocut.com/download/mac-dmg
```

- `/api/release` must report the new version and build.
- Every published download id must redirect to this release's file and return 200:
  `mac-dmg`, `mac-zip`, `win-setup`, `win-zip`, `win-cuda-setup`, `win-cuda-zip`,
  `win-vulkan-setup`, `win-vulkan-zip`.

If the site is still stale after 10 minutes, request it twice more. Still stale
means the Worker cannot use the new release, so it keeps its last answer or the
snapshot from its last deploy. Causes:

- The GitHub API is unreachable or rate-limited. Without the optional
  `GITHUB_TOKEN` secret, the limit is 60 requests per hour per egress IP.
- The release fails `apps/portal/src/release.ts` validation. It must be published,
  not a prerelease. The tag and asset names must match the version and build.
- An asset is not in the uploaded state.

Fix the cause.

Running `npm run deploy -w @baocut/portal` only refreshes that fallback snapshot
from the feeds in `apps/desktop/releases/`. It is a production deploy, so do it
only when the current task authorizes it. Setting the secret is a production
change too.
Never touch the unrelated `baocut-site` Worker, which serves baocut.app.

## Report

Include:

- The README commit hash and whether it was pushed.
- The links that were checked.
- The version shown by `https://baocut.com/api/release`.
- Any platform that intentionally kept older links.
