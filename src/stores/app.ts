import { defineStore } from 'pinia'

export type AppTheme = 'cambridge' | 'deepBlue' | 'violetNight' | 'greenNight' | 'sunsetSand' | 'coralDawn' | 'stripeCrystal' | 'mintBlue'

export const themeOptions: Array<{ value: AppTheme; label: string; description: string }> = [
  { value: 'cambridge', label: '剑桥蓝白', description: '大白底、斜切强蓝、纯蓝按钮' },
  { value: 'deepBlue', label: '深海蓝黑', description: '深蓝黑底、青蓝高光' },
  { value: 'violetNight', label: '紫电暗场', description: '蓝紫暗色、产品记忆点更强' },
  { value: 'greenNight', label: '墨绿夜航', description: '青绿夜色、文旅感更柔' },
  { value: 'sunsetSand', label: '日光沙丘', description: '日光木色、度假区运营感' },
  { value: 'coralDawn', label: '珊瑚晨曦', description: '暖白珊瑚、亲和现代' },
  { value: 'stripeCrystal', label: 'Stripe 晶蓝', description: '白底靛蓝、SaaS 作品感' },
  { value: 'mintBlue', label: '薄荷蓝白', description: '薄荷青蓝、柔和清爽' },
]

function resolveInitialTheme(): AppTheme {
  if (typeof window === 'undefined') return 'cambridge'
  const saved = window.localStorage.getItem('travelai-theme')
  if (saved && themeOptions.some((item) => item.value === saved)) {
    return saved as AppTheme
  }
  return 'cambridge'
}

function applyTheme(theme: AppTheme) {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.theme = theme
}

export const useAppStore = defineStore('app', {
  state: () => ({
    projectName: '云境文旅度假区',
    updatedAt: '2026-05-20 16:45',
    theme: resolveInitialTheme(),
  }),
  actions: {
    initializeTheme() {
      applyTheme(this.theme)
    },
    setTheme(theme: AppTheme) {
      this.theme = theme
      applyTheme(theme)
      window.localStorage.setItem('travelai-theme', theme)
    },
  },
})
