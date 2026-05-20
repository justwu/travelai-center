import type { ForecastDay, Metric } from '@/types/domain'

export const forecastSummary: Metric[] = [
  { id: 'occ', label: '未来 7 天平均出租率', value: '58.4', unit: '%', status: 'normal', trend: 6.2 },
  { id: 'ticket', label: '票务预售', value: '8,420', unit: '张', status: 'warning', trend: 12.1 },
  { id: 'revenue', label: '预计收入', value: '¥186.7万', status: 'normal', trend: 9.4 },
]

export const forecastDays: ForecastDay[] = [
  { date: '05-21', label: '周四', occupancy: 48, tickets: 860, revenue: 18.4, status: 'normal', note: '承载平稳' },
  { date: '05-22', label: '周五', occupancy: 61, tickets: 1240, revenue: 27.2, status: 'warning', note: '晚间入住集中' },
  { date: '05-23', label: '周六', occupancy: 78, tickets: 2320, revenue: 42.8, status: 'risk', note: '票务核销和停车承压' },
  { date: '05-24', label: '周日', occupancy: 66, tickets: 1980, revenue: 36.1, status: 'warning', note: '返程离场集中' },
  { date: '05-25', label: '周一', occupancy: 42, tickets: 740, revenue: 15.9, status: 'normal', note: '平日恢复' },
  { date: '05-26', label: '周二', occupancy: 39, tickets: 690, revenue: 14.7, status: 'normal', note: '低峰日' },
  { date: '05-27', label: '周三', occupancy: 44, tickets: 810, revenue: 16.8, status: 'normal', note: '可做套餐投放' },
]
