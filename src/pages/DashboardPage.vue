<script setup lang="ts">
import ActionList from '@/components/business/ActionList.vue'
import JourneyFlow from '@/components/business/JourneyFlow.vue'
import MetricStrip from '@/components/business/MetricStrip.vue'
import ProjectStatusBar from '@/components/business/ProjectStatusBar.vue'
import RiskQueue from '@/components/business/RiskQueue.vue'
import TrendPanel from '@/components/business/TrendPanel.vue'
import { actionItems, dashboardMetrics, journeyNodes, revenueTrend, riskQueue } from '@/data/mock-dashboard'
import { useAppStore } from '@/stores/app'

const app = useAppStore()
</script>

<template>
  <div class="mx-auto max-w-[1480px] space-y-4">
    <section class="panel-line overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(237,241,255,0.92)_48%,rgba(229,245,247,0.88)_100%)] px-5 py-5 sm:px-6 sm:py-6">
      <div class="grid gap-5 xl:grid-cols-[1.15fr_0.85fr] xl:items-end">
        <div>
          <p class="text-[13px] uppercase tracking-[0.22em] text-muted-foreground">Welcome Back</p>
          <h1 class="mt-3 text-[30px] font-medium leading-tight text-ink sm:text-[40px]">
            {{ app.currentUser?.displayName }}，今天先从经营判断开始。
          </h1>
          <p class="mt-4 max-w-3xl text-[15px] leading-7 text-muted-foreground">
            当前系统已经把停车、票务、住宿和商业数据汇总到一个工作台里，你可以直接用这页做晨会判断、值班巡检和客户演示。
          </p>
        </div>

        <div class="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
          <article v-for="card in app.dashboardWelcomeCards" :key="card.label" class="rounded-[22px] border border-white/75 bg-white/72 px-4 py-4">
            <p class="text-[13px] text-muted-foreground">{{ card.label }}</p>
            <p class="mt-2 amount-font text-[24px] font-medium text-ink">{{ card.value }}</p>
            <p class="mt-2 text-[13px] leading-5 text-muted-foreground">{{ card.detail }}</p>
          </article>
        </div>
      </div>
    </section>

    <ProjectStatusBar :project-name="app.projectName" :updated-at="app.updatedAt" />

    <section class="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
      <div class="space-y-4">
        <div class="panel-line rounded-panel bg-panel p-4 sm:p-5">
          <p class="text-[14px] text-muted-foreground">经营判断</p>
          <h2 class="mt-2 max-w-3xl text-[25px] font-medium leading-tight text-ink sm:text-[34px]">
            今日整体平稳，商业转化偏弱，午后票务核销需要提前处理。
          </h2>
          <p class="mt-4 max-w-2xl text-[15px] leading-7 text-muted-foreground">
            当前酒店和停车承载安全，票务入园保持增长；商业二消与入园客流不匹配，是今天最值得关注的经营机会。
          </p>
        </div>
        <MetricStrip :metrics="dashboardMetrics" />
        <JourneyFlow :nodes="journeyNodes" />
      </div>

      <div class="space-y-4">
        <RiskQueue :items="riskQueue" />
        <ActionList :items="actionItems" />
      </div>
    </section>

    <TrendPanel title="今日收入分时趋势" subtitle="单位：万元，ECharts 对比今日与参考日经营节奏。" :points="revenueTrend" value-label="今日" compare-label="参考日" />
  </div>
</template>
