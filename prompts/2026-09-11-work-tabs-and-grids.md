# Latest Work: Tabs + Category Grids + Dedicated View-More Pages

## Goal

Restructure the "Latest Work" section from one flat project grid into 4 tabs — **Development**, **Graphic Design**, **Photography**, **UI/UX Design** — labeled to match the vocabulary already used in the "What I Do" section rather than your shorthand ("Software"/"Designs") verbatim. Each tab behaves differently per your instructions: Software shows a live-site preview + link, Designs/Photography show a homepage preview grid with a "View More" page in a Pinterest-style masonry layout with lazy loading, UI/UX keeps its existing rich single-project treatment. This is the largest structural change made to this repo so far — it adds real routes (the site stops being a single-route SPA) and a new data file — so it goes through the prompt/approval gate before I touch anything.

## Decisions already confirmed with you

1. Build the tab/grid infrastructure now using existing images as placeholder content (not waiting on new assets).
2. "View More" opens a real route (`/work/designs`, `/work/photography`) rather than an in-page overlay.
