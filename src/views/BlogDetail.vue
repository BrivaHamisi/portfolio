<template>
    <div class="blog-detail bg-gray-900 min-h-screen pt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left">
        <router-link to="/blogs"
                     class="inline-flex items-center text-orange-500 hover:text-orange-400 mb-6 text-sm font-medium transition-transform duration-300 hover:scale-105">
          <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blogs
        </router-link>
        <div v-if="blog" class="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-2xl animate-fade-in">
          <div class="relative">
            <img :src="blog.image" :alt="blog.title"
                 class="w-full h-48 sm:h-64 md:h-80 object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
          </div>
          <div class="p-6 sm:p-8">
            <h1 class="text-orange-500 text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 leading-tight">{{ blog.title }}</h1>
            <div class="flex flex-wrap items-center gap-4 mb-6 text-sm">
              <span class="text-gray-400">By <span class="text-blue-400 font-medium">{{ blog.author }}</span></span>
              <span class="text-gray-400">{{ blog.date }}</span>
              <div class="flex flex-wrap gap-2">
                <span v-for="tag in blog.tags" :key="tag"
                      class="text-xs text-orange-500 bg-orange-500 bg-opacity-20 px-2 py-1 rounded-full font-medium">
                  {{ tag }}
                </span>
              </div>
            </div>
            <div class="prose prose-invert text-gray-300 max-w-none mb-8">
              <div v-html="blog.content"></div>
            </div>
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div class="flex items-center space-x-4">
                <span class="text-gray-400 font-semibold">Share:</span>
                <a href="#" class="text-gray-400 hover:text-orange-500 transition-colors">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-orange-500 transition-colors">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-orange-500 transition-colors">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.948-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
              <router-link to="/blogs"
                           class="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium transform transition-transform hover:scale-105">
                Back to Blogs
              </router-link>
            </div>
          </div>
        </div>
        <div v-else class="text-white text-center py-12">
          <p class="text-lg">Blog not found.</p>
        </div>
      </div>
      <Footer />
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { blogs } from '../data/blogs'
import Footer from '../components/Footer.vue'

const route = useRoute()
const blog = computed(() => blogs.find(b => b.slug === route.params.slug))
</script>

<style scoped>
.blog-detail {
  background-color: #1f2937; /* Matches bg-gray-900 */
}

/* Fade-in animation */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

/* Prose styling */
.prose-invert :where(h2):not(:where([class~="not-prose"] *)) {
  color: #ffffff;
  font-weight: 700;
  margin-top: 1.5em;
  margin-bottom: 0.8em;
  font-size: 1.5rem;
}

.prose-invert :where(h3):not(:where([class~="not-prose"] *)) {
  color: #ffffff;
  font-weight: 600;
  margin-top: 1.3em;
  margin-bottom: 0.6em;
  font-size: 1.25rem;
}

.prose-invert :where(p):not(:where([class~="not-prose"] *)) {
  margin-bottom: 1.2em;
  line-height: 1.75;
}

.prose-invert :where(ul):not(:where([class~="not-prose"] *)) {
  color: #d1d5db;
  margin-bottom: 1.2em;
  padding-left: 1.5em;
}

.prose-invert :where(li):not(:where([class~="not-prose"] *)) {
  margin-bottom: 0.5em;
}

.prose-invert :where(code):not(:where([class~="not-prose"] *)) {
  background-color: #374151;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.prose-invert :where(a):not(:where([class~="not-prose"] *)) {
  color: #f59e0b;
  text-decoration: underline;
  transition: color 0.2s;
}

.prose-invert :where(a:hover):not(:where([class~="not-prose"] *)) {
  color: #fb923c;
}
</style>