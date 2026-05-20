<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import ActionList from '@/components/business/ActionList.vue'
import EvidenceList from '@/components/business/EvidenceList.vue'
import MetricStrip from '@/components/business/MetricStrip.vue'
import StatusBadge from '@/components/business/StatusBadge.vue'
import TrendPanel from '@/components/business/TrendPanel.vue'
import { modulePageById } from '@/data/module-pages'
import { useAppStore } from '@/stores/app'
import type { ActionItem, EvidenceItem, Metric, MetricStatus, TrendPoint } from '@/types/domain'

interface BriefingItem {
  id: string
  title: string
  detail: string
  status: MetricStatus
}

interface TableRow {
  id: string
  name: string
  value: string
  note: string
}

interface SpotlightConfig {
  eyebrow: string
  title: string
  summary: string
  followup: string
  bands: Array<{ id: string; label: string; value: string; note: string }>
  actions: ActionItem[]
  evidence: EvidenceItem[]
  rankingTitle: string
  rankingRows: TableRow[]
  rankingHint: string
  briefingTitle: string
  briefingItems: BriefingItem[]
  trendTitle: string
  trendSubtitle: string
  trendType?: 'line' | 'bar'
  trendPoints: TrendPoint[]
  trendValueLabel?: string
  trendCompareLabel?: string
}

const route = useRoute()
const app = useAppStore()

const page = computed(() => modulePageById[String(route.meta.moduleId)] ?? modulePageById.live)

const hotelSpotlight = computed<SpotlightConfig>(() => ({
  eyebrow: '住宿经营专题',
  title: '把房态、房价和团散结构放在一张收益工作台里。',
  summary: '酒店页不再只是看一张趋势图，而是先判断哪家酒店在拉动收益、哪家酒店需要补量、房价是否还有上探空间。',
  followup: '当前整体出租率尚可，但房价弹性主要集中在高客单物业，低价补量酒店需要单独处理。',
  bands: [
    { id: 'hotel-band-1', label: '收益判断', value: '整体平稳', note: '艺术酒店和高客单院落支撑当前房费收入。' },
    { id: 'hotel-band-2', label: '价格动作', value: '保留弹性', note: '高需求日期不急着降价补量。' },
    { id: 'hotel-band-3', label: '团散结构', value: '接近 1:1', note: '团队上升时要盯紧 ADR 回落。' },
  ],
  actions: [
    { id: 'hotel-action-1', title: '复核高需求日期房价带', owner: '收益经理', due: '今日 18:00', status: '进行中', evidence: '周六预售和高客单房型承接能力较强。' },
    { id: 'hotel-action-2', title: '给低出租酒店补定向投放', owner: '直销运营', due: '明日 10:00', status: '待处理', evidence: '林间和低出租楼栋存在明显补量空间。' },
  ],
  evidence: [
    { id: 'hotel-evidence-1', title: '湖岸酒店', value: '¥147,319.64', detail: '出租 270 间，仍是当前最大房费来源。' },
    { id: 'hotel-evidence-2', title: '艺术酒店', value: '49.67%', detail: '出租率与 ADR 组合最好，适合继续承接散客。' },
    { id: 'hotel-evidence-3', title: '团散结构', value: '297 / 297', detail: '团队与散客接近持平，价格策略要分层。' },
  ],
  rankingTitle: '酒店经营排位',
  rankingRows: [
    { id: 'hotel-row-1', name: '湖岸酒店', value: '40.00% / ¥545.63', note: '出租率稳，房价仍是第一梯队。' },
    { id: 'hotel-row-2', name: '艺术酒店', value: '49.67% / ¥473.24', note: '最能带量，适合继续做散客承接。' },
    { id: 'hotel-row-3', name: '观澜院', value: '39.50% / ¥537.10', note: '房价健康，但出租率还有提升空间。' },
    { id: 'hotel-row-4', name: '林间客舍', value: '12.50% / ¥669.00', note: '高客单但明显缺量，应单独补量。' },
  ],
  rankingHint: '用“出租率 / ADR”双指标看每家酒店，不再只给一组汇总数。',
  briefingTitle: '今日住宿判断',
  briefingItems: [
    { id: 'hotel-brief-1', title: '高价房型还能撑住', detail: '云岭和高客单院落还有利润空间，不需要靠低价抢量。', status: 'normal' },
    { id: 'hotel-brief-2', title: '低出租楼栋要单独补量', detail: '低入住楼栋不适合跟高客单酒店共用一套策略。', status: 'warning' },
    { id: 'hotel-brief-3', title: '团客抬升时盯紧 ADR', detail: '团队占比一旦继续上升，整体房价会被快速拉低。', status: 'warning' },
  ],
  trendTitle: '酒店出租率与 ADR 对照',
  trendSubtitle: '不同酒店用同一张图看出租表现和房价质量。',
  trendType: 'bar',
  trendPoints: page.value.trend,
  trendValueLabel: '出租率',
  trendCompareLabel: 'ADR',
}))

