import { defineStore } from 'pinia'

export type AppTheme = 'cambridge' | 'deepBlue' | 'violetNight' | 'greenNight' | 'sunsetSand' | 'coralDawn' | 'stripeCrystal' | 'mintBlue'

export interface AuthUser {
  username: string
  displayName: string
  role: string
}

export interface BrandHighlight {
  title: string
  detail: string
}

export interface WelcomeCard {
  label: string
  value: string
  detail: string
}

interface RememberedAuthPayload {
  username: string
  displayName: string
  role: string
  remember: boolean
  expiresAt: number | null
}

const AUTH_STORAGE_KEY = 'travelai-auth'
const AUTH_USERNAME = 'Just'
const AUTH_PASSWORD = '123'
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000

export const themeOptions: Array<{ value: AppTheme; label: string; description: string }> = [
  { value: 'cambridge', label: '剑桥蓝白', description: '大白底、斜切强蓝、纯蓝按钮' },
  { value: 'deepBlue', label: '深海蓝黑', description: '深蓝黑底、青蓝高光' },
  { value: 'violetNight', label: '紫电暗场', description: '蓝紫暗色、产品记忆点更强' },
  { value: 'greenNight', label: '墨绿夜航', description: '青绿夜色、文旅感更柔' },
  { value: 'sunsetSand', label: '日光沙丘', description: '日光木色、度假区运营感' },
  { value: 'coralDawn', label: '珊瑚晨曦', description: '暖白珊瑚、亲和现代' },
  { value: 'stripeCrystal', label: 'Stripe 晶蓝', description: '白底靛蓝、SaaS 作品感' },
  { value: 'mintBlue', label: '薄荷蓝白', description: '薄荷青蓝、柔和清爽' },
]

function readStoredAuth(now: number): RememberedAuthPayload | null {
  if (typeof window === 'undefined') return null

  const raw = window.localStorage.getItem(AUTH_STORAGE_KEY)
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw) as RememberedAuthPayload
    if (!parsed.remember || parsed.username !== AUTH_USERNAME || !parsed.expiresAt || parsed.expiresAt <= now) {
      window.localStorage.removeItem(AUTH_STORAGE_KEY)
      return null
    }
    return parsed
  }
  catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
    return null
  }
}

function resolveInitialTheme(): AppTheme {
  if (typeof window === 'undefined') return 'cambridge'
  const saved = window.localStorage.getItem('travelai-theme')
  if (saved && themeOptions.some((item) => item.value === saved)) {
    return saved as AppTheme
  }
  return 'cambridge'
}

function resolveInitialAuth(now: number) {
  const remembered = readStoredAuth(now)
  if (!remembered) {
    return {
      currentUser: null as AuthUser | null,
      isAuthenticated: false,
      rememberLogin: false,
      loginExpiresAt: null as number | null,
    }
  }

  return {
    currentUser: {
      username: remembered.username,
      displayName: remembered.displayName,
      role: remembered.role,
    },
    isAuthenticated: true,
    rememberLogin: true,
    loginExpiresAt: remembered.expiresAt,
  }
}

function applyTheme(theme: AppTheme) {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.theme = theme
}

function persistAuth(user: AuthUser, remember: boolean, now: number) {
  if (typeof window === 'undefined') return null
  if (!remember) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
    return null
  }

  const expiresAt = now + SEVEN_DAYS_MS
  const payload: RememberedAuthPayload = {
    username: user.username,
    displayName: user.displayName,
    role: user.role,
    remember: true,
    expiresAt,
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload))
  return expiresAt
}

function clearStoredAuth() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(AUTH_STORAGE_KEY)
}

const initialAuthState = resolveInitialAuth(Date.now())

export const useAppStore = defineStore('app', {
  state: () => ({
    projectName: '银滩旅游度假区',
    updatedAt: '2026-05-20 16:45',
    theme: resolveInitialTheme(),
    loginHighlights: [
      { title: 'AI 经营判断', detail: '把景区、票务、酒店和商业统一放进一套经营驾驶舱。' },
      { title: '实时决策协同', detail: '异常发现、处理动作、复盘结论都能放在一个产品流程里。' },
      { title: '多端自适应演示', detail: '桌面端是完整工作台，移动端是轻值班视图。' },
      { title: '安全演示登录', detail: '支持 7 天记住密码，方便客户演示和内部联调。' },
    ] as BrandHighlight[],
    dashboardWelcomeCards: [
      { label: '今日策略', value: '商业补强', detail: '优先补齐二消转化与店铺营业状态。' },
      { label: '现场状态', value: '承载安全', detail: '停车和住宿承载仍在安全区间。' },
      { label: '会议模式', value: '晨会版', detail: '当前信息结构适合做值班和经营晨会演示。' },
    ] as WelcomeCard[],
    currentUser: initialAuthState.currentUser,
    isAuthenticated: initialAuthState.isAuthenticated,
    rememberLogin: initialAuthState.rememberLogin,
    loginExpiresAt: initialAuthState.loginExpiresAt,
  }),
  actions: {
    initializeTheme() {
      applyTheme(this.theme)
      this.refreshAuth(Date.now())
    },
    setTheme(theme: AppTheme) {
      this.theme = theme
      applyTheme(theme)
      window.localStorage.setItem('travelai-theme', theme)
    },
    shouldRequireLogin(now = Date.now()) {
      return !this.isAuthenticated || (!!this.loginExpiresAt && this.loginExpiresAt <= now)
    },
    refreshAuth(now = Date.now()) {
      const remembered = readStoredAuth(now)
      if (!remembered) {
        if (this.loginExpiresAt && this.loginExpiresAt <= now) {
          this.logout()
        }
        return
      }

      this.currentUser = {
        username: remembered.username,
        displayName: remembered.displayName,
        role: remembered.role,
      }
      this.isAuthenticated = true
      this.rememberLogin = true
      this.loginExpiresAt = remembered.expiresAt
    },
    login({ username, password, remember, now = Date.now() }: { username: string; password: string; remember: boolean; now?: number }) {
      const normalizedUsername = username.trim()
      const normalizedPassword = password.trim()

      if (normalizedUsername !== AUTH_USERNAME || normalizedPassword !== AUTH_PASSWORD) {
        throw new Error('账号或密码错误')
      }

      const user: AuthUser = {
        username: AUTH_USERNAME,
        displayName: 'Just',
        role: '运营负责人',
      }

      this.currentUser = user
      this.isAuthenticated = true
      this.rememberLogin = remember
      this.loginExpiresAt = persistAuth(user, remember, now)
    },
    logout() {
      this.currentUser = null
      this.isAuthenticated = false
      this.rememberLogin = false
      this.loginExpiresAt = null
      clearStoredAuth()
    },
  },
})
