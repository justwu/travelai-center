import type { ActionItem, JourneyNode, Metric, RiskItem, TrendPoint } from '@/types/domain'

export const dashboardMetrics: Metric[] = [
  { id: 'revenue', label: '今日总收入', value: '34.5', unit: '万', trend: -12.4, status: 'warning', insight: '低于昨日，商业二消贡献偏弱' },
  { id: 'visitors', label: '当前入园', value: 713, unit: '人', trend: 8.1, status: 'normal', insight: '午后客流预计继续上升' },
  { id: 'occupancy', label: '本夜入住率', value: '42.9', unit: '%', trend: 3.9, status: 'normal', insight: '预售带动入住温和回升' },
  { id: 'parking', label: '剩余车位', value: 1861, unit: '个', trend: -4.2, status: 'normal', insight: '承载仍充足' },
]

export const riskQueue: RiskItem[] = [
  { id: 'commercial', title: '商业转化偏低', impact: '预计影响二消收入 2.1 万', reason: '入园客流正常，但店铺订单不足', action: '检查店铺开业状态并加强主路导流', priority: 'high' },
  { id: 'ticket-peak', title: '票务核销午后承压', impact: '13:00-15:00 可能排队', reason: '预售票集中到达，核销窗口分布不均', action: '提前增开 2 个核销通道', priority: 'medium' },
  { id: 'room-price', title: '部分酒店 ADR 偏低', impact: '房费收入弹性不足', reason: '团散结构中团队占比上升', action: '复核明后两天价格策略', priority: 'low' },
]

export const actionItems: ActionItem[] = [
  { id: 'a1', title: '生成今日经营简报', owner: '经营办', due: '17:30', status: '进行中', evidence: '收入、客流、停车、票务数据已更新' },
  { id: 'a2', title: '调整小火车午后排班', owner: '景区运营', due: '13:00', status: '待处理', evidence: '小火车收入占景管收入 87%' },
  { id: 'a3', title: '检查商业动线导视', owner: '商业部', due: '今日闭园前', status: '待处理', evidence: '商业转化率 0.92%' },
]

export const journeyNodes: JourneyNode[] = [
  { id: 'parking', label: '停车到达', value: '1,267', change: '进场车辆', status: 'normal' },
  { id: 'gate', label: '入园核销', value: '713', change: '当前入园', status: 'warning' },
  { id: 'scenic', label: '景区项目', value: '¥8,605', change: '景管收入', status: 'normal' },
  { id: 'hotel', label: '酒店入住', value: '42.9%', change: '本夜入住', status: 'normal' },
  { id: 'commerce', label: '商业消费', value: '0.92%', change: '转化率', status: 'risk' },
]

export const revenueTrend: TrendPoint[] = [
  { label: '09:00', value: 4.2, compare: 3.8 },
  { label: '10:00', value: 7.8, compare: 6.9 },
  { label: '11:00', value: 12.4, compare: 11.8 },
  { label: '12:00', value: 15.6, compare: 17.2 },
  { label: '13:00', value: 21.1, compare: 24.7 },
  { label: '14:00', value: 27.8, compare: 31.1 },
  { label: '15:00', value: 34.5, compare: 38.2 },
]