const commerceSpotlight = computed<SpotlightConfig>(() => ({
  eyebrow: '商业转化专题',
  title: '先看消费漏斗，再看店铺和商品，不再只堆营业额。',
  summary: '商业页最重要的不是“又一张收入图”，而是解释为什么入园有了、消费却没跟上。',
  followup: '目前的问题更像动线和店铺营业状态，而不是单纯客流不足。',
  bands: [
    { id: 'commerce-band-1', label: '转化状态', value: '明显偏弱', note: '入园和店铺成交之间断层明显。' },
    { id: 'commerce-band-2', label: '主力商品', value: '文创雪糕', note: '仍是最能带动订单的单品。' },
    { id: 'commerce-band-3', label: '门店动作', value: '先查开业状态', note: '比单纯做促销更优先。' },
  ],
  actions: [
    { id: 'commerce-action-1', title: '闭园前复核门店开业状态', owner: '商业主管', due: '今日闭园前', status: '待处理', evidence: '实时营业额只有 ¥27，异常明显。' },
    { id: 'commerce-action-2', title: '把热卖商品前置到主通道', owner: '陈列运营', due: '明日 11:00', status: '进行中', evidence: '文创雪糕单品仍有吸引力，但曝光不足。' },
  ],
  evidence: [
    { id: 'commerce-evidence-1', title: '实时营业额', value: '¥27.00', detail: '与入园人数不匹配，先排查门店营业状态。' },
    { id: 'commerce-evidence-2', title: '历史订单数', value: '35 单', detail: '商业历史口径并不差，说明当前问题更偏现场执行。' },
    { id: 'commerce-evidence-3', title: '转化率', value: '0.92%', detail: '从入园到消费的转化仍处低位。' },
  ],
  rankingTitle: '店铺与商品优先级',
  rankingRows: [
    { id: 'commerce-row-1', name: '文创雪糕', value: '14 件 / ¥280', note: '当前最稳的引流商品。' },
    { id: 'commerce-row-2', name: '站台零售', value: '10 单 / ¥335', note: '交易更集中，说明通道位更有效。' },
    { id: 'commerce-row-3', name: '可口可乐文创店', value: '25 单 / ¥215', note: '有订单，但客单和效率都偏弱。' },
    { id: 'commerce-row-4', name: '年度门店客单', value: '¥15.39', note: '靠低客单撑量，不利于收入上探。' },
  ],
  rankingHint: '把门店和商品同时摆出来，更容易找到“应该先动哪一个”。',
  briefingTitle: '商业诊断',
  briefingItems: [
    { id: 'commerce-brief-1', title: '不是没人，是没转化', detail: '客流正常但消费没跟上，现场链路有断点。', status: 'risk' },
    { id: 'commerce-brief-2', title: '热卖商品值得前置', detail: '文创雪糕的销量说明游客并非完全没有消费意愿。', status: 'normal' },
    { id: 'commerce-brief-3', title: '先看门店开没开足', detail: '实时合计异常低，先排现场执行，再谈营销。', status: 'risk' },
  ],
  trendTitle: '商业销售与客单节奏',
  trendSubtitle: '月度销售额用柱形图，客单价用参考线辅助判断。',
  trendType: 'bar',
  trendPoints: page.value.trend,
  trendValueLabel: '销售额',
  trendCompareLabel: '客单价',
}))

