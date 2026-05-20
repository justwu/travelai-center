<script setup lang="ts">
import { CloudSun, Download, Sparkles } from '@lucide/vue'

defineProps<{
  projectName: string
  updatedAt: string
}>()
</script>

<template>
  <section class="panel-line rounded-panel bg-panel px-4 py-4 sm:px-5">
    <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p class="text-[13px] text-muted-foreground">今日经营状态</p>
        <h1 class="mt-1 text-[26px] font-medium tracking-[0] text-ink sm:text-[32px]">{{ projectName }}</h1>
      </div>
      <div class="grid gap-3 sm:grid-cols-3 lg:min-w-[620px]">
        <div class="rounded-panel border border-line bg-sky px-3 py-2">
          <div class="flex items-center gap-2 text-[13px] text-muted-foreground"><CloudSun class="h-4 w-4" /> 天气</div>
          <p class="mt-1 text-[15px] text-ink">28°C 多云转晴</p>
        </div>
        <div class="rounded-panel border border-line bg-mint px-3 py-2">
          <div class="flex items-center gap-2 text-[13px] text-muted-foreground"><Sparkles class="h-4 w-4" /> 判断</div>
          <p class="mt-1 text-[15px] text-ink">整体平稳，二消偏弱</p>
        </div>
        <div class="rounded-panel border border-line bg-butter px-3 py-2">
          <div class="flex items-center gap-2 text-[13px] text-muted-foreground"><Download class="h-4 w-4" /> 更新时间</div>
          <p class="mt-1 text-[15px] text-ink">{{ updatedAt }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
