import { defineStore } from 'pinia'

export type AppTheme = 'cambridge' | 'deepBlue' | 'violetNight' | 'greenNight' | 'sunsetSand' | 'coralDawn' | 'stripeCrystal' | 'mintBlue'

export interface AuthUser {
  username: string
  displayName: string
  role: string
}

interface RememberedAuthPayload {
  username: string
  displayName: string
  role: string
  remember: boolean
  expiresAt: number | null
}

const AUTH_STORAGE_KEY = 'travelai-auth'
const AUTH_USERNAME = 'cw'
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
    if (!parsed.remember || !parsed.expiresAt || parsed.expiresAt <= now) {
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
    projectName: '云境文旅度假区',
    updatedAt: '2026-05-20 16:45',
    theme: resolveInitialTheme(),
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
      if (username !== AUTH_USERNAME || password !== AUTH_PASSWORD) {
        throw new Error('账号或密码错误')
      }

      const user: AuthUser = {
        username: AUTH_USERNAME,
        displayName: '陈文',
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
