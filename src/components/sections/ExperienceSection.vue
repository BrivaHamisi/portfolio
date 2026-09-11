<template>
  <!-- Full width wrapper for the background color -->
  <div class="bg-void w-full scroll-mt-20 py-16">
    <div class="text-paper p-4 sm:p-8 max-w-6xl mx-auto">
      <div v-reveal class="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-12 pb-8 border-b border-graphite">
        <h2 class="text-heading font-[510] text-paper text-center md:text-left">
          My Resume
        </h2>
        <a
          v-flashlight
          href="https://docs.google.com/document/d/1f3Sd1ETlEa6T2D0vj2uC6mp0B8lTL7Bm00Sa30dh8yU"
          target="_blank"
          rel="noopener noreferrer"
          class="shrink-0 inline-flex items-center gap-2 bg-acid-lime hover:brightness-95 transition text-void font-[510] text-body-sm py-3 px-6 rounded-md"
        >
          <ArrowDownTrayIcon class="w-5 h-5" />
          Download CV
        </a>
      </div>

      <div class="flex flex-col md:flex-row gap-8">
        <div v-reveal class="w-full md:w-1/2">
          <h3 class="text-body-lg font-[510] text-paper mb-4 text-left">Experiences</h3>
          <div v-for="(job, index) in displayedExperiences" :key="index" class="mb-6 relative pl-10">
            <div class="absolute left-0 top-0 h-full w-px bg-graphite"></div>
            <div class="absolute left-0 top-1 w-8 h-8 rounded-full bg-graphite border border-smoke flex items-center justify-center -ml-4 text-caption font-[510] text-mist">
              {{ index + 1 }}
            </div>
            <div class="relative">
              <div class="font-[510] text-fog relative z-10 text-left">{{ job.period }}</div>
            </div>
            <h4 class="text-body-lg font-[510] text-paper mb-1 text-left mt-2">{{ job.title }}</h4>
            <p class="text-mist mb-1 text-left">{{ job.company }}</p>
            <p class="text-body-sm text-fog text-left">{{ job.description }}</p>
          </div>
        </div>

        <div v-reveal class="w-full md:w-1/2">
          <h3 class="text-body-lg font-[510] text-paper mb-4 text-left">Education</h3>
          <div v-for="(edu, index) in displayedEducation" :key="index" class="mb-6 relative pl-10">
            <div class="absolute left-0 top-0 h-full w-px bg-graphite"></div>
            <div class="absolute left-0 top-1 w-8 h-8 rounded-full bg-graphite border border-smoke flex items-center justify-center -ml-4 text-caption font-[510] text-mist">
              {{ index + 1 }}
            </div>
            <div class="relative">
              <div class="font-[510] text-fog relative z-10 text-left">{{ edu.period }}</div>
            </div>
            <h4 class="text-body-lg font-[510] text-paper mb-1 text-left mt-2">{{ edu.degree }}</h4>
            <p class="text-mist mb-1 text-left">{{ edu.institution }}</p>
            <p class="text-body-sm text-fog text-left">{{ edu.description }}</p>
          </div>
        </div>
      </div>

      <button
        @click="toggleLoadMore"
        :aria-expanded="isShowingAll"
        class="border border-graphite text-mist text-caption py-2 px-4 rounded-md mt-8 block mx-auto hover:border-smoke transition"
      >
        {{ isShowingAll ? 'Show less' : 'Load more' }}
