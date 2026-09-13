# Responsive Latest Work Tabs

## Goal
- Make the Latest Work category tabs easier to scan and use on mobile without changing their ARIA tabs behavior or desktop appearance.

## Files touched
- `src/components/sections/latestWork.vue`

## Approach
- Replace the mobile `flex-wrap` layout with a two-column grid so all four categories have equal-width, predictable placement on narrow screens.
- Keep the existing centered inline tab layout from the `sm` breakpoint upward.
- Preserve the current active-state underline, focus behavior, keyboard navigation, labels, and tab/panel semantics.

## Verification
- Run `npm run serve` and inspect the Latest Work section at approximately 320px, 390px, 768px, and desktop width.
- Confirm labels do not overflow, active and focus states remain visible, and switching tabs still renders the correct panel.
- Run `npm run build`.
