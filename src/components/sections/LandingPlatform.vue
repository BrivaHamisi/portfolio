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
