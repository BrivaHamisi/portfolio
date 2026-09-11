# Social share preview (OG/Twitter meta)

## Goal

Links to the site (including the new lightbox Share button, which shares a deep link) currently show no custom preview card on LinkedIn/X/Slack/etc. — just a bare URL or generic fallback. Add proper Open Graph / Twitter Card metadata plus a real preview image.

## Files touched

- `public/index.html` — add `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`, and a real `<meta name="description">` (currently missing/default).
- `public/images/og-image.jpg` — new, a landscape (1200x630) crop of the existing `Briva.jpg` portrait, generated locally (a real photo of Briva, not a fabricated asset).

## Approach

- Static meta tags only (this is a static SPA with no per-route SSR, so all `/work/*` sub-pages will share the same homepage preview card — acceptable for a site this size, matches how `index.html`'s other `<head>` tags already work).
- Crop centered on the subject's head/shoulders from `Briva.jpg` rather than squashing/stretching the existing hero cutout PNG (which has transparency and would render badly in a social card).

## Verification

- View source / inspect `public/index.html` head after build for correct tag values.
- `npm run build` succeeds; visually confirm `dist/index.html` carries the same tags.
- Note: can't test actual link-unfurling (LinkedIn/X scraper) without a public deployment — flagged as something to spot-check once deployed.
