# Photography tab demo content

## Goal

`photographyProjects` is intentionally `[]` (see AGENTS.md) because there's no real photography content in the repo, and reusing mockups/testimonial headshots would misrepresent them as Briva's photography. The user asked for demo content now (own images first, or sourced online) rather than shipping an empty state.

None of the existing repo images qualify (mockups = graphic design, headshots = real people, `background.jpg`/`blogs/*` = generic stock unrelated to Briva). Confirmed with the user directly: source real, freely-licensed photos from the internet for now as placeholder content.

## Files touched

- `public/images/photography/*.jpg` — new, downloaded placeholder images.
- `src/data/work.js` — one new `photographyProjects` entry pointing at them.
- `src/views/PhotographyView.vue` — a visible "Demo placeholder — not Briva's own photography" note on this project's card/detail header, so it can't be mistaken for real portfolio content if seen before being swapped out.
- `AGENTS.md` — update the note that documented `photographyProjects` as deliberately empty; record the new demo-content decision and the swap-out expectation instead.

## Approach

- Source a handful (6-8) of freely-licensed, attribution-not-required photos (Unsplash-licensed, via picsum.photos) covering a plausible photography theme (portrait/street/landscape mix) so the masonry grid looks real.
- Save locally under `public/images/photography/`, referenced the same way as `designProjects` images.
- Label unmistakably in the UI, not just in a code comment — a small pill/badge reading "Demo placeholder" near the project title.
- This is temporary scaffolding, not final content — the prompt and AGENTS.md will say so explicitly so a future pass knows to replace it with real photos.

## Verification

- `npm run serve`, check `/work/photography` grid renders, opens the demo project, masonry + lightbox works on the placeholder images, badge is visible.
- `npm run build` succeeds.
