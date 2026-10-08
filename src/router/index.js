import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// Lazy-loaded: these are secondary "view more" pages most visitors won't hit
// on their first request, so they don't need to be in the main bundle that
// blocks the homepage's first paint. HomeView stays a static import since
// it's what nearly everyone lands on first.
const DevelopmentView = () => import(/* webpackChunkName: "work-development" */ '../views/DevelopmentView.vue')
const DesignsView = () => import(/* webpackChunkName: "work-designs" */ '../views/DesignsView.vue')
const PhotographyView = () => import(/* webpackChunkName: "work-photography" */ '../views/PhotographyView.vue')
const NotFoundView = () => import(/* webpackChunkName: "not-found" */ '../views/NotFoundView.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {}
  },
  {
    path: '/work/development',
    name: 'development',
    component: DevelopmentView,
    meta: {
      title: 'Development',
      description: 'Software projects by Briva Hamisi: web, mobile and full-stack applications, with code on GitHub.'
    }
  },
  {
    path: '/work/designs',
    name: 'designs',
    component: DesignsView,
    meta: {
      title: 'Graphic Design',
      description: 'Graphic design work by Briva Hamisi, including logo and brand identity projects.'
    }
  },
  {
    path: '/work/photography',
    name: 'photography',
    component: PhotographyView,
    meta: {
      title: 'Photography',
      description: 'Photography projects by Briva Hamisi.'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: {
      title: 'Page not found',
      noindex: true
    }
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

// Per-route <title>, description and canonical. Search engines render JS, so
// this helps /work/* show up as their own results; social scrapers don't, so
// shared links always use the static homepage card in public/index.html.
const SITE_URL = 'https://hamisi.briva.co.ke'
const DEFAULT_TITLE = 'Briva Hamisi | Software Engineer, Creative Designer and Photographer'
const DEFAULT_DESCRIPTION = document.querySelector('meta[name="description"]')?.content ?? ''

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | Briva Hamisi` : DEFAULT_TITLE
  document.querySelector('meta[name="description"]')
    ?.setAttribute('content', to.meta.description ?? DEFAULT_DESCRIPTION)
  document.querySelector('link[rel="canonical"]')
    ?.setAttribute('href', SITE_URL + to.path)
  document.querySelector('meta[name="robots"]')
    ?.setAttribute('content', to.meta.noindex ? 'noindex' : 'index, follow, max-image-preview:large')
})

export default router
