import type { Metric, TrendPoint } from '@/types/domain'

export interface MonitorSection {
  id: string
  title: string
  summary: string
  metrics: Metric[]
  trend: TrendPoint[]
}

export const monitorSections: MonitorSection[] = [
  {
    id: 'hotel',
    title: '酒店经营',
    summary: '入住率温和回升，ADR 受团队结构影响偏稳。',
    metrics: [
      { id: 'occ', label: '整体出租率', value: '42.7', unit: '%', status: 'normal', trend: 3.1 },
      { id: 'rooms', label: '出租房间', value: 606, unit: '间', status: 'normal', trend: 2.4 },
      { id: 'adr', label: '平均房价', value: '¥546', status: 'warning', trend: -4.8 },
    ],
    trend: [
      { label: '周一', value: 38, compare: 35 }, { label: '周二', value: 41, compare: 39 }, { label: '周三', value: 43, compare: 42 }, { label: '周四', value: 45, compare: 44 },
    ],
  },
  {
    id: 'ticket',
    title: '票务核销',
    summary: '入园人数稳定，午后核销峰值需要提前排班。',
    metrics: [
      { id: 'people', label: '今日入园', value: 713, unit: '人', status: 'warning', trend: 8.1 },
      { id: 'income', label: '票务收入', value: '¥29,123', status: 'normal', trend: 4.2 },
      { id: 'check', label: '核销效率', value: '91', unit: '%', status: 'normal', trend: 1.3 },
    ],
    trend: [
      { label: '09', value: 62, compare: 54 }, { label: '10', value: 118, compare: 96 }, { label: '11', value: 176, compare: 161 }, { label: '12', value: 221, compare: 205 },
    ],
  },
  {
    id: 'business',
    title: '商业二消',
    summary: '客流正常但商业转化弱，需要现场动线和店铺状态检查。',
    metrics: [
      { id: 'orders', label: '订单数', value: 35, unit: '单', status: 'risk', trend: -28.3 },
      { id: 'amount', label: '商业收入', value: '¥550', status: 'risk', trend: -35.7 },
      { id: 'conv', label: '转化率', value: '0.92', unit: '%', status: 'risk', trend: -0.4 },
    ],
    trend: [
      { label: '09', value: 4, compare: 8 }, { label: '10', value: 9, compare: 16 }, { label: '11', value: 14, compare: 25 }, { label: '12', value: 18, compare: 33 },
    ],
  },
  {
    id: 'parking',
    title: '停车承载',
    summary: '车位余量仍安全，但午后到达峰值会提前出现。',
    metrics: [
      { id: 'parking-in', label: '累计进场', value: 1267, unit: '辆', status: 'normal', trend: 11.8 },
      { id: 'parking-left', label: '剩余车位', value: 1861, unit: '个', status: 'normal', trend: -4.2 },
      { id: 'parking-stay', label: '均停时长', value: '0.42', unit: '时', status: 'warning', trend: -2.1 },
    ],
    trend: [
      { label: '09', value: 246, compare: 138 }, { label: '10', value: 438, compare: 236 }, { label: '11', value: 689, compare: 361 }, { label: '12', value: 902, compare: 514 },
    ],
  },
  {
    id: 'scenic',
    title: '景区项目',
    summary: '小火车仍是景管主收入，游览车和船票偏弱。',
    metrics: [
      { id: 'scenic-revenue', label: '景管收入', value: '¥8,605', status: 'warning', trend: -15.6 },
      { id: 'scenic-orders', label: '订单数', value: 461, unit: '单', status: 'normal', trend: 3.7 },
      { id: 'scenic-convert', label: '项目转化', value: '64.6', unit: '%', status: 'warning', trend: -4.9 },
    ],
    trend: [
      { label: '09', value: 1.1, compare: 5.8 }, { label: '10', value: 2.9, compare: 14.2 }, { label: '11', value: 5.4, compare: 26.8 }, { label: '12', value: 8.6, compare: 60.6 },
    ],
  },
]
