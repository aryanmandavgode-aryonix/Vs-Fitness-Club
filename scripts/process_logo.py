#!/usr/bin/env python3
"""
VS FITNESS CLUB — brand asset pipeline.

Takes the owner-supplied logo JPG (black field) and produces:
  1. public/images/logo.png      — transparent master (outer black removed
                                   via edge flood-fill; interior blacks kept)
  2. src/app/icon.png            — 256px favicon
  3. src/app/apple-icon.png      — 180px apple touch icon
  4. public/images/og-image.jpg  — 1200x630 social card on ink, red hairline

Also samples the shield red so the site accent token matches the mark.
"""
from collections import deque
from PIL import Image, ImageDraw, ImageFont
import os

SRC = "/home/z/my-project/upload/1000117744.jpg"
OUT_PNG = "/home/z/my-project/public/images/logo.png"
OUT_ICON = "/home/z/my-project/src/app/icon.png"
OUT_APPLE = "/home/z/my-project/src/app/apple-icon.png"
OUT_OG = "/home/z/my-project/public/images/og-image.jpg"

INK = (9, 9, 9)

img = Image.open(SRC).convert("RGB")
w, h = img.size
print(f"source: {w}x{h}")

# ── 1. Edge flood-fill: erase the outer black field, keep interior blacks ──
px = img.load()

def lum(p):
    return 0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2]

def chroma(p):
    return max(p) - min(p)

THR = 46  # luminance below this counts as "field black"

outside = bytearray(w * h)
q = deque()
for x in range(w):
    for y in (0, h - 1):
        if lum(px[x, y]) < THR and not outside[y * w + x]:
            outside[y * w + x] = 1
            q.append((x, y))
for y in range(h):
    for x in (0, w - 1):
        if lum(px[x, y]) < THR and not outside[y * w + x]:
            outside[y * w + x] = 1
            q.append((x, y))

while q:
    x, y = q.popleft()
    for nx, ny in ((x+1,y),(x-1,y),(x,y+1),(x,y-1)):
        if 0 <= nx < w and 0 <= ny < h:
            i = ny * w + nx
            if not outside[i] and lum(px[nx, ny]) < THR:
                outside[i] = 1
                q.append((nx, ny))

# ── 2. Compose RGBA with softened gray edges (anti-halo) ──────────────────
rgba = img.convert("RGBA")
d = rgba.load()
ERODE = 2  # boundary band in pixels

for y in range(h):
    for x in range(w):
        i = y * w + x
        if outside[i]:
            d[x, y] = (0, 0, 0, 0)
        else:
            # near the erased field, fade low-chroma (gray) pixels so no
            # dark JPEG halo frames the mark
            near_field = False
            for dy in range(-ERODE, ERODE + 1):
                for dx in range(-ERODE, ERODE + 1):
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < w and 0 <= ny < h and outside[ny * w + nx]:
                        near_field = True
                        break
                if near_field:
                    break
            if near_field and chroma(px[x, y]) < 42:
                l = lum(px[x, y])
                a = max(0, min(255, int((l - 46) / 70 * 255)))
                r, g, b, _ = d[x, y]
                d[x, y] = (r, g, b, a)

# ── 3. Trim to content bbox ───────────────────────────────────────────────
bbox = rgba.getbbox()
print("content bbox:", bbox)
logo = rgba.crop(bbox)
lw, lh = logo.size
print(f"trimmed: {lw}x{lh}")

os.makedirs(os.path.dirname(OUT_PNG), exist_ok=True)
logo.save(OUT_PNG, "PNG", optimize=True)

# square canvas helpers for icons
def square(size):
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    scale = (size * 0.86) / max(lw, lh)
    nw, nh = int(lw * scale), int(lh * scale)
    inner = logo.resize((nw, nh), Image.LANCZOS)
    canvas.paste(inner, ((size - nw) // 2, (size - nh) // 2), inner)
    return canvas

square(256).save(OUT_ICON, "PNG", optimize=True)
square(180).save(OUT_APPLE, "PNG", optimize=True)

# ── 4. Sample the shield red (median of strongly red pixels) ──────────────
reds = []
src_px = img.load()
for y in range(0, h, 3):
    for x in range(0, w, 3):
        r, g, b = src_px[x, y]
        if r > 110 and (r - g) > 55 and (r - b) > 55 and lum((r, g, b)) > 55:
            reds.append((r, g, b))
reds.sort(key=lambda p: p[0] + p[1] + p[2])
med = reds[len(reds) // 2] if reds else (224, 27, 34)
print(f"red samples: {len(reds)}, median rgb: {med}, hex: #{med[0]:02x}{med[1]:02x}{med[2]:02x}")

# contrast of a candidate accent vs ink (#090909)
def rel_lum(c):
    def lin(v):
        v /= 255
        return v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4
    return 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2])

ink_l = rel_lum(INK)
def contrast(c):
    l = rel_lum(c)
    hi, lo = max(l, ink_l), min(l, ink_l)
    return (hi + 0.05) / (lo + 0.05)

c_med = contrast(med)
print(f"contrast vs ink: {c_med:.2f}")

# if the sampled red is too dark for UI text, lift it while keeping hue
signal = med
if c_med < 4.5:
    r0, g0, b0 = med
    for lift in range(0, 80, 4):
        cand = (min(255, r0 + lift), min(255, int(g0 * 1.02) + lift // 2), min(255, int(b0 * 1.02) + lift // 2))
        if contrast(cand) >= 4.9:
            signal = cand
            break
print(f"SIGNAL: #{signal[0]:02x}{signal[1]:02x}{signal[2]:02x} (contrast {contrast(signal):.2f})")

# ── 5. OG card 1200x630 ───────────────────────────────────────────────────
og = Image.new("RGB", (1200, 630), INK)
draw = ImageDraw.Draw(og)
sig_hex = (signal[0], signal[1], signal[2])

# hairline frame
draw.rectangle([28, 28, 1171, 601], outline=sig_hex, width=1)
draw.rectangle([36, 36, 1163, 593], outline=(38, 38, 38), width=1)

# logo centred-left
target = 340
scale = target / max(logo.size)
nl = logo.resize((int(logo.size[0] * scale), int(logo.size[1] * scale)), Image.LANCZOS)
og.paste(nl, (120, (630 - nl.size[1]) // 2), nl)

# wordmark + meta, letterspaced mono-ish caps
def spaced(draw, pos, text, font, fill, tracking):
    x, y = pos
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tracking
    return x

big = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 64)
small = ImageFont.truetype("/usr/share/fonts/truetype/liberation/LiberationMono-Regular.ttf", 20)

tx = 560
spaced(draw, (tx, 232), "VS FITNESS", big, (244, 242, 237), 6)
spaced(draw, (tx, 318), "C L U B", big, (244, 242, 237), 10)
draw.line([tx, 412, tx + 420, 412], fill=(60, 60, 60), width=1)
spaced(draw, (tx, 432), "STRENGTH & CONDITIONING — NAGPUR", small, (146, 146, 146), 3)
spaced(draw, (tx, 464), "MAHARASHTRA, INDIA", small, (92, 92, 92), 3)

og.save(OUT_OG, "JPEG", quality=90)
print("OG card written.")

# report file sizes
for f in (OUT_PNG, OUT_ICON, OUT_APPLE, OUT_OG):
    print(f"{f}: {os.path.getsize(f) // 1024} KB")
