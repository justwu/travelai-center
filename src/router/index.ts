import { createRouter, createWebHistory } from 'vue-router'

import DashboardPage from '@/pages/DashboardPage.vue'
import ForecastPage from '@/pages/ForecastPage.vue'
import MonitorPage from '@/pages/MonitorPage.vue'
import ReportPage from '@/pages/ReportPage.vue'

export const routes = [
  { path: '/', name: 'dashboard', component: DashboardPage, meta: { title: '经营首页' } },
  { path: '/monitor', name: 'monitor', component: MonitorPage, meta: { title: '实时监控' } },
  { path: '/forecast', name: 'forecast', component: ForecastPage, meta: { title: '预售预测' } },
  { path: '/report', name: 'report', component: ReportPage, meta: { title: '复盘报告' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to) => {
  document.title = `${String(to.meta.title || '经营首页')} - TravelAI Center`
})

export default router
