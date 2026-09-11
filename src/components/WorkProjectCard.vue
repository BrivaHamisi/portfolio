<template>
  <div class="relative bg-carbon border border-graphite rounded-xl overflow-hidden transition-colors duration-150 hover:border-smoke group">
    <button
      type="button"
      class="absolute inset-0 z-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-acid-lime focus:ring-inset"
      :aria-label="`View ${title}`"
      @click="$emit('click', $event)"
    ></button>
    <img :src="image" :alt="title" loading="lazy" class="relative pointer-events-none w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
    <div class="relative p-4 pointer-events-none">
      <h3 class="text-body-lg font-[510] text-paper mb-1">{{ title }}</h3>
      <p class="text-body-sm text-fog line-clamp-2">{{ description }}</p>
      <div v-if="liveUrl || githubUrl" class="relative z-10 pointer-events-auto flex items-center flex-wrap gap-x-4 gap-y-2 mt-3">
        <a
          v-if="liveUrl"
          :href="liveUrl"
          target="_blank"
