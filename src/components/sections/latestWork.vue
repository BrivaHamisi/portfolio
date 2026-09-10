<template>
  <div class="scroll-mt-20">
    <!-- Latest Work -->
    <div class="bg-void w-full py-12">
      <div class="max-w-7xl mx-auto px-4">
        <div v-reveal class="text-center mb-12">
          <h2 class="text-heading font-[510] text-paper inline-block">Latest Work</h2>
        </div>

        <!-- Tabs -->
        <div
          role="tablist"
          aria-label="Latest work categories"
          class="flex justify-center gap-6 mb-10 border-b border-graphite pb-px flex-wrap"
          @keydown.left.prevent="focusTab(-1)"
