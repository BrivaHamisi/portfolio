<template>
  <div class="columns-2 md:columns-3 lg:columns-4 gap-4">
    <button
      v-for="(image, index) in items"
      :key="image"
      type="button"
      v-reveal
      class="block w-full break-inside-avoid mb-4 rounded-xl overflow-hidden border border-graphite bg-carbon transition-colors duration-150 hover:border-smoke"
      :aria-label="`Open ${alt || 'image'} ${index + 1}`"
      @click="$emit('select', index)"
    >
      <img
        :src="image"
        :alt="alt ? `${alt} ${index + 1}` : `Image ${index + 1}`"
        :width="sizeOf(image)?.[0] || undefined"
        :height="sizeOf(image)?.[1] || undefined"
        loading="lazy"
        class="w-full h-auto block pointer-events-none"
      />
    </button>
  </div>
</template>

<script setup>
import { workImageSizes } from '@/data/work'

defineProps({
  items: { type: Array, default: () => [] },
  alt: { type: String, default: '' },
})
defineEmits(['select'])

const sizeOf = (item) => workImageSizes[item] || null
</script>
