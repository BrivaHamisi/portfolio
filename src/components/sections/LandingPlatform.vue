<template>
  <div class="relative min-h-screen overflow-hidden bg-void">
    <!-- Content -->
    <div class="relative z-30 flex items-center min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="text-paper w-full lg:w-1/2 text-left">
        <h1 class="hero-in [transition-delay:0ms] text-heading-lg md:text-display text-paper font-[510] mb-2" :class="{ 'is-visible': heroVisible }">
          Hi, I'm <span class="text-paper">Briva Hamisi</span>
        </h1>
        <div class="hero-in [transition-delay:80ms] text-subheading text-mist h-12 mb-4 font-[510]" :class="{ 'is-visible': heroVisible }">
          <span ref="typewriter"></span>
        </div>
        <p class="hero-in [transition-delay:160ms] text-body-sm text-fog max-w-2xl mb-8" :class="{ 'is-visible': heroVisible }">
          I am a Software Engineer, Fullstack Developer, Mobile Apps Developer, Creative Graphic Designer, UI/UX Designer, Video Editor, and Photographer. My passion lies in creating impactful digital experiences across various platforms, combining technical expertise and creativity. Whether it’s building scalable web solutions, designing intuitive mobile apps, or crafting stunning visuals, I bring a comprehensive approach to every project. Let's collaborate and bring your ideas to life!
        </p>
        <div class="hero-in [transition-delay:240ms] flex flex-wrap items-center gap-4" :class="{ 'is-visible': heroVisible }">
          <button
            v-flashlight
            class="px-6 py-3 bg-acid-lime text-void font-[510] text-body-sm rounded-md hover:brightness-95 transition"
            @click="scrollToSection('experience')"
          >
            My Resume
          </button>
          <button
            class="px-6 py-3 border border-graphite text-mist font-[510] text-body-sm rounded-md hover:border-smoke transition-colors duration-150"
            @click="scrollToSection('contact')"
          >
            Get in Touch
          </button>
        </div>
      </div>
      <div class="hero-in [transition-delay:80ms] hidden lg:flex w-1/2 justify-center relative" :class="{ 'is-visible': heroVisible }">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(208,214,224,0.08),_transparent_65%)] pointer-events-none"></div>
        <img src="/images/Banner_Image.png" alt="Briva Hamisi" fetchpriority="high" class="relative w-full h-auto object-contain" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Typewriter from 'typewriter-effect/dist/core';

export default {
  name: 'LandingPage',
  setup() {
    const typewriter = ref(null);
    const heroVisible = ref(false);

    const scrollToSection = (sectionRef) => {
      const sectionElement = document.getElementById(sectionRef);
      const marginTop = 32; // 32px margin

      if (sectionElement) {
        const sectionPosition = sectionElement.getBoundingClientRect().top + window.pageYOffset - marginTop;
        window.scrollTo({
          top: sectionPosition,
          behavior: 'smooth',
        });
      }
    };

    onMounted(() => {
      const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        // An indefinitely looping typewriter is exactly what reduced-motion
        // is meant to suppress — show one representative role as static text.
        if (typewriter.value) {
          typewriter.value.textContent = 'a Software Engineer';
        }
      } else {
        new Typewriter(typewriter.value, {
          strings: ['a Software Engineer', 'a UI/UX Designer', 'a Creative Graphics Designer', 'a Video Editor', 'a Photographer'],
          autoStart: true,
          loop: true,
        });
      }

      // Double rAF so the initial (hidden) state actually paints before the
      // transition-triggering class is added — otherwise browsers can collapse
      // both states into one frame and skip the animation entirely.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          heroVisible.value = true;
        });
      });
    });

    return {
      typewriter,
      heroVisible,
      scrollToSection,
    };
  },
};
</script>
