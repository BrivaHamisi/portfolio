# Latest Work: Tabs + Category Grids + Dedicated View-More Pages

## Goal

Restructure the "Latest Work" section from one flat project grid into 4 tabs — **Development**, **Graphic Design**, **Photography**, **UI/UX Design** — labeled to match the vocabulary already used in the "What I Do" section rather than your shorthand ("Software"/"Designs") verbatim. Each tab behaves differently per your instructions: Software shows a live-site preview + link, Designs/Photography show a homepage preview grid with a "View More" page in a Pinterest-style masonry layout with lazy loading, UI/UX keeps its existing rich single-project treatment. This is the largest structural change made to this repo so far — it adds real routes (the site stops being a single-route SPA) and a new data file — so it goes through the prompt/approval gate before I touch anything.

## Decisions already confirmed with you

1. Build the tab/grid infrastructure now using existing images as placeholder content (not waiting on new assets).
2. "View More" opens a real route (`/work/designs`, `/work/photography`) rather than an in-page overlay.
3. Software cards get a static screenshot + "Visit Site" link (not a live iframe).
4. 6 cards show per tab on the homepage before "View More".

## Corrected structure — two levels, not a flat grid

Your follow-up changes the view-more page: it's **project cards first, photos/designs second**. So each category is a list of *projects* (a project = one client/job/shoot with a cover image, title, description, and its own set of individual images) — not a flat wall of individual images.

- **Homepage tab:** shows project cards (up to 6) — image, title, description, matching the redesigned card below.
- **View More page (`/work/designs`, `/work/photography`):** shows the *same kind* of project cards, just all of them, not capped at 6.
- **Clicking a project card** (homepage tab *or* view-more page) — that's the one action that opens the Pinterest-style masonry of that project's individual images. On the homepage, clicking a card routes to `/work/designs?project=<id>` and the Designs page opens straight into that project's masonry (via the query param) rather than requiring a second click; landing on `/work/designs` with no query shows the project-card grid.
