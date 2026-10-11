# Download links

Run this after every public release or platform continuation, once the selected
publishers succeeded, their update feeds are on remote `main` and the public
downloads were read back. Skip it for local-only candidates and for variants that
failed or stayed unpublished.

## Source of truth

The four update feeds in `apps/desktop/releases/` on remote `main` decide what
each platform links to: `appcast-aarch64-apple-darwin.json` and
`appcast-x86_64-pc-windows-msvc{,-cuda,-vulkan}.json`. Each platform row shows
the version and build of its own feed. A variant whose feed did not advance keeps
its previous links; never link files that were not published and verified.

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

The official site (`apps/portal`, Worker `baocut-portal`) reads the same feeds
from raw.githubusercontent.com at request time. A release needs no site change or
redeploy. Its version label and `/download/<id>` redirects follow the feeds within
about 10 minutes: up to 5 minutes of Worker cache plus 5 minutes of edge cache.
[apps/portal/README.md](../../../../apps/portal/README.md) describes how it
resolves downloads.

After the feed commit is on `main`, verify:

```bash
curl -s https://baocut.com/api/release
curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' https://baocut.com/download/mac-dmg
```

- `/api/release` must report the new version and build.
- Every published download id must redirect to this release's file and return 200:
  `mac-dmg`, `mac-zip`, `win-setup`, `win-zip`, `win-cuda-setup`, `win-cuda-zip`,
  `win-vulkan-setup`, `win-vulkan-zip`.

If the site is still stale after 10 minutes, the Worker is serving the snapshot
from its last deploy. That happens when a feed is unreachable or fails
`apps/portal/src/release.ts` validation: repository, tag and file names must match
the version and build. Fix the cause.

Running `npm run deploy -w @baocut/portal` only refreshes that fallback snapshot.
It is a production deploy, so do it only when the current task authorizes it.
Never touch the unrelated `baocut-site` Worker, which serves baocut.app.

## Report

Include:

- The README commit hash and whether it was pushed.
- The links that were checked.
- The version shown by `https://baocut.com/api/release`.
- Any platform that intentionally kept older links.
