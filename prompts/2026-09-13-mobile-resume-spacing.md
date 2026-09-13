# Mobile Resume Spacing

## Goal
- Improve mobile margins and readability around the My Resume hero action and the Resume section's Experiences and Education timelines.
- Keep the desktop layout, content, and timeline behavior unchanged.

## Files touched
- `src/components/sections/LandingPlatform.vue`
- `src/components/sections/ExperienceSection.vue`

## Approach
- Give the hero action group a mobile-safe width and spacing so the My Resume and Get in Touch buttons do not feel cramped or wrap awkwardly.
- Increase the Resume section's mobile side padding and vertical rhythm while retaining the existing tighter desktop spacing.
- Preserve the timeline structure, responsive two-column desktop layout, and existing design tokens.

## Verification
- Run `npm run serve` and inspect the hero and Resume section at approximately 320px, 390px, 768px, and desktop width.
- Confirm both hero buttons fit cleanly, timeline text has comfortable side margins, and the desktop layout remains unchanged.
- Run `npm run build`.