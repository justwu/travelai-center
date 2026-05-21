import { describe, expect, it } from 'vitest'
import { createPinia } from 'pinia'

import { monitorCommandMetrics, monitorFocusItems, monitorSections } from '@/data/mock-monitor'
import { mobileWorkspacePages, modulePageById, modulePages, workspacePages } from '@/data/module-pages'
import { routes } from '@/router'
import { themeOptions, useAppStore } from '@/stores/app'
import { sortMetricsByStatus, sortRisksByPriority } from '@/types/domain'

describe('domain helpers', () => {
  it('sorts risk items by priority without mutating the source array', () => {
    const risks = [
      { id: 'low', title: '低风险', impact: '轻微', reason: '观察', action: '记录', priority: 'low' as const },
      { id: 'high', title: '高风险', impact: '较大', reason: '峰值', action: '处理', priority: 'high' as const },
      { id: 'medium', title: '中风险', impact: '中等', reason: '趋势', action: '跟进', priority: 'medium' as const },
    ]

    const sorted = sortRisksByPriority(risks)

    expect(sorted.map((item) => item.id)).toEqual(['high', 'medium', 'low'])
    expect(risks.map((item) => item.id)).toEqual(['low', 'high', 'medium'])
  })

  it('sorts metrics by operational severity before normal metrics', () => {
    const metrics = [
      { id: 'normal', label: '正常', value: 1, status: 'normal' as const },
      { id: 'risk', label: '风险', value: 2, status: 'risk' as const },
      { id: 'warning', label: '预警', value: 3, status: 'warning' as const },
    ]

    const sorted = sortMetricsByStatus(metrics)

    expect(sorted.map((item) => item.id)).toEqual(['risk', 'warning', 'normal'])
  })

  it('keeps module navigation aligned with the collected page folders', () => {
    expect(modulePages.map((item) => item.title)).toEqual([
      '实时总览',
      '历史分析',
      '节假日分析',
      '预售分析',
      '渠道销售分析',
      '复盘分析',
      '酒店分析',
      '票务分析',
      '商业分析',
      '景区分析',
      '停车场分析',
      '客源分析',
    ])
    expect(new Set(modulePages.map((item) => item.path)).size).toBe(12)
  })

  it('restores four core workspace routes for dashboard, monitor, forecast and report', () => {
    expect(workspacePages.map((item) => item.path)).toEqual(['/', '/monitor', '/forecast', '/report'])

    const routePaths = routes.map((item) => item.path)

    expect(routePaths).toEqual(expect.arrayContaining(['/', '/monitor', '/forecast', '/report']))
  })

  it('keeps the mobile navigation focused on the four core workspaces', () => {
    expect(mobileWorkspacePages.map((item) => item.id)).toEqual(['dashboard', 'monitor', 'forecast', 'report'])
  })

  it('marks the four spotlight modules with dedicated layouts instead of the shared template', () => {
    expect(modulePageById.hotel.layout).toBe('hotel')
    expect(modulePageById.commerce.layout).toBe('commerce')
    expect(modulePageById.parking.layout).toBe('parking')
    expect(modulePageById.source.layout).toBe('source')
    expect(modulePageById.history.layout).toBe('default')
  })

  it('covers five realtime monitor panes including parking and scenic operations', () => {
    expect(monitorSections.map((item) => item.id)).toEqual(['hotel', 'ticket', 'business', 'parking', 'scenic'])
  })

  it('keeps realtime monitor data dense enough for an operations cockpit', () => {
    expect(monitorCommandMetrics).toHaveLength(5)
    expect(monitorFocusItems).toHaveLength(3)
    expect(monitorSections.every((item) => item.stats.length >= 4)).toBe(true)
    expect(monitorSections.every((item) => item.rows.length >= 3)).toBe(true)
    expect(monitorSections.every((item) => item.signals.length >= 3)).toBe(true)
  })

  it('does not expose competitor place names in product-facing module content', () => {
    const app = useAppStore(createPinia())
    const productText = JSON.stringify({ projectName: app.projectName, modulePages })

    expect(productText).not.toMatch(/茗岭|窑湖|小镇|飞鸟|窑厂|陶庐|湖山|竹溪/)
  })

  it('uses the accepted eight-theme set with Cambridge Blue first', () => {
    const app = useAppStore(createPinia())

    expect(themeOptions.map((item) => item.value)).toEqual([
      'cambridge',
      'deepBlue',
      'violetNight',
      'greenNight',
      'sunsetSand',
      'coralDawn',
      'stripeCrystal',
      'mintBlue',
    ])
    expect(app.theme).toBe('cambridge')
  })

  it('persists remembered login for seven days and expires after the deadline', () => {
    const now = new Date('2026-05-21T08:00:00+08:00').getTime()
    const app = useAppStore(createPinia())

    expect(app.isAuthenticated).toBe(false)

    app.login({ username: 'Just', password: '123', remember: true, now })

    expect(app.isAuthenticated).toBe(true)
    expect(app.currentUser?.username).toBe('Just')
    expect(app.loginExpiresAt).toBe(now + 7 * 24 * 60 * 60 * 1000)
    expect(app.shouldRequireLogin(now + 6 * 24 * 60 * 60 * 1000)).toBe(false)
    expect(app.shouldRequireLogin(now + 7 * 24 * 60 * 60 * 1000 + 1)).toBe(true)
  })

  it('does not retain password when remember login is unchecked', () => {
    const now = new Date('2026-05-21T08:00:00+08:00').getTime()
    const app = useAppStore(createPinia())

    app.login({ username: 'Just', password: '123', remember: false, now })

    expect(app.isAuthenticated).toBe(true)
    expect(app.rememberLogin).toBe(false)
    expect(app.loginExpiresAt).toBe(null)
  })

  it('accepts copied demo credentials with surrounding whitespace', () => {
    const now = new Date('2026-05-21T08:00:00+08:00').getTime()
    const app = useAppStore(createPinia())

    app.login({ username: ' Just ', password: ' 123 ', remember: false, now })

    expect(app.isAuthenticated).toBe(true)
    expect(app.currentUser?.username).toBe('Just')
  })

  it('uses the Yintan resort project identity with Just as the demo user', () => {
    const app = useAppStore(createPinia())

    app.login({ username: 'Just', password: '123', remember: false })

    expect(app.projectName).toBe('银滩旅游度假区')
    expect(app.currentUser).toMatchObject({ username: 'Just', displayName: 'Just' })
  })

  it('exposes brand highlights for the upgraded login hero and app welcome header', () => {
    const app = useAppStore(createPinia())

    expect(app.loginHighlights).toHaveLength(4)
    expect(app.dashboardWelcomeCards).toHaveLength(3)
    expect(app.loginHighlights[0].title).toContain('AI')
  })
})
