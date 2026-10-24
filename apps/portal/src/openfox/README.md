# OpenFox download page

Local preview, with no Cloudflare account or frontend dependencies required:

```powershell
node apps/portal/src/openfox/build.mjs
python -m http.server 8788 --bind 127.0.0.1 --directory apps/portal/dist-openfox
```

Open http://127.0.0.1:8788. Stop with Ctrl+C. The built `index.html` also opens
directly from disk, using relative asset paths. The standalone site is separate
from the upstream Cloudflare portal and does not consume upstream release feeds.

The page intentionally says packages are pending and links to this fork's
Releases and Windows workflow. A workflow artifact is a test candidate, not a
published release. Update download status and URLs only after validating and
publishing an OpenFox package. Never advertise an upstream BaoCut binary as an
OpenFox download. No deploy has been performed and no domain ownership is assumed.

The supplied poster determines the palette and fox imagery. To regenerate icons,
install Pillow and run `python tools/openfox-brand/render.py` from the repository
root. The original poster lives next to that script as `source.png`.
