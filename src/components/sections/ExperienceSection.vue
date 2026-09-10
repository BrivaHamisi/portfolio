<template>
  <!-- Full width wrapper for the background color -->
  <div class="bg-void w-full scroll-mt-20 py-16">
    <div class="text-paper p-4 sm:p-8 max-w-6xl mx-auto">
      <div v-reveal class="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-12 pb-8 border-b border-graphite">
        <h2 class="text-heading font-[510] text-paper text-center md:text-left">
          My Resume
        </h2>
        <a href="https://docs.google.com/document/d/1f3Sd1ETlEa6T2D0vj2uC6mp0B8lTL7Bm00Sa30dh8yU" target="_blank" rel="noopener noreferrer" class="shrink-0">
          <button v-flashlight class="inline-flex items-center gap-2 bg-acid-lime hover:brightness-95 transition text-void font-[510] text-body-sm py-3 px-6 rounded-md">
            <ArrowDownTrayIcon class="w-5 h-5" />
