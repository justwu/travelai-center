export type MetricStatus = 'normal' | 'warning' | 'risk'

export type RiskPriority = 'high' | 'medium' | 'low'

export interface Metric {
  id: string
  label: string
  value: string | number
  unit?: string
  trend?: number
  status: MetricStatus
  insight?: string
}

export interface RiskItem {
  id: string
  title: string
  impact: string
  reason: string
  action: string
  priority: RiskPriority
}

export interface ActionItem {
  id: string
  title: string
  owner: string
  due: string
  status: '待处理' | '进行中' | '已完成'
  evidence: string
}

export interface JourneyNode {
  id: string
  label: string
  value: string
  change: string
  status: MetricStatus
}

export interface TrendPoint {
  label: string
  value: number
}

export interface ForecastDay {
  date: string
  label: string
  occupancy: number
  tickets: number
  revenue: number
  status: MetricStatus
  note: string
}

export interface EvidenceItem {
  id: string
  title: string
  value: string
  detail: string
}

const riskPriorityRank: Record<RiskPriority, number> = {
  high: 0,
  medium: 1,
  low: 2,
}

const metricStatusRank: Record<MetricStatus, number> = {
  risk: 0,
  warning: 1,
  normal: 2,
}

export function sortRisksByPriority(items: RiskItem[]): RiskItem[] {
  return [...items].sort((a, b) => riskPriorityRank[a.priority] - riskPriorityRank[b.priority])
}

export function sortMetricsByStatus(items: Metric[]): Metric[] {
  return [...items].sort((a, b) => metricStatusRank[a.status] - metricStatusRank[b.status])
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    maximumFractionDigits: 0,
  }).format(value)
}
