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
          class="flex justify-center gap-6 mb-10 border-b border-graphite pb-px flex-wrap"
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
            class="text-mist hover:text-paper transition-colors duration-150 text-caption font-[510] px-1 py-3 border-b-2"
            :class="activeTab === cat.key ? 'text-acid-lime border-acid-lime' : 'border-transparent'"
          >
            {{ cat.label }}
          </button>
        </div>

        <!-- Development -->
        <div v-if="activeTab === 'software'" role="tabpanel" id="panel-software" aria-labelledby="tab-software" tabindex="0">
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
            <router-link to="/work/development" class="border border-graphite text-mist rounded-md px-4 py-2 text-caption font-[510] hover:border-smoke transition-colors duration-150">
              View More Projects →
            </router-link>
            <a
              href="https://github.com/BrivaHamisi"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 border border-graphite text-mist rounded-md px-4 py-2 text-caption font-[510] hover:border-smoke hover:text-paper transition-colors duration-150"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>

        <!-- Graphic Design -->
        <div v-else-if="activeTab === 'designs'" role="tabpanel" id="panel-designs" aria-labelledby="tab-designs" tabindex="0">
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
            <router-link to="/work/designs" class="border border-graphite text-mist rounded-md px-4 py-2 text-caption font-[510] hover:border-smoke transition-colors duration-150">
              View More Designs →
            </router-link>
            <a
              v-for="link in designLinks"
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

        <!-- Photography -->
        <div v-else-if="activeTab === 'photography'" role="tabpanel" id="panel-photography" aria-labelledby="tab-photography" tabindex="0">
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
            <router-link to="/work/photography" class="border border-graphite text-mist rounded-md px-4 py-2 text-caption font-[510] hover:border-smoke transition-colors duration-150">
              View More Photos →
            </router-link>
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

        <!-- UI/UX Design -->
        <div v-else-if="activeTab === 'uiux'" role="tabpanel" id="panel-uiux" aria-labelledby="tab-uiux" tabindex="0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <WorkProjectCard
            v-reveal
            :image="uiuxProject.images[0]"
            :title="uiuxProject.title"
            :description="uiuxProject.description"
            @click="openProject(uiuxProject)"
          />
        </div>
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
