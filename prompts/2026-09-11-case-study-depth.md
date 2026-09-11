# Case study depth for work projects

## Goal

Projects currently show only a title/description and an image gallery. Add short structured "problem / role / outcome" copy per project so the work reads as case studies, not just a photo album — this is what actually demonstrates thinking to a visitor.

## Files touched

- `src/data/work.js` — add `role`, `problem`, `outcome` string fields to `softwareProjects[0]` (Stanbest), `uiuxProject`, and `designProjects[0]` (stancap-branding).
- `src/components/ProjectModal.vue` — render the new fields (Development/UI-UX detail view).
- `src/views/DesignsView.vue` / `PhotographyView.vue` — render the same fields in the per-project detail header, above the masonry grid.

## Approach

- Keep it to 1-2 sentences per field — this is a small static site, not a case-study blog.
- Content will be drafted from what's already implied by existing descriptions/titles; flagged for the user to correct/expand with real specifics (client goals, actual role, measurable outcome) since I don't have that detail.
- New fields render only when present (`v-if`) so `photographyProjects` demo entries without them don't break.
- Match existing typography: field labels at `text-caption text-fog`, values at `text-body-sm text-mist`.

## Verification

- `npm run serve`, check `/work/development`, `/work/designs?project=stancap-branding`, home page "Latest Work" UI/UX tab modal — problem/role/outcome renders correctly at desktop and mobile widths.
- `npm run build` succeeds.
