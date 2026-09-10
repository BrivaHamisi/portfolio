<template>
  <div class="bg-void min-h-screen py-16">
    <div class="max-w-6xl mx-auto px-4">
      <template v-if="!activeProject">
        <a href="/#latestWork" @click.prevent="goBackToPortfolio" class="text-mist hover:text-paper text-caption inline-block mb-8">← Back to portfolio</a>
        <div class="flex flex-wrap items-end justify-between gap-4 mb-8">
          <h1 class="text-heading-sm font-[510] text-paper">Graphic Design</h1>
          <div class="flex flex-wrap gap-3">
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
        <div v-if="designProjects.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <WorkProjectCard
            v-for="project in designProjects"
            :key="project.id"
            v-reveal
            :image="project.coverImage"
            :title="project.title"
            :description="project.description"
            @click="selectProject(project.id)"
