<template>
  <div class="fixed top-0 left-0 w-full h-[2px] bg-graphite z-[60]" aria-hidden="true">
    <div
      class="h-full bg-acid-lime transition-[width] duration-75 ease-linear"
      :style="{ width: progress + '%' }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const progress = ref(0)
let ticking = false

const updateProgress = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  progress.value = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0
  ticking = false
}

const onScroll = () => {
  if (!ticking) {
    requestAnimationFrame(updateProgress)
    ticking = true
  }
}

onMounted(() => {
