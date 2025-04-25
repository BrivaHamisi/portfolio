<template>
    <div class="flex flex-col min-h-screen bg-gray-900">
      <main class="flex-grow blogs-view w-full py-8 sm:py-12 pt-16 sm:pt-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Featured Post -->
          <div v-if="featuredBlog" class="mb-12">
            <div class="text-center mb-8">
              <h2 class="text-3xl sm:text-4xl font-bold text-white inline-block">Featured Blog</h2>
              <div class="h-1 w-16 sm:w-20 bg-orange-500 mx-auto mt-2"></div>
            </div>
            <router-link :to="`/blogs/${featuredBlog.slug}`"
                         class="relative overflow-hidden rounded-lg cursor-pointer block shadow-xl flex flex-col h-[32rem] sm:h-[36rem]">
              <img :src="featuredBlog.image" :alt="featuredBlog.title"
                   class="w-full h-56 sm:h-64 object-cover">
              <div class="flex-1 bg-black bg-opacity-70 flex flex-col justify-between p-6 sm:p-8">
                <div>
                  <h3 class="text-2xl sm:text-3xl font-semibold text-white mb-3 line-clamp-2">{{ featuredBlog.title }}</h3>
                  <p class="text-sm sm:text-base text-gray-300 mb-3 line-clamp-3">{{ featuredBlog.excerpt }}</p>
                </div>
                <div>
                  <p class="text-xs sm:text-sm text-gray-400 mb-2">By {{ featuredBlog.author }} | {{ featuredBlog.date }}</p>
                  <p class="text-xs sm:text-sm text-orange-500 font-medium">{{ featuredBlog.tags.join(', ') }}</p>
                </div>
              </div>
            </router-link>
          </div>
  
          <!-- Other Blogs -->
          <div v-if="otherBlogs.length" class="mb-12">
            <div class="text-center mb-8">
              <h2 class="text-3xl sm:text-4xl font-bold text-white inline-block">More Blogs</h2>
              <div class="h-1 w-16 sm:w-20 bg-orange-500 mx-auto mt-2"></div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <router-link v-for="blog in otherBlogs" :key="blog.id"
                           :to="`/blogs/${blog.slug}`"
                           class="relative overflow-hidden rounded-lg cursor-pointer block shadow-lg flex flex-col h-[28rem] sm:h-[30rem]">
                <img :src="blog.image" :alt="blog.title"
                     class="w-full h-48 sm:h-56 object-cover">
                <div class="flex-1 bg-black bg-opacity-70 flex flex-col justify-between p-4 sm:p-6">
                  <div>
                    <h3 class="text-lg sm:text-xl font-semibold text-white mb-2 line-clamp-2">{{ blog.title }}</h3>
                    <p class="text-xs sm:text-sm text-gray-300 mb-2 line-clamp-3">{{ blog.excerpt }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-400 mb-2">By {{ blog.author }} | {{ blog.date }}</p>
                    <p class="text-xs text-orange-500 font-medium">{{ blog.tags.join(', ') }}</p>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </main>
      <Footer class="mt-auto" />
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { blogs } from '../data/blogs'
import Footer from '../components/Footer.vue'

// Sort blogs by date (descending) and select the latest as featured
const sortedBlogs = computed(() => [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date)))
const featuredBlog = computed(() => sortedBlogs.value[0])
const otherBlogs = computed(() => sortedBlogs.value.slice(1))
</script>

<style scoped>
.blogs-view {
  background-color: #1f2937; /* Matches bg-gray-900 */
}

/* Smooth image scaling on hover */
a:hover img {
  transform: scale(1.05);
  transition: transform 0.3s ease-in-out;
}

/* Text truncation for consistent height */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Ensure cards are clickable */
a {
  display: block;
  text-decoration: none;
}
</style>