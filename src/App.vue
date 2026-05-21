<script setup lang="ts">
import LoginPage from '@/components/auth/LoginPage.vue'
import AppShell from '@/components/shell/AppShell.vue'
import { useAppStore } from '@/stores/app'

const app = useAppStore()
</script>

<template>
  <LoginPage v-if="app.shouldRequireLogin()" />
  <AppShell v-else />
</template>
