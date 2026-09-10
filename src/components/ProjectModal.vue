<template>
  <teleport to="body">
    <Transition name="modal">
      <div v-if="show"
           class="fixed inset-0 bg-void bg-opacity-90 z-50 overflow-y-auto"
           @click.self="$emit('close')"> <!-- Close modal when clicking outside -->
        <div class="min-h-screen flex items-center justify-center p-4">
          <div v-if="project" ref="modalPanel"
               class="bg-carbon border border-graphite w-full max-w-4xl lg:max-w-6xl xl:max-w-7xl rounded-xl overflow-hidden flex flex-col relative"
               role="dialog"
               aria-modal="true"
               aria-labelledby="project-modal-title"
               @keydown.tab="trapFocus">
            <!-- Close button -->
            <button
              ref="closeButton"
              @click="$emit('close')"
              class="absolute top-4 right-4 bg-white/5 border border-graphite rounded-full p-3 hover:bg-white/10 transition-colors z-10"
              aria-label="Close Modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-paper" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div class="flex flex-col lg:flex-row">
              <!-- Left side - Content -->
              <div class="w-full lg:w-1/2 relative">
                <div class="relative h-64 lg:h-[calc(100vh-8rem)] max-h-[800px]">
