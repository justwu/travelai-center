<script setup lang="ts">
import MetricStrip from '@/components/business/MetricStrip.vue'
import TrendPanel from '@/components/business/TrendPanel.vue'
import { monitorSections } from '@/data/mock-monitor'
</script>

<template>
  <div class="mx-auto max-w-[1480px] space-y-4">
    <header class="panel-line rounded-panel bg-panel p-4 sm:p-5">
      <p class="text-[14px] text-muted-foreground">实时监控</p>
      <h1 class="mt-1 text-[28px] font-medium text-ink sm:text-[34px]">分业态经营面板</h1>
      <p class="mt-3 max-w-3xl text-[15px] leading-7 text-muted-foreground">
        对标竞品的实时总览，但把酒店、票务、商业、停车和景区项目拆成更容易行动的经营片段。
      </p>
    </header>

    <section class="grid gap-4 xl:grid-cols-3">
      <article v-for="section in monitorSections" :key="section.id" class="panel-line rounded-panel bg-panel p-4 sm:p-5">
        <div class="mb-4">
          <h2 class="text-[20px] font-medium text-ink">{{ section.title }}</h2>
          <p class="mt-2 text-[14px] leading-6 text-muted-foreground">{{ section.summary }}</p>
        </div>
        <div class="space-y-3">
          <MetricStrip :metrics="section.metrics" />
        </div>
      </article>
    </section>

    <section class="grid gap-4 lg:grid-cols-3">
      <TrendPanel
        v-for="section in monitorSections"
        :key="`${section.id}-trend`"
        :title="`${section.title}趋势`"
        :subtitle="section.summary"
        :points="section.trend"
        type="bar"
        value-label="当前"
        compare-label="昨日"
      />
    </section>
  </div>
</template>
