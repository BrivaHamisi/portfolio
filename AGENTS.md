=== foundation rules ===

# Portfolio Agent Guidelines

These guidelines are specific to this repository. Follow them closely; they reflect how this project is actually built, not an idealized stack.

## Foundational Context

This is a personal portfolio for Briva Hamisi (Software Engineer / Full-Stack Developer / Creative Designer), built with **Vue 3** on the **Vue CLI (webpack)** toolchain — not Vite. It is plain **JavaScript** (a `jsconfig.json` provides the `@/*` path alias for editor tooling only; there is no TypeScript compiler in the build). Styling is **Tailwind CSS** with hand-written utility classes. Routing is **Vue Router 4** — the homepage (`/`) is one long scrolling page, plus three "view more" pages under `/work/*` (Development, Graphic Design, Photography) for browsing a work category's full project list. There is no backend, API, database, or CMS — all content is static, hardcoded in components or small `src/data/*.js` files, and served from `public/`.

Before assuming a package's API, check `package.json` for the installed version rather than assuming the latest docs apply.

## Skills Activation

Activate `vue-best-practices` and `vue-router-best-practices` when touching components or routing. Activate `web-design-guidelines` when reviewing or changing layout, accessibility, or responsive behavior. There are no project-local skills under `**/skills/**` in this repo.

## Conventions

- Match the conventions of the file you're editing before applying a house style — this codebase mixes Options API (`src/App.vue`) and Composition API with `<script setup>` (most `src/components/sections/*.vue`). New or heavily-touched components should use `<script setup>` to match the majority pattern; don't rewrite working Options API components just to convert them.
- Use descriptive names for refs, computed values, and functions.
- Check `src/components/` and `src/components/sections/` for an existing component to reuse or extend before writing a new one.
- Content strings (bio, skills, experience) are currently hardcoded inline in components (e.g. `AboutMeSection.vue`) rather than centralized — follow that pattern unless asked to refactor it.

## Verification Scripts

- There is no test runner configured. Do not invent one-off verification scripts; instead run the dev server (`npm run serve`) and check the change in the browser, and run `npm run build` to confirm the production build succeeds.

## Application Structure & Architecture

- `src/views/HomeView.vue` composes the homepage from `src/components/sections/*.vue` (LandingPlatform, AboutMeSection, ExperienceSection, ExperienceStats, whatIdo, latestWork, QuoteSection, Testimonial, ContactUs). `src/views/DevelopmentView.vue`, `DesignsView.vue`, and `PhotographyView.vue` are the three `/work/*` pages.
- `src/components/navbar.vue`, `src/components/Footer.vue`, and `src/components/ScrollProgress.vue` are shared chrome rendered around the routed view via `src/App.vue`. The routed content itself is wrapped in a `<main>` landmark in `App.vue` — keep that wrapper when touching `App.vue`.
- `src/components/WorkProjectCard.vue`, `src/components/MasonryGrid.vue`, and `src/components/ProjectModal.vue` are shared presentational components used by the Latest Work tabs and the `/work/*` pages — reuse these for any future work-category UI rather than duplicating card/grid/modal markup.
- `ProjectModal.vue` is the extracted accessible modal (`role="dialog"`, focus trap, Escape, scroll lock, focus restore) — it's a real standalone component now (`<ProjectModal :show="..." :project="..." @close="..." />`), used by both `latestWork.vue` (Development/UI-UX tab detail view) and `DevelopmentView.vue`. It is not inline in `latestWork.vue` anymore.
- `WorkProjectCard.vue` uses a **stretched-button pattern**, not a `role="button"` wrapper: a single real `<button>` absolutely positioned to cover the whole card is the actual interactive element (native Enter/Space, no custom keydown handlers needed); the title/description are `pointer-events-none` so clicks pass through to it; any secondary real links (Visit Site, GitHub) sit in their own `pointer-events-auto` layer on top. **Never put a real `<a>`/`<button>` inside a `role="button"` div** — nested interactive elements are invalid and confusing to assistive tech. If you need another "card with an optional secondary link" component, copy this pattern rather than a role=button wrapper.
- Stick to this structure. Don't introduce new top-level folders (e.g. `store/`, `services/`) without the user's approval — there is currently no state-management or API layer to extend.

## Frontend Bundling

- This project uses Vue CLI, not Vite: `npm run serve` for local dev with hot reload, `npm run build` for a production build to `dist/`. If a change isn't showing up, ask the user to restart `npm run serve` or run `npm run build`.

## Documentation Files

- Only create documentation files (README sections, docs/, etc.) if explicitly requested.

## Replies

- Be concise. Focus on what changed and why, not a walkthrough of obvious code.

=== javascript/vue rules ===

# JavaScript & Vue

- This is JavaScript, not TypeScript — do not add type annotations or convert files to `.ts`/`lang="ts"` unless the user explicitly asks for a TypeScript migration.
