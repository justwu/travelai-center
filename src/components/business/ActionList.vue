<script setup lang="ts">
import type { ActionItem } from '@/types/domain'

defineProps<{
  items: ActionItem[]
  title?: string
}>()
</script>

<template>
  <section class="panel-line rounded-panel bg-panel p-4 sm:p-5">
    <h2 class="text-[18px] font-medium text-ink">{{ title || '今日建议动作' }}</h2>
    <div class="mt-4 divide-y divide-line">
      <article v-for="item in items" :key="item.id" class="py-3 first:pt-0 last:pb-0">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 class="text-[15px] font-medium text-ink">{{ item.title }}</h3>
            <p class="mt-1 text-[13px] leading-5 text-muted-foreground sm:text-[14px]">{{ item.evidence }}</p>
          </div>
          <div class="shrink-0 text-[13px] text-muted-foreground sm:text-right">
            <p>{{ item.owner }}</p>
            <p>{{ item.due }}</p>
          </div>
        </div>
        <span class="mt-2 inline-flex rounded-full border border-border bg-mint px-2.5 py-1 text-[13px] text-ink">{{ item.status }}</span>
      </article>
    </div>
  </section>
</template>
