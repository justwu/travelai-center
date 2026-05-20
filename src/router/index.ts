import { createRouter, createWebHistory } from 'vue-router'

import { modulePages } from '@/data/module-pages'
import ModulePage from '@/pages/ModulePage.vue'

export const routes = [
  { path: '/', redirect: '/live' },
  ...modulePages.map((page) => ({
    path: page.path,
    name: page.id,
    component: ModulePage,
    meta: { title: page.title, moduleId: page.id },
  })),
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to) => {
  document.title = `${String(to.meta.title || '经营首页')} - TravelAI Center`
})

export default router
