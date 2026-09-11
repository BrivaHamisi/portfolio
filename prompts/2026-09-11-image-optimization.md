# Image weight optimization (WebP)

## Goal

The masonry/mockup JPGs and PNGs (`mockup_*.jpg`, `UI_*.jpg/png`, `sw_*.jpg`, etc.) are the heaviest assets on `/work/designs` and `/work/photography`. Converting to WebP cuts their weight substantially with no visible quality loss, speeding up those pages.

## Files touched

- `public/images/*.webp` — new WebP versions generated from the existing JPG/PNG project images (originals left in place, unreferenced).
- `src/data/work.js` — update image path references to the new `.webp` files.

## Approach

- Convert with `cwebp` at quality ~82 (visually lossless for photographic/mockup content).
- Reference `.webp` directly with no `<picture>`/fallback — WebP support is universal in every browser this site targets, and the project's own conventions favor minimal markup over defensive complexity that isn't needed.
- Leave the original JPG/PNG files in `public/images/` untouched in case they're needed later; just stop referencing them from `work.js`.
- Skip the hero/about/testimonial single images for this pass (they're already using `loading="lazy"`/`fetchpriority` from the earlier lazy-loading pass) — the real weight problem is the multi-image masonry sets, not one-off images.

## Verification

- `npm run serve`, confirm `/work/designs` and `/work/photography` masonry images render correctly.
- Compare file sizes before/after (`ls -la`) to confirm real savings.
- `npm run build` succeeds.
