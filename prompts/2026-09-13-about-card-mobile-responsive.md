# About Card Mobile Responsiveness

## Goal
- Give the About Briva Hamisi card comfortable outer margins on narrow mobile screens and make its content feel balanced and readable without changing its desktop composition.

## Files touched
- `src/components/sections/AboutMeSection.vue`

## Approach
- Add explicit horizontal outer margins to the card on mobile so it does not touch the viewport edges; restore the wider container behavior from `sm` upward.
- Reduce the card's mobile padding while preserving the existing larger spacing from `sm` upward.
- Give the profile image a stable mobile portrait frame with `object-cover`, then restore the desktop full-height image treatment at `lg`.
- Scale the About heading and role line responsively so long text does not dominate or squeeze the card.
- Keep the skill bars in one column on narrow screens and switch to two columns from `sm` upward; preserve the existing Load More behavior.

## Verification
- Run `npm run serve` and inspect the About card at approximately 320px, 390px, 768px, and desktop width.
- Confirm the image, heading, role line, paragraphs, skill bars, and Load More control do not overflow or feel cramped.
- Run `npm run build`.