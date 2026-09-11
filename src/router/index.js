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