const parkingSpotlight = computed<SpotlightConfig>(() => ({
  eyebrow: '到达承载专题',
  title: '停车页要先回答承载是否安全，再回答到达从哪里来。',
  summary: '停车不是独立报表，它其实是整个景区客流和现场调度的前哨。',
  followup: '当前车位余量足够，但到达峰值较早，需要和票务核销节奏联动。',
  bands: [
    { id: 'parking-band-1', label: '承载结论', value: '安全', note: '当前占用 609 个车位，余位充足。' },
    { id: 'parking-band-2', label: '峰值判断', value: '提前到来', note: '午前进场速度偏快，现场要前置引导。' },
    { id: 'parking-band-3', label: '客源结构', value: '本地为主', note: '江苏和无锡仍是主到达来源。' },
  ],
  actions: [
    { id: 'parking-action-1', title: '午高峰前提前布置引导岗', owner: '现场调度', due: '12:30', status: '进行中', evidence: '进场速度在 10:00 后明显变陡。' },
    { id: 'parking-action-2', title: '同步票务核销窗口节奏', owner: '票务主管', due: '13:00', status: '待处理', evidence: '停车峰值与入园峰值时间接近。' },
  ],
  evidence: [
    { id: 'parking-evidence-1', title: '累计进场', value: '1,267 辆', detail: '到达量健康，但需要关注峰值时段的堆积。' },
    { id: 'parking-evidence-2', title: '剩余车位', value: '1,861 个', detail: '总量安全，问题主要在引导节奏。' },
    { id: 'parking-evidence-3', title: '省内客源', value: '无锡 62.08%', detail: '本地自驾仍是主要到达方式。' },
  ],
  rankingTitle: '到达结构看板',
  rankingRows: [
    { id: 'parking-row-1', name: '本省客源', value: '3292 辆', note: '江苏省客流是当前主来源。' },
    { id: 'parking-row-2', name: '本市客源', value: '2592 辆', note: '无锡自驾车占比最高。' },
    { id: 'parking-row-3', name: '均停时长', value: '0.42 小时', note: '实时口径偏短，说明仍处入场阶段。' },
    { id: 'parking-row-4', name: '昨日峰值参考', value: '4175 辆', note: '历史峰值还有明显余量。' },
  ],
  rankingHint: '把承载、来源地和历史峰值放一起看，更容易支持现场调度。',
  briefingTitle: '现场调度提示',
  briefingItems: [
    { id: 'parking-brief-1', title: '总量安全但峰值要盯', detail: '不是车位不够，而是高峰期引导要更早。', status: 'normal' },
    { id: 'parking-brief-2', title: '停车和核销要联动', detail: '到达峰值往往先于拥堵感知，最好提前联动票务。', status: 'warning' },
    { id: 'parking-brief-3', title: '本地客流占比高', detail: '本地自驾更适合用分时广播和道路引导。', status: 'normal' },
  ],
  trendTitle: '车辆进出场节奏',
  trendSubtitle: '对比进场与离场累计节奏，看现场是否会出现集中堆积。',
  trendType: 'line',
  trendPoints: page.value.trend,
  trendValueLabel: '进场',
  trendCompareLabel: '离场',
}))

