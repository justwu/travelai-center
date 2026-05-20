<script setup lang="ts">
import { sortRisksByPriority, type RiskItem } from '@/types/domain'

const props = defineProps<{
  items: RiskItem[]
}>()

const priorityLabel = {
  high: '高影响',
  medium: '需关注',
  low: '观察',
}
</script>

<template>
  <section class="panel-line rounded-panel bg-panel p-4 sm:p-5">
    <div class="mb-4 flex items-center justify-between gap-3">
      <div>
        <h2 class="text-[18px] font-medium text-ink">异常队列</h2>
        <p class="mt-1 text-[14px] text-muted-foreground">按经营影响排序，直接指向处理动作。</p>
      </div>
      <span class="rounded-full border border-risk/30 bg-risk/10 px-3 py-1 text-[13px] text-risk">{{ items.length }} 项</span>
    </div>

    <div class="space-y-3">
      <article v-for="item in sortRisksByPriority(props.items)" :key="item.id" class="rounded-panel border border-line bg-background/70 p-3">
        <div class="flex items-start justify-between gap-3">
          <h3 class="text-[15px] font-medium text-ink">{{ item.title }}</h3>
          <span class="shrink-0 rounded-full border px-2.5 py-1 text-[13px]" :class="item.priority === 'high' ? 'border-risk/30 bg-risk/10 text-risk' : item.priority === 'medium' ? 'border-warning/30 bg-warning/10 text-warning' : 'border-border bg-white text-muted-foreground'">
            {{ priorityLabel[item.priority] }}
          </span>
        </div>
        <p class="mt-2 text-[14px] text-ink">{{ item.impact }}</p>
        <p class="mt-2 text-[13px] leading-5 text-muted-foreground sm:text-[14px]">原因：{{ item.reason }}</p>
        <p class="mt-1 text-[13px] leading-5 text-muted-foreground sm:text-[14px]">建议：{{ item.action }}</p>
      </article>
    </div>
  </section>
</template>
