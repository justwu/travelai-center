<script setup lang="ts">
import type { MetricStatus } from '@/types/domain'
import { statusLabel, statusTone } from '@/lib/utils'

defineProps<{
  status: MetricStatus
}>()
</script>

<template>
  <span class="inline-flex items-center rounded-full border px-2.5 py-1 text-[13px]" :class="statusTone(status)">
    {{ statusLabel(status) }}
  </span>
</template>