const sourceSpotlight = computed<SpotlightConfig>(() => ({
  eyebrow: '客源结构专题',
  title: '客源页更像一个人群画像台，而不是单一排行图。',
  summary: '客源分析要帮助经营团队判断：人从哪里来、实名程度如何、什么人群更值得后续触达。',
  followup: '当前非实名比例偏高，说明后续精细化运营空间还很大。',
  bands: [
    { id: 'source-band-1', label: '客源结论', value: '外省偏多', note: '外省游客占比超过 80%，更适合联票和住宿打法。' },
    { id: 'source-band-2', label: '实名状态', value: '偏低', note: '非实名占比高，不利于后续精细化触达。' },
    { id: 'source-band-3', label: '性别结构', value: '女性占优', note: '女性游客占比接近六成。' },
  ],
  actions: [
    { id: 'source-action-1', title: '补齐实名采集策略', owner: '市场运营', due: '本周五', status: '待处理', evidence: '非实名占比超过一半，触达质量受限。' },
    { id: 'source-action-2', title: '围绕外省游客设计住宿联票', owner: '产品运营', due: '周四晨会', status: '进行中', evidence: '外省游客更适合做住宿 + 项目联动。' },
  ],
  evidence: [
    { id: 'source-evidence-1', title: '累计接待', value: '88,712 人次', detail: '住宿与购票两类客源合并观察。' },
    { id: 'source-evidence-2', title: '非实名游客', value: '47,200 人', detail: '说明后续 CRM 触达仍有缺口。' },
    { id: 'source-evidence-3', title: '女性游客', value: '58.91%', detail: '女性群体在当前客源中占优。' },
  ],
  rankingTitle: '客源重点结构',
  rankingRows: [
    { id: 'source-row-1', name: '江苏', value: '16.9 千人 / 19.1%', note: '核心来源省份。' },
    { id: 'source-row-2', name: '上海', value: '10.0 千人 / 11.3%', note: '高质量周边客源。' },
    { id: 'source-row-3', name: '非实名游客', value: '47.2 千人 / 53.2%', note: '后续精细化运营最大缺口。' },
    { id: 'source-row-4', name: '女性游客', value: '24,426 人', note: '值得围绕商品和内容继续放大。' },
  ],
  rankingHint: '把地域、实名和人群结构摆到同一页，比单看地图更有经营价值。',
  briefingTitle: '客群观察',
  briefingItems: [
    { id: 'source-brief-1', title: '更适合做外地游客联票', detail: '外省游客占比高，说明住宿和项目联动还有空间。', status: 'normal' },
    { id: 'source-brief-2', title: '非实名偏高要补采集', detail: '后续复购和营销触达会受限。', status: 'warning' },
    { id: 'source-brief-3', title: '女性客群值得细做内容', detail: '可以围绕商品、文创和轻体验继续优化。', status: 'normal' },
  ],
  trendTitle: '客源结构 Top5',
  trendSubtitle: '人数与占比同图，先看绝对量，再看结构。',
  trendType: 'bar',
  trendPoints: page.value.trend,
  trendValueLabel: '人数',
  trendCompareLabel: '占比',
}))

const spotlight = computed(() => {
  switch (page.value.layout) {
    case 'hotel':
      return hotelSpotlight.value
    case 'commerce':
      return commerceSpotlight.value
    case 'parking':
      return parkingSpotlight.value
    case 'source':
      return sourceSpotlight.value
    default:
      return null
  }
})
</script>

