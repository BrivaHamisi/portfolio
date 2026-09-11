<template>
  <Transition name="scroll-to-top">
    <button
      v-if="visible"
      type="button"
      @click="scrollToTop"
      aria-label="Back to top"
      class="fixed bottom-6 right-6 z-50 bg-white/5 border border-graphite rounded-full p-3 text-paper hover:bg-white/10 transition-colors"
    >
      <ChevronUpIcon class="w-5 h-5" />
    </button>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ChevronUpIcon } from '@heroicons/vue/24/outline'

const visible = ref(false)
let ticking = false

const prefersReducedMotion = () =>
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const updateVisibility = () => {
  visible.value = window.scrollY > 500
  ticking = false
}

const onScroll = () => {
  if (!ticking) {
    requestAnimationFrame(updateVisibility)
    ticking = true
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

onMounted(() => {
  updateVisibility()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.scroll-to-top-enter-active,
.scroll-to-top-leave-active {
  transition: opacity 150ms ease, transform 150ms ease;
}
.scroll-to-top-enter-from,
.scroll-to-top-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
