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
