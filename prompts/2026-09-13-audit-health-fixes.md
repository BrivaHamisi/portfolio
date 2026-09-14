# Audit Health Fixes

## Goal
- Resolve the reported accessibility, reduced-motion, responsive touch-target, theming, and image-loading issues from the 17/20 audit.

## Files touched
- `src/components/navbar.vue`
- `src/components/sections/LandingPlatform.vue`
- `src/components/sections/latestWork.vue`
- `src/components/sections/whatIdo.vue`
- `src/components/sections/ContactUs.vue`
- `src/components/sections/Testimonial.vue`
- `src/components/ImageLightbox.vue`
- `src/components/MasonryGrid.vue`
- `src/components/ProjectModal.vue`
- `src/components/WorkProjectCard.vue`
- `src/components/Footer.vue`
- `src/components/sections/AboutMeSection.vue`
- `src/components/sections/ExperienceSection.vue`
- `src/views/DevelopmentView.vue`
- `src/views/DesignsView.vue`
- `src/views/PhotographyView.vue`

## Approach
- Add mobile-menu `aria-expanded`, `aria-controls`, and state-aware accessible labels; ensure mobile links close the menu.
- Centralize the reduced-motion decision in a small browser-safe helper pattern and apply it to every existing smooth-scroll handler.
- Raise ghost, outline, platform, and mobile CTA controls to a comfortable 44px minimum target without changing their visual language.
- Fix tab numeral contrast, replace the lone off-system `rounded-lg`, and mark decorative SVGs as hidden from assistive technology.
- Prevent the desktop-only hero image from loading on mobile using responsive image sources, and add intrinsic image dimensions/aspect-ratio reservations to masonry and modal imagery where the source data permits.
- Avoid unrelated refactors, content changes, or asset deletion; leave the existing asset-size warnings documented as residual risk.

## Verification
- Run the detector against every changed Vue file.
- Run `npm run build`.
- Run `npm run serve` and inspect the mobile menu, hero, resume controls, latest-work tabs, modals, masonry, and decorative icons at approximately 320px, 390px, 768px, and desktop widths.
- Verify reduced-motion behavior with the browser preference enabled and keyboard navigation for the mobile menu and tabs.