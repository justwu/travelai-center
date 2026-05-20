<script setup lang="ts">
import ForecastCalendar from '@/components/business/ForecastCalendar.vue'
import MetricStrip from '@/components/business/MetricStrip.vue'
import TrendPanel from '@/components/business/TrendPanel.vue'
import { forecastDays, forecastSummary, forecastTrend } from '@/data/mock-forecast'
</script>

<template>
  <div class="mx-auto max-w-[1480px] space-y-4">
    <header class="panel-line rounded-panel bg-panel p-4 sm:p-5">
      <p class="text-[14px] text-muted-foreground">预售预测</p>
      <h1 class="mt-1 text-[28px] font-medium text-ink sm:text-[34px]">未来 7 天经营压力</h1>
      <p class="mt-3 max-w-3xl text-[15px] leading-7 text-muted-foreground">
        把客房出租、票务预售和收入预测放在同一视图里，让周末风险和营销机会提前浮出来。
      </p>
    </header>

    <MetricStrip :metrics="forecastSummary" />
    <TrendPanel
      title="预售收入与出租压力"
      subtitle="ECharts 双系列趋势，用收入预测和出租压力一起判断风险日期。"
      :points="forecastTrend"
      value-label="预计收入"
      compare-label="出租压力"
    />
    <ForecastCalendar :days="forecastDays" />

    <section class="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
      <div class="panel-line rounded-panel bg-panel p-4 sm:p-5">
        <h2 class="text-[18px] font-medium text-ink">风险日期</h2>
        <div class="mt-4 space-y-3">
          <div v-for="day in forecastDays.filter((item) => item.status !== 'normal')" :key="day.date" class="rounded-panel border border-line bg-panel p-3">
            <div class="flex items-baseline justify-between gap-3">
              <p class="text-[15px] font-medium text-ink">{{ day.date }} {{ day.label }}</p>
              <p class="amount-font text-[18px] font-medium text-ink">{{ day.revenue }} 万</p>
            </div>
            <p class="mt-2 text-[14px] leading-6 text-muted-foreground">{{ day.note }}</p>
          </div>
        </div>
      </div>

      <div class="panel-line rounded-panel bg-panel p-4 sm:p-5">
        <h2 class="text-[18px] font-medium text-ink">建议动作</h2>
        <div class="mt-4 space-y-3 text-[15px] leading-7 text-ink">
          <p>周六预售和票务峰值同步升高，建议提前完成核销排班和停车引导预案。</p>
          <p>周三低峰适合做“住宿 + 小火车 + 商业券”套餐投放，提升非高峰日二消。</p>
          <p>对高出租日期保留房价弹性，不急于用低价补量。</p>
        </div>
      </div>
    </section>
  </div>
</template>
