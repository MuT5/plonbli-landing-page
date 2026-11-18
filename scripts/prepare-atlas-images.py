"""Export the four garden watercolors without cropping. Requires Pillow with AVIF support.

Usage: python scripts/prepare-atlas-images.py MORNING.png ENTRY.png HARVEST.png MEETING.png FULL_LOGO.png
"""

import argparse
from pathlib import Path

from PIL import Image


def main():
    args = argparse.ArgumentParser(description=__doc__)
    scenes = ("morning", "entry", "harvest", "meeting")
    for name in (*scenes, "logo"):
        args.add_argument(name, type=Path)
    inputs = args.parse_args()
    destination = Path(__file__).resolve().parents[1] / "public" / "landing"
    if len({getattr(inputs, name).resolve() for name in scenes}) != len(scenes):
        args.error("Supply four separate illustrations, one per scene.")
    for path in vars(inputs).values():
        if not path.is_file():
            args.error(f"Source does not exist: {path}")

    def export(image, name, widths):
        for width in widths:
            size = (width, round(width * image.height / image.width))
            resized = image.resize(size, Image.Resampling.LANCZOS)
            for ext, options in (("webp", {"quality": 82, "method": 6}), ("avif", {"quality": 68, "speed": 6})):
                resized.save(destination / f"atlas-garden-{name}-{width}.{ext}", **options)

    with Image.open(inputs.morning) as source:
        morning = source.convert("RGB")
    export(morning, "morning", (768, 1280, 1536))
    # Portrait describes the viewport, not a crop: retain every worker.
    export(morning, "morning-portrait", (640, 960))
    for scene in scenes[1:]:
        with Image.open(getattr(inputs, scene)) as source:
            export(source.convert("RGB"), scene, (640, 960))

    with Image.open(inputs.logo) as original:
        logo = original.convert("RGBA")
    logo = logo.crop(logo.getchannel("A").getbbox())
    logo.thumbnail((262, 360), Image.Resampling.LANCZOS)
    card = Image.new("RGB", (1200, 630), "#F5F6F2")
    card.paste(logo, ((330 - logo.width) // 2, (630 - logo.height) // 2), logo)
    morning.thumbnail((840, 582), Image.Resampling.LANCZOS)
    card.paste(morning, (330 + (840 - morning.width) // 2, (630 - morning.height) // 2))
    card.save(destination / "og-od-swoich.jpg", quality=87, optimize=True)


if __name__ == "__main__":
    main()
