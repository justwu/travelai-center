<script setup lang="ts">
import { Palette } from '@lucide/vue'

import { themeOptions, useAppStore, type AppTheme } from '@/stores/app'

const app = useAppStore()

withDefaults(defineProps<{
  compact?: boolean
}>(), {
  compact: false,
})

function selectTheme(theme: AppTheme) {
  app.setTheme(theme)
}
</script>

<template>
  <section class="rounded-panel border border-border bg-white/86 p-3">
    <div class="mb-2 flex items-center gap-2 text-[13px] text-muted-foreground">
      <Palette class="h-4 w-4" :stroke-width="1.8" />
      <span>主题配色</span>
    </div>
    <div class="grid gap-2" :class="compact ? 'grid-cols-2' : 'sm:grid-cols-4 lg:grid-cols-1'">
      <button
        v-for="theme in themeOptions"
        :key="theme.value"
        type="button"
        class="rounded-panel border px-3 text-left transition"
        :class="[
          compact ? 'py-1.5' : 'py-2',
          app.theme === theme.value ? 'border-aqua bg-sky text-ink' : 'border-line bg-white text-muted-foreground hover:border-border hover:text-ink',
        ]"
        @click="selectTheme(theme.value)"
      >
        <span class="block text-[14px] font-medium">{{ theme.label }}</span>
        <span v-if="!compact" class="mt-0.5 block text-[12px] leading-4">{{ theme.description }}</span>
      </button>
    </div>
  </section>
</template>
