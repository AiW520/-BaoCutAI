# OpenFox download page

Local preview, with no Cloudflare account or frontend dependencies required:

```powershell
node apps/portal/src/openfox/build.mjs
python -m http.server 8788 --bind 127.0.0.1 --directory apps/portal/dist-openfox
```

Open http://127.0.0.1:8788. Stop with Ctrl+C. The built `index.html` also opens
directly from disk, using relative asset paths. The standalone site is separate
from the upstream Cloudflare portal and does not consume upstream release feeds.

The Windows card links directly to the validated installer and portable ZIP in
this fork's `openfox-v3.8.0-preview.1` prerelease. It identifies version 3.8.0 as an
unsigned x64 CPU test build. The macOS card remains unavailable. When updating
downloads, verify the release assets and checksums before changing the page.
Never advertise an upstream BaoCut binary as an OpenFox download.

The static page is deployed to https://aiw520.github.io/-BaoCutAI/ by
`.github/workflows/openfox-pages.yml`. Changes to this directory on `main`
rebuild and deploy the page; the workflow also supports manual deployment.
GitHub Pages must use GitHub Actions as its build source. No custom domain is
configured.

The supplied poster determines the palette and fox imagery. To regenerate icons,
install Pillow and run `python tools/openfox-brand/render.py` from the repository
root. The original poster lives next to that script as `source.png`.
