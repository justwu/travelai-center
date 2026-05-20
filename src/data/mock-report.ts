import type { ActionItem, EvidenceItem, Metric } from '@/types/domain'

export const reportMetrics: Metric[] = [
  { id: 'revenue', label: '总收入', value: '¥1,007.8万', status: 'normal', trend: 29.5, insight: '同比增长主要来自票务和酒店恢复' },
  { id: 'visitors', label: '接待游客', value: '88,712', unit: '人次', status: 'warning', trend: -19.3, insight: '较上周回落，非实名客群占比较高' },
  { id: 'commerce', label: '商业转化', value: '0.92', unit: '%', status: 'risk', trend: -0.8, insight: '商业动线和商品吸引力不足' },
]

export const reportEvidence: EvidenceItem[] = [
  { id: 'e1', title: '收入构成', value: '酒店与票务贡献 82%', detail: '商业二消占比低，仍是主要提升空间。' },
  { id: 'e2', title: '客源结构', value: '外省游客 80.9%', detail: '外地游客占比高，适合做住宿和项目联票。' },
  { id: 'e3', title: '停车承载', value: '剩余车位 1,861', detail: '当前承载安全，但周末预售显示峰值压力。' },
]

export const reportActions: ActionItem[] = [
  { id: 'r1', title: '周末票务核销预案', owner: '票务中心', due: '05-22 18:00', status: '待处理', evidence: '05-23 票务预售风险为高' },
  { id: 'r2', title: '商业动线复盘', owner: '商业部', due: '05-21 12:00', status: '进行中', evidence: '商业转化率持续低于 1%' },
]
