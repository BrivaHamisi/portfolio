=== foundation rules ===

# Portfolio Agent Guidelines

These guidelines are specific to this repository. Follow them closely; they reflect how this project is actually built, not an idealized stack.

## Foundational Context

This is a personal portfolio for Briva Hamisi (Software Engineer / Full-Stack Developer / Creative Designer), built with **Vue 3** on the **Vue CLI (webpack)** toolchain — not Vite. It is plain **JavaScript** (a `jsconfig.json` provides the `@/*` path alias for editor tooling only; there is no TypeScript compiler in the build). Styling is **Tailwind CSS** with hand-written utility classes. Routing is **Vue Router 4** — the homepage (`/`) is one long scrolling page, plus two "view more" pages under `/work/*` (Graphic Design, Photography) for browsing a work category's full project list. There is no backend, API, database, or CMS — all content is static, hardcoded in components or small `src/data/*.js` files, and served from `public/`.

Before assuming a package's API, check `package.json` for the installed version rather than assuming the latest docs apply.

## Skills Activation

Activate `vue-best-practices` and `vue-router-best-practices` when touching components or routing. Activate `web-design-guidelines` when reviewing or changing layout, accessibility, or responsive behavior. There are no project-local skills under `**/skills/**` in this repo.

## Conventions

