<template>
  <div class="bg-void w-full py-12">
    <div v-reveal class="text-paper p-8 max-w-7xl mx-auto bg-carbon rounded-xl shadow-card">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div class="col-span-1 lg:col-span-2">
          <img
            src="/images/profile.png"
            alt="Briva Hamisi"
            class="w-full rounded-xl mb-6 lg:h-full lg:object-cover"
          />
        </div>
        <div class="col-span-1 lg:col-span-3 text-left">
          <h2 class="text-heading font-[510] text-paper mb-4">About Briva Hamisi</h2>
          <h3 class="text-body-lg font-[510] text-mist mb-4">Software Engineer | Full Stack Developer | Creative Designer</h3>
          <p class="text-body-sm text-fog mb-4">
            A versatile professional with 6+ years of experience across IT, media, and the entertainment industry. Adept at delivering high-quality solutions in mobile app and web development, video editing, and graphic design.
            Proficient in a broad range of technologies and tools, including PHP, JavaScript, Java, C, Python, HTML, CSS, ngnix, Bootstrap, Laravel, kotlin, WordPress, and the Adobe Creative Suite (Photoshop, Illustrator, InDesign, Lightroom, Premiere Pro, After Effects). Experienced in production process managers like PM2.
          </p>
          <p class="text-body-sm text-fog mb-6">
            Demonstrates strong leadership, working with minimum supervision and excelling in communication, with a proven ability to make critical decisions and work under pressure.
          </p>

          <!-- Dynamic Skill Bars -->
          <div class="mt-8">
            <h4 class="text-body-lg font-[510] text-paper mb-4">Skills</h4>
            <div class="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              <div v-for="(skill, index) in displayedSkills" :key="index">
                <div class="flex justify-between items-center mb-1">
                  <span class="text-caption font-[510] text-mist">{{ skill.name }}</span>
                  <span class="text-caption font-[510] text-mist">{{ skill.percentage }}%</span>
                </div>
                <div class="w-full bg-graphite rounded-full h-2">
                  <div
                    v-fill="skill.percentage"
                    class="bg-acid-lime h-2 rounded-full relative overflow-hidden transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <button
            @click="toggleSkills"
            class="mt-6 px-3 py-2 border border-graphite text-mist text-caption rounded-md hover:border-smoke transition duration-300"
          >
            {{ showAllSkills ? 'Show Less' : 'Load More' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const skills = ref([
  { name: 'Laravel', percentage: 90 },
  { name: 'Adobe Illustrator', percentage: 90 },
  { name: 'Adobe Photoshop', percentage: 94 },
  { name: 'Adobe InDesign', percentage: 90 },
  { name: 'Adobe Premiere Pro', percentage: 80 },
  { name: 'Tailwind Css', percentage: 90 },
  { name: 'JavaScript', percentage: 70 },
  { name: 'Vue.js', percentage: 85 },
  { name: 'Node.js', percentage: 80 },
  { name: 'Python', percentage: 70 },
  { name: 'PHP', percentage: 80 },
  { name: 'Kotlin', percentage: 40 },
  { name: 'Flutter', percentage: 80 },
  { name: 'React', percentage: 65 },
  { name: 'SQL', percentage: 85 },
  { name: 'Bootstrap', percentage: 80 },
  { name: 'WordPress', percentage: 90 },
  { name: 'Java', percentage: 65 },
])

