<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'

import type { TrendPoint } from '@/types/domain'

use([CanvasRenderer, LineChart, BarChart, GridComponent, TooltipComponent])

const props = withDefaults(defineProps<{
  title: string
  subtitle?: string
  points: TrendPoint[]
  type?: 'line' | 'bar'
  compareLabel?: string
  valueLabel?: string
}>(), {
  type: 'line',
  valueLabel: '当前',
  compareLabel: '参考',
})

const option = computed(() => ({
  color: ['#2f7d68', '#c97845', '#3d86a6', '#c49a42'],
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255,255,255,0.98)',
    borderColor: '#d7e2d8',
    borderWidth: 1,
    textStyle: { color: '#1f2428', fontSize: 13 },
    extraCssText: 'box-shadow: 0 8px 18px rgba(31,36,40,.08); border-radius: 8px;',
  },
  grid: { left: 34, right: 18, top: 24, bottom: 30 },
  xAxis: {
    type: 'category',
    data: props.points.map((item) => item.label),
    axisLine: { lineStyle: { color: '#d7e2d8' } },
    axisLabel: { color: '#45524d', fontSize: 12 },
    axisTick: { show: false },
  },
  yAxis: {
    type: 'value',
    splitLine: { lineStyle: { color: '#e4eadf' } },
    axisLabel: { color: '#45524d', fontSize: 12 },
  },
  series: [
    {
      name: props.valueLabel,
      type: props.type,
      data: props.points.map((item) => item.value),
      smooth: true,
      symbol: 'none',
      barWidth: 16,
      itemStyle: props.type === 'bar' ? { borderRadius: [6, 6, 0, 0] } : undefined,
      areaStyle: props.type === 'line' ? { color: 'rgba(47, 125, 104, 0.12)' } : undefined,
    },
    ...(props.points.some((item) => typeof item.compare === 'number')
      ? [
          {
            name: props.compareLabel,
            type: props.type,
            data: props.points.map((item) => item.compare),
            smooth: true,
            symbol: 'none',
            barWidth: 16,
            itemStyle: props.type === 'bar' ? { borderRadius: [6, 6, 0, 0] } : undefined,
            lineStyle: props.type === 'line' ? { type: 'dashed', width: 2 } : undefined,
          },
        ]
      : []),
  ],
}))
</script>

<template>
  <section class="panel-line rounded-panel bg-white p-4 sm:p-5">
    <h2 class="text-[18px] font-medium text-ink">{{ title }}</h2>
    <p v-if="subtitle" class="mt-1 text-[14px] text-muted-foreground">{{ subtitle }}</p>
    <VChart class="mt-4 h-[260px] w-full sm:h-[300px]" :option="option" autoresize />
  </section>
</template>
