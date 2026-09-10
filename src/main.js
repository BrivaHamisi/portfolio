import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'

const prefersReducedMotion = () =>
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const revealObserver = new IntersectionObserver(
  (entries) => {
