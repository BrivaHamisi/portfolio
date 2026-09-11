# Linear — Style Reference
> midnight precision instrument

**Theme:** dark

Linear's design system is a midnight command center built on near-black surfaces (#08090a) with paper-white type and one electric acid-lime accent (#e4f222) that functions as a functional flashlight — small, high-contrast, and used sparingly to signal action. The interface treats darkness as a substrate rather than a theme: text is crisp white at tight tracking (-0.022em), weights sit in a low 400–510 band rather than bold, and borders are hairline-thin (0.5px) to let geometry do the work that shadows usually would. Components feel precision-machined — 6px and 12px radii, compact 8–12px paddings, and almost no decorative ornament — letting the product UI (issue cards, kanban boards, AI agent panels) be the only visual texture in an otherwise quiet system.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Void | `#08090a` | `--color-void` | Page canvas, full-bleed backgrounds — the default everything sits on |
| Carbon | `#0f1011` | `--color-carbon` | Card surfaces, nav bars — one step above canvas for contained content |
| Obsidian | `#161718` | `--color-obsidian` | Elevated surfaces, deeper card panels |
| Graphite | `#23252a` | `--color-graphite` | Subtle borders, dividers, ghost button outlines — low-contrast structural edges |
| Smoke | `#383b3f` | `--color-smoke` | Hairline borders at higher contrast than graphite — section separators |
| Ash | `#62666d` | `--color-ash` | Muted body text, inactive icons, secondary metadata |
| Fog | `#8a8f98` | `--color-fog` | Tertiary text, placeholder copy, icon fills |
| Mist | `#d0d6e0` | `--color-mist` | Secondary headings, button text on dark surfaces |
| Bone | `#e5e5e6` | `--color-bone` | Near-white surface fills, high-contrast button text |
| Paper | `#ffffff` | `--color-paper` | Primary headings, hero type, max-contrast emphasis text |
| Acid Lime | `#e4f222` | `--color-acid-lime` | Primary action buttons, active nav indicators — electric accent that breaks the monochrome system |
| Pulse Green | `#27a644` | `--color-pulse-green` | Green outline accent for tags, dividers, and focused UI edges. Use as a supporting accent, not as a status color |
| Coral Red | `#eb5757` | `--color-coral-red` | Red wash for highlight backgrounds, decorative bands, and soft emphasis behind content. Use as a supporting accent, not as a status color |
| Signal Teal | `#02b8cc` | `--color-signal-teal` | Decorative accent, informational icon fills |
| Iris Violet | `#6366f1` | `--color-iris-violet` | Tag/badge fills — soft chromatic punctuation on tags and labels |
| Lavender | `#8b5cf6` | `--color-lavender` | Secondary tag fills, category indicators |

## Tokens — Typography

### Inter Variable — Primary UI and heading typeface — used across nav, body, headings, buttons, cards · `--font-inter-variable`
- **Substitute:** Inter (variable), or system-ui as fallback
- **Weights:** 300, 400, 510, 590
- **Sizes:** 10, 11, 12, 13, 14, 15, 16, 17, 20, 24, 32, 48, 64, 72
- **Line height:** 1.0–2.75
- **Letter spacing:** -0.022em at 48–72px, -0.012em at 20–32px, -0.011em at 15px, -0.010em at 13–16px
- **OpenType features:** `"cv01" on, "ss03" on, "zero" on`
- **Role:** Primary UI and heading typeface — used across nav, body, headings, buttons, cards

### Berkeley Mono — Code-adjacent UI text — issue IDs (ENG-2703), keyboard shortcuts, monospaced metadata · `--font-berkeley-mono`
- **Substitute:** JetBrains Mono, IBM Plex Mono, or ui-monospace
- **Weights:** 400
- **Sizes:** 12, 14
- **Line height:** 1.40–1.71
- **Letter spacing:** -0.013em
- **OpenType features:** `"cv01" on, "ss03" on`
- **Role:** Code-adjacent UI text — issue IDs (ENG-2703), keyboard shortcuts, monospaced metadata

