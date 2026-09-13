<template>
  <div class="scroll-mt-20">
    <!-- Latest Work -->
    <div class="bg-void w-full py-12">
      <div class="max-w-7xl mx-auto px-4">
        <div v-reveal class="text-center mb-12">
          <h2 class="text-heading font-[510] text-paper inline-block">Latest Work</h2>
        </div>

        <!-- Tabs -->
        <div
          role="tablist"
          aria-label="Latest work categories"
          class="grid grid-cols-2 gap-1.5 mb-10 p-1.5 bg-carbon border border-graphite rounded-xl sm:flex sm:justify-center sm:gap-6 sm:mb-10 sm:p-0 sm:bg-transparent sm:border-0 sm:border-b sm:border-graphite sm:rounded-none"
          @keydown.left.prevent="focusTab(-1)"
          @keydown.right.prevent="focusTab(1)"
          @keydown.home.prevent="focusTab('first')"
          @keydown.end.prevent="focusTab('last')"
        >
          <button
            v-for="(cat, index) in categories"
            :key="cat.key"
            :ref="(el) => setTabRef(el, index)"
            role="tab"
            type="button"
            :id="`tab-${cat.key}`"
            :aria-controls="`panel-${cat.key}`"
            :aria-selected="activeTab === cat.key"
            :tabindex="activeTab === cat.key ? 0 : -1"
            @click="activeTab = cat.key"
            class="group w-full sm:w-auto min-h-14 sm:min-h-0 flex items-center justify-center gap-2 text-mist hover:text-paper transition-colors duration-150 text-caption font-[510] px-3 sm:px-1 py-3 sm:py-3 border border-transparent sm:border-0 sm:border-b-2 rounded-md sm:rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid-lime focus-visible:ring-offset-2 focus-visible:ring-offset-carbon"
            :class="activeTab === cat.key ? 'text-acid-lime bg-obsidian border-smoke sm:bg-transparent sm:border-acid-lime' : 'hover:bg-white/[0.03] sm:hover:bg-transparent'"
          >
            <span
              aria-hidden="true"
              class="text-[10px] font-normal tabular-nums transition-colors duration-150"
              :class="activeTab === cat.key ? 'text-acid-lime/70' : 'text-fog group-hover:text-paper'"
            >
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            {{ cat.label }}
          </button>
        </div>

        <div class="flex items-center gap-3 mb-6 sm:hidden" aria-hidden="true">
          <span class="text-[10px] font-[510] text-acid-lime tabular-nums">{{ activeCategoryNumber }}</span>
          <span class="h-px w-6 bg-acid-lime/50"></span>
          <span class="text-caption font-[510] uppercase tracking-[0.08em] text-mist">{{ activeCategory.label }}</span>
          <span class="h-px flex-1 bg-graphite"></span>
        </div>

        <Transition name="tab-panel" mode="out-in">
        <!-- Development -->
        <div v-if="activeTab === 'software'" key="software" role="tabpanel" id="panel-software" aria-labelledby="tab-software" tabindex="0">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <WorkProjectCard
              v-for="(project, index) in visibleSoftware"
              :key="project.id"
              v-reveal="Math.min(index, 6)"
              :image="project.image"
              :title="project.title"
              :description="project.description"
              :live-url="project.liveUrl"
              @click="openProject(project)"
            />
          </div>
          <div class="flex flex-wrap items-center justify-center gap-3 mt-8">
            <router-link to="/work/development" class="inline-flex min-h-11 items-center border border-graphite text-mist rounded-md px-4 py-2 text-caption font-[510] hover:border-smoke transition-colors duration-150">
              View More Projects →
            </router-link>
            <a
              href="https://github.com/BrivaHamisi"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex min-h-11 items-center gap-1.5 border border-graphite text-mist rounded-md px-4 py-2 text-caption font-[510] hover:border-smoke hover:text-paper transition-colors duration-150"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>

        <!-- Graphic Design -->
        <div v-else-if="activeTab === 'designs'" key="designs" role="tabpanel" id="panel-designs" aria-labelledby="tab-designs" tabindex="0">
          <div v-if="designProjects.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <WorkProjectCard
              v-for="(project, index) in visibleDesigns"
              :key="project.id"
              v-reveal="Math.min(index, 6)"
              :image="project.coverImage"
              :title="project.title"
              :description="project.description"
              @click="goToProject('designs', project.id)"
            />
          </div>
          <div v-else class="text-center py-16 border border-graphite rounded-xl bg-carbon">
            <PaintBrushIcon class="w-8 h-8 text-fog mx-auto mb-3" />
            <p class="text-fog text-body-sm">More design work coming soon.</p>
          </div>
          <div class="flex flex-wrap items-center justify-center gap-3 mt-8">
            <router-link to="/work/designs" class="inline-flex min-h-11 items-center border border-graphite text-mist rounded-md px-4 py-2 text-caption font-[510] hover:border-smoke transition-colors duration-150">
              View More Designs →
            </router-link>
            <a
              v-for="link in designLinks"
              :key="link.label"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex min-h-11 items-center gap-1.5 border border-graphite text-mist rounded-md px-4 py-2 text-caption font-[510] hover:border-smoke hover:text-paper transition-colors duration-150"
            >
              {{ link.label }}
              <ArrowTopRightOnSquareIcon class="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <!-- Photography -->
        <div v-else-if="activeTab === 'photography'" key="photography" role="tabpanel" id="panel-photography" aria-labelledby="tab-photography" tabindex="0">
          <div v-if="photographyProjects.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <WorkProjectCard
              v-for="(project, index) in visiblePhotography"
              :key="project.id"
              v-reveal="Math.min(index, 6)"
              :image="project.coverImage"
              :title="project.title"
              :description="project.description"
              @click="goToProject('photography', project.id)"
            />
          </div>
          <div v-else class="text-center py-16 border border-graphite rounded-xl bg-carbon">
            <PhotoIcon class="w-8 h-8 text-fog mx-auto mb-3" />
            <p class="text-fog text-body-sm">Photography portfolio coming soon.</p>
          </div>
          <div class="flex flex-wrap items-center justify-center gap-3 mt-8">
            <router-link to="/work/photography" class="inline-flex min-h-11 items-center border border-graphite text-mist rounded-md px-4 py-2 text-caption font-[510] hover:border-smoke transition-colors duration-150">
              View More Photos →
            </router-link>
            <a
              v-for="link in photographyLinks"
              :key="link.label"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex min-h-11 items-center gap-1.5 border border-graphite text-mist rounded-md px-4 py-2 text-caption font-[510] hover:border-smoke hover:text-paper transition-colors duration-150"
            >
              {{ link.label }}
              <ArrowTopRightOnSquareIcon class="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <!-- UI/UX Design -->
        <div v-else-if="activeTab === 'uiux'" key="uiux" role="tabpanel" id="panel-uiux" aria-labelledby="tab-uiux" tabindex="0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <WorkProjectCard
            v-reveal
            :image="uiuxProject.images[0]"
            :title="uiuxProject.title"
            :description="uiuxProject.description"
            @click="openProject(uiuxProject)"
          />
        </div>
        </Transition>
      </div>
    </div>

    <ProjectModal :show="showModal" :project="selectedProject" @close="closeModal" />
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowTopRightOnSquareIcon, PaintBrushIcon, PhotoIcon } from '@heroicons/vue/24/outline'
import WorkProjectCard from '@/components/WorkProjectCard.vue'
import ProjectModal from '@/components/ProjectModal.vue'
import { categories, softwareProjects, designProjects, photographyProjects, uiuxProject, designLinks, photographyLinks } from '@/data/work.js'

