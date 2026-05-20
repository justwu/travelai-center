import { describe, expect, it } from 'vitest'

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
})
