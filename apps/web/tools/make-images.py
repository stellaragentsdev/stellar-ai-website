#!/usr/bin/env python3
"""Generate favicons and per-page Open Graph images (1200x630 JPEG).

Run from apps/web:  python3 tools/make-images.py
Needs Pillow and the Inter font. Output is committed to public/, so the
normal `npm run build` does not need Python.
"""
import json, os, re, subprocess
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = os.path.join(ROOT, 'public')
SCENES = os.path.join(PUB, 'images', 'scenes')
TEAL = (45, 212, 191)

def find_font():
    out = subprocess.run(['fc-list', ':family=Inter', 'file'], capture_output=True, text=True).stdout
    for line in out.splitlines():
        path = line.split(':')[0].strip()
        if path.endswith('.ttf') and 'Italic' not in path:
            return path
    raise SystemExit('Inter font not found')

FONT = find_font()

def font(size, weight='Bold'):
    f = ImageFont.truetype(FONT, size)
    try:
        f.set_variation_by_name(weight)
    except Exception:
        pass
    return f

ring = Image.open(os.path.join(SCENES, 'hero-ring-1600.webp')).convert('RGBA')
stars = Image.open(os.path.join(SCENES, 'hero-stars.webp')).convert('RGB')
wordmark = Image.open(os.path.join(SCENES, 'hero-wordmark.webp')).convert('RGBA')

# ---- Icons: the ring on black. ----
def icon(size, pad=0.06):
    im = Image.new('RGBA', (size, size), (0, 0, 0, 255))
    r = ring.resize((int(size * (1 + pad * 2.4)),) * 2, Image.LANCZOS)  # ring art has empty margins
    off = (size - r.width) // 2
    im.alpha_composite(r, (off, off))
    return im

big = icon(512)
big.convert('RGB').save(os.path.join(PUB, 'icon-512.png'), optimize=True)
icon(192).convert('RGB').save(os.path.join(PUB, 'icon-192.png'), optimize=True)
icon(180).convert('RGB').save(os.path.join(PUB, 'apple-touch-icon.png'), optimize=True)
icon(32).convert('RGB').save(os.path.join(PUB, 'favicon-32x32.png'), optimize=True)
icon(48).convert('RGB').save(os.path.join(PUB, 'favicon.ico'), sizes=[(16, 16), (32, 32), (48, 48)])

with open(os.path.join(PUB, 'site.webmanifest'), 'w') as f:
    json.dump({
        'name': 'Stellar Agents', 'short_name': 'Stellar Agents',
        'icons': [{'src': '/icon-192.png', 'sizes': '192x192', 'type': 'image/png'},
                  {'src': '/icon-512.png', 'sizes': '512x512', 'type': 'image/png'}],
        'theme_color': '#000000', 'background_color': '#000000', 'display': 'browser', 'start_url': '/',
    }, f, indent=2)
    f.write('\n')

# ---- OG images: one per page in src/seo/site.js. ----
site = open(os.path.join(ROOT, 'src', 'seo', 'site.js')).read()
pages = re.findall(r"ogImage: '(/og/[a-z0-9-]+\.jpg)',\s*ogHeading: '([^']+)'", site)
os.makedirs(os.path.join(PUB, 'og'), exist_ok=True)

def wrap(draw, text, f, width):
    words, lines, cur = text.split(), [], ''
    for w in words:
        t = (cur + ' ' + w).strip()
        if draw.textlength(t, font=f) <= width:
            cur = t
        else:
            lines.append(cur); cur = w
    lines.append(cur)
    return lines

W, H = 1200, 630
for path, heading in pages:
    im = Image.new('RGB', (W, H), (0, 0, 0))
    st = stars.resize((W, int(W * stars.height / stars.width)))
    im.paste(st, (0, (H - st.height) // 2))
    im = im.convert('RGBA')
    r = ring.resize((640, 640), Image.LANCZOS)
    im.alpha_composite(r, (W - 520, (H - 640) // 2))
    shade = Image.new('RGBA', (W, H))
    sd = ImageDraw.Draw(shade)
    for x in range(W):  # left-to-right fade so text stays readable over the ring
        a = int(235 * max(0.0, min(1.0, (820 - x) / 420)))
        sd.line([(x, 0), (x, H)], fill=(0, 0, 0, a))
    im.alpha_composite(shade)
    wm = wordmark.resize((360, int(360 * wordmark.height / wordmark.width)), Image.LANCZOS)
    im.alpha_composite(wm, (72, 70))
    d = ImageDraw.Draw(im)
    size = 66
    while True:
        f = font(size)
        lines = wrap(d, heading, f, 640)
        if len(lines) <= 3 or size <= 44:
            break
        size -= 4
    y = 250 if len(lines) < 3 else 220
    for ln in lines:
        d.text((72, y), ln, font=f, fill=(255, 255, 255))
        y += int(size * 1.15)
    d.rectangle([72, H - 92, 72 + 48, H - 89], fill=TEAL)
    d.text((72, H - 76), 'stellaragents.in  ·  Chennai, India', font=font(24, 'Medium'), fill=(190, 190, 190))
    out = os.path.join(PUB, path.lstrip('/'))
    im.convert('RGB').save(out, 'JPEG', quality=82, optimize=True, progressive=True)
    print(out, os.path.getsize(out))
