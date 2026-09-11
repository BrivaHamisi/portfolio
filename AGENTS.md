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
- Prefer the Composition API with `<script setup>` for new components, matching `AboutMeSection.vue`, `ExperienceSection.vue`, etc.
- Use `ref`/`computed` for reactive state and derived values; avoid unnecessary watchers.
- Keep components focused on one section of the page; extract a subcomponent if a section grows large rather than nesting deeply.
- Props/emits for parent-child communication; don't mutate props.
- There is no global store (no Vuex/Pinia) and none is needed for this app's current scope — don't add one for a single piece of shared UI state that a prop/emit or a small composable can handle.

=== vue-router/core rules ===

# Vue Router

- The router (`src/router/index.js`) defines four routes: `home` (`/`, `HomeView.vue`), `development` (`/work/development`, `DevelopmentView.vue`), `designs` (`/work/designs`, `DesignsView.vue`), and `photography` (`/work/photography`, `PhotographyView.vue`). A `scrollBehavior` restores scroll position on back/forward and resets to top on a fresh non-hash navigation; hash-based section jumps (`/#about`, etc.) are deliberately left to it returning `false` since `navbar.vue` and the "back to portfolio" links on the `/work/*` views already handle those manually (they need to offset for the fixed navbar, which the router's default hash-scroll doesn't do).
- The old `generateMetadata()`/`route.meta` scaffolding was removed as dead code in an earlier pass — don't reintroduce it without a reason; the `<head>` tags live statically in `index.html`.
- `DesignsView.vue` / `PhotographyView.vue` both use a `?project=<id>` query param (not a path param) to switch between "grid of project cards" and "one project's photo/design masonry" on the same route — keep that pattern if you add more categories rather than minting per-project routes. `DevelopmentView.vue` doesn't need this (its cards open `ProjectModal` instead of a masonry), so it's a plain project grid with no query param.
- Use `router-link` / named routes for internal navigation, **except** hash-based section jumps to the homepage (e.g. `/#latestWork`, `/#about`) — those deliberately use a real `<a href="/#...">` with `@click.prevent` calling a manual scroll handler (see `navbar.vue`'s `navigateTo()` and the `goBackToPortfolio()` helper repeated in each `/work/*` view), since the router's default hash-scroll doesn't offset for the fixed navbar. Keep using a real `href` (not a plain `@click`-only element) so keyboard/no-JS/right-click "copy link" all still work.

=== tailwind/core rules ===

# Tailwind CSS & Design System ("Linear" theme)

As of 2026-09-11 this site runs a design system adapted from Linear's product marketing site, applied via `tailwind.config.js` `theme.extend`. **This is the house style for every future page/section/component** — use these tokens by default rather than inventing new colors, sizes, or radii. Full original reference (colors, type, components, do's/don'ts, the raw CSS/JSON token dumps): `DESIGN.md` at the repo root — that's the canonical source the `impeccable` skill reads. The reskin implementation plan is `prompts/2026-09-11-linear-theme-reskin.md`.

- Avoid inline `style` attributes where a Tailwind utility covers the same need; the codebase already does this for computed values (e.g. dynamic `width` percentages), which is an acceptable exception.
- Configuration lives in `tailwind.config.js` and `postcss.config.js` — extend the theme there instead of hardcoding arbitrary values (`bg-[#123456]`) unless a one-off truly doesn't fit the palette.

## Colors

All available as Tailwind color classes (`bg-void`, `text-fog`, `border-graphite`, etc.) via `tailwind.config.js`.

| Token | Hex | Role |
|---|---|---|
| `void` | `#08090a` | Page canvas — default background everything sits on |
| `carbon` | `#0f1011` | Card surfaces, nav bar, modal panels |
| `obsidian` | `#161718` | Elevated/nested panels (rarely needed yet) |
| `graphite` | `#23252a` | Hairline borders, dividers, ghost-button outlines |
| `smoke` | `#383b3f` | Higher-contrast hairline border (hover states, section separators) |
| `ash` | `#62666d` | Muted/inactive text — rarely used directly, `fog` covers most cases |
| `fog` | `#8a8f98` | Body copy, icons, secondary metadata — the default "muted text" color |
| `mist` | `#d0d6e0` | Secondary headings, button text on dark surfaces, slightly brighter than `fog` |
| `bone` | `#e5e5e6` | Near-white fills (rarely needed; `paper` covers most cases) |
| `paper` | `#ffffff` | Primary headings, high-contrast text, icon/button text on dark surfaces |
| `acid-lime` | `#e4f222` | **The one accent color.** Primary CTA buttons and the active nav indicator only — never decoration, never more than one per section |
| `pulse-green` | `#27a644` | Reserved for a future success/positive state — unused today |
| `coral-red` | `#eb5757` | Reserved for a future error/negative state — unused today |
| `signal-teal` | `#02b8cc` | Reserved decorative/informational accent — unused today |
| `iris-violet` | `#6366f1` | Reserved tag/badge fill — unused today |
| `lavender` | `#8b5cf6` | Reserved secondary tag fill — unused today |

**Never** use `gray-*`, `orange-*`, or any other default Tailwind color in this project — grep for these before finishing any styling task; a clean grep is part of the completion check.

## Typography

- Font: **Inter Variable**, loaded via a Google Fonts `<link>` in `index.html` (`family=Inter:wght@300..700`), configured as `font-sans` in `tailwind.config.js`. Falls back to `ui-sans-serif, system-ui` if the CDN request fails (e.g. offline dev) — that's an acceptable, expected fallback, not a bug.
- Weights: **300–590 only**. Never use `font-bold` (Tailwind's 700) or `font-semibold`/`font-medium` — use the arbitrary-value classes `font-[510]` (roughly Tailwind's "medium/semibold" role — nav CTAs, card titles, button labels) and `font-[590]` (heavier emphasis, rarely needed) instead. Plain body text stays at the Tailwind default (400).
