<template>
  <teleport to="body">
    <Transition name="modal">
      <div v-if="show"
           class="fixed inset-0 bg-void bg-opacity-90 z-50 overflow-y-auto"
           @click.self="$emit('close')"> <!-- Close modal when clicking outside -->
        <div class="min-h-screen flex items-center justify-center p-4">
          <div v-if="project" ref="modalPanel"
               class="bg-carbon border border-graphite w-full max-w-4xl lg:max-w-6xl xl:max-w-7xl rounded-xl overflow-hidden flex flex-col relative"
               role="dialog"
               aria-modal="true"
               aria-labelledby="project-modal-title"
               @keydown.tab="trapFocus">
            <!-- Close button -->
            <button
              ref="closeButton"
              @click="$emit('close')"
              class="absolute top-4 right-4 bg-white/5 border border-graphite rounded-full p-3 hover:bg-white/10 transition-colors z-10"
              aria-label="Close Modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-paper" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div class="flex flex-col lg:flex-row">
              <!-- Left side - Content -->
              <div class="w-full lg:w-1/2 relative">
                <div class="relative h-64 lg:h-[calc(100vh-8rem)] max-h-[800px]">
                  <!-- Video Player -->
                  <template v-if="project.videoUrl">
                    <video controls class="w-full h-full object-cover">
                      <source :src="project.videoUrl" type="video/mp4">
                      Your browser does not support the video tag.
                    </video>
                  </template>
                  <!-- Image Carousel -->
                  <template v-else>
                    <img
                      v-for="(image, index) in project.images"
                      :key="index"
                      :src="shouldLoadImage(index) ? image : undefined"
                      :alt="`${project.title} - Image ${index + 1}`"
                      loading="lazy"
                      :class="['w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500',
                               { 'opacity-100': currentImageIndex === index, 'opacity-0': currentImageIndex !== index }]"
                    />
                  </template>
                </div>
                <!-- Image navigation buttons -->
                <div v-if="!project.videoUrl && project.images.length > 1"
                     class="absolute top-1/2 transform -translate-y-1/2 flex justify-between w-full px-4">
                  <button @click="prevImage" aria-label="Previous image" class="bg-white/5 border border-graphite rounded-full p-3 hover:bg-white/10 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-paper" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button @click="nextImage" aria-label="Next image" class="bg-white/5 border border-graphite rounded-full p-3 hover:bg-white/10 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-paper" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Right side - Content -->
              <div class="w-full lg:w-1/2 p-6 md:p-8 bg-carbon overflow-y-auto max-h-[calc(100vh-8rem)]">
                <h2 id="project-modal-title" class="text-paper text-heading-sm font-[510] mb-4">{{ project.title }}</h2>
                <p class="text-fog mb-6 text-body-sm">{{ project.fullDescription }}</p>
                <div class="space-y-4 mb-6">
                  <div class="flex items-center">
                    <span class="text-fog">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    <span class="font-[510] w-20 text-fog">Client:</span>
                    <span class="text-mist flex-grow">{{ project.client }}</span>
                  </div>
                  <div class="h-px bg-graphite w-full"></div>
                  <div class="flex items-center">
                    <span class="text-fog">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </span>
                    <span class="font-[510] w-20 text-fog">Type:</span>
                    <span class="text-mist flex-grow">{{ project.type }}</span>
                  </div>
                  <div class="h-px bg-graphite w-full"></div>
                  <div class="flex items-center">
                    <span class="text-fog">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <span class="font-[510] w-20 text-fog">Year:</span>
                    <span class="flex-grow text-fog">{{ project.year }}</span>
                  </div>
                  <div class="h-px bg-graphite w-full"></div>
                  <div class="flex items-center">
                    <span class="text-fog">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </span>
                    <span class="font-[510] w-20 text-fog">Preview:</span>
                    <a :href="project.previewUrl" target="_blank" rel="noopener noreferrer" class="text-mist hover:text-paper hover:underline flex-grow">
                      More Work
                    </a>
                  </div>
                </div>
                <blockquote v-if="project.quote" class="border-l border-graphite pl-4 italic text-mist text-body-sm">
                  "{{ project.quote }}"
                  <footer class="text-fog mt-2">— {{ project.quoteAuthor }}</footer>
                </blockquote>
              </div>
            </div>
