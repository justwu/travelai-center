import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    projectName: '茗岭窑湖小镇',
    updatedAt: '2026-05-20 16:45',
  }),
})