> **Portfolio note:** this project uses Inter Variable only (loaded from Google Fonts, see `index.html`). Berkeley Mono is not used anywhere in this codebase — nothing here is code-adjacent UI (issue IDs, shortcuts). Don't introduce it without a real use case.

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
| caption | 13px | 1.2 | — | `--text-caption` |
| body-sm | 15px | 1.6 | -0.165px | `--text-body-sm` |
| body-lg | 20px | 1.33 | -0.24px | `--text-body-lg` |
| subheading | 24px | 1.33 | -0.288px | `--text-subheading` |
| heading-sm | 32px | 1.13 | -0.704px | `--text-heading-sm` |
| heading | 48px | 1 | -1.056px | `--text-heading` |
| heading-lg | 64px | 1 | -1.408px | `--text-heading-lg` |
| display | 72px | 1 | -1.584px | `--text-display` |

## Tokens — Spacing & Shapes

**Base unit:** 4px

**Density:** compact

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 20 | 20px | `--spacing-20` |
| 24 | 24px | `--spacing-24` |
| 28 | 28px | `--spacing-28` |
| 32 | 32px | `--spacing-32` |
| 36 | 36px | `--spacing-36` |
| 40 | 40px | `--spacing-40` |
| 48 | 48px | `--spacing-48` |
| 56 | 56px | `--spacing-56` |
| 64 | 64px | `--spacing-64` |
| 80 | 80px | `--spacing-80` |
| 96 | 96px | `--spacing-96` |
| 128 | 128px | `--spacing-128` |

### Border Radius

| Element | Value |
|---------|-------|
| cards | 12px |
| pills | 9999px |
| small | 2px |
| badges | 4px |
| inputs | 6px |
| buttons | 6px |

### Shadows

| Name | Value | Token |
|------|-------|-------|
| sm | `rgba(0, 0, 0, 0.4) 0px 2px 4px 0px` | `--shadow-sm` |
| md | `rgba(0, 0, 0, 0.2) 0px 0px 12px 0px inset` | `--shadow-md` |
| subtle | `rgb(35, 37, 42) 0px 0px 0px 1px inset` | `--shadow-subtle` |
| subtle-2 | `rgba(0, 0, 0, 0.2) 0px 0px 0px 1px` | `--shadow-subtle-2` |
| subtle-3 | `rgba(0, 0, 0, 0.01) 0px 5px 2px 0px, rgba(0, 0, 0, 0.04) ...` | `--shadow-subtle-3` |
| xl | `rgba(8, 9, 10, 0.6) 0px 4px 32px 0px` | `--shadow-xl` |
| subtle-4 | `rgba(255, 255, 255, 0.03) 0px 0px 0px 1px inset, rgba(255...` | `--shadow-subtle-4` |
| subtle-5 | `rgba(0, 0, 0, 0.1) 0px 0px 0px 2px` | `--shadow-subtle-5` |

### Layout

- **Page max-width:** 1200px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 8px

## Components

### Primary Action Button (Acid Lime)
**Role:** High-emphasis CTA — the one chromatic button in the system

Background #e4f222, text #08090a, border-radius 6px, padding 10px 16px, Inter 14px / weight 510, letter-spacing -0.011em. Sits as the sole filled chromatic element — every other button on the site is neutral.

### Nav Text Button
**Role:** Top navigation items

Transparent background, text #d0d6e0, padding 8px 12px, Inter 13px / weight 400. No border, no fill — pure typographic nav with underline on hover.

### Pill Button
**Role:** Tag chips, status pills, compact action triggers

Background rgba(255,255,255,0.05), text #d0d6e0, border-radius 9999px, padding 4px 12px, Inter 12–13px / weight 400.

### Ghost / Outline Button
**Role:** Secondary actions, less prominent CTAs

Transparent background, border 1px #23252a, text #d0d6e0, border-radius 6px, padding 8px 12px, Inter 13px / weight 400.

### Sign-up Button (Rounded Pill, Neutral)
**Role:** High-emphasis nav CTA

Background #ffffff, text #08090a, border-radius 9999px, padding 8px 16px, Inter 13px / weight 510. White pill against the dark nav bar — the second highest-contrast element after the acid-lime CTA.

### Card (Product Screenshot Frame)
**Role:** Large showcase surface for product UI screenshots

Background #0f1011, border-radius 12px, inset shadow rgb(35,37,42) 0 0 0 1px, padding 24px. Hairline inner border defines the card edge — no outer shadow, no glow.

### Card (Subtle)
**Role:** Small content cards, nested panels

Background rgba(255,255,255,0.02), border-radius 6px, shadow rgba(0,0,0,0.4) 0 2px 4px, padding 8px. Almost invisible — the card barely separates from the canvas.

