<script setup lang="ts">
import { BarChart3, CalendarDays, FileText, Gauge } from '@lucide/vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const items = [
  { label: '经营首页', path: '/', icon: Gauge },
  { label: '实时监控', path: '/monitor', icon: BarChart3 },
  { label: '预售预测', path: '/forecast', icon: CalendarDays },
  { label: '复盘报告', path: '/report', icon: FileText },
]

const activePath = computed(() => route.path)
</script>

<template>
  <aside class="hidden min-h-screen w-[232px] shrink-0 border-r border-border/90 bg-white/82 px-4 py-5 backdrop-blur lg:block">
    <RouterLink to="/" class="mb-8 block">
      <div class="text-[18px] font-medium tracking-[0] text-ink">TravelAI Center</div>
      <div class="mt-1 text-[13px] text-muted-foreground">文旅经营中枢</div>
    </RouterLink>

    <nav class="space-y-1">
      <RouterLink
        v-for="item in items"
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-3 rounded-panel border px-3 py-2.5 text-[14px] transition"
        :class="activePath === item.path ? 'border-lake/35 bg-mint text-ink' : 'border-transparent text-muted-foreground hover:border-border hover:bg-white/80 hover:text-ink'"
      >
        <component :is="item.icon" class="h-4 w-4" :stroke-width="1.8" />
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>

    <div class="mt-8 border-t border-line pt-5 text-[13px] leading-6 text-muted-foreground">
      <p class="text-ink">作品型 demo</p>
      <p>mock 数据驱动，预留 Spring Boot 接口适配层。</p>
    </div>
  </aside>
</template>
