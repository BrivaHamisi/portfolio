# Stunning Mobile Latest Work Tabs

## Goal
- Make the Latest Work tabs feel intentional and premium on narrow screens instead of looking like a plain two-column button grid.
- Preserve the existing accessible ARIA tabs behavior and the established desktop tab treatment.

## Files touched
- `src/components/sections/latestWork.vue`

## Approach
- Style the mobile tablist as a compact carbon segmented panel with a graphite border, small internal spacing, and two balanced columns.
- Give each mobile tab a stable touch-friendly height, stronger active surface, and a small ordinal cue (`01`–`04`) to improve scanning and visual rhythm.
- Keep the acid-lime active text/indicator restrained, preserve keyboard focus visibility and arrow-key navigation, and restore the current centered underline layout at the `sm` breakpoint and above.

## Verification
- Run `npm run serve` and inspect the Latest Work section at approximately 320px, 390px, 768px, and desktop width.
- Confirm the mobile control has no overflow, all labels remain readable, active/focus states are obvious, and switching tabs still renders the correct panel.
- Run `npm run build`.