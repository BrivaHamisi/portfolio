<template>
    <div class="bg-void py-12">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex flex-col md:flex-row gap-6 items-center">
          <!-- Years of Experience Section -->
          <div v-reveal class="md:w-1/3 flex items-center justify-center h-full">
            <div class="text-center">
              <p class="text-heading font-[510] text-paper" v-count="'6+'"></p>
              <p class="text-body-lg text-fog mt-2">Years Experience</p>
            </div>
          </div>

          <!-- Stats Grid Section -->
          <div class="md:w-2/3">
            <div class="grid grid-cols-2 gap-4">
              <div v-for="(stat, index) in stats" :key="stat.label" v-reveal="index" class="bg-white/[0.02] border border-graphite p-4 rounded-md text-center">
                <p class="text-heading-sm font-[510] text-paper" v-count="stat.value"></p>
                <p class="text-body-sm text-fog mt-1">{{ stat.label }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const stats = ref([
    { value: '7+', label: 'Design Experience' },
    { value: '70+', label: 'Clients Served' },
    { value: '40+', label: 'Completed Projects' },
    { value: '9', label: 'Achievements' },
  ]);
  </script>

  