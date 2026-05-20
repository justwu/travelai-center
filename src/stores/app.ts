import { defineStore } from 'pinia'

export type AppTheme = 'aurora' | 'midnight' | 'glacier' | 'graphite'

export const themeOptions: Array<{ value: AppTheme; label: string; description: string }> = [
  { value: 'aurora', label: '极光冷蓝', description: '蓝白机甲感，清爽高对比' },
  { value: 'midnight', label: '暗夜模式', description: '深蓝黑、高对比、沉浸' },
  { value: 'glacier', label: '冰川白', description: '明亮冷调、干净专业' },
  { value: 'graphite', label: '石墨青', description: '克制、耐看、偏工具感' },
]

function resolveInitialTheme(): AppTheme {
  if (typeof window === 'undefined') return 'midnight'
  const saved = window.localStorage.getItem('travelai-theme')
  if (saved && themeOptions.some((item) => item.value === saved)) {
    return saved as AppTheme
  }
  return 'midnight'
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
