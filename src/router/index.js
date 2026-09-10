import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DevelopmentView from '../views/DevelopmentView.vue'
import DesignsView from '../views/DesignsView.vue'
import PhotographyView from '../views/PhotographyView.vue'

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
