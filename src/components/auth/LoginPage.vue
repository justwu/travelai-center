<script setup lang="ts">
import { LockKeyhole, ShieldCheck, Sparkles, UserRound } from '@lucide/vue'
import { computed, ref } from 'vue'

import { useAppStore } from '@/stores/app'

const app = useAppStore()

const username = ref('cw')
const password = ref('123')
const remember = ref(true)
const errorMessage = ref('')

const featurePills = [
  '景区、酒店、票务、商业统一驾驶舱',
  '实时经营判断与复盘输出一体化',
  '7 天记住登录，适合演示和值班切换',
]

const heroStats = [
  { label: '响应主题', value: '8 套' },
  { label: '核心工作区', value: '4 个' },
  { label: '专题模块', value: '12 页' },
]

const expiresHint = computed(() => remember.value ? '勾选后 7 天内免登录' : '关闭后刷新页面需重新输入')

function submitLogin() {
  errorMessage.value = ''

  try {
    app.login({ username: username.value.trim(), password: password.value, remember: remember.value })
  }
  catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '登录失败，请重试'
  }
}
</script>

<template>
  <div class="relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(47,114,200,0.14),transparent_24rem),radial-gradient(circle_at_85%_10%,rgba(99,91,255,0.16),transparent_22rem),radial-gradient(circle_at_50%_100%,rgba(0,212,255,0.09),transparent_28rem)]" />

    <div class="relative mx-auto flex min-h-[calc(100vh-3rem)] max-w-[1440px] flex-col justify-center lg:flex-row lg:items-stretch lg:gap-6">
      <section class="flex-1 rounded-[28px] border border-white/60 bg-white/72 p-6 backdrop-blur md:p-8 lg:p-10">
        <div class="inline-flex items-center gap-2 rounded-full border border-aqua/15 bg-sky/55 px-3 py-1 text-[13px] text-ink">
          <Sparkles class="h-4 w-4" :stroke-width="1.8" />
          <span>TravelAI Center Demo Access</span>
        </div>

        <div class="mt-8 max-w-2xl">
          <p class="text-[14px] tracking-[0.28em] text-muted-foreground">云境文旅度假区</p>
          <h1 class="mt-4 text-[34px] font-medium leading-tight text-ink sm:text-[44px] lg:text-[54px]">
            像科技公司首页一样的
            文旅经营中枢入口。
          </h1>
          <p class="mt-5 max-w-xl text-[16px] leading-8 text-muted-foreground">
            在进入经营驾驶舱之前，先通过一个更完整的产品级登录首页完成演示门禁。账号与密码已直接展示，方便内部联调与客户演示。
          </p>
        </div>

        <div class="mt-8 flex flex-wrap gap-2">
          <span v-for="pill in featurePills" :key="pill" class="rounded-full border border-border bg-panel/80 px-3 py-2 text-[13px] text-muted-foreground">
            {{ pill }}
          </span>
        </div>

        <div class="mt-10 grid gap-3 sm:grid-cols-3">
          <article v-for="item in heroStats" :key="item.label" class="rounded-[22px] border border-white/70 bg-white/78 px-4 py-4">
            <p class="text-[13px] text-muted-foreground">{{ item.label }}</p>
            <p class="amount-font mt-3 text-[28px] font-medium text-ink">{{ item.value }}</p>
          </article>
        </div>
      </section>

      <section class="mt-4 w-full shrink-0 rounded-[28px] border border-slate-200/80 bg-slate-950/92 p-5 text-slate-100 shadow-[0_24px_80px_rgba(15,23,42,0.22)] backdrop-blur lg:mt-0 lg:w-[440px] lg:p-6">
        <div class="rounded-[24px] border border-white/10 bg-white/5 p-5">
          <div class="flex items-center gap-3">
            <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/12 text-cyan-200">
              <ShieldCheck class="h-5 w-5" :stroke-width="1.8" />
            </div>
            <div>
              <p class="text-[13px] uppercase tracking-[0.22em] text-slate-400">Demo Sign In</p>
              <h2 class="mt-1 text-[24px] font-medium text-white">登录文旅经营中枢</h2>
            </div>
          </div>

          <div class="mt-6 rounded-[20px] border border-cyan-400/18 bg-cyan-400/8 p-4 text-[14px] leading-7 text-slate-200">
            <p class="font-medium text-white">演示账号</p>
            <p class="mt-2">用户名：<span class="amount-font text-cyan-200">cw</span></p>
            <p>密码：<span class="amount-font text-cyan-200">123</span></p>
          </div>

          <form class="mt-6 space-y-4" @submit.prevent="submitLogin">
            <label class="block">
              <span class="mb-2 inline-flex items-center gap-2 text-[14px] text-slate-300">
                <UserRound class="h-4 w-4" :stroke-width="1.8" /> 用户名
              </span>
              <input
                v-model="username"
                type="text"
                autocomplete="username"
                class="w-full rounded-[18px] border border-white/10 bg-white/6 px-4 py-3 text-[15px] text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/55 focus:bg-white/10"
                placeholder="输入用户名"
              />
            </label>

            <label class="block">
              <span class="mb-2 inline-flex items-center gap-2 text-[14px] text-slate-300">
                <LockKeyhole class="h-4 w-4" :stroke-width="1.8" /> 密码
              </span>
              <input
                v-model="password"
                type="password"
                autocomplete="current-password"
                class="w-full rounded-[18px] border border-white/10 bg-white/6 px-4 py-3 text-[15px] text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/55 focus:bg-white/10"
                placeholder="输入密码"
              />
            </label>

            <label class="flex items-start gap-3 rounded-[18px] border border-white/8 bg-white/4 px-4 py-3 text-[14px] text-slate-300">
              <input v-model="remember" type="checkbox" class="mt-1 h-4 w-4 rounded border-white/20 bg-transparent text-cyan-300" />
              <span>
                <span class="block text-white">记住密码</span>
                <span class="mt-1 block text-[13px] text-slate-400">{{ expiresHint }}</span>
              </span>
            </label>

            <p v-if="errorMessage" class="rounded-[16px] border border-rose-300/18 bg-rose-400/10 px-4 py-3 text-[13px] text-rose-200">
              {{ errorMessage }}
            </p>

            <button
              type="submit"
              class="w-full rounded-[18px] bg-[linear-gradient(135deg,#56c9ff_0%,#5b7cff_58%,#7d6dff_100%)] px-4 py-3 text-[15px] font-medium text-white transition hover:translate-y-[-1px] hover:shadow-[0_20px_40px_rgba(91,124,255,0.28)]"
            >
              进入经营中枢
            </button>
          </form>

          <div class="mt-6 rounded-[20px] border border-white/8 bg-white/4 p-4 text-[13px] leading-6 text-slate-400">
            <p>未勾选“记住密码”时，本次仅保留临时登录态。</p>
            <p>勾选后登录态写入浏览器缓存，7 天后自动失效并要求重新输入。</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
