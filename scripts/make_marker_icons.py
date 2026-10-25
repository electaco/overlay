"""Generates the built-in marker icons in public/icons/markers/.

The overlay tints marker icons with the pack's colour by multiplying, so the shapes are light
grey with soft shading and a dark outline: the light parts take on the colour, the outline keeps
them readable on any background. 128x128, anchored at the bottom centre (the marker's position),
like the original pin (public/marker1.webp).

    python scripts/make_marker_icons.py
"""
import math
import os

from PIL import Image, ImageDraw, ImageFilter

SIZE = 128
S = 4  # supersampling factor
W = SIZE * S
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "icons", "markers")


def star(cx, cy, r_out, r_in, points=5):
    pts = []
    for i in range(points * 2):
        r = r_out if i % 2 == 0 else r_in
        a = -math.pi / 2 + i * math.pi / points
        pts.append((cx + r * math.cos(a), cy + r * math.sin(a)))
    return pts


def shape_mask(draw_fn):
    mask = Image.new("L", (W, W), 0)
    draw_fn(ImageDraw.Draw(mask))
    return mask


def bubble(d, x0, y0, x1, y1):
    # Rounded speech bubble with a tail pointing down to the marker position.
    d.rounded_rectangle((x0, y0, x1, y1), radius=(x1 - x0) * 0.28, fill=255)
    cx = (x0 + x1) / 2
    d.polygon([(cx - 0.09 * W, y1 - 4), (cx + 0.09 * W, y1 - 4), (cx, W - 2)], fill=255)


SHAPES = {
    "circle": lambda d: d.ellipse((0.2 * W, 0.34 * W, 0.8 * W, 0.94 * W), fill=255),
    "diamond": lambda d: d.polygon([(0.5 * W, 0.22 * W), (0.84 * W, 0.6 * W), (0.5 * W, 0.98 * W), (0.16 * W, 0.6 * W)], fill=255),
    "star": lambda d: d.polygon(star(0.5 * W, 0.62 * W, 0.37 * W, 0.16 * W), fill=255),
    "flag": lambda d: (d.rectangle((0.24 * W, 0.12 * W, 0.31 * W, 0.98 * W), fill=255),
                       d.polygon([(0.31 * W, 0.14 * W), (0.84 * W, 0.3 * W), (0.31 * W, 0.5 * W)], fill=255)),
    "exclamation": lambda d: bubble(d, 0.2 * W, 0.12 * W, 0.8 * W, 0.78 * W),
    "question": lambda d: bubble(d, 0.2 * W, 0.12 * W, 0.8 * W, 0.78 * W),
    "arrow": lambda d: (d.rectangle((0.39 * W, 0.1 * W, 0.61 * W, 0.56 * W), fill=255),
                        d.polygon([(0.16 * W, 0.5 * W), (0.84 * W, 0.5 * W), (0.5 * W, 0.98 * W)], fill=255)),
    "cross": lambda d: (d.polygon([(0.24 * W, 0.34 * W), (0.34 * W, 0.24 * W), (0.84 * W, 0.86 * W), (0.74 * W, 0.96 * W)], fill=255),
                        d.polygon([(0.74 * W, 0.24 * W), (0.84 * W, 0.34 * W), (0.34 * W, 0.96 * W), (0.24 * W, 0.86 * W)], fill=255)),
}

# Symbols cut into the bubble shapes, drawn in the outline colour.
GLYPHS = {
    "exclamation": lambda d: (d.rounded_rectangle((0.45 * W, 0.22 * W, 0.55 * W, 0.56 * W), radius=0.04 * W, fill=255),
                              d.ellipse((0.445 * W, 0.6 * W, 0.555 * W, 0.71 * W), fill=255)),
    "question": lambda d: (d.arc((0.33 * W, 0.2 * W, 0.67 * W, 0.5 * W), start=180, end=60, fill=255, width=int(0.085 * W)),
                           d.line([(0.6 * W, 0.47 * W), (0.5 * W, 0.53 * W), (0.5 * W, 0.58 * W)], fill=255, width=int(0.085 * W)),
                           d.ellipse((0.445 * W, 0.61 * W, 0.555 * W, 0.71 * W), fill=255)),
}


def render(name):
    mask = shape_mask(SHAPES[name])
    outline_w = int(0.035 * W)
    grown = mask.filter(ImageFilter.MaxFilter(outline_w * 2 + 1))

    # Light grey fill with a vertical gradient and a soft highlight, like the original pin.
    fill = Image.new("RGBA", (W, W))
    fd = ImageDraw.Draw(fill)
    for y in range(W):
        v = int(250 - 70 * (y / W))
        fd.line([(0, y), (W, y)], fill=(v, v, v + 2, 255))
    highlight = Image.new("L", (W, W), 0)
    ImageDraw.Draw(highlight).ellipse((0.25 * W, 0.18 * W, 0.6 * W, 0.5 * W), fill=70)
    highlight = highlight.filter(ImageFilter.GaussianBlur(0.06 * W))
    fill = Image.composite(Image.new("RGBA", (W, W), (255, 255, 255, 255)), fill, highlight)

    img = Image.new("RGBA", (W, W), (0, 0, 0, 0))
    shadow = grown.filter(ImageFilter.GaussianBlur(0.03 * W)).point(lambda a: a * 0.45)
    shadow_layer = Image.new("RGBA", (W, W), (0, 0, 0, 255))
    shifted = Image.new("L", (W, W), 0)  # shift without wrapping around
    shifted.paste(shadow, (int(0.015 * W), int(0.015 * W)))
    shadow_layer.putalpha(shifted)
    img = Image.alpha_composite(img, shadow_layer)
    outline = Image.new("RGBA", (W, W), (24, 24, 28, 255))
    outline.putalpha(grown)
    img = Image.alpha_composite(img, outline)
    body = fill.copy()
    body.putalpha(mask)
    img = Image.alpha_composite(img, body)

    if name in GLYPHS:
        glyph = shape_mask(GLYPHS[name])
        dark = Image.new("RGBA", (W, W), (24, 24, 28, 255))
        dark.putalpha(glyph)
        img = Image.alpha_composite(img, dark)

    return img.resize((SIZE, SIZE), Image.LANCZOS)


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for name in SHAPES:
        render(name).save(os.path.join(OUT, name + ".webp"), "WEBP", lossless=True)
        print("wrote", name + ".webp")
