=== foundation rules ===

# Portfolio Agent Guidelines

These guidelines are specific to this repository. Follow them closely; they reflect how this project is actually built, not an idealized stack.

## Foundational Context

This is a personal portfolio for Briva Hamisi (Software Engineer / Full-Stack Developer / Creative Designer), built with **Vue 3** on the **Vue CLI (webpack)** toolchain — not Vite. It is plain **JavaScript** (a `jsconfig.json` provides the `@/*` path alias for editor tooling only; there is no TypeScript compiler in the build). Styling is **Tailwind CSS** with hand-written utility classes. Routing is **Vue Router 4** — the homepage (`/`) is one long scrolling page, plus two "view more" pages under `/work/*` (Graphic Design, Photography) for browsing a work category's full project list. There is no backend, API, database, or CMS — all content is static, hardcoded in components or small `src/data/*.js` files, and served from `public/`.

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

- `src/views/HomeView.vue` composes the homepage from `src/components/sections/*.vue` (LandingPlatform, AboutMeSection, ExperienceSection, ExperienceStats, whatIdo, latestWork, QuoteSection, Testimonial, ContactUs). `src/views/DesignsView.vue` and `PhotographyView.vue` are the two `/work/*` pages.
- `src/components/navbar.vue`, `src/components/Footer.vue`, and `src/components/ScrollProgress.vue` are shared chrome rendered around the routed view via `src/App.vue`.
- `src/components/WorkProjectCard.vue` and `src/components/MasonryGrid.vue` are shared presentational components used by the Latest Work tabs and both `/work/*` pages — reuse these for any future work-category UI rather than duplicating card/grid markup.
- The accessible modal (focus trap, Escape, scroll lock) lives inline inside `src/components/sections/latestWork.vue` and is reused for the Development and UI/UX Design tabs' detail view — there's no separate standalone modal component file.
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

- The router (`src/router/index.js`) defines three routes: `home` (`/`, `HomeView.vue`), `designs` (`/work/designs`, `DesignsView.vue`), and `photography` (`/work/photography`, `PhotographyView.vue`). A `scrollBehavior` restores scroll position on back/forward and resets to top on a fresh non-hash navigation; hash-based section jumps (`/#about`, etc.) are deliberately left to it returning `false` since `navbar.vue` and the "back to portfolio" links on the `/work/*` views already handle those manually (they need to offset for the fixed navbar, which the router's default hash-scroll doesn't do).
- The old `generateMetadata()`/`route.meta` scaffolding was removed as dead code in an earlier pass — don't reintroduce it without a reason; the `<head>` tags live statically in `index.html`.
- `DesignsView.vue` / `PhotographyView.vue` both use a `?project=<id>` query param (not a path param) to switch between "grid of project cards" and "one project's photo/design masonry" on the same route — keep that pattern if you add more categories rather than minting per-project routes.
- Use `router-link` / named routes rather than hardcoded `href`s for internal navigation.

=== tailwind/core rules ===

# Tailwind CSS & Design System ("Linear" theme)

As of 2026-09-11 this site runs a design system adapted from Linear's product marketing site, applied via `tailwind.config.js` `theme.extend`. **This is the house style for every future page/section/component** — use these tokens by default rather than inventing new colors, sizes, or radii. Full source reference: `prompts/2026-09-11-linear-theme-reskin.md`.

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
- Type scale — custom `fontSize` tokens already carry the correct line-height and letter-spacing, so just use the class name:

| Class | Size | Use |
|---|---|---|
| `text-caption` | 13px | Nav links, small buttons, badges |
| `text-body-sm` | 15px | Default body copy, descriptions |
| `text-body-lg` | 20px | Subheadings, card titles, emphasis text |
| `text-subheading` | 24px | Rarely used yet — between body-lg and heading-sm |
| `text-heading-sm` | 32px | Section headings (`<h2>` on every section) |
| `text-heading` | 48px | Large stat numbers |
| `text-heading-lg` | 64px | Hero `<h1>` (mobile/tablet) |
| `text-display` | 72px | Hero `<h1>` (desktop, `md:` and up) |

## Spacing & Radius

- Spacing: plain Tailwind default scale (4px base unit) — no custom spacing tokens were added; Tailwind's defaults already line up with Linear's 4/8/12/16/24/96 ladder.
- Radius: plain Tailwind defaults already match Linear's radius vocabulary exactly — don't add custom radius tokens.
  - `rounded-sm` (2px) — small/tight elements
  - `rounded` (4px) — badges
  - `rounded-md` (6px) — buttons, inputs
  - `rounded-xl` (12px) — cards, modal panels, image frames
  - `rounded-full` — pills, circular icon buttons
  - Never use `rounded-lg` (8px) or `rounded-2xl`+ — they're outside this system's vocabulary.

