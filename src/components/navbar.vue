<template>
  <nav class="bg-gray-900 fixed top-0 left-0 w-full z-50 shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <img class="h-8 w-auto" src="/images/BH_Monogram.png" alt="Briva Hamisi">
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <a v-for="item in menuItems" :key="item.name"
               @click="navigateTo(item)"
               class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
               :class="{ 'bg-gray-700 text-white': item.current }"
            >
              {{ item.name }}
            </a>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button @click="isOpen = !isOpen" type="button" class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <span class="sr-only">Open main menu</span>
            <!-- Icon when menu is closed -->
            <svg v-if="!isOpen" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- Icon when menu is open -->
            <svg v-else class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="isOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <a v-for="item in menuItems" :key="item.name"
           @click="navigateTo(item)"
           class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
           :class="{ 'bg-gray-700 text-white': item.current }"
        >
          {{ item.name }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isOpen = ref(false)

// Create refs for each section in the HomeView component, including Blogs
const menuItems = ref([
  { name: 'Home', ref: 'home', route: '/' },
  { name: 'About', ref: 'about', route: '/#about' },
  { name: 'Skills', ref: 'skills', route: '/#skills' },
  { name: 'Latest Work', ref: 'latestWork', route: '/#latestWork' },
  { name: 'Blogs', ref: 'blogs', route: '/blogs' }, // Added Blogs item
  { name: 'Contact', ref: 'contact', route: '/#contact' }
])

const navigateTo = (item) => {
  // Navigate using Vue Router
  router.push(item.route).then(() => {
    // If not Blogs, scroll to the section
    if (item.ref !== 'blogs') {
      const sectionElement = document.getElementById(item.ref)
      const marginTop = 32 // 32px margin

      if (sectionElement) {
        const sectionPosition = sectionElement.getBoundingClientRect().top + window.pageYOffset - marginTop
        window.scrollTo({
          top: sectionPosition,
          behavior: 'smooth'
        })
      }
    }
    isOpen.value = false
  })
}
</script>