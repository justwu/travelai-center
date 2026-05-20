<script setup lang="ts">
defineProps<{
  title: string
  paragraphs: string[]
}>()
</script>

<template>
  <section class="panel-line rounded-panel bg-white p-4 sm:p-5">
    <h2 class="text-[20px] font-medium text-ink">{{ title }}</h2>
    <div class="mt-4 space-y-3 text-[15px] leading-7 text-ink">
      <p v-for="paragraph in paragraphs" :key="paragraph">{{ paragraph }}</p>
    </div>
  </section>
</template>
