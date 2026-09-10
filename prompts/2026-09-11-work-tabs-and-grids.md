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
- A "← Back to Designs" link returns from the masonry view to the project-card grid.

This also conveniently means **no content invention is needed for Designs** — today's single "Graphics Design" project (title, description, and its 7 `mockup_*.jpg` images) already has exactly this project→images shape. It becomes one project card; clicking it shows those same 7 images in the masonry. Nothing to placeholder or rename.

## The photography content gap (unchanged conclusion, simpler now)

There is still **no photography content anywhere in this repo** — every image in `public/images/` is either a UI mockup, a graphic-design piece, a brand asset, or a named person's headshot (testimonial photos of Moses Ngure, Maureen Mamo, Wachira Maina). I won't repurpose those headshots as if they were your photography portfolio. So `photographyProjects` starts as `[]`, and both the homepage tab and `/work/photography` show a real empty state ("Photography portfolio coming soon") until you add an actual project (cover image + title + its own photos).

## Card redesign (folded in per your follow-up)

The current grid cards use a dark gradient overlay that fades in on hover to reveal the title/description — that's a pre-reskin pattern, not how Linear's own "Card (Product Screenshot Frame)" component actually works (hairline-bordered frame, `bg-carbon`, `radius-12`, content sits normally below/beside the image, no overlay trick). New card pattern, used for Software/Designs/Photography grid items alike:

- Outer frame: `bg-carbon border border-graphite rounded-xl overflow-hidden transition-colors duration-150 hover:border-smoke` (matches the established card/hover-feedback pattern from the reskin).
- Image: sits at the top of the card at full opacity, `w-full h-48 object-cover` (or similar fixed aspect) — no dark scrim over it.
- Content below the image, inside `p-4`: title in `text-body-lg font-[510] text-paper`, description in `text-body-sm text-fog` (truncated to 1–2 lines with `line-clamp-2` so cards stay a consistent height in the grid).
- Hover feedback moves from "reveal hidden text" to the existing subtle `hover:border-smoke` border-brighten already used elsewhere, plus the image keeping its current `group-hover:scale-110` zoom — the text is always visible, never hidden-then-revealed.
- Software cards extend this with the visible "Visit Site →" link inside the content area, per the Software section above.

This replaces `latestWork.vue`'s current `bg-black bg-opacity-60 ... opacity-0 md:group-hover:opacity-100` overlay pattern everywhere a project card appears (homepage grid, the two new view-more pages, and their masonry detail view).

## Files touched

- `src/data/work.js` — **new.** Categorized data: `softwareProjects`, `designProjects`, `photographyProjects`, `uiuxProject`.
- `src/components/sections/latestWork.vue` — rewritten: tab bar + per-tab rendering. Keeps the existing accessible modal (focus trap, Escape, scroll lock from the earlier audit pass) for Software and UI/UX detail views.
- `src/components/MasonryGrid.vue` — **new**, shared presentational component (CSS column-based masonry, no library) used by both new view-more pages' detail view.
- `src/views/DesignsView.vue` — **new**, project-card grid + per-project masonry at `/work/designs`.
- `src/views/PhotographyView.vue` — **new**, same pattern (or empty state) at `/work/photography`.
- `src/router/index.js` — add the two new routes.

## Approach

### 1. `src/data/work.js`

```js
export const categories = [
  { key: 'software', label: 'Development' },
  { key: 'designs', label: 'Graphic Design' },
  { key: 'photography', label: 'Photography' },
  { key: 'uiux', label: 'UI/UX Design' },
]

export const softwareProjects = [ /* today's one Stanbest entry, restructured: title, description, image (sw_1.jpg), liveUrl, client, type, year */ ]

export const designProjects = [
  {
    id: 'stancap-branding',
    title: 'Graphics Design', // today's existing project title/description, unchanged
    description: '...',
    coverImage: '/images/mockup_1.jpg',
    images: ['/images/mockup_1.jpg', '/images/mockup_2.jpg', /* ...mockup_3..7.jpg */],
  },
]

export const photographyProjects = [] // intentionally empty — see content gap above

export const uiuxProject = { /* today's UI/UX Design entry, unchanged: client, type, year, quote, images carousel, figma previewUrl */ }
```

### 2. `latestWork.vue` — tab bar + per-tab body

- Tab bar: 4 plain-text tabs matching the nav-link pattern (`text-mist`, active tab `text-acid-lime` + small underline), `activeTab` ref, `transition-colors duration-150`.
- **Software tab:** cards showing `image` (screenshot), `title`, short `description`, and a visible `Visit Site →` link (`target="_blank" rel="noopener noreferrer"`, `text-acid-lime hover:underline`) pointing at `liveUrl`. Clicking the card image still opens the existing accessible modal for the fuller description/client/type/year — the link is a distinct, more direct action sitting on the card itself.
- **Designs tab:** up to 6 `designProjects` as redesigned cards (cover image, title, description — no hover-overlay). Clicking a card routes to `/work/designs?project=<id>`, landing directly in that project's masonry view. A "View More →" link routes to plain `/work/designs` (the project-card grid).
- **Photography tab:** same pattern, empty state since `photographyProjects` is `[]`.
- **UI/UX Design tab:** a single card (today's existing treatment) that opens the existing modal with the full carousel/quote/client/Figma-link content — unchanged from today, just moved into its own tab instead of living in the same grid as Software/Designs.

### 3. `MasonryGrid.vue`

Pure CSS masonry — no new dependency: `columns-2 md:columns-3 lg:columns-4 gap-4` on the container, each item `break-inside-avoid mb-4 rounded-xl overflow-hidden border border-graphite bg-carbon`, `<img loading="lazy" ...>` inside (native lazy loading, same pattern already used elsewhere in this codebase). `v-reveal` per item for a fade-in as the user scrolls the masonry, no stagger (not a fixed-count list).

### 4. `DesignsView.vue` / `PhotographyView.vue`

Two states on one page, driven by a `?project=<id>` query param (read via `useRoute`):

- **No `project` query (or it doesn't match):** "← Back to portfolio" link to `/#latestWork`, a page heading, and a grid of *all* that category's project cards (same redesigned card component as the homepage tab, un-capped). Clicking a card sets the query param (`router.push({ query: { project: id } })`) rather than a fresh navigation, so back/forward works naturally.
- **`project` query matches an entry:** "← Back to Designs" link (clears the query param), the project's title/description, and `<MasonryGrid :items="project.images" />`.
- Photography renders the empty state in the no-query case since `photographyProjects` is `[]`.

Rendered inside the normal `App.vue` chrome (navbar/footer stay, since `router-view` already sits inside that layout) — existing nav links to `/#about` etc. already work correctly from a non-home route, since `navigateTo()` in `navbar.vue` already checks `router.currentRoute.value.path` and pushes back to `/` before scrolling when needed. No navbar changes required.

### 5. `router/index.js`

```js
{ path: '/work/designs', name: 'designs', component: DesignsView },
{ path: '/work/photography', name: 'photography', component: PhotographyView },
```

## Verification

- `npm run serve`: switch between all 4 tabs, confirm each renders its correct treatment (Software links work and open in new tab; Designs/Photography cards route correctly; UI/UX opens its existing modal).
