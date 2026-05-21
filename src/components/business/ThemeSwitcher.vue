<script setup lang="ts">
import { Palette } from '@lucide/vue'
import { ref } from 'vue'

import { themeOptions, useAppStore, type AppTheme } from '@/stores/app'

const app = useAppStore()
const isOpen = ref(false)

withDefaults(defineProps<{
  compact?: boolean
}>(), {
  compact: false,
})

function selectTheme(theme: AppTheme) {
  app.setTheme(theme)
  isOpen.value = false
}
</script>

<template>
  <section class="relative">
    <button
      type="button"
      class="flex w-full items-center justify-between rounded-[16px] border border-border bg-white px-3 py-2 text-[13px] text-muted-foreground transition hover:border-aqua/50 hover:text-ink"
      @click="isOpen = !isOpen"
    >
      <span class="inline-flex items-center gap-2">
        <Palette class="h-4 w-4" :stroke-width="1.8" />
        <span>换肤</span>
      </span>
      <span class="text-[12px] text-ink">{{ themeOptions.find((theme) => theme.value === app.theme)?.label }}</span>
    </button>

    <div
      v-if="isOpen"
      class="absolute bottom-[calc(100%+10px)] left-0 z-40 w-full rounded-[20px] border border-border bg-panel p-3 shadow-[0_20px_60px_rgba(15,23,42,0.16)] backdrop-blur"
    >
      <div class="mb-2 flex items-center justify-between gap-2 text-[13px] text-muted-foreground">
        <span>选择主题</span>
        <button type="button" class="text-[12px] text-aqua" @click="isOpen = false">收起</button>
      </div>
      <div class="grid gap-2" :class="compact ? 'grid-cols-2' : 'sm:grid-cols-4 lg:grid-cols-1'">
        <button
          v-for="theme in themeOptions"
          :key="theme.value"
          type="button"
          class="rounded-panel border px-3 text-left transition"
          :class="[
            compact ? 'py-1.5' : 'py-2',
            app.theme === theme.value ? 'border-aqua bg-sky text-ink' : 'border-line bg-panel text-muted-foreground hover:border-border hover:text-ink',
          ]"
          @click="selectTheme(theme.value)"
        >
          <span class="block text-[14px] font-medium">{{ theme.label }}</span>
          <span v-if="!compact" class="mt-0.5 block text-[12px] leading-4">{{ theme.description }}</span>
        </button>
      </div>
    </div>
  </section>
</template>
