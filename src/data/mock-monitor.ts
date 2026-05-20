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
      { label: '周一', value: 38 }, { label: '周二', value: 41 }, { label: '周三', value: 43 }, { label: '周四', value: 45 },
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
      { label: '09', value: 62 }, { label: '10', value: 118 }, { label: '11', value: 176 }, { label: '12', value: 221 },
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
      { label: '09', value: 4 }, { label: '10', value: 9 }, { label: '11', value: 14 }, { label: '12', value: 18 },
    ],
  },
]
