<script setup lang="ts">
import { RouterView } from 'vue-router'

import MobileTabBar from './MobileTabBar.vue'
import SideNav from './SideNav.vue'
</script>

<template>
  <div class="min-h-screen text-foreground">
    <div class="flex min-h-screen">
      <SideNav />
      <main class="min-w-0 flex-1 px-4 pb-24 pt-4 sm:px-6 lg:px-8 lg:pb-8">
        <RouterView />
      </main>
    </div>
    <MobileTabBar />
  </div>
</template>
