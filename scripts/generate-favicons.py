#!/usr/bin/env python3
"""Generate app favicons from public/logo/logo-ne-transparent.png."""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public/logo/logo-ne-transparent.png"


def square_icon(im: Image.Image) -> Image.Image:
    bbox = im.getbbox()
    cropped = im.crop(bbox) if bbox else im
    w, h = cropped.size
    side = max(w, h)
    square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    square.paste(cropped, ((side - w) // 2, (side - h) // 2))
    return square


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"Missing {SRC}. Run: npm run logos:transparent")

    base = square_icon(Image.open(SRC).convert("RGBA"))

    outputs = [
        (32, ROOT / "src/app/icon.png"),
        (180, ROOT / "src/app/apple-icon.png"),
        (192, ROOT / "public/icon-192.png"),
        (512, ROOT / "public/icon-512.png"),
    ]
    for size, path in outputs:
        base.resize((size, size), Image.Resampling.LANCZOS).save(path, optimize=True)
        print(f"Wrote {path.relative_to(ROOT)}")

    ico_sizes = [16, 32, 48]
    frames = [base.resize((s, s), Image.Resampling.LANCZOS) for s in ico_sizes]
    ico_path = ROOT / "src/app/favicon.ico"
    frames[0].save(
        ico_path,
        format="ICO",
        sizes=[(s, s) for s in ico_sizes],
        append_images=frames[1:],
    )
    print(f"Wrote {ico_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
