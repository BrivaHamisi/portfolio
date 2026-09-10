<template>
    <div class="bg-void w-full py-12">
      <div class="text-paper p-8 max-w-6xl mx-auto">
        <h2 v-reveal class="text-heading font-[510] text-paper mb-12 pb-8 text-center border-b border-graphite">
          What I Do
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="(service, index) in services" :key="index" v-reveal="index" class="bg-white/[0.02] border border-graphite rounded-md p-4">
            <div class="flex items-center mb-4">
              <component :is="service.icon" class="w-6 h-6 text-fog mr-3" />
              <h3 class="text-body-lg font-[510] text-paper">{{ service.title }}</h3>
            </div>
            <p class="text-body-sm text-fog">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { PaintBrushIcon, WrenchScrewdriverIcon, CameraIcon } from '@heroicons/vue/24/outline'

  const services = ref([
    {
      icon: PaintBrushIcon,
      title: "Graphic & UI/UX Design",
      description: "I have done Graphic Design for more than 6 years — creating posters, logos, business cards, brochures, magazines, and flyers — alongside UI/UX design for web and mobile apps, crafting interfaces that are as functional as they are visually compelling."
    },
    {
      icon: WrenchScrewdriverIcon,
      title: "Development",
      description: "I am a Full Stack Developer, I develop both web and mobile apps. Check the skills section to find out more on my strengths and abilities."
