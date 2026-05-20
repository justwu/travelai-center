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
import { getModuleGroupItems, moduleGroups, type ModuleIcon } from '@/data/module-pages'

const route = useRoute()

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

const groups = moduleGroups.map((group) => ({
  ...group,
  items: getModuleGroupItems(group.id),
}))

const activePath = computed(() => route.path)
</script>

<template>
  <aside class="hidden h-screen w-[258px] shrink-0 flex-col border-r border-border/90 bg-panel/88 px-4 py-5 backdrop-blur lg:sticky lg:top-0 lg:flex">
    <RouterLink to="/" class="mb-6 block shrink-0">
      <div class="text-[18px] font-medium tracking-[0] text-ink">TravelAI Center</div>
      <div class="mt-1 text-[13px] text-muted-foreground">文旅经营中枢</div>
    </RouterLink>

    <nav class="quiet-scrollbar min-h-0 flex-1 space-y-5 overflow-y-auto pr-1">
      <section v-for="group in groups" :key="group.id">
        <p class="mb-2 px-3 text-[13px] font-medium text-muted-foreground">{{ group.label }}</p>
        <div class="space-y-1">
          <RouterLink
            v-for="item in group.items"
            :key="item.path"
            :to="item.path"
            class="flex items-center gap-3 rounded-panel border px-3 py-2.5 text-[14px] transition"
            :class="activePath === item.path ? 'border-lake/35 bg-mint text-ink' : 'border-transparent text-muted-foreground hover:border-border hover:bg-panel/80 hover:text-ink'"
          >
            <component :is="icons[item.icon]" class="h-4 w-4 shrink-0" :stroke-width="1.8" />
            <span class="truncate">{{ item.title }}</span>
          </RouterLink>
        </div>
      </section>
    </nav>

    <div class="mt-5 shrink-0 border-t border-line pt-4 text-[13px] leading-6 text-muted-foreground">
      <p class="text-ink">作品型 demo</p>
      <p>mock 数据驱动，预留 Spring Boot 接口适配层。</p>
    </div>

    <div class="mt-4 shrink-0">
      <ThemeSwitcher compact />
    </div>
  </aside>
</template>
