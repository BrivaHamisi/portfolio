# Briva Hamisi — Portfolio

Personal portfolio for Briva Hamisi — Software Engineer, Full-Stack Developer, and Creative Designer (graphic design, UI/UX, video editing, photography). Live at **[brivahamisi.tech](https://brivahamisi.tech/)**.

A single-page marketing site (hero, about, skills, experience, work showcase, testimonials, contact) plus a few dedicated pages for browsing the full body of work in each discipline.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Vue 3 (Composition API, `<script setup>` in most components) |
| Build tooling | Vue CLI (webpack) — **not** Vite |
| Language | Plain JavaScript — no TypeScript |
| Routing | Vue Router 4 |
| Styling | Tailwind CSS, hand-written utility classes, no component library |
| Font | Inter Variable, loaded from Google Fonts |
| Icons | [Heroicons](https://heroicons.com/) (outline set) |
| Animation | Custom lightweight Vue directives (`v-reveal`, `v-fill`, `v-flashlight`) — no animation library |
| Analytics | [`@vercel/analytics`](https://vercel.com/analytics) (Vue integration) |
| Hosting | [Vercel](https://vercel.com/) |

No backend, no database, no CMS — every page is static, and all content lives directly in Vue components or small `src/data/*.js` files.

## Features

- **Hero** — animated intro with a rotating role typewriter and a staggered entrance sequence
- **About** — bio, and a categorized, animated skills bar list
- **Experience** — timeline of work history and education, with a CV download
- **Latest Work** — a tabbed showcase (Development / Graphic Design / Photography / UI/UX Design), each tab behaving differently:
  - **Development** — project cards with a screenshot, a live link where available, and a GitHub link
  - **Graphic Design** & **Photography** — a preview grid of projects that opens into a Pinterest-style photo/design masonry per project
  - **UI/UX Design** — a single in-depth case study
  - Each of the three browsable categories also links out to a dedicated `/work/*` page for the full list
- **Testimonials**, **Contact**, and a pull-quote section round out the page
- Accessible throughout: a real ARIA tabs widget with roving tabindex, a focus-trapped/Escape-closable modal, `prefers-reduced-motion` support, keyboard-navigable everything

## Design system

The whole site runs on a design system adapted from Linear's product marketing site: a near-black canvas (`#08090a`), one sparing electric-lime accent (`#e4f222`) reserved strictly for primary actions, hairline borders instead of shadows for surface separation, and Inter Variable at tight tracking across a fixed type scale (13px → 72px).

- **[`DESIGN.md`](DESIGN.md)** — the full original design reference (colors, type, components, spacing, do's/don'ts) this site is built from
- **[`AGENTS.md`](AGENTS.md)** → "Tailwind CSS & Design System" section — the day-to-day quick reference: exact color/type tokens as implemented, established component patterns (buttons, cards, badges, the section masthead), and the do's/don'ts as they apply to this codebase specifically
- The tokens themselves live in `tailwind.config.js` (`theme.extend`)

## Project structure

```text
public/
  index.html          # HTML shell, meta tags, Google Fonts link
  images/              # All static imagery, referenced directly by path
src/
  main.js             # App bootstrap; registers v-reveal / v-fill / v-flashlight directives
  App.vue             # Root shell: ScrollProgress, navbar, <main>, Footer, Analytics
  index.css           # Tailwind entry + custom animation/transition CSS
  router/
    index.js          # 4 routes + scrollBehavior
  views/
    HomeView.vue       # Assembles the homepage from section components
    DevelopmentView.vue
    DesignsView.vue     # /work/designs — project grid + per-project masonry
    PhotographyView.vue # /work/photography — same pattern
  components/
    navbar.vue, Footer.vue, ScrollProgress.vue
    WorkProjectCard.vue # Shared card (stretched-button pattern, no nested-interactive markup)
    MasonryGrid.vue     # Pure-CSS Pinterest-style grid
    ProjectModal.vue    # Shared accessible modal (focus trap, Escape, scroll lock)
    sections/           # One file per homepage section (Hero, About, Experience, etc.)
  data/
    work.js            # All Latest Work content: categories, projects, external profile links
    blogs.js            # Legacy data file (blogs feature was removed from the site)
prompts/                # Implementation prompts written before each nontrivial change (see prompts/README.md)
vercel.json             # Security headers (CSP, HSTS, X-Frame-Options, etc.)
tailwind.config.js      # Design system tokens (colors, type scale, shadows)
AGENTS.md               # Full project conventions for anyone (human or AI) working on this repo
DESIGN.md               # Original design system reference
```

## Routes

| Path | Purpose |
|---|---|
| `/` | The homepage — everything scrolls on one page |
| `/work/development` | Full list of software/development projects |
| `/work/designs` | Full list of graphic design projects; `?project=<id>` drills into one project's photo masonry |
| `/work/photography` | Same pattern as Designs, for photography |

## Getting started

```bash
npm install
```

### Local development (hot-reload)

```bash
npm run serve
```

### Production build

```bash
npm run build
```

Outputs to `dist/`. Requires Node ≥ 22 (see `.nvmrc` / `package.json` `engines`).

### Configuration reference

See the [Vue CLI Configuration Reference](https://cli.vuejs.org/config/) for `vue.config.js` options.

## Security

- Security headers (CSP, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS) are set in [`vercel.json`](vercel.json)
- No forms, no user input, no authentication — the site has no traditional injection surface
- Analytics loads same-origin via `@vercel/analytics/vue`, not a third-party CDN script
- Production builds ship without source maps

## Conventions

This repo has real house rules — how sections are structured, the exact design tokens to use, the workflow for proposing a change before writing code, and a list of non-obvious gotchas. Read **[`AGENTS.md`](AGENTS.md)** before making changes, whether you're a human contributor or an AI coding agent.
