<script setup lang="ts">
import {
  CalendarClock,
  CalendarDays,
  CircleParking,
  ClipboardList,
  LogOut,
  Gauge,
  History,
  Hotel,
  Landmark,
  Network,
  Search,
  Store,
  Ticket,
  Users,
} from '@lucide/vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import ThemeSwitcher from '@/components/business/ThemeSwitcher.vue'
import { getModuleGroupItems, moduleGroups, workspacePages, type ModuleIcon } from '@/data/module-pages'
import { useAppStore } from '@/stores/app'

const route = useRoute()
const app = useAppStore()

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

const workspaceItems = workspacePages

function logout() {
  app.logout()
}
</script>

<template>
  <aside class="hidden h-screen w-[286px] shrink-0 flex-col border-r border-border/90 bg-white/82 px-4 py-5 backdrop-blur lg:sticky lg:top-0 lg:flex">
    <div class="mb-5 flex items-center justify-between gap-3">
      <RouterLink to="/" class="min-w-0 flex-1">
        <div class="flex items-center gap-3">
          <div class="h-11 w-11 rounded-2xl bg-[radial-gradient(circle_at_30%_30%,rgba(86,201,255,0.9),rgba(91,124,255,0.9)_55%,rgba(125,109,255,0.85)_100%)]" />
          <div class="min-w-0">
            <div class="truncate text-[18px] font-medium tracking-[0] text-ink">{{ app.projectName }}</div>
            <div class="mt-1 text-[13px] text-muted-foreground">文旅经营中枢 · Demo</div>
          </div>
        </div>
      </RouterLink>

      <div class="shrink-0 rounded-full border border-border bg-panel px-3 py-1 text-[12px] text-muted-foreground">
        Hobby
      </div>
    </div>

    <div class="mb-5 flex items-center gap-3 rounded-[18px] border border-border bg-panel px-4 py-3 text-[14px] text-muted-foreground">
      <Search class="h-4 w-4" :stroke-width="1.8" />
      <span class="flex-1">Find...</span>
      <span class="rounded-[10px] border border-border bg-white px-2 py-1 text-[12px] text-ink">F</span>
    </div>

    <nav class="quiet-scrollbar min-h-0 flex-1 space-y-5 overflow-y-auto pr-1">
      <section>
        <p class="mb-2 px-3 text-[13px] font-medium text-muted-foreground">核心工作区</p>
        <div class="space-y-1">
          <RouterLink
            v-for="item in workspaceItems"
            :key="item.path"
            :to="item.path"
            class="flex items-center gap-3 rounded-[18px] border px-3 py-2.5 text-[14px] transition"
            :class="activePath === item.path ? 'border-border bg-muted text-ink' : 'border-transparent text-muted-foreground hover:border-border hover:bg-panel/90 hover:text-ink'"
          >
            <component :is="icons[item.icon]" class="h-4 w-4 shrink-0" :stroke-width="1.8" />
            <div class="min-w-0">
              <p class="truncate">{{ item.title }}</p>
              <p class="truncate text-[12px] text-muted-foreground">{{ item.description }}</p>
            </div>
          </RouterLink>
        </div>
      </section>

      <section v-for="group in groups" :key="group.id">
        <p class="mb-2 px-3 text-[13px] font-medium text-muted-foreground">{{ group.label }}</p>
        <div class="space-y-1">
          <RouterLink
            v-for="item in group.items"
            :key="item.path"
            :to="item.path"
            class="flex items-center gap-3 rounded-[18px] border px-3 py-2.5 text-[14px] transition"
            :class="activePath === item.path ? 'border-border bg-muted text-ink' : 'border-transparent text-muted-foreground hover:border-border hover:bg-panel/90 hover:text-ink'"
          >
            <component :is="icons[item.icon]" class="h-4 w-4 shrink-0" :stroke-width="1.8" />
            <span class="truncate">{{ item.title }}</span>
          </RouterLink>
        </div>
      </section>
    </nav>

    <div class="mt-5 shrink-0 border-t border-line pt-4">
      <div class="rounded-[20px] border border-border bg-panel px-4 py-3">
        <div class="flex items-center gap-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(125,109,255,0.9),rgba(91,124,255,0.95)_58%,rgba(86,201,255,0.75)_100%)] text-white">
            {{ app.currentUser?.username.slice(0, 1).toUpperCase() }}
          </div>
          <div class="min-w-0 flex-1">
            <p class="truncate text-[15px] font-medium text-ink">{{ app.currentUser?.displayName }}</p>
            <p class="truncate text-[13px] text-muted-foreground">{{ app.currentUser?.role }}</p>
          </div>
          <button
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-muted-foreground transition hover:text-ink"
            @click="logout"
          >
            <LogOut class="h-4 w-4" :stroke-width="1.8" />
          </button>
        </div>

        <div class="mt-4">
          <ThemeSwitcher compact />
        </div>
      </div>
    </div>
  </aside>
</template>
