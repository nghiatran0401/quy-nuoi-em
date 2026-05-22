#!/usr/bin/env python3
"""Strip near-black backgrounds from Nuôi Em logo PNGs for light headers/footers."""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
LOGO_DIR = ROOT / "public" / "logo"

# Pixels darker than this become transparent (tune for anti-aliased edges)
THRESHOLD = 48


def make_transparent(src: Path, dest: Path) -> None:
    img = Image.open(src).convert("RGBA")
    pixels = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if r <= THRESHOLD and g <= THRESHOLD and b <= THRESHOLD:
                pixels[x, y] = (0, 0, 0, 0)
    img.save(dest, optimize=True)
    print(f"Wrote {dest.relative_to(ROOT)} ({w}x{h})")


def main() -> None:
    pairs = [
        (LOGO_DIR / "logo-ne.png", LOGO_DIR / "logo-ne-transparent.png"),
        (LOGO_DIR / "logo-ne-asnr.png", LOGO_DIR / "logo-ne-asnr-transparent.png"),
    ]
    for src, dest in pairs:
        if not src.exists():
            raise SystemExit(f"Missing source: {src}")
        make_transparent(src, dest)


if __name__ == "__main__":
    main()
