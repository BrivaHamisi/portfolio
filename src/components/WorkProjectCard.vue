<template>
  <div
    role="button"
    tabindex="0"
    class="bg-carbon border border-graphite rounded-xl overflow-hidden transition-colors duration-150 hover:border-smoke focus:outline-none focus:ring-2 focus:ring-acid-lime cursor-pointer group"
    @click="$emit('click', $event)"
    @keydown.enter="$emit('click', $event)"
    @keydown.space.prevent="$emit('click', $event)"
  >
