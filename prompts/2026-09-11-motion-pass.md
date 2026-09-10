# Motion Pass — Scroll Reveals + Supporting Animation

## Goal

Add purposeful motion consistent with the Linear-inspired reskin: restrained, fast, compositor-cheap (opacity/transform only), no new dependency. Ran this through the `impeccable` skill's `animate` playbook first — its core warning is that "fade-and-rise on every scrolled section" is decoration, not a thesis, so this isn't a blanket AOS-style treatment. Below is the actual motion thesis before any implementation.

## Motion thesis (per the skill's required format)

- **Focal moment:** the hero (`LandingPlatform.vue`) gets one authored entrance sequence on page load — kicker → headline → typewriter line → body copy → CTA button → portrait, each stepping in with a short stagger. This is the one sequence that earns bespoke treatment, since a portfolio is "Experience" mode — the hero is the work being shown, not just another section.
