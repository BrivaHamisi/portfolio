# Resume Career Snapshot

## Goal
- Make the My Resume section more appealing and easier to scan while preserving its existing content and responsive timeline behavior.

## Files touched
- `src/components/sections/ExperienceSection.vue`

## Approach
- Add a small career-journey eyebrow and supporting introduction to give the section a stronger opening hierarchy.
- Add a compact three-metric summary using existing factual data: years of experience, experience entries, and education milestones.
- Refine timeline headings, metadata, spacing, and mobile stacking without changing the underlying content, load-more behavior, or Download CV action.

## Verification
- Run `npm run serve` and inspect the Resume section at approximately 320px, 390px, 768px, and desktop width.
- Confirm the summary remains readable, the timelines scan clearly, Load more still works, and the Download CV link remains prominent.
- Run `npm run build`.