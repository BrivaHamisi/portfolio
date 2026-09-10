<template>
  <div
    role="button"
    tabindex="0"
    class="bg-carbon border border-graphite rounded-xl overflow-hidden transition-colors duration-150 hover:border-smoke focus:outline-none focus:ring-2 focus:ring-acid-lime cursor-pointer group"
    @click="$emit('click', $event)"
    @keydown.enter="$emit('click', $event)"
    @keydown.space.prevent="$emit('click', $event)"
  >
    <img :src="image" :alt="title" loading="lazy" class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
    <div class="p-4">
      <h3 class="text-body-lg font-[510] text-paper mb-1">{{ title }}</h3>
      <p class="text-body-sm text-fog line-clamp-2">{{ description }}</p>
      <div v-if="liveUrl || githubUrl" class="flex items-center flex-wrap gap-x-4 gap-y-2 mt-3">
        <a
          v-if="liveUrl"
          :href="liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-acid-lime hover:underline text-caption font-[510]"
          @click.stop
          @keydown.enter.stop
        >
          Visit Site →
        </a>
        <a
          v-if="githubUrl"
          :href="githubUrl"
