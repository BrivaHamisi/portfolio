# Organize public/images/ into category folders

## Goal

`public/images/` has grown into a flat pile of project mockups, UI screenshots, brand assets, and headshots. `blogs/` and `photography/` already use a per-category subfolder — extend that same pattern to the rest so each work category has its own home and can hold more projects/images later without re-litigating file naming.

## Files touched

- `public/images/*` — moved into new subfolders via `git mv` (history preserved), both `.jpg`/`.png` originals and their `.webp` versions travel together.
- `src/data/work.js`, `src/components/navbar.vue`, `src/components/sections/AboutMeSection.vue`, `src/components/sections/LandingPlatform.vue`, `src/components/sections/Testimonial.vue`, `public/index.html` — every path reference updated to match.

## Approach

New structure (mirrors the existing `blogs/`/`photography/` category-folder pattern — not per-project subfolders, since a category folder already scales to more images/projects and that's what the existing precedent does):

- `public/images/development/` — `sw_*` (Stanbest website screenshots)
- `public/images/designs/` — `mockup_*` (Stancap branding mockups)
- `public/images/uiux/` — `UI_*`, `UIDesign*`, `MobileUI.*`, `bg_main.*`
- `public/images/testimonials/` — the three recommender headshots
- `public/images/brand/` — logo, hero banner, profile photo, OG image, and the source portrait
- `public/images/photography/` — already organized, untouched
- `public/images/blogs/` — already organized, untouched
- Left at the root, untouched: `background.jpg`, `profile_icon_default.png` — grepped and found unreferenced anywhere in `src/`; not moved or deleted since removing "unused" assets that aren't mine to judge could discard intentional leftovers (same caution AGENTS.md already documents for the blogs data). Flagged for the user to confirm if these can go.

Every reference is a verified exact match from a full-repo grep of `/images/` paths before moving anything, so nothing is renamed blind.

## Verification

- `grep -rn "/images/" src/ public/index.html` after the move — every hit resolves to a real file at its new path.
- `npm run serve`, check the homepage (logo, hero, about photo, testimonials) and all three `/work/*` pages render their images correctly.
- `npm run build` succeeds.
