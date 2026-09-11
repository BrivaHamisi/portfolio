<template>
  <nav class="bg-void border-b border-graphite fixed top-0 left-0 w-full z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <img class="h-8 w-auto" src="/images/BH_Monogram.png" alt="Briva Hamisi">
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center">
          <div class="flex items-baseline space-x-2">
            <a v-for="item in menuItems" :key="item.name"
               :href="item.route"
               @click="navigateTo(item, $event)"
               class="text-mist hover:underline px-3 py-4 text-caption font-[400] transition-colors duration-150"
               :class="{ 'text-acid-lime': item.ref === activeSection }"
            >
              {{ item.name }}
            </a>
          </div>
          <a href="/#contact" @click="navigateTo({ route: '/#contact' }, $event)"
             class="ml-6 bg-paper text-void rounded-full px-4 py-2 text-caption font-[510] hover:brightness-95 transition">
            Let's Talk
          </a>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button @click="isOpen = !isOpen" type="button" class="bg-transparent inline-flex items-center justify-center p-3 rounded-md text-fog hover:text-paper transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-void focus:ring-acid-lime">
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
    <Transition name="mobile-menu">
      <div v-show="isOpen" class="md:hidden border-t border-graphite">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a v-for="item in menuItems" :key="item.name"
             :href="item.route"
             @click="navigateTo(item, $event)"
             class="text-mist hover:text-paper block px-3 py-2 rounded-md text-body-sm transition-colors duration-150"
             :class="{ 'text-acid-lime': item.ref === activeSection }"
          >
            {{ item.name }}
          </a>
          <a href="/#contact" @click="navigateTo({ route: '/#contact' }, $event)"
             class="block bg-paper text-void rounded-full px-4 py-2 text-center text-caption font-[510] mt-2">
            Let's Talk
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isOpen = ref(false)
const activeSection = ref('home')

// Menu items
const menuItems = ref([
  { name: 'Home', ref: 'home', route: '/' },
  { name: 'About', ref: 'about', route: '/#about' },
  { name: 'Skills', ref: 'skills', route: '/#skills' },
  { name: 'Latest Work', ref: 'latestWork', route: '/#latestWork' },
  { name: 'Contact', ref: 'contact', route: '/#contact' }
])

// Navigation function
const navigateTo = (item, event) => {
  // Close mobile menu if open
  isOpen.value = false

  // Check if the route contains a hash (e.g., '/#about')
  if (item.route.includes('#')) {
    event.preventDefault()
    const [path, hash] = item.route.split('#')

    // If already on the correct page, scroll to the section
    if (router.currentRoute.value.path === path || (path === '/' && router.currentRoute.value.path === '/')) {
      const element = document.getElementById(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // Navigate to the route and then scroll to the section
      router.push(item.route).then(() => {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      })
    }
  }
  // No hash: let the real href navigate normally (or Vue Router's link behavior).
}

let observer = null

onMounted(() => {
  const sectionIds = menuItems.value.map((item) => item.ref)
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean)

  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
