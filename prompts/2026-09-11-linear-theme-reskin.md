# Re-theme the Portfolio to the "Linear" Design System

## Goal

Replace the current dark-gray + orange-500 visual identity with the supplied "Linear" design system: void-black (`#08090a`) canvas, acid-lime (`#e4f222`) as the single sparing accent, Inter Variable typography at tight tracking and restrained weights (400–590, no bold 700+), hairline-border cards instead of shadows, and Linear's exact spacing/radius/shadow tokens. This is a **visual re-skin only** — no content, copy, route, or interaction-logic changes. All the accessibility/functional fixes from the previous audit pass (focus trap, scroll-spy, tel/mailto links, etc.) stay exactly as they are; only their classes/colors change.

## Source

The three token dumps you pasted (Markdown style guide, CSS custom properties, Design Tokens JSON) are the same 16 colors + 2 font families + full type/spacing/radius/shadow scale, just in three formats. Treating the Markdown doc as the single source of truth below.

## Scope check I ran first

- `orange-500`/`600`/`300`/`400` appears in 9 files (Footer, Testimonial, latestWork ×3, whatIdo ×2, ExperienceStats ×2, AboutMeSection ×2, LandingPlatform ×3, ContactUs ×6, ExperienceSection ×11)
- `bg-gray-900/800/700` appears in 11 files
- `font-bold` (Tailwind 700) appears in 8 files — all need to drop to weight 510 or 590, since Linear caps at 590
- `rounded-lg/full/md` appears in 8 files — good news: Tailwind's default radius scale already matches Linear's almost exactly (`rounded-sm`=2px, `rounded`=4px, `rounded-md`=6px, `rounded-xl`=12px, `rounded-full`=9999px), so radius classes mostly just need auditing, not new config.

Every component file in `src/` is touched by this reskin. That's expected for a full re-theme.

## Files touched

- `tailwind.config.js` — add all Linear tokens
- `public/index.html` — swap in Inter Variable font link, update `theme-color` to `#08090a`
- `src/App.vue` — global font-family, body background
- `src/components/navbar.vue`
- `src/components/Footer.vue`
- `src/components/sections/LandingPlatform.vue`
- `src/components/sections/AboutMeSection.vue`
- `src/components/sections/whatIdo.vue`
- `src/components/sections/ExperienceStats.vue`
- `src/components/sections/ExperienceSection.vue`
- `src/components/sections/latestWork.vue`
- `src/components/sections/Testimonial.vue`
- `src/components/sections/ContactUs.vue`

## Approach

### 1. Foundation (`tailwind.config.js`, `index.html`, `App.vue`)

- `tailwind.config.js` → `theme.extend`:
  - `colors`: all 16 tokens (`void`, `carbon`, `obsidian`, `graphite`, `smoke`, `ash`, `fog`, `mist`, `bone`, `paper`, `acid-lime` (Tailwind-safe key `'acid-lime'` or `acidlime`), `pulse-green`, `coral-red`, `signal-teal`, `iris-violet`, `lavender`) — one-to-one from the doc.
  - `fontFamily.sans`: `['Inter Variable', 'Inter', 'ui-sans-serif', 'system-ui', ...]` (Berkeley Mono isn't needed — nothing in this portfolio is code-adjacent UI like issue IDs or shortcuts, so I'm skipping that font entirely rather than importing something unused).
  - `fontSize`: add named tokens matching the type scale table (`caption`, `body-sm`, `body-lg`, `subheading`, `heading-sm`, `heading`, `heading-lg`, `display`) as `[size, { lineHeight, letterSpacing }]` tuples, so classes like `text-heading-lg` carry the correct tracking automatically instead of hand-writing arbitrary values everywhere.
  - `boxShadow`: add `card` (Linear's `shadow-subtle`, the hairline inset border trick), `cta` (the acid-lime button's inset shadow stack), and `sm` (Linear's `shadow-sm`) — reused across cards/buttons instead of repeating raw values.
  - Leave `borderRadius` alone — Tailwind's defaults already match Linear's radius vocabulary (2/4/6/12/9999px).
- `index.html`: replace the two inert `preconnect` tags' unused purpose by adding the actual stylesheet: `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300..700&display=swap">` (variable-range request gets us any weight 300–700, covering Linear's 300/400/510/590 via arbitrary `font-[510]`/`font-[590]` utility classes). Change `theme-color` from the `#111827` I set in the last pass to `#08090a` (void).
- `App.vue`: `#app` font-family → the new Inter stack; add `bg-void text-mist` as the base canvas/text so every section doesn't need to repeat it.

### 2. Navigation (`navbar.vue`)
