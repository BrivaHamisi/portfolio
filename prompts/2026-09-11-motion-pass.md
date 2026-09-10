# Motion Pass — Scroll Reveals + Supporting Animation

## Goal

Add purposeful motion consistent with the Linear-inspired reskin: restrained, fast, compositor-cheap (opacity/transform only), no new dependency. Ran this through the `impeccable` skill's `animate` playbook first — its core warning is that "fade-and-rise on every scrolled section" is decoration, not a thesis, so this isn't a blanket AOS-style treatment. Below is the actual motion thesis before any implementation.

## Motion thesis (per the skill's required format)

- **Focal moment:** the hero (`LandingPlatform.vue`) gets one authored entrance sequence on page load — kicker → headline → typewriter line → body copy → CTA button → portrait, each stepping in with a short stagger. This is the one sequence that earns bespoke treatment, since a portfolio is "Experience" mode — the hero is the work being shown, not just another section.
- **Continuity:** the work modal's open/close is currently an instant `v-if` snap — that's a real state change (closed → open) that deserves a transition to stay legible, so it gets a fade+scale via Vue's `<Transition>`. Nav active-state color (scroll-spy) currently snaps too — gets a quick color transition.
- **Feedback:** buttons already have `hover:brightness-95`; ghost buttons already have `hover:border-smoke`. Extending the same border-brighten pattern to the Latest Work grid cards and testimonial cards (currently only the image scales on hover, the card itself gives no signal it's interactive).
- **Reveal:** section entrances get a single shared, restrained reveal (opacity 0→1, translateY 12px→0, 400ms, IntersectionObserver-triggered once, never re-triggers on scroll back up). Per the skill, sibling stagger is sanctioned specifically for content that reads as a list — so the 4 stat tiles (`ExperienceStats.vue`), 3 service tiles (`whatIdo.vue`), the work grid (`latestWork.vue`), and the 3 testimonial cards (`Testimonial.vue`) get a small per-item stagger (60ms step, capped at ~360ms total). Everything else reveals as a single block, not a staggered list — reinterpreting every section as "a list of its children" is exactly the generic pattern the skill warns against.
- **Budget:** IntersectionObserver (not scroll listeners), transform+opacity only (GPU-compositable, no layout thrash), one-shot per element, `prefers-reduced-motion: reduce` collapses everything to an immediate, transform-free appearance — feedback/state transitions stay (they carry meaning) but spatial movement drops out.

## Timing/easing (from the skill's table, applied to this project)

- Feedback (hover/color changes): 150–200ms, standard ease.
- Section reveals: 400ms, `cubic-bezier(0.16, 1, 0.3, 1)` (confident deceleration, no bounce).
- Modal open: 300ms in, faster (200ms) on close — exit faster than entrance per the skill.
- Hero focal sequence: 500–600ms per element with ~80ms stagger step — this is the one place a longer, more deliberate duration is earned.

## Approach — no new dependency

Implemented as a small Vue custom directive (`v-reveal`), registered globally in `main.js`, plus a few lines of CSS in `src/index.css`. This is a Vue-idiomatic, framework-native approach — no GSAP/AOS/Framer Motion, matching the project's "no dependency without clear reason" rule.

### 1. `src/main.js` — register the directive

- A `v-reveal` directive: on `mounted`, add a `reveal` class (opacity 0, translateY 12px) unless `prefers-reduced-motion: reduce` is set; observe the element with a shared `IntersectionObserver` (threshold 0.15); on intersect, add `is-visible` and unobserve (one-shot). Accepts an optional stagger index (`v-reveal="i"`) to set `transition-delay` via inline style, capped at 360ms.

### 2. `src/index.css` — the reveal CSS + reduced-motion guard

```css
.reveal {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 400ms cubic-bezier(0.16, 1, 0.3, 1), transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  .reveal, .reveal.is-visible {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

### 3. Apply `v-reveal` to section-level containers (single block, no stagger)

`AboutMeSection.vue` (the card), `whatIdo.vue` (the heading + grid as one block, only the 3 tiles inside stagger), `ExperienceSection.vue` (heading/CV button block, Experiences column, Education column), `ContactUs.vue` (both cards), `Testimonial.vue` (the left copy column).

### 4. Apply `v-reveal="index"` for the sanctioned list cases (staggered)

