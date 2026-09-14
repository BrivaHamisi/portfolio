<template>
  <teleport to="body">
    <Transition name="modal">
      <div v-if="show"
           class="fixed inset-0 bg-void bg-opacity-90 z-50 overflow-y-auto"
           @click.self="$emit('close')">
        <div class="min-h-screen flex items-center justify-center p-4">
          <div ref="panelEl"
               class="bg-carbon border border-graphite w-full max-w-4xl rounded-xl overflow-hidden relative p-4 md:p-6"
               role="dialog"
               aria-modal="true"
               aria-labelledby="lightbox-title"
               @keydown.tab="trapFocus"
               @keydown.left="prev"
               @keydown.right="next">
            <h2 id="lightbox-title" class="sr-only">{{ title }} — image {{ currentIndex + 1 }} of {{ images.length }}</h2>

            <button
              ref="closeButton"
              type="button"
              @click="$emit('close')"
              class="absolute top-4 right-4 z-10 bg-white/5 border border-graphite rounded-full p-3 hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-paper" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Large image -->
            <div class="relative">
              <img
                :src="images[currentIndex]"
                :alt="`${title} — image ${currentIndex + 1} of ${images.length}`"
                :width="currentSize?.[0] || undefined"
                :height="currentSize?.[1] || undefined"
                class="w-full max-h-[65vh] object-contain rounded-xl bg-void"
              />
              <button
                v-if="images.length > 1"
                type="button"
                @click="prev"
                aria-label="Previous image"
                class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/5 border border-graphite rounded-full p-3 hover:bg-white/10 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-paper" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                v-if="images.length > 1"
                type="button"
                @click="next"
                aria-label="Next image"
                class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/5 border border-graphite rounded-full p-3 hover:bg-white/10 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-paper" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <!-- Actions -->
            <div class="flex flex-wrap items-center gap-3 mt-4">
              <a
                :href="images[currentIndex]"
                :download="downloadFilename()"
                class="inline-flex items-center gap-2 bg-acid-lime text-void font-[510] text-caption rounded-md px-4 py-2.5 hover:brightness-95 transition"
              >
                <ArrowDownTrayIcon class="w-4 h-4" />
                Download
              </a>
              <button
                type="button"
                @click="shareImage"
                class="inline-flex items-center gap-2 border border-graphite text-mist font-[510] text-caption rounded-md px-4 py-2.5 hover:border-smoke transition-colors duration-150"
              >
                <ShareIcon class="w-4 h-4" />
                {{ shareStatus || 'Share' }}
              </button>
              <span class="text-caption text-fog ml-auto">{{ currentIndex + 1 }} / {{ images.length }}</span>
            </div>

            <!-- Rest of this project's designs -->
            <div v-if="images.length > 1" class="mt-6 pt-6 border-t border-graphite">
              <p class="text-caption text-fog mb-3">More from this project</p>
              <div class="grid grid-cols-4 sm:grid-cols-6 gap-2">
                <button
                  v-for="(img, idx) in images"
                  :key="img"
                  type="button"
                  class="relative rounded-md overflow-hidden aspect-square border-2 transition-colors duration-150"
                  :class="idx === currentIndex ? 'border-acid-lime' : 'border-transparent hover:border-smoke'"
                  :aria-label="`View image ${idx + 1}`"
                  :aria-current="idx === currentIndex"
                  @click="goTo(idx)"
                >
                  <img :src="img" :alt="`${title} thumbnail ${idx + 1}`" loading="lazy" class="w-full h-full object-cover" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick, onBeforeUnmount } from 'vue'
import { ArrowDownTrayIcon, ShareIcon } from '@heroicons/vue/24/outline'
import { workImageSizes } from '@/data/work'

const props = defineProps({
  show: { type: Boolean, default: false },
  images: { type: Array, default: () => [] },
  currentIndex: { type: Number, default: 0 },
  title: { type: String, default: 'Design' },
})
const emit = defineEmits(['close', 'update:currentIndex'])

const panelEl = ref(null)
const closeButton = ref(null)
const shareStatus = ref('')
let lastFocusedElement = null
let shareStatusTimer = null

const currentSize = computed(() => workImageSizes[props.images[props.currentIndex]] || null)

const goTo = (idx) => {
  const total = props.images.length
  emit('update:currentIndex', ((idx % total) + total) % total)
}
const next = () => goTo(props.currentIndex + 1)
const prev = () => goTo(props.currentIndex - 1)

const downloadFilename = () => {
  const src = props.images[props.currentIndex] || ''
  const ext = src.split('.').pop() || 'jpg'
  const base = (props.title || 'design').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  return `${base}-${props.currentIndex + 1}.${ext}`
}

const shareImage = async () => {
  const shareData = { title: props.title, url: window.location.href }
  if (navigator.share) {
    try {
      await navigator.share(shareData)
    } catch (err) {
      // User cancelled the native share sheet — not an error.
    }
    return
  }
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(shareData.url)
    shareStatus.value = 'Link copied!'
    clearTimeout(shareStatusTimer)
    shareStatusTimer = setTimeout(() => {
      shareStatus.value = ''
    }, 2000)
  }
}

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    emit('close')
    return
  }
  if (event.key === 'Tab') {
    trapFocus(event)
  }
}

const trapFocus = (event) => {
  const panel = panelEl.value
  if (!panel) return
  const focusable = Array.from(panel.querySelectorAll(
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), video[controls]'
  )).filter((el) => el.offsetParent !== null)
  if (focusable.length === 0) return
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  const active = document.activeElement

  if (!panel.contains(active)) {
    event.preventDefault()
    ;(event.shiftKey ? last : first).focus()
    return
  }
  if (event.shiftKey && active === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && active === last) {
    event.preventDefault()
    first.focus()
  }
}

watch(() => props.show, (isOpen) => {
  if (isOpen) {
    lastFocusedElement = document.activeElement
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeydown)
    nextTick(() => {
      closeButton.value?.focus()
    })
  } else {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', handleKeydown)
    lastFocusedElement?.focus()
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  clearTimeout(shareStatusTimer)
  if (props.show) {
    document.body.style.overflow = ''
  }
})
</script>
