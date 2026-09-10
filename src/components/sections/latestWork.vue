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