## Shadows

Custom `boxShadow` tokens in `tailwind.config.js`: `shadow-sm` (soft drop shadow), `shadow-card` (the hairline inset-border trick — this is how cards get their edge, *not* a drop shadow), `shadow-cta` (subtle inset stack, available for a primary button if it needs more presence), `shadow-xl` (rare, large soft shadow). Prefer a plain `border border-graphite` for most card/panel separation — that's what most components already do, and it's more true to the "hairline over shadow" spirit of this system than reaching for `shadow-card` by default.

## Component patterns already established — copy these, don't reinvent

- **Primary action button** (the one lime element per section): `bg-acid-lime text-void font-[510] text-caption rounded-md px-4 py-2.5 hover:brightness-95 transition`. Examples: "Download CV" (`ExperienceSection.vue`), "Chat me" (`ContactUs.vue`), "My Resume" (`LandingPlatform.vue`).
- **Ghost/outline button** (secondary action): `border border-graphite text-mist text-caption rounded-md px-3 py-2 hover:border-smoke transition`. Example: "Load More" (`AboutMeSection.vue`, `ExperienceSection.vue`).
- **Nav text link**: `text-mist hover:underline text-caption`, active state `text-acid-lime`. See `navbar.vue`.
- **Nav pill CTA** (white, high-contrast): `bg-paper text-void rounded-full px-4 py-2 text-caption font-[510] hover:brightness-95`. See `navbar.vue`'s "Let's Talk" link.
- **Card / panel**: `bg-carbon border border-graphite rounded-xl` (+ padding as needed). Used for the About card, work grid thumbnails, modal panel, testimonial cards, contact card.
- **Subtle inline card** (lighter weight, e.g. a service tile or stat tile): `bg-white/[0.02] border border-graphite rounded-md p-4`.
- **Icon-only circular button** (modal close/prev/next): `bg-white/5 border border-graphite rounded-full p-3 hover:bg-white/10 transition-colors` — the `p-3` is load-bearing for the 44px touch-target minimum, don't shrink it back to `p-2`.

## Do's and Don'ts (carried from the source system)

- Do reserve `acid-lime` for exactly one primary action per section — never for icons, decorative bars, stat numbers, or body links.
- Do keep icons and decorative elements (timeline dots, quote glyphs, contact icons) neutral (`fog`/`graphite`/`smoke`) — Linear's own icons are single-color grayscale, not chromatic.
- Do use hairline borders (`border-graphite` / `border-smoke`) for surface separation instead of drop shadows, in keeping with the source system.
- Don't use `font-bold`/700+ weights anywhere — this system tops out at weight 590.
- Don't add decorative gradients, colored accent bars, or chromatic body/link text — body and links stay in the `fog`/`mist`/`paper` grayscale.
- Don't introduce a second chromatic accent as if it were another valid "CTA color" — `pulse-green`/`coral-red`/`signal-teal`/`iris-violet`/`lavender` exist in the palette as reserved future-state colors (success/error/tags) but are intentionally unused today; don't reach for them decoratively.

=== deployment rules ===

# Deployment

- The site is deployed on **Vercel** (custom domain `brivahamisi.tech`), with `@vercel/analytics` wired up in `src/App.vue` via the `window.va` snippet — don't remove or duplicate that snippet.
- `.github/workflows/actions.yaml` exists but is currently empty; don't assume CI runs any checks today.
- Confirm `npm run build` succeeds locally before treating a change as deployable, since there is no CI gate doing this yet.

=== tests rules ===

# Testing

- No test framework (Vitest, Jest, etc.) is currently configured in this project. Do not add test files or a test runner unless the user asks for one.
- Verify changes manually: `npm run serve` and check the affected section in the browser (including responsive/mobile widths, since this is a single long scrolling page), then `npm run build` to confirm the production bundle compiles.

---

# Portfolio Repository Agent Instructions

You are helping maintain **brivahamisi.tech**, Briva Hamisi's personal portfolio — a static Vue 3 site showcasing his work as a software engineer, full-stack/mobile developer, and creative designer (graphic design, video editing, photography). The homepage is one long scrolling page; a couple of `/work/*` routes exist for browsing full work categories (see "How the app is structured" below).

## 1. What you are building

A scrolling marketing/portfolio homepage: a landing hero, an "About Me" section with a skills list, an experience section with stats, a "What I Do" section, a tabbed "Latest Work" showcase (Development / Graphic Design / Photography / UI/UX Design), testimonials, and a contact section, wrapped in a shared navbar and footer. The Graphic Design and Photography tabs link out to dedicated `/work/designs` and `/work/photography` pages for browsing a category's full project list and drilling into one project's photo/design set. There is no login, no admin area, no database, and no dynamic content fetched from a server — everything is static JS/Vue plus images in `public/images/`. Build nothing beyond what a static portfolio needs; don't introduce a backend, CMS, or auth for this project unless the user explicitly asks for one.

