<script setup lang="ts">
import type { ForecastDay } from '@/types/domain'
import StatusBadge from './StatusBadge.vue'

defineProps<{
  days: ForecastDay[]
}>()
</script>

<template>
  <section class="panel-line rounded-panel bg-white p-4 sm:p-5">
    <h2 class="text-[18px] font-medium text-ink">未来经营热力</h2>
    <p class="mt-1 text-[14px] text-muted-foreground">把出租、票务和收入压力放在同一张日历里判断。</p>
    <div class="mt-4 grid gap-3 md:grid-cols-7">
      <article v-for="day in days" :key="day.date" class="rounded-panel border border-line p-3" :class="day.status === 'risk' ? 'bg-peach' : day.status === 'warning' ? 'bg-butter' : 'bg-mint/70'">
        <div class="flex items-start justify-between gap-2">
          <div>
            <p class="text-[14px] font-medium text-ink">{{ day.date }}</p>
            <p class="text-[13px] text-muted-foreground">{{ day.label }}</p>
          </div>
          <StatusBadge :status="day.status" />
        </div>
        <p class="amount-font mt-4 text-[24px] font-medium text-ink">{{ day.occupancy }}%</p>
        <p class="mt-1 text-[13px] text-muted-foreground">{{ day.tickets }} 张预售</p>
        <p class="mt-2 text-[13px] leading-5 text-muted-foreground">{{ day.note }}</p>
      </article>
    </div>
  </section>
</template>