const router = useRouter()
const activeTab = ref('software')
const activeCategory = computed(() => categories.find((category) => category.key === activeTab.value) || categories[0])
const activeCategoryNumber = computed(() => String(categories.findIndex((category) => category.key === activeTab.value) + 1).padStart(2, '0'))

const tabRefs = ref([])
const setTabRef = (el, index) => {
  if (el) {
    tabRefs.value[index] = el
  }
}

const focusTab = (direction) => {
  const currentIndex = categories.findIndex((cat) => cat.key === activeTab.value)
  let nextIndex
  if (direction === 'first') {
    nextIndex = 0
  } else if (direction === 'last') {
    nextIndex = categories.length - 1
  } else {
    nextIndex = (currentIndex + direction + categories.length) % categories.length
  }
  activeTab.value = categories[nextIndex].key
  nextTick(() => {
    tabRefs.value[nextIndex]?.focus()
  })
}

const visibleSoftware = computed(() => softwareProjects.slice(0, 6))
const visibleDesigns = computed(() => designProjects.slice(0, 6))
const visiblePhotography = computed(() => photographyProjects.slice(0, 6))

const goToProject = (categoryKey, projectId) => {
  router.push({ path: `/work/${categoryKey}`, query: { project: projectId } })
}

const showModal = ref(false)
const selectedProject = ref(null)

const openProject = (project) => {
  selectedProject.value = project
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}
</script>
