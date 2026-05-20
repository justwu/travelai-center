<script setup lang="ts">
import StatusBadge from './StatusBadge.vue'

import type { Metric } from '@/types/domain'

defineProps<{
  metric: Metric
}>()
</script>

<template>
  <article class="panel-line rounded-panel bg-white px-4 py-4">
    <div class="flex items-start justify-between gap-3">
      <div>
        <p class="text-[14px] font-medium text-muted-foreground">{{ metric.label }}</p>
        <div class="mt-2 flex items-baseline gap-1 text-ink">
          <span class="amount-font text-[30px] font-medium leading-none sm:text-[34px]">{{ metric.value }}</span>
          <span v-if="metric.unit" class="text-[14px] text-muted-foreground">{{ metric.unit }}</span>
        </div>
      </div>
      <StatusBadge :status="metric.status" />
    </div>
    <p v-if="metric.insight" class="mt-3 text-[13px] leading-5 text-muted-foreground sm:text-[14px]">
      {{ metric.insight }}
    </p>
  </article>
</template>
