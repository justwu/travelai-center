<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import MetricStrip from '@/components/business/MetricStrip.vue'
import StatusBadge from '@/components/business/StatusBadge.vue'
import TrendPanel from '@/components/business/TrendPanel.vue'
import { modulePageById } from '@/data/module-pages'
import { useAppStore } from '@/stores/app'

const route = useRoute()
const app = useAppStore()

const page = computed(() => modulePageById[String(route.meta.moduleId)] ?? modulePageById.live)
</script>

<template>
  <div class="mx-auto max-w-[1480px] space-y-4">
    <header class="panel-line rounded-panel bg-panel p-4 sm:p-5">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p class="text-[14px] text-muted-foreground">{{ app.projectName }}</p>
          <h1 class="mt-1 text-[28px] font-medium leading-tight text-ink sm:text-[34px]">{{ page.title }}</h1>
          <p class="mt-3 max-w-3xl text-[15px] leading-7 text-muted-foreground">
            {{ page.summary }}
          </p>
        </div>
        <div class="rounded-panel border border-line bg-muted/55 px-3 py-2 text-[13px] leading-6 text-muted-foreground lg:min-w-[220px]">
          <p>数据时间：{{ page.updatedAt }}</p>
          <p>采集目录：{{ page.sourceDir }}</p>
        </div>
      </div>
    </header>

    <MetricStrip :metrics="page.metrics" />

    <section class="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
      <TrendPanel
        :title="page.chart.title"
        :subtitle="page.chart.subtitle"
        :points="page.trend"
        :type="page.chart.type ?? 'line'"
        :value-label="page.chart.valueLabel ?? '当前'"
        :compare-label="page.chart.compareLabel ?? '参考'"
      />

      <section class="panel-line rounded-panel bg-panel p-4 sm:p-5">
        <div class="flex items-baseline justify-between gap-3">
          <h2 class="text-[18px] font-medium text-ink">状态变化</h2>
          <span class="text-[13px] text-muted-foreground">{{ page.changes.length }} 项</span>
        </div>

        <div class="mt-4 divide-y divide-line">
          <article v-for="item in page.changes" :key="item.id" class="py-3 first:pt-0 last:pb-0">
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <p class="text-[15px] font-medium text-ink">{{ item.label }}</p>
                <p class="mt-1 text-[13px] leading-5 text-muted-foreground">
                  {{ item.compareLabel }}：{{ item.compare }}
                </p>
              </div>
              <StatusBadge :status="item.status" />
            </div>
            <div class="mt-3 flex items-baseline justify-between gap-3">
              <p class="amount-font text-[22px] font-medium leading-none text-ink sm:text-[24px]">{{ item.current }}</p>
              <p class="text-[14px] font-medium" :class="item.status === 'risk' ? 'text-risk' : item.status === 'warning' ? 'text-warning' : 'text-lake'">
                {{ item.change }}
              </p>
            </div>
          </article>
        </div>
      </section>
    </section>

    <section class="panel-line rounded-panel bg-panel p-4 sm:p-5">
      <div class="flex items-baseline justify-between gap-3">
        <h2 class="text-[18px] font-medium text-ink">页面信息结构</h2>
        <span class="text-[13px] text-muted-foreground">来自竞品采集内容的轻量重组</span>
      </div>

      <div class="mt-4 grid gap-3 lg:grid-cols-3">
        <article v-for="item in page.details" :key="item.id" class="rounded-panel border border-line bg-panel px-4 py-3">
          <p class="text-[14px] font-medium text-muted-foreground">{{ item.label }}</p>
          <p class="mt-2 amount-font text-[20px] font-medium leading-snug text-ink">{{ item.value }}</p>
          <p class="mt-2 text-[13px] leading-5 text-muted-foreground sm:text-[14px]">{{ item.note }}</p>
        </article>
      </div>
    </section>
  </div>
</template>
