import { defineStore } from 'pinia'

export type AppTheme = 'cyber' | 'sunrise' | 'resort' | 'minimal'

export const themeOptions: Array<{ value: AppTheme; label: string; description: string }> = [
  { value: 'cyber', label: '轻科幻', description: '年轻、明亮、有活力' },
  { value: 'sunrise', label: '日光湖绿', description: '清爽文旅默认感' },
  { value: 'resort', label: '陶土暖金', description: '度假区和酒店温度' },
  { value: 'minimal', label: '灰绿克制', description: '长期办公不累眼' },
]

function resolveInitialTheme(): AppTheme {
  if (typeof window === 'undefined') return 'cyber'
  const saved = window.localStorage.getItem('travelai-theme')
  if (saved && themeOptions.some((item) => item.value === saved)) {
    return saved as AppTheme
  }
  return 'cyber'
}

function applyTheme(theme: AppTheme) {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.theme = theme
}

export const useAppStore = defineStore('app', {
  state: () => ({
    projectName: '茗岭窑湖小镇',
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
