import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'

const prefersReducedMotion = () =>
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        revealObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.15 }
)

const revealDirective = {
  mounted(el, binding) {
    if (prefersReducedMotion()) {
      return
    }
    el.classList.add('reveal')
    if (typeof binding.value === 'number') {
      const delay = Math.min(binding.value * 60, 360)
