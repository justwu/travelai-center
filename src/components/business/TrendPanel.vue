<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'

import type { TrendPoint } from '@/types/domain'

use([CanvasRenderer, LineChart, BarChart, GridComponent, TooltipComponent])

const props = withDefaults(defineProps<{
  title: string
  subtitle?: string
  points: TrendPoint[]
  type?: 'line' | 'bar'
}>(), {
  type: 'line',
})

const option = computed(() => ({
  color: ['#2f6f62'],
  tooltip: { trigger: 'axis' },
  grid: { left: 28, right: 12, top: 18, bottom: 26 },
  xAxis: {
    type: 'category',
    data: props.points.map((item) => item.label),
    axisLine: { lineStyle: { color: '#d8ded8' } },
    axisLabel: { color: '#4f5b57', fontSize: 12 },
    axisTick: { show: false },
  },
  yAxis: {
    type: 'value',
    splitLine: { lineStyle: { color: '#e3e5df' } },
    axisLabel: { color: '#4f5b57', fontSize: 12 },
  },
  series: [
    {
      type: props.type,
      data: props.points.map((item) => item.value),
      smooth: true,
      symbol: 'none',
      barWidth: 18,
      areaStyle: props.type === 'line' ? { color: 'rgba(47, 111, 98, 0.10)' } : undefined,
    },
  ],
}))
</script>

<template>
  <section class="panel-line rounded-panel bg-panel p-4 sm:p-5">
    <h2 class="text-[18px] font-medium text-ink">{{ title }}</h2>
    <p v-if="subtitle" class="mt-1 text-[14px] text-muted-foreground">{{ subtitle }}</p>
    <VChart class="mt-4 h-[260px] w-full" :option="option" autoresize />
  </section>
</template>
