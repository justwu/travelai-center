<script setup lang="ts">
import type { EvidenceItem } from '@/types/domain'

defineProps<{
  items: EvidenceItem[]
}>()
</script>

<template>
  <section class="panel-line rounded-panel bg-panel p-4 sm:p-5">
    <h2 class="text-[18px] font-medium text-ink">数据证据</h2>
    <div class="mt-4 divide-y divide-line">
      <article v-for="item in items" :key="item.id" class="py-3 first:pt-0 last:pb-0">
        <div class="flex items-baseline justify-between gap-3">
          <h3 class="text-[15px] font-medium text-ink">{{ item.title }}</h3>
          <p class="amount-font text-[18px] font-medium text-ink">{{ item.value }}</p>
        </div>
        <p class="mt-1 text-[13px] leading-5 text-muted-foreground sm:text-[14px]">{{ item.detail }}</p>
      </article>
    </div>
  </section>
</template>
