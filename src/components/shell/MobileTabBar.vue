<script setup lang="ts">
import {
  CalendarClock,
  CalendarDays,
  CircleParking,
  ClipboardList,
  Gauge,
  History,
  Hotel,
  Landmark,
  Network,
  Store,
  Ticket,
  Users,
} from '@lucide/vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import ThemeSwitcher from '@/components/business/ThemeSwitcher.vue'
import { mobileWorkspacePages, type ModuleIcon } from '@/data/module-pages'

const route = useRoute()
const activePath = computed(() => route.path)

const icons: Record<ModuleIcon, unknown> = {
  gauge: Gauge,
  history: History,
  calendarDays: CalendarDays,
  calendarClock: CalendarClock,
  network: Network,
  clipboardList: ClipboardList,
  hotel: Hotel,
  ticket: Ticket,
  store: Store,
  landmark: Landmark,
  parking: CircleParking,
  users: Users,
}
</script>

<template>
  <div class="fixed inset-x-3 bottom-3 z-30 space-y-2 lg:hidden">
    <ThemeSwitcher compact />
    <nav class="quiet-scrollbar flex gap-2 overflow-x-auto rounded-[18px] border border-border bg-panel/96 px-2 py-2 backdrop-blur">
      <RouterLink
        v-for="item in mobileWorkspacePages"
        :key="item.path"
        :to="item.path"
        class="flex min-w-[76px] flex-1 flex-col items-center gap-1 rounded-panel px-2 py-1.5 text-[13px]"
        :class="activePath === item.path ? 'bg-mint text-ink' : 'text-muted-foreground'"
      >
        <component :is="icons[item.icon]" class="h-4 w-4" :stroke-width="1.8" />
        <span>{{ item.mobileLabel }}</span>
      </RouterLink>
    </nav>
  </div>
</template>
