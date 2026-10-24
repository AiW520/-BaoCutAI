"""Derive OpenFox brand assets from the supplied poster; no image generation."""
from pathlib import Path
import base64
from PIL import Image, ImageDraw, ImageOps

ROOT = Path(__file__).resolve().parents[2]
SOURCE = Path(__file__).with_name('source.png')
poster = Image.open(SOURCE).convert('RGB')
public = ROOT / 'apps/portal/src/openfox/assets'
public.mkdir(parents=True, exist_ok=True)
poster.save(public / 'brand-poster.webp', quality=87)
poster.crop((0, 480, 1024, 1536)).save(public / 'hero-art.webp', quality=89)
# Use the separately supplied logo; retain its dark background and exclude text.
logo = Image.open(Path(__file__).with_name('logo-source.png')).convert('RGB')
icon = ImageOps.pad(logo.crop((200, 110, 1055, 920)), (1024, 1024), color='#101320', method=Image.Resampling.LANCZOS)
desktop = ROOT / 'apps/desktop/build'
icon.save(desktop / 'icon.png')
icon.save(desktop / 'icon.ico', sizes=[(s, s) for s in (16, 20, 24, 32, 40, 48, 64, 128, 256)])
icon.save(desktop / 'icon.icns')
dev = icon.copy()
ImageDraw.Draw(dev).rounded_rectangle((650, 840, 1000, 1000), radius=35, fill='#18212e')
ImageDraw.Draw(dev).text((700, 875), 'DEV', fill='white', font_size=80)
dev.save(desktop / 'icon-dev.png')
icon.resize((128, 128)).save(public / 'icon.png')
icon.resize((32, 32)).save(public / 'favicon.png')
ui_asset = ROOT / 'packages/ui/src/components/openfox-icon.png'
icon.resize((128, 128)).save(ui_asset)
# The prototype uses the same pixels wrapped in its existing SVG entry point.
data = base64.b64encode(ui_asset.read_bytes()).decode('ascii')
(ROOT / 'designs/baocut/assets/app-icon.svg').write_text(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">'
    f'<image width="128" height="128" href="data:image/png;base64,{data}"/></svg>\n', encoding='utf-8')
print('OpenFox icons and poster assets rendered from the supplied source.')
