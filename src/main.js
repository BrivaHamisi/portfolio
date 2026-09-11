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
      el.style.transitionDelay = `${delay}ms`
    }
    revealObserver.observe(el)
  },
  unmounted(el) {
    revealObserver.unobserve(el)
  },
}

const fillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target.dataset.fillTarget
        entry.target.style.width = `${target}%`
        fillObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.3 }
)

const fillDirective = {
  mounted(el, binding) {
    const targetPercent = binding.value
    el.dataset.fillTarget = targetPercent
    if (prefersReducedMotion()) {
      el.style.width = `${targetPercent}%`
      return
    }
    el.style.width = '0%'
    fillObserver.observe(el)
  },
  unmounted(el) {
    fillObserver.unobserve(el)
  },
}

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target)
        countObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.15 }
)

const animateCount = (el) => {
  const target = parseFloat(el.dataset.countTarget)
  const suffix = el.dataset.countSuffix
  const duration = 1200
  const start = performance.now()

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    el.textContent = `${Math.round(target * eased)}${suffix}`
    if (progress < 1) {
      requestAnimationFrame(step)
    } else {
      el.textContent = `${target}${suffix}`
    }
  }
  requestAnimationFrame(step)
}

// Animates a stat number counting up from 0 to its target value once it
// scrolls into view, e.g. v-count="'70+'" -> counts 0 -> 70, keeping the "+".
const countDirective = {
  mounted(el, binding) {
    const raw = String(binding.value)
    const match = raw.match(/^(\d+(?:\.\d+)?)(.*)$/)
    const target = match ? match[1] : '0'
    const suffix = match ? match[2] : ''
    el.dataset.countTarget = target
    el.dataset.countSuffix = suffix

    if (prefersReducedMotion()) {
      el.textContent = raw
      return
    }
    el.textContent = `0${suffix}`
    countObserver.observe(el)
  },
  unmounted(el) {
    countObserver.unobserve(el)
  },
}

// The design system describes the acid-lime accent as "a functional
// flashlight — small, high-contrast, used sparingly to signal action."
// This makes that literal on the primary action buttons: a soft highlight
// that tracks the cursor across the button surface, like light on a surface.
const flashlightDirective = {
  mounted(el) {
    el.classList.add('btn-flashlight')
    const handleMove = (event) => {
      const rect = el.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 100
      const y = ((event.clientY - rect.top) / rect.height) * 100
      el.style.setProperty('--mx', `${x}%`)
      el.style.setProperty('--my', `${y}%`)
    }
    el.addEventListener('mousemove', handleMove)
    el._flashlightHandler = handleMove
  },
  unmounted(el) {
    if (el._flashlightHandler) {
      el.removeEventListener('mousemove', el._flashlightHandler)
    }
  },
}

const app = createApp(App)
app.directive('reveal', revealDirective)
app.directive('fill', fillDirective)
app.directive('count', countDirective)
app.directive('flashlight', flashlightDirective)
app.use(router).mount('#app')
