<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
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

const themeVersion = ref(0)
let observer: MutationObserver | undefined

function cssRgb(name: string, fallback: string) {
  themeVersion.value
  if (typeof window === 'undefined') return fallback
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return raw ? `rgb(${raw})` : fallback
}

function cssRgba(name: string, alpha: number, fallback: string) {
  themeVersion.value
  if (typeof window === 'undefined') return fallback
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return raw ? `rgba(${raw}, ${alpha})` : fallback
}

onMounted(() => {
  observer = new MutationObserver(() => {
    themeVersion.value += 1
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
})

onUnmounted(() => {
  observer?.disconnect()
})

const option = computed(() => ({
  color: [
    cssRgb('--color-lake', '#169d90'),
    cssRgb('--color-terracotta', '#ed8052'),
    cssRgb('--color-aqua', '#218ce0'),
    cssRgb('--color-gold', '#f0b740'),
  ],
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255,255,255,0.98)',
    borderColor: cssRgb('--color-border', '#bee0e6'),
    borderWidth: 1,
    textStyle: { color: cssRgb('--color-ink', '#151b22'), fontSize: 13 },
    extraCssText: 'box-shadow: 0 8px 18px rgba(31,36,40,.08); border-radius: 8px;',
  },
  grid: { left: 34, right: 18, top: 24, bottom: 30 },
  xAxis: {
    type: 'category',
    data: props.points.map((item) => item.label),
    axisLine: { lineStyle: { color: cssRgb('--color-border', '#bee0e6') } },
    axisLabel: { color: cssRgb('--color-muted-foreground', '#374652'), fontSize: 12 },
    axisTick: { show: false },
  },
  yAxis: {
    type: 'value',
    splitLine: { lineStyle: { color: cssRgb('--color-line', '#dbecf0') } },
    axisLabel: { color: cssRgb('--color-muted-foreground', '#374652'), fontSize: 12 },
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
      areaStyle: props.type === 'line' ? { color: cssRgba('--color-lake', 0.13, 'rgba(22, 157, 144, 0.13)') } : undefined,
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
