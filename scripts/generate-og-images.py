#!/usr/bin/env python3
"""Generate Open Graph share images (1200×630) for social previews (Zalo, Facebook, X)."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public/og"
HERO = ROOT / "public/hero-2.jpg"
LOGO = ROOT / "public/logo.webp"
FONT_BOLD = Path("/System/Library/Fonts/Supplemental/Arial Bold.ttf")
FONT_REGULAR = Path("/System/Library/Fonts/Supplemental/Arial.ttf")

OG_WIDTH = 1200
OG_HEIGHT = 630


def cover_crop(source: Image.Image, width: int, height: int) -> Image.Image:
    return ImageOps.fit(source, (width, height), method=Image.Resampling.LANCZOS, centering=(0.5, 0.45))


def load_font(path: Path, size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    if path.exists():
        return ImageFont.truetype(str(path), size=size)
    return ImageFont.load_default()


def draw_bottom_gradient(canvas: Image.Image) -> None:
    overlay = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    top = int(OG_HEIGHT * 0.42)
    for y in range(top, OG_HEIGHT):
        progress = (y - top) / (OG_HEIGHT - top)
        alpha = int(210 * progress**1.35)
        draw.line([(0, y), (OG_WIDTH, y)], fill=(18, 24, 38, alpha))
    canvas.alpha_composite(overlay)


def paste_logo(canvas: Image.Image) -> tuple[int, int, int, int]:
    if not LOGO.exists():
        return (72, OG_HEIGHT - 170, 72 + 96, OG_HEIGHT - 74)

    logo = Image.open(LOGO).convert("RGBA")
    logo_size = 96
    logo = logo.resize((logo_size, logo_size), Image.Resampling.LANCZOS)
    x, y = 72, OG_HEIGHT - 170
    canvas.alpha_composite(logo, (x, y))
    return (x, y, x + logo_size, y + logo_size)


def render_default() -> Image.Image:
    if not HERO.exists():
        raise SystemExit(f"Missing hero image: {HERO}")

    canvas = cover_crop(Image.open(HERO).convert("RGB"), OG_WIDTH, OG_HEIGHT).convert("RGBA")
    draw_bottom_gradient(canvas)
    draw = ImageDraw.Draw(canvas)
    logo_box = paste_logo(canvas)

    title_font = load_font(FONT_BOLD, 56)
    tagline_font = load_font(FONT_REGULAR, 30)
    domain_font = load_font(FONT_REGULAR, 24)

    text_x = logo_box[2] + 24
    title_y = logo_box[1] + 4
    draw.text((text_x, title_y), "Quỹ Nuôi Em", font=title_font, fill=(255, 252, 248, 255))
    draw.text(
        (text_x, title_y + 62),
        "Nuôi cơm trưa · Giúp trẻ tới trường",
        font=tagline_font,
        fill=(255, 236, 224, 255),
    )
    draw.text((text_x, title_y + 108), "quynuoiem.com", font=domain_font, fill=(255, 200, 170, 255))

    accent = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    accent_draw = ImageDraw.Draw(accent)
    accent_draw.rectangle([(0, OG_HEIGHT - 8), (OG_WIDTH, OG_HEIGHT)], fill=(240, 120, 74, 255))
    canvas.alpha_composite(accent)

    return canvas.convert("RGB")


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    output = OUT_DIR / "default.jpg"
    image = render_default()
    image.save(output, format="JPEG", quality=88, optimize=True, progressive=True)
    print(f"Wrote {output.relative_to(ROOT)} ({OG_WIDTH}x{OG_HEIGHT})")


if __name__ == "__main__":
    main()
