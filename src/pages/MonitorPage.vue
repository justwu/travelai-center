<script setup lang="ts">
import StatusBadge from '@/components/business/StatusBadge.vue'
import TrendPanel from '@/components/business/TrendPanel.vue'
import { monitorCommandMetrics, monitorFocusItems, monitorSections } from '@/data/mock-monitor'

const accentTone = {
  lake: 'border-lake/30 bg-mint/45',
  aqua: 'border-aqua/30 bg-sky/45',
  gold: 'border-warning/30 bg-butter/55',
  terracotta: 'border-risk/30 bg-peach/55',
  iris: 'border-iris/30 bg-[rgba(164,142,255,0.10)]',
}

const signalTone = {
  normal: 'border-lake/25 bg-mint/35 text-ink',
  warning: 'border-warning/25 bg-butter/45 text-ink',
  risk: 'border-risk/25 bg-peach/45 text-ink',
}
</script>

<template>
  <div class="mx-auto max-w-[1480px] space-y-4">
    <header class="panel-line rounded-panel bg-panel px-4 py-5 sm:px-5 sm:py-6">
      <div class="grid gap-4 xl:grid-cols-[1.2fr_0.8fr] xl:items-end">
        <div>
          <p class="text-[14px] text-muted-foreground">实时监控</p>
          <h1 class="mt-1 text-[28px] font-medium text-ink sm:text-[34px]">实时经营驾驶舱</h1>
          <p class="mt-3 max-w-3xl text-[15px] leading-7 text-muted-foreground">
            这一页只做一件事：让人 30 秒内看清今天哪里正常、哪里承压、下一步先盯谁。
          </p>
        </div>

        <div class="rounded-panel border border-line bg-muted/50 p-4">
          <div class="flex items-baseline justify-between gap-3">
            <p class="text-[14px] font-medium text-ink">当前总判断</p>
            <span class="rounded-full border border-risk/25 bg-peach/50 px-2.5 py-1 text-[12px] text-risk">商业偏弱</span>
          </div>
          <p class="mt-3 text-[15px] leading-7 text-ink">
            停车和住宿承载仍在安全区，票务会在午后进入拥挤前状态，商业消费链路是今天最需要立刻处理的短板。
          </p>
        </div>
      </div>

      <section class="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        <article
          v-for="metric in monitorCommandMetrics"
          :key="metric.id"
          class="rounded-panel border px-4 py-4"
          :class="accentTone[metric.accent]"
        >
          <p class="text-[13px] text-muted-foreground">{{ metric.label }}</p>
          <div class="mt-2 flex items-baseline gap-1 text-ink">
            <span class="amount-font text-[28px] font-medium leading-none">{{ metric.value }}</span>
            <span v-if="metric.unit" class="text-[13px] text-muted-foreground">{{ metric.unit }}</span>
          </div>
          <p class="mt-2 text-[13px] leading-5 text-muted-foreground">{{ metric.insight }}</p>
        </article>
      </section>
    </header>

    <section class="grid gap-3 xl:grid-cols-3">
      <article
        v-for="item in monitorFocusItems"
        :key="item.id"
        class="panel-line rounded-panel bg-panel px-4 py-4"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <p class="text-[16px] font-medium text-ink">{{ item.title }}</p>
            <p class="mt-2 text-[14px] leading-6 text-muted-foreground">{{ item.detail }}</p>
          </div>
          <StatusBadge :status="item.status" />
        </div>
        <p class="mt-3 text-[13px] text-muted-foreground">责任位：{{ item.owner }}</p>
      </article>
    </section>

    <section class="grid gap-4 xl:grid-cols-2">
      <article v-for="section in monitorSections" :key="section.id" class="panel-line rounded-panel bg-panel p-4 sm:p-5">
        <div class="flex flex-col gap-3 border-b border-line pb-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 class="text-[20px] font-medium text-ink">{{ section.title }}</h2>
            <p class="mt-2 text-[14px] leading-6 text-muted-foreground">{{ section.summary }}</p>
          </div>

          <div class="flex flex-wrap gap-2">
            <span
              v-for="signal in section.signals"
              :key="signal.id"
              class="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px]"
              :class="signalTone[signal.status]"
            >
              <span class="text-muted-foreground">{{ signal.label }}</span>
              <span class="font-medium text-ink">{{ signal.value }}</span>
            </span>
          </div>
        </div>

        <div class="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <article v-for="stat in section.stats" :key="stat.id" class="rounded-panel border border-line bg-panel/75 px-3 py-3">
            <div class="flex items-start justify-between gap-2">
              <p class="text-[13px] text-muted-foreground">{{ stat.label }}</p>
              <StatusBadge :status="stat.status" />
            </div>
            <div class="mt-3 flex items-baseline gap-1 text-ink">
              <span class="amount-font text-[24px] font-medium leading-none">{{ stat.value }}</span>
              <span v-if="stat.unit" class="text-[13px] text-muted-foreground">{{ stat.unit }}</span>
            </div>
          </article>
        </div>

        <div class="mt-4 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div class="rounded-panel border border-line bg-panel/65 p-4">
            <div class="flex items-baseline justify-between gap-3">
              <h3 class="text-[16px] font-medium text-ink">实时明细</h3>
              <span class="text-[12px] text-muted-foreground">{{ section.rows.length }} 项</span>
            </div>

            <div class="mt-3 divide-y divide-line">
              <article v-for="row in section.rows" :key="row.id" class="py-3 first:pt-0 last:pb-0">
                <div class="flex items-baseline justify-between gap-3">
                  <p class="text-[14px] font-medium text-ink">{{ row.name }}</p>
                  <p class="amount-font text-[16px] font-medium text-ink">{{ row.value }}</p>
                </div>
                <p class="mt-1 text-[13px] leading-5 text-muted-foreground">{{ row.note }}</p>
              </article>
            </div>
          </div>

          <TrendPanel
            :title="`${section.title}节奏`"
            subtitle="当前与参考节奏对比"
            :points="section.trend"
            type="bar"
            value-label="当前"
            compare-label="参考"
          />
        </div>
      </article>
    </section>
  </div>
</template>
