<template>
  <div class="relative min-h-screen overflow-hidden bg-void">
    <!-- Content -->
    <div class="relative z-30 flex items-center min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="text-paper w-full lg:w-1/2 text-left">
        <h1 class="hero-in [transition-delay:0ms] text-heading-lg md:text-display text-paper font-[510] mb-2" :class="{ 'is-visible': heroVisible }">
          Hi, I'm <span class="text-paper">Briva Hamisi</span>
        </h1>
        <div class="hero-in [transition-delay:80ms] text-subheading text-acid-lime h-12 mb-4 font-[510]" :class="{ 'is-visible': heroVisible }">
          <span ref="typewriter"></span>