<template>
  <div class="mx-auto max-w-[1480px] space-y-4">
    <template v-if="!spotlight">
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
    </template>

    <template v-else-if="page.layout === 'hotel'">
      <header class="panel-line rounded-panel bg-panel px-4 py-5 sm:px-5 sm:py-6">
        <div class="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div class="max-w-4xl">
            <p class="text-[14px] text-muted-foreground">{{ spotlight.eyebrow }}</p>
            <h1 class="mt-2 max-w-4xl text-[28px] font-medium leading-tight text-ink sm:text-[38px]">
              {{ spotlight.title }}
            </h1>
            <p class="mt-4 max-w-3xl text-[15px] leading-7 text-muted-foreground">
              {{ spotlight.summary }}
            </p>
          </div>

          <div class="grid gap-3 rounded-panel border border-line bg-muted/55 p-4 text-[13px] leading-6 text-muted-foreground sm:grid-cols-2 xl:min-w-[360px]">
            <div>
              <p>页面名称：{{ page.title }}</p>
              <p>采集目录：{{ page.sourceDir }}</p>
            </div>
            <div>
              <p>项目：{{ app.projectName }}</p>
              <p>数据时间：{{ page.updatedAt }}</p>
            </div>
          </div>
        </div>

        <div class="mt-5 grid gap-3 md:grid-cols-3">
          <article v-for="band in spotlight.bands" :key="band.id" class="rounded-panel border border-line bg-panel/75 px-4 py-3">
            <p class="text-[13px] text-muted-foreground">{{ band.label }}</p>
            <p class="mt-2 amount-font text-[24px] font-medium text-ink">{{ band.value }}</p>
            <p class="mt-2 text-[13px] leading-5 text-muted-foreground sm:text-[14px]">{{ band.note }}</p>
          </article>
        </div>
      </header>

      <MetricStrip :metrics="page.metrics" />

      <section class="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <TrendPanel
          :title="spotlight!.trendTitle"
          :subtitle="spotlight!.trendSubtitle"
          :points="spotlight!.trendPoints"
          :type="spotlight!.trendType ?? 'line'"
          :value-label="spotlight!.trendValueLabel ?? '当前'"
          :compare-label="spotlight!.trendCompareLabel ?? '参考'"
        />

        <div class="panel-line rounded-panel bg-panel p-4 sm:p-5">
          <div class="flex items-baseline justify-between gap-3">
            <h2 class="text-[20px] font-medium text-ink">{{ spotlight!.rankingTitle }}</h2>
            <span class="text-[13px] text-muted-foreground">{{ spotlight!.rankingRows.length }} 项</span>
          </div>
          <p class="mt-2 text-[14px] leading-6 text-muted-foreground">{{ spotlight!.rankingHint }}</p>

          <div class="mt-4 divide-y divide-line">
            <article v-for="row in spotlight!.rankingRows" :key="row.id" class="grid gap-2 py-3 first:pt-0 last:pb-0 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <p class="text-[15px] font-medium text-ink">{{ row.name }}</p>
                <p class="mt-1 text-[13px] leading-5 text-muted-foreground sm:text-[14px]">{{ row.note }}</p>
              </div>
              <p class="amount-font text-[18px] font-medium text-ink sm:text-right">{{ row.value }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <div class="panel-line rounded-panel bg-panel p-4 sm:p-5">
          <div class="flex items-start justify-between gap-3">
            <div>
              <h2 class="text-[20px] font-medium text-ink">{{ spotlight!.briefingTitle }}</h2>
              <p class="mt-2 text-[15px] leading-7 text-muted-foreground">{{ spotlight!.followup }}</p>
            </div>
            <span class="rounded-full border border-line bg-mint px-3 py-1 text-[13px] text-ink">专题页</span>
          </div>

          <div class="mt-5 space-y-3">
            <article v-for="item in spotlight!.briefingItems" :key="item.id" class="rounded-panel border border-line bg-panel/75 p-4">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <h3 class="text-[16px] font-medium text-ink">{{ item.title }}</h3>
                  <p class="mt-2 text-[14px] leading-6 text-muted-foreground">{{ item.detail }}</p>
                </div>
                <StatusBadge :status="item.status" />
              </div>
            </article>
          </div>
        </div>

        <EvidenceList :items="spotlight!.evidence" />
      </section>

      <ActionList title="建议动作" :items="spotlight!.actions" />
    </template>

    <template v-else-if="page.layout === 'commerce'">
      <header class="panel-line rounded-panel bg-panel px-4 py-5 sm:px-5 sm:py-6">
        <div class="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div class="max-w-4xl">
            <p class="text-[14px] text-muted-foreground">{{ spotlight!.eyebrow }}</p>
            <h1 class="mt-2 max-w-4xl text-[28px] font-medium leading-tight text-ink sm:text-[38px]">
              {{ spotlight!.title }}
            </h1>
            <p class="mt-4 max-w-3xl text-[15px] leading-7 text-muted-foreground">
              {{ spotlight!.summary }}
            </p>
          </div>

          <div class="rounded-panel border border-risk/25 bg-peach/60 px-4 py-3 text-[14px] leading-6 text-ink xl:max-w-[360px]">
            <p class="font-medium">核心问题</p>
            <p class="mt-2">{{ spotlight!.followup }}</p>
          </div>
        </div>

        <div class="mt-5 grid gap-3 md:grid-cols-3">
          <article v-for="band in spotlight!.bands" :key="band.id" class="rounded-panel border border-line bg-panel/75 px-4 py-3">
            <p class="text-[13px] text-muted-foreground">{{ band.label }}</p>
            <p class="mt-2 amount-font text-[24px] font-medium text-ink">{{ band.value }}</p>
            <p class="mt-2 text-[13px] leading-5 text-muted-foreground sm:text-[14px]">{{ band.note }}</p>
          </article>
        </div>
      </header>

      <MetricStrip :metrics="page.metrics" />

      <section class="grid gap-4 xl:grid-cols-[0.96fr_1.04fr]">
        <div class="panel-line rounded-panel bg-panel p-4 sm:p-5">
          <div class="flex items-baseline justify-between gap-3">
            <h2 class="text-[20px] font-medium text-ink">{{ spotlight!.briefingTitle }}</h2>
            <span class="text-[13px] text-muted-foreground">消费漏斗</span>
          </div>

          <div class="mt-4 space-y-3">
            <article
              v-for="item in spotlight!.briefingItems"
              :key="item.id"
              class="rounded-panel border px-4 py-4"
              :class="item.status === 'risk' ? 'border-risk/30 bg-peach/45' : item.status === 'warning' ? 'border-warning/30 bg-butter/50' : 'border-line bg-mint/30'"
            >
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <h3 class="text-[16px] font-medium text-ink">{{ item.title }}</h3>
                  <p class="mt-2 text-[14px] leading-6 text-muted-foreground">{{ item.detail }}</p>
                </div>
                <StatusBadge :status="item.status" />
              </div>
            </article>
          </div>
        </div>

        <TrendPanel
          :title="spotlight!.trendTitle"
          :subtitle="spotlight!.trendSubtitle"
          :points="spotlight!.trendPoints"
          :type="spotlight!.trendType ?? 'line'"
          :value-label="spotlight!.trendValueLabel ?? '当前'"
          :compare-label="spotlight!.trendCompareLabel ?? '参考'"
        />
      </section>

      <section class="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <div class="panel-line rounded-panel bg-panel p-4 sm:p-5">
          <div class="flex items-baseline justify-between gap-3">
            <h2 class="text-[20px] font-medium text-ink">{{ spotlight!.rankingTitle }}</h2>
            <span class="text-[13px] text-muted-foreground">优先排查顺序</span>
          </div>
          <p class="mt-2 text-[14px] leading-6 text-muted-foreground">{{ spotlight!.rankingHint }}</p>

          <div class="mt-4 grid gap-3 sm:grid-cols-2">
            <article v-for="row in spotlight!.rankingRows" :key="row.id" class="rounded-panel border border-line bg-panel/75 px-4 py-3">
              <p class="text-[15px] font-medium text-ink">{{ row.name }}</p>
              <p class="mt-2 amount-font text-[18px] font-medium text-ink">{{ row.value }}</p>
              <p class="mt-2 text-[13px] leading-5 text-muted-foreground sm:text-[14px]">{{ row.note }}</p>
            </article>
          </div>
        </div>

        <ActionList title="商业动作" :items="spotlight!.actions" />
      </section>

      <EvidenceList :items="spotlight!.evidence" />
    </template>

    <template v-else-if="page.layout === 'parking'">
      <header class="panel-line rounded-panel bg-panel px-4 py-5 sm:px-5 sm:py-6">
        <div class="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p class="text-[14px] text-muted-foreground">{{ spotlight!.eyebrow }}</p>
            <h1 class="mt-2 max-w-4xl text-[28px] font-medium leading-tight text-ink sm:text-[38px]">
              {{ spotlight!.title }}
            </h1>
            <p class="mt-4 max-w-3xl text-[15px] leading-7 text-muted-foreground">
              {{ spotlight!.summary }}
            </p>
          </div>

          <div class="rounded-panel border border-line bg-sky/45 p-4 text-[14px] leading-6 text-ink">
            <p class="font-medium">调度提醒</p>
            <p class="mt-2">{{ spotlight!.followup }}</p>
            <div class="mt-4 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              <article v-for="band in spotlight!.bands" :key="band.id" class="rounded-panel border border-line bg-panel/75 px-3 py-3">
                <p class="text-[13px] text-muted-foreground">{{ band.label }}</p>
                <p class="mt-2 amount-font text-[22px] font-medium text-ink">{{ band.value }}</p>
                <p class="mt-2 text-[13px] leading-5 text-muted-foreground">{{ band.note }}</p>
              </article>
            </div>
          </div>
        </div>
      </header>

      <MetricStrip :metrics="page.metrics" />

      <section class="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
        <TrendPanel
          :title="spotlight!.trendTitle"
          :subtitle="spotlight!.trendSubtitle"
          :points="spotlight!.trendPoints"
          :type="spotlight!.trendType ?? 'line'"
          :value-label="spotlight!.trendValueLabel ?? '当前'"
          :compare-label="spotlight!.trendCompareLabel ?? '参考'"
        />

        <div class="space-y-4">
          <div class="panel-line rounded-panel bg-panel p-4 sm:p-5">
            <div class="flex items-baseline justify-between gap-3">
              <h2 class="text-[20px] font-medium text-ink">{{ spotlight!.briefingTitle }}</h2>
              <span class="text-[13px] text-muted-foreground">现场联动</span>
            </div>

            <div class="mt-4 space-y-3">
              <article v-for="item in spotlight!.briefingItems" :key="item.id" class="rounded-panel border border-line bg-panel/75 p-4">
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <h3 class="text-[16px] font-medium text-ink">{{ item.title }}</h3>
                    <p class="mt-2 text-[14px] leading-6 text-muted-foreground">{{ item.detail }}</p>
                  </div>
                  <StatusBadge :status="item.status" />
                </div>
              </article>
            </div>
          </div>

          <div class="panel-line rounded-panel bg-panel p-4 sm:p-5">
            <div class="flex items-baseline justify-between gap-3">
              <h2 class="text-[20px] font-medium text-ink">{{ spotlight!.rankingTitle }}</h2>
              <span class="text-[13px] text-muted-foreground">到达结构</span>
            </div>

            <div class="mt-4 divide-y divide-line">
              <article v-for="row in spotlight!.rankingRows" :key="row.id" class="py-3 first:pt-0 last:pb-0">
                <div class="flex items-baseline justify-between gap-3">
                  <p class="text-[15px] font-medium text-ink">{{ row.name }}</p>
                  <p class="amount-font text-[18px] font-medium text-ink">{{ row.value }}</p>
                </div>
                <p class="mt-1 text-[13px] leading-5 text-muted-foreground sm:text-[14px]">{{ row.note }}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <EvidenceList :items="spotlight!.evidence" />
        <ActionList title="调度动作" :items="spotlight!.actions" />
      </section>
    </template>

    <template v-else-if="page.layout === 'source'">
      <header class="panel-line rounded-panel bg-panel px-4 py-5 sm:px-5 sm:py-6">
        <div class="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div class="max-w-4xl">
            <p class="text-[14px] text-muted-foreground">{{ spotlight!.eyebrow }}</p>
            <h1 class="mt-2 max-w-4xl text-[28px] font-medium leading-tight text-ink sm:text-[38px]">
              {{ spotlight!.title }}
            </h1>
            <p class="mt-4 max-w-3xl text-[15px] leading-7 text-muted-foreground">
              {{ spotlight!.summary }}
            </p>
          </div>

          <div class="rounded-panel border border-line bg-mint/35 px-4 py-3 text-[14px] leading-6 text-ink xl:max-w-[360px]">
            <p class="font-medium">客群提示</p>
            <p class="mt-2">{{ spotlight!.followup }}</p>
          </div>
        </div>

        <div class="mt-5 grid gap-3 md:grid-cols-3">
          <article v-for="band in spotlight!.bands" :key="band.id" class="rounded-panel border border-line bg-panel/75 px-4 py-3">
            <p class="text-[13px] text-muted-foreground">{{ band.label }}</p>
            <p class="mt-2 amount-font text-[24px] font-medium text-ink">{{ band.value }}</p>
            <p class="mt-2 text-[13px] leading-5 text-muted-foreground sm:text-[14px]">{{ band.note }}</p>
          </article>
        </div>
      </header>

      <MetricStrip :metrics="page.metrics" />

      <section class="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <TrendPanel
          :title="spotlight!.trendTitle"
          :subtitle="spotlight!.trendSubtitle"
          :points="spotlight!.trendPoints"
          :type="spotlight!.trendType ?? 'line'"
          :value-label="spotlight!.trendValueLabel ?? '当前'"
          :compare-label="spotlight!.trendCompareLabel ?? '参考'"
        />

        <EvidenceList :items="spotlight!.evidence" />
      </section>

      <section class="panel-line rounded-panel bg-panel p-4 sm:p-5">
        <div class="flex items-baseline justify-between gap-3">
          <h2 class="text-[20px] font-medium text-ink">{{ spotlight!.rankingTitle }}</h2>
          <span class="text-[13px] text-muted-foreground">结构优先级</span>
        </div>
        <p class="mt-2 text-[14px] leading-6 text-muted-foreground">{{ spotlight!.rankingHint }}</p>

        <div class="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <article v-for="row in spotlight!.rankingRows" :key="row.id" class="rounded-panel border border-line bg-panel/75 px-4 py-3">
            <p class="text-[15px] font-medium text-ink">{{ row.name }}</p>
            <p class="mt-2 amount-font text-[18px] font-medium text-ink">{{ row.value }}</p>
            <p class="mt-2 text-[13px] leading-5 text-muted-foreground sm:text-[14px]">{{ row.note }}</p>
          </article>
        </div>
      </section>

      <section class="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <div class="panel-line rounded-panel bg-panel p-4 sm:p-5">
          <div class="flex items-baseline justify-between gap-3">
            <h2 class="text-[20px] font-medium text-ink">{{ spotlight!.briefingTitle }}</h2>
            <span class="text-[13px] text-muted-foreground">经营启发</span>
          </div>

          <div class="mt-4 grid gap-3 md:grid-cols-3 xl:grid-cols-1">
            <article v-for="item in spotlight!.briefingItems" :key="item.id" class="rounded-panel border border-line bg-panel/75 p-4">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <h3 class="text-[16px] font-medium text-ink">{{ item.title }}</h3>
                  <p class="mt-2 text-[14px] leading-6 text-muted-foreground">{{ item.detail }}</p>
                </div>
                <StatusBadge :status="item.status" />
              </div>
            </article>
          </div>
        </div>

        <ActionList title="客群动作" :items="spotlight!.actions" />
      </section>
    </template>

  </div>
</template>
