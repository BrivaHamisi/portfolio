# Fix Implementation Integrity / Accessibility Audit Findings

## Goal

Address the code-level findings from the pasted audit report (P1/P2/P3): broken/dead code, accessibility gaps, off-palette colors, heading hierarchy, touch targets, and oversized images. Improve the Audit Health Score without changing the site's actual visual identity (dark gray + orange-500) or content structure.

## Files touched

- `src/components/navbar.vue`
- `src/components/Footer.vue`
- `src/components/sections/latestWork.vue`
- `src/components/sections/LandingPlatform.vue`
- `src/components/sections/AboutMeSection.vue`
- `src/components/sections/whatIdo.vue`
- `src/components/sections/ExperienceSection.vue`
- `src/components/sections/ExperienceStats.vue`
- `src/components/sections/Testimonial.vue`
- `src/components/sections/ContactUs.vue`
- `src/components/modals/graphicsDesign.vue` (deleted)
- `src/views/HomeView.vue`
- `src/router/index.js`
- `src/App.vue`
- `public/index.html`
- `public/apple-touch-icon.png` (new, generated)
- `tailwind.config.js` (only if D4 below is approved)
- Largest files in `public/images/*` (only if batch F below is approved)

## Verified against source before writing this prompt

I read every file above and compiled `latestWork.vue`'s `<template>` with `@vue/compiler-sfc` directly (not just grep) to check one specific claim. **Finding: the "`#latestWork` nav target is broken because of a fragment root" claim does not reproduce.** The compiled render function returns a single `_createElementBlock("div", ...)` at the top level — `latestWork.vue` has one real root element that wraps both the project grid and the `<teleport>`, so Vue's automatic attribute fallthrough applies normally and `id="latestWork"` should attach correctly. I'm not "fixing" this (batch G below) — I'd rather tell you a claim didn't check out than spend a change on a non-bug. Please still click "Latest Work" once after the other fixes land, just to be sure I'm not missing a runtime-only symptom.

Everything else below I confirmed by reading the actual line the finding cites.

## Approach, batched

### A — Accessibility
1. `navbar.vue`: give each menu `<a>` a real `:href="item.route"`, keep the existing smooth-scroll behavior via `@click` with `preventDefault()` only when handling it in-page (so keyboard/AT users, right-click "copy link," and no-JS all work; same-page clicks still smooth-scroll as today).
