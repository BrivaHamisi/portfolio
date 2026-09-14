<template>
  <div class="bg-void min-h-screen py-16">
    <div class="max-w-6xl mx-auto px-4">
      <template v-if="!activeProject">
        <a href="/#latestWork" @click.prevent="goBackToPortfolio" class="text-mist hover:text-paper text-caption inline-block mb-8">← Back to portfolio</a>
        <div class="flex flex-wrap items-end justify-between gap-4 mb-8">
          <h1 class="text-heading-sm font-[510] text-paper">Photography</h1>
          <div class="flex flex-wrap gap-3">
            <a
              v-for="link in photographyLinks"
              :key="link.label"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 border border-graphite text-mist rounded-md px-4 py-2 text-caption font-[510] hover:border-smoke hover:text-paper transition-colors duration-150"
            >
              {{ link.label }}
              <ArrowTopRightOnSquareIcon class="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
        <div v-if="photographyProjects.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <WorkProjectCard
            v-for="project in photographyProjects"
            :key="project.id"
            v-reveal
            :image="project.coverImage"
            :title="project.title"
            :description="project.description"
            @click="selectProject(project.id)"
          />
        </div>
        <div v-else class="text-center py-16 border border-graphite rounded-xl bg-carbon">
          <PhotoIcon class="w-8 h-8 text-fog mx-auto mb-3" />
          <p class="text-fog text-body-sm">Photography portfolio coming soon.</p>
        </div>
      </template>

      <template v-else>
        <button type="button" @click="clearProject" class="text-mist hover:text-paper text-caption inline-block mb-8">← Back to Photography</button>
        <h1 class="text-heading-sm font-[510] text-paper mb-2">{{ activeProject.title }}</h1>
        <p class="text-body-sm text-fog mb-6 max-w-2xl">{{ activeProject.description }}</p>
        <span v-if="activeProject.demo" class="inline-block mb-6 border border-graphite text-fog text-caption font-[510] rounded-full px-3 py-1">Demo placeholder — not Briva's own photography</span>
        <div v-if="activeProject.problem || activeProject.role || activeProject.outcome" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-8 border-b border-graphite max-w-4xl">
          <div v-if="activeProject.problem">
            <span class="text-caption text-fog block mb-1">The Challenge</span>
            <span class="text-body-sm text-mist">{{ activeProject.problem }}</span>
          </div>
          <div v-if="activeProject.role">
            <span class="text-caption text-fog block mb-1">My Role</span>
            <span class="text-body-sm text-mist">{{ activeProject.role }}</span>
          </div>
          <div v-if="activeProject.outcome">
            <span class="text-caption text-fog block mb-1">The Outcome</span>
            <span class="text-body-sm text-mist">{{ activeProject.outcome }}</span>
          </div>
        </div>
        <MasonryGrid :items="activeProject.images" :alt="activeProject.title" @select="openLightbox" />
      </template>
    </div>

    <ImageLightbox
      v-if="activeProject"
      :show="lightboxOpen"
      :images="activeProject.images"
      :current-index="lightboxIndex"
      :title="activeProject.title"
      @update:current-index="setLightboxIndex"
      @close="closeLightbox"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowTopRightOnSquareIcon, PhotoIcon } from '@heroicons/vue/24/outline'
import WorkProjectCard from '@/components/WorkProjectCard.vue'
import MasonryGrid from '@/components/MasonryGrid.vue'
import ImageLightbox from '@/components/ImageLightbox.vue'
import { photographyProjects, photographyLinks } from '@/data/work.js'

const route = useRoute()
const router = useRouter()

const activeProject = computed(() =>
  photographyProjects.find((project) => project.id === route.query.project) || null
)

const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

watch(
  () => [route.query.project, route.query.image, activeProject.value],
  () => {
    const imageParam = route.query.image
    if (activeProject.value && imageParam !== undefined) {
      const idx = Number(imageParam)
      if (Number.isInteger(idx) && idx >= 0 && idx < activeProject.value.images.length) {
        lightboxIndex.value = idx
        lightboxOpen.value = true
        return
      }
    }
    lightboxOpen.value = false
  },
  { immediate: true }
)

const openLightbox = (index) => {
  router.replace({ query: { ...route.query, image: index } })
}

const setLightboxIndex = (index) => {
  router.replace({ query: { ...route.query, image: index } })
}

const closeLightbox = () => {
  const { image, ...rest } = route.query
  router.replace({ query: rest })
}

const selectProject = (id) => {
  router.push({ query: { project: id } })
}

const clearProject = () => {
  router.push({ query: {} })
}

const goBackToPortfolio = () => {
  router.push('/').then(() => {
    const el = document.getElementById('latestWork')
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    }
  })
}

const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
</script>
