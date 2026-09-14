# Mobile Sticky Navbar

## Goal
- Keep the navbar visible while scrolling on mobile and preserve the desktop navigation behavior.

## Files touched
- `src/components/navbar.vue`
- `src/App.vue`

## Approach
- Move the navbar from detached `fixed` positioning to `sticky top-0` positioning in normal document flow.
- Remove the GPU transform used by the fixed implementation.
- Change the app content offset from `pt-32` to the navbar's actual `pt-16` height so the page does not begin with an unnecessary gap.
- Preserve the existing mobile menu, ARIA state, z-index, and desktop/mobile breakpoints.

## Verification
- Run `npm run serve` and scroll the homepage at approximately 320px and 390px widths.
- Confirm the navbar remains visible at the top while scrolling, the open mobile menu stays attached to it, and the hero content is not excessively offset.
- Check desktop width and run `npm run build`.