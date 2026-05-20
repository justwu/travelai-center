<script setup lang="ts">
import ActionList from '@/components/business/ActionList.vue'
import EvidenceList from '@/components/business/EvidenceList.vue'
import MetricStrip from '@/components/business/MetricStrip.vue'
import ReportSummary from '@/components/business/ReportSummary.vue'
import TrendPanel from '@/components/business/TrendPanel.vue'
import { reportActions, reportEvidence, reportMetrics, reportTrend } from '@/data/mock-report'

const paragraphs = [
  '本周期经营收入同比增长 29.55%，恢复质量较好。增长主要来自酒店和票务，停车承载保持安全，说明核心到访链路没有出现明显瓶颈。',
  '需要重点处理的是商业二消转化。当前入园客流和项目销售保持稳定，但店铺订单和客单价没有同步放大，建议把商业动线、商品陈列和联票权益作为下一轮优化重点。',
  '周末预售显示票务核销和停车到达会出现短时压力，建议提前安排核销通道、停车引导和热门项目排班。',
]
</script>

<template>
  <div class="mx-auto max-w-[1480px] space-y-4">
    <header class="panel-line rounded-panel bg-white p-4 sm:p-5">
      <p class="text-[14px] text-muted-foreground">复盘报告</p>
      <h1 class="mt-1 text-[28px] font-medium text-ink sm:text-[34px]">经营复盘初稿</h1>
      <p class="mt-3 max-w-3xl text-[15px] leading-7 text-muted-foreground">
        不只是展示指标，而是把结论、证据和行动项整理成可开会讨论的版本。
      </p>
    </header>

    <MetricStrip :metrics="reportMetrics" />
    <TrendPanel
      title="收入构成复盘"
      subtitle="按业态对比本期和参考期，商业偏弱会更明显。"
      :points="reportTrend"
      type="bar"
      value-label="本期"
      compare-label="参考期"
    />

    <section class="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
      <ReportSummary title="本日经营结论" :paragraphs="paragraphs" />
      <EvidenceList :items="reportEvidence" />
    </section>

    <ActionList title="复盘行动项" :items="reportActions" />
  </div>
</template>
