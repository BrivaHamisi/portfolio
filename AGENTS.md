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
- Type scale — custom `fontSize` tokens already carry the correct line-height and letter-spacing, so just use the class name:

| Class | Size | Use |
|---|---|---|
| `text-caption` | 13px | Nav links, small buttons, badges |
| `text-body-sm` | 15px | Default body copy, descriptions |
| `text-body-lg` | 20px | Subheadings, card titles, emphasis text |
| `text-subheading` | 24px | Rarely used yet — between body-lg and heading-sm |
| `text-heading-sm` | 32px | `/work/*` sub-page `<h1>`s, modal titles |
| `text-heading` | 48px | Homepage section `<h2>`s, large stat numbers |
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

- **Primary action button** (the one lime element per section): `bg-acid-lime text-void font-[510] text-body-sm rounded-md px-6 py-3 hover:brightness-95 transition`, plus the `v-flashlight` directive (see below). Examples: "Download CV" (`ExperienceSection.vue`), "Chat on WhatsApp" (`ContactUs.vue`), "My Resume" (`LandingPlatform.vue`). Each must be a single real `<a>` or `<button>` — never wrap one in the other (`<a><button>...</button></a>` is invalid nested-interactive markup; style the `<a>` directly instead).
- **`v-flashlight` directive** (`main.js`): a cursor-tracking highlight on the primary lime buttons only — realizes the design system's own description of the accent as "a functional flashlight." Apply it only to genuine primary actions, not decoratively.
- **Ghost/outline button** (secondary action): `border border-graphite text-mist text-caption rounded-md px-3 py-2 hover:border-smoke transition`. Example: "Load More" (`AboutMeSection.vue`, `ExperienceSection.vue`) — Load More/Show Less toggles also carry `:aria-expanded="<state>"`.
- **External platform link chip**: `inline-flex items-center gap-1.5 border border-graphite text-mist rounded-md px-4 py-2 text-caption font-[510] hover:border-smoke hover:text-paper transition-colors duration-150`, with `ArrowTopRightOnSquareIcon` (`@heroicons/vue/24/outline`) as the trailing icon. Used for the Behance/Dribbble/Pinterest/GitHub links in `latestWork.vue` and the `/work/*` views (`designLinks`/`photographyLinks` in `src/data/work.js`). Don't hand-draw brand logos for these (Behance/Dribbble/Pinterest) — only GitHub gets its real logo glyph, since that path is already verified-accurate; a generic external-link icon is the safer default for the rest.
- **Interactive card with a secondary link** (`WorkProjectCard.vue`): stretched-button pattern — see "Application Structure & Architecture" above. Copy this, don't reach for `role="button"` on a div that also contains a real `<a>`.
- **Section masthead**: `<div v-reveal class="... mb-12 pb-8 border-b border-graphite">` wrapping the heading (and CTA, and/or intro paragraph, if the section has one) at `text-heading` (48px). Used by every section except the Hero (its own bespoke treatment) and About (heading lives inside its profile card instead). Keep new sections' masthead spacing at `mb-12 pb-8`, not `mb-16` or other one-off values — this drifted once already and had to be corrected back.
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
- Do gate any new looping/auto-playing animation (typewriter-style, carousels, etc.) behind `window.matchMedia('(prefers-reduced-motion: reduce)')`, matching the pattern already used by `v-reveal`, `v-fill`, and the hero's typewriter — show a static, still-meaningful fallback rather than just skipping the content.
- Don't nest a real interactive element inside another one (`<a>` wrapping a `<button>`, a `role="button"` div containing a real `<a>`/`<button>`) — both were audit-caught bugs already fixed once. Use a single element per action, or the stretched-button pattern from `WorkProjectCard.vue` when a card needs both a primary click target and a secondary real link.

=== deployment rules ===

# Deployment

- The site is deployed on **Vercel** (custom domain `brivahamisi.tech`), with the `<Analytics />` component from `@vercel/analytics/vue` mounted in `src/App.vue` (as of the 2026-09-11 security pass — previously a raw `<script src="https://vercel.com/analytics/script.js">`, replaced because the package loads its script same-origin via `/_vercel/insights/script.js`, letting the CSP in `vercel.json` use a plain `script-src 'self'` with no third-party allowlist entry). Don't reintroduce the raw CDN script tag.
- Security headers (CSP, `X-Frame-Options`, HSTS, `Referrer-Policy`, `Permissions-Policy`) live in `vercel.json`. If you add a new third-party script/font/API call anywhere, update the CSP there too — an unlisted origin will get silently blocked in production, not throw a build error, so this is easy to miss until something looks broken live.
- `vue.config.js` sets `productionSourceMap: false` — don't remove this without a reason.
- Node version is pinned via `"engines": { "node": ">=22.0.0" }` in `package.json` and `.nvmrc` (`22`) — Vercel reads `engines.node` to pick its build runtime, so keep the two in sync if this ever changes.
- `.github/workflows/actions.yaml` exists but is currently empty; don't assume CI runs any checks today.
- Confirm `npm run build` succeeds locally before treating a change as deployable, since there is no CI gate doing this yet.

=== tests rules ===

# Testing

- No test framework (Vitest, Jest, etc.) is currently configured in this project. Do not add test files or a test runner unless the user asks for one.
- Verify changes manually: `npm run serve` and check the affected section in the browser (including responsive/mobile widths, since this is a single long scrolling page), then `npm run build` to confirm the production bundle compiles.

---

# Portfolio Repository Agent Instructions

You are helping maintain **brivahamisi.tech**, Briva Hamisi's personal portfolio — a static Vue 3 site showcasing his work as a software engineer, full-stack/mobile developer, and creative designer (graphic design, video editing, photography). The homepage is one long scrolling page; three `/work/*` routes exist for browsing full work categories (see "How the app is structured" below).

## 1. What you are building

A scrolling marketing/portfolio homepage: a landing hero, an "About Me" section with a skills list, an experience section with stats, a "What I Do" section, a tabbed "Latest Work" showcase (Development / Graphic Design / Photography / UI/UX Design), a pull-quote section, testimonials, and a contact section, wrapped in a shared navbar and footer. All three of Development, Graphic Design, and Photography link out to dedicated `/work/*` pages: Development shows the full project grid (each card opens the same accessible modal used on the homepage); Graphic Design and Photography show a project-card grid that drills into one project's photo/design set as a Pinterest-style masonry. There is no login, no admin area, no database, and no dynamic content fetched from a server — everything is static JS/Vue plus images in `public/images/`. Build nothing beyond what a static portfolio needs; don't introduce a backend, CMS, or auth for this project unless the user explicitly asks for one.

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
