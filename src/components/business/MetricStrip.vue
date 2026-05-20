<script setup lang="ts">
import MetricCard from './MetricCard.vue'

import type { Metric } from '@/types/domain'

defineProps<{
  metrics: Metric[]
}>()
</script>

<template>
  <section class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
    <MetricCard v-for="metric in metrics" :key="metric.id" :metric="metric" />
  </section>
</template>
