import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// Lazy-loaded: these are secondary "view more" pages most visitors won't hit
// on their first request, so they don't need to be in the main bundle that
// blocks the homepage's first paint. HomeView stays a static import since
// it's what nearly everyone lands on first.
const DevelopmentView = () => import(/* webpackChunkName: "work-development" */ '../views/DevelopmentView.vue')
const DesignsView = () => import(/* webpackChunkName: "work-designs" */ '../views/DesignsView.vue')
const PhotographyView = () => import(/* webpackChunkName: "work-photography" */ '../views/PhotographyView.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/work/development',
    name: 'development',
    component: DevelopmentView
  },
  {
    path: '/work/designs',
    name: 'designs',
    component: DesignsView
  },
  {
    path: '/work/photography',
    name: 'photography',
    component: PhotographyView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      // Hash-based section jumps are handled manually (navbar.vue, the
      // "back to portfolio" links) so they can offset for the fixed navbar.
      return false
    }
    return { top: 0 }
  }
})

export default router
