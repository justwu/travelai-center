<script setup lang="ts">
import type { JourneyNode } from '@/types/domain'
import StatusBadge from './StatusBadge.vue'

defineProps<{
  nodes: JourneyNode[]
}>()
</script>

<template>
  <section class="panel-line rounded-panel bg-panel p-4 sm:p-5">
    <div class="mb-4">
      <h2 class="text-[18px] font-medium text-ink">经营链路</h2>
      <p class="mt-1 text-[14px] text-muted-foreground">从到达到消费，观察每个环节的转化质量。</p>
    </div>

    <div class="grid gap-3 md:grid-cols-5">
      <article v-for="node in nodes" :key="node.id" class="rounded-panel border border-line bg-background/70 p-3">
        <div class="flex items-center justify-between gap-2">
          <p class="text-[14px] font-medium text-muted-foreground">{{ node.label }}</p>
          <StatusBadge :status="node.status" />
        </div>
        <p class="amount-font mt-3 text-[26px] font-medium text-ink">{{ node.value }}</p>
        <p class="mt-1 text-[13px] text-muted-foreground">{{ node.change }}</p>
      </article>
    </div>
  </section>
</template>