## 2. How to work

This is the most important workflow in this file — do not skip step 3 for anything nontrivial.

1. Look at the relevant section component(s) in `src/components/sections/` and the shared chrome (`navbar.vue`, `Footer.vue`) before changing anything — content and styling conventions live inline in each file, not in a central config.
2. Match the "Linear" design system tokens (see the `tailwind/core rules` section below — `void`/`carbon` surfaces, `acid-lime` as the sole accent, Inter Variable type scale) and the Composition API `<script setup>` pattern used by most sections.
3. **Write an implementation prompt in `prompts/`** covering: the goal, the files you expect to touch, your approach/plan and assumptions, and how you'll verify it (manual check steps, viewports, `npm run build`). Follow the naming and format described in `prompts/README.md`.
4. **Ask the user for approval before writing any code**, with Yes/No as selectable options, e.g.: `I prepared the implementation prompt at prompts/<name>.md. Is this good to execute?`
5. Only skip steps 3–4 for genuinely trivial, low-risk edits the user explicitly asked for in exact terms (a typo fix, a single copy/text change, a one-line style tweak) — anything touching layout, a new section, content restructuring, dependencies, or multiple files goes through the prompt. You may also skip the prompt when the user explicitly tells you to skip it for the current task ("just do it", "skip the prompt for this one") — that permission covers only that task, not future ones.
6. Once approved, implement exactly what the prompt describes — don't scope-creep beyond it. Run `npm run serve` to check it visually (desktop and mobile widths), then `npm run build` to confirm production build success.
7. Close with a short report using bullets, not paragraphs, under three headings:
   - `What I did` — a few one-line bullets.
   - `Test` — numbered steps to see/verify the change (section/URL, viewport sizes, `npm run build`).
   - `Needs your attention` — anything you're unsure about or that needs a decision, or say "None."

## Recording durable decisions

If you discover a rule, convention, or gotcha mid-task that isn't already written down here and would help next time (a hidden constraint, a "don't do X because Y" you had to learn the hard way, a decision the user made that should stick) — add it directly to the relevant section of this file (e.g. "Decisions already made for you" or "Things that will trip you up") as part of your change, rather than letting it live only in the conversation. This file is the only shared memory this project has; there's no separate `.ai/rules` directory or rule-recording tool here.

## 3. UI work

You do not have a `designs/` folder of mockups to work from in this project. When the user gives specific copy, images, or layout direction, follow it exactly and note it in the implementation prompt. Otherwise, match the established "Linear" design system (see `tailwind/core rules` above for the full token/component reference) rather than introducing a new style. Since this is a single long page, always check how a change reflows at mobile width, not just desktop.

## 4. Skills to lean on

- `vue-best-practices`, for Composition API, `<script setup>`, and component structure.
- `vue-router-best-practices`, if routing/metadata handling changes.
- `web-design-guidelines`, for accessibility and responsive review of any UI change.

There's no framework-specific skill for plain Tailwind class usage — just follow the patterns already in the file you're editing.

## 5. How the app is structured

- `src/main.js` boots the app, mounts `App.vue`, applies global `src/index.css` (Tailwind entry + the `.reveal`/`.hero-in`/modal-transition CSS from the motion pass), and registers two global directives: `v-reveal` (fade-up-once-on-scroll) and `v-fill` (animates a width from 0 to a target %, used by the About section's skill bars).
- `src/App.vue` renders `ScrollProgress` (fixed top-of-viewport scroll indicator) + `navbar` + `router-view` + implicitly the footer through the view, and registers the Vercel Analytics snippet in `mounted()`.
- `src/router/index.js` defines the 3 routes (`home`, `designs`, `photography`) and a `scrollBehavior` (see "How to work" above).
- `src/views/HomeView.vue` assembles the homepage from section components; `DesignsView.vue`/`PhotographyView.vue` are the standalone `/work/*` pages.
- `src/components/sections/*.vue` — one file per homepage section, mostly self-contained with their own hardcoded content and Tailwind classes.
- `src/data/work.js` — categorized Latest Work data (`categories`, `softwareProjects`, `designProjects`, `photographyProjects`, `uiuxProject`). `photographyProjects` is intentionally `[]` — there's no real photography content in this repo yet (see "Things that will trip you up"). Add new work by editing this file, not by hardcoding entries back into `latestWork.vue`.
- `src/data/blogs.js` — a small standalone data file for content that used to back a removed blogs feature; check with the user before deleting it or `public/images/blogs/*` outright, since it may be leftover rather than needed, but removing dead code isn't your call to make silently.
- `public/images/` holds all static imagery referenced directly by path (no import/bundling of images from `src/assets` except the logo).
