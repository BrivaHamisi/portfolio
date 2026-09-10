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
2. `navbar.vue`: replace the never-set `item.current` with a real scroll-spy — an `IntersectionObserver` over the six section ids (`home,about,skills,latestWork,experience,contact`) drives an `activeSection` ref; nav highlight compares `item.ref === activeSection`.
3. `Footer.vue`: add an accessible name per icon link (`aria-label="Facebook"`, `"Instagram"`, `"X (Twitter)"`, `"GitHub"`, `"LinkedIn"`).
4. `latestWork.vue` modal: add `role="dialog"`, `aria-modal="true"`, `aria-labelledby` (pointing at an `id` added to the project-title `<h2>`), close on `Escape`, a basic `Tab`-cycle focus trap inside the modal, focus the close button on open, restore focus to the thumbnail that opened it on close, and lock body scroll (`document.body.style.overflow`) while open.
5. Heading hierarchy: `LandingPlatform.vue` — promote "Hi, I'm Briva Hamisi" to the page's one `<h1>`, demote "Welcome to my website" to a `<p>` with the same classes. Demote the other section `<h1>`s to `<h2>`: `AboutMeSection.vue` ("About Briva Hamisi"), `whatIdo.vue` ("What I Do"), `ExperienceSection.vue` ("My Resume").
6. `ContactUs.vue`: make phone/email tappable — `<a href="tel:+254702111468">` / `<a href="mailto:briva.digital@gmail.com">` around the existing text.
7. Touch targets: bump `p-2` → `p-3` on the navbar hamburger and the modal's close/prev/next buttons (24px icon + 12px×2 padding = 48px, clears the 44px minimum).
8. Anchor scroll offset: add `scroll-mt-20` to each section wrapper carrying an id, so the fixed `h-16` navbar stops covering the section heading after a jump/scroll-spy click.

### B — Dead / broken code
1. `HomeView.vue`: delete the unused `import { Analytics } from "@vercel/analytics/react"` line — analytics already runs via the `<script>` tag in `index.html` plus the `window.va` snippet in `App.vue`; this import is a no-op React import sitting in a Vue file.
2. Delete `src/components/modals/graphicsDesign.vue` — confirmed via `grep -rn "graphicsDesign"` that nothing imports or renders it. It also points at a broken placeholder image (`/path-to-your-image.jpg`) and uses an unrelated off-brand green/red palette for a project ("Hesabika") that isn't in Latest Work.
3. `router/index.js`: remove the `generateMetadata()` helper and its usage — **decision needed, see below.**
4. `App.vue`: remove the leftover Vue-CLI scaffold CSS (`#app`, `nav`, `nav a`, `.router-link-exact-active`) — confirmed dead, since nothing in the app uses `<router-link>` and the real nav is styled entirely by Tailwind classes in `navbar.vue`.
5. `Testimonial.vue`: remove the inert "View More" button — **decision needed, see below.**

### C — Copy fixes
1. `latestWork.vue`: "Sofwatware Development" → "Software Development".
2. `ExperienceSection.vue`: "Kabarak Universty" → "Kabarak University".
3. `latestWork.vue`: `year: '2024. 2023'` → `'2023 – 2024'`.
4. `AboutMeSection.vue` bio "3 years of experience" vs. `ExperienceStats.vue`'s "6+ Years Experience" — **decision needed, see below.**

### D — Color consistency
1. `LandingPlatform.vue`: typewriter text `text-yellow-400` → `text-orange-500`.
2. `latestWork.vue` modal: client/type `text-blue-400` labels → **decision needed, see below.**
3. `ContactUs.vue`: arbitrary `bg-[#cd3700]` WhatsApp button → `bg-orange-500 hover:bg-orange-600`, matching every other button on the site.
4. Add a real `brand`/`accent` Tailwind token instead of literal `orange-500` classes everywhere — **optional, decision needed, see below.**

### E — Meta / favicon
1. Generate `public/apple-touch-icon.png` (180×180) from `public/images/BH_Monogram.png` via `sips` so the existing `<link rel="apple-touch-icon">` in `index.html` stops 404ing.
2. `index.html`: `<meta name="theme-color" content="#ffffff">` → `#111827` (Tailwind `gray-900`) to match the actual dark theme.

### F — Image optimization (binary asset changes, reversible via git)
1. Resize/recompress in place with `sips` (same filename, no code changes needed) — targeting ~1920px max dimension and ~75% JPEG quality: `mockup_4.jpg` (8.0M), `mockup_6.jpg` (6.3M), `UI_1.png` (4.6M), `UI_Design3.jpg` (3.0M), `mockup_7.jpg`/`mockup_5.jpg` (2.6M ea.), `MobileUI.jpg` (2.6M), `UIDesign.jpg` (2.5M), `UIDesign_2.jpg` (2.3M), `mockup_1.jpg` (2.1M), `mockup_3.jpg` (2.0M), `UI_Mockup4.jpg`/`sw_1.jpg`/`sw_2.jpg`/`sw_3.jpg` (1.3M ea.). Expect ~80–90% size reduction with no visible on-screen quality loss.
2. `latestWork.vue`: add `loading="lazy"` plus explicit `width`/`height` to grid thumbnails and modal carousel images, to cut CLS and defer offscreen fetches.
3. Diffs on binary files don't show in a normal git diff — I'll report before/after file sizes in the final summary so you can judge the tradeoff, and it's fully reversible with `git checkout -- public/images/` if you don't like the result.

### G — Not changing
1. The `#latestWork` id/fragment-root claim (see "Verified against source" above) — no change, flagged only.

## Decisions (I'll use the bolded default if you just approve this prompt as-is)

1. **B3 route meta** — delete the dead `generateMetadata()` code, or wire it to actually set `document.title` per route? **Default: delete** (there's only one route today, so live head-swapping has near-zero value, and it's dead code either way until a second route exists).
2. **B5 "View More"** — remove the button, or link it somewhere? **Default: remove** (there's no testimonials archive page to view more of).
3. **C4 experience-years mismatch** — update the About bio's "3 years" to "6+ years" to match `ExperienceStats.vue`, or leave the bio number as-is and just flag the mismatch to you? **Default: update to "6+ years."**
4. **D2 blue labels in the work modal** — recolor to `text-orange-500`, or a neutral `text-gray-200`? **Default: `text-gray-200`** — orange is already used for the heading right above it, and repeating it on every label reads louder than the current design intends.
5. **D4 Tailwind color token** — add `brand`/`accent` tokens to `tailwind.config.js`, or leave literal `orange-500` classes as-is? **Default: skip this** (it's a refactor, not a bug fix — only D1–D3's three concrete off-palette values get touched).
6. **Batch F (images)** — run it now with everything else, or hold it for a separate follow-up prompt after you see the rest land? **Default: run it now**, since it's the single highest-impact item on the whole list (8MB+6.3MB+4.6MB+... of avoidable first-load weight) and is reversible via git.

## Verification

- `npm run serve` and manually check: keyboard-only navigation through the navbar (Tab, Enter) and the work modal (Tab cycles inside it, Escape closes, focus returns to the thumbnail); nav highlight follows scroll position; tel:/mailto: links on mobile width; all touch targets visually ≥44px; heading outline via browser dev tools (one `<h1>`, sensible `<h2>`s).
- `npm run build` to confirm production build still compiles clean.
- Visual check of every color change against the dark/orange palette (no visual regressions).
- If batch F runs: compare `du -sh public/images/*` before/after and spot-check a couple of resized images at 100% zoom for visible quality loss.
- Review the final git diff (including deleted `graphicsDesign.vue` and the `App.vue` style cleanup) before calling this done.
