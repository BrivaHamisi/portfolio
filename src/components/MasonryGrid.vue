<template>
  <div class="columns-2 md:columns-3 lg:columns-4 gap-4">
    <div
      v-for="(image, index) in items"
      :key="image"
      v-reveal
      class="break-inside-avoid mb-4 rounded-xl overflow-hidden border border-graphite bg-carbon"
    >
