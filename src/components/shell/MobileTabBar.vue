<script setup lang="ts">
import { BarChart3, CalendarDays, FileText, Gauge } from '@lucide/vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activePath = computed(() => route.path)

const items = [
  { label: '首页', path: '/', icon: Gauge },
  { label: '监控', path: '/monitor', icon: BarChart3 },
  { label: '预测', path: '/forecast', icon: CalendarDays },
  { label: '复盘', path: '/report', icon: FileText },
]
</script>

<template>
  <nav class="fixed inset-x-3 bottom-3 z-30 grid grid-cols-4 rounded-[18px] border border-border bg-panel/95 px-2 py-2 backdrop-blur lg:hidden">
    <RouterLink
      v-for="item in items"
      :key="item.path"
      :to="item.path"
      class="flex flex-col items-center gap-1 rounded-panel px-2 py-1.5 text-[13px]"
      :class="activePath === item.path ? 'bg-lake/10 text-ink' : 'text-muted-foreground'"
    >
      <component :is="item.icon" class="h-4 w-4" :stroke-width="1.8" />
      <span>{{ item.label }}</span>
    </RouterLink>
  </nav>
</template>
