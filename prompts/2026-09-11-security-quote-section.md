# Add a Pull-Quote Section (Gene Spafford)

## Goal

Add a standalone, visually striking pull-quote section to the homepage carrying the Gene Spafford security quote, styled to match the Linear design system (restrained, high-contrast, acid-lime used sparingly as the one accent) rather than looking like a generic testimonial or stock "quote block."

Quote:
> "The only truly secure system is one that is powered off, cast in a block of concrete and sealed in a lead-lined room with armed guards."
> — Gene Spafford

## Files touched

- `src/components/sections/QuoteSection.vue` — **new.**
- `src/views/HomeView.vue` — import + place the new section.

## Placement — decision needed

I'd default to placing it **between "My Resume" (`ExperienceSection`) and "Professional Recommendations" (`Testimonial`)** — it works as a pacing breather between the dense resume block and the testimonials, and a security-themed quote reads naturally right after a section listing your engineering experience. Say the word if you want it somewhere else (e.g. right after the hero, or between Skills and Experience).

## Approach

A single full-width section, quiet canvas, one large typographic moment — no card, no border, no icon-heavy decoration:

```html
<div v-reveal class="bg-void w-full py-24">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <svg class="w-10 h-10 text-acid-lime opacity-80 mx-auto mb-6" viewBox="0 0 24 24" fill="currentColor">
      <!-- same quote-mark glyph already used in Testimonial.vue, reused for visual consistency -->
