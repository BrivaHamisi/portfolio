<template>
  <div class="bg-void min-h-screen py-16">
    <div class="max-w-6xl mx-auto px-4">
      <template v-if="!activeProject">
        <a href="/#latestWork" @click.prevent="goBackToPortfolio" class="text-mist hover:text-paper text-caption inline-block mb-8">← Back to portfolio</a>
        <div class="flex flex-wrap items-end justify-between gap-4 mb-8">
          <h1 class="text-heading-sm font-[510] text-paper">Graphic Design</h1>
          <div class="flex flex-wrap gap-3">
            <a
              v-for="link in designLinks"
