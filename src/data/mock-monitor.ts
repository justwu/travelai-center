import type { Metric, MetricStatus, TrendPoint } from '@/types/domain'

export interface MonitorCommandMetric extends Metric {
  accent: 'lake' | 'aqua' | 'gold' | 'terracotta' | 'iris'
}

export interface MonitorFocusItem {
  id: string
  title: string
  detail: string
  owner: string
  status: MetricStatus
}

export interface MonitorStat {
  id: string
  label: string
  value: string
  unit?: string
  status: MetricStatus
}

export interface MonitorSignal {
  id: string
  label: string
  value: string
  status: MetricStatus
}

export interface MonitorRow {
  id: string
  name: string
  value: string
  note: string
}

export interface MonitorSection {
  id: string
  title: string
  summary: string
  stats: MonitorStat[]
  signals: MonitorSignal[]
  rows: MonitorRow[]
  trend: TrendPoint[]
}

export const monitorCommandMetrics: MonitorCommandMetric[] = [
  { id: 'cmd-revenue', label: '今日经营收入', value: '74.8', unit: '万', status: 'warning', insight: '商业二消拉低整体兑现效率', accent: 'terracotta' },
  { id: 'cmd-arrival', label: '累计到达量', value: '1,267', unit: '辆', status: 'normal', insight: '停车与票务峰值将在中午重叠', accent: 'lake' },
  { id: 'cmd-visitors', label: '实时入园', value: '713', unit: '人', status: 'warning', insight: '13:00 前需要提前增开核销通道', accent: 'gold' },
  { id: 'cmd-occ', label: '本夜入住率', value: '42.7', unit: '%', status: 'normal', insight: '房价弹性仍在高客单物业', accent: 'aqua' },
  { id: 'cmd-convert', label: '商业转化率', value: '0.92', unit: '%', status: 'risk', insight: '入园正常，但消费链路断层明显', accent: 'iris' },
]

export const monitorFocusItems: MonitorFocusItem[] = [
  {
    id: 'focus-ticket',
    title: '票务核销午后承压',
    detail: '11:30 后入园增速会高于当前窗口承接速度，建议提前加开 2 个核销口。',
    owner: '票务中心',
    status: 'warning',
  },
  {
    id: 'focus-business',
    title: '商业二消明显掉队',
    detail: '店铺成交和客单没有跟上客流，先排查门店开业状态和主通道导流。',
    owner: '商业部',
    status: 'risk',
  },
  {
    id: 'focus-parking',
    title: '停车峰值提前出现',
    detail: '车位总量仍安全，但到达速度偏快，需要前置道路引导与分区放行。',
    owner: '现场调度',
    status: 'normal',
  },
]

export const monitorSections: MonitorSection[] = [
  {
    id: 'hotel',
    title: '酒店经营',
    summary: '重点盯房态、房价和团散结构，不再只看单一出租率。',
    stats: [
      { id: 'hotel-occ', label: '出租率', value: '42.7', unit: '%', status: 'normal' },
      { id: 'hotel-rooms', label: '出租房', value: '606', unit: '间', status: 'normal' },
      { id: 'hotel-adr', label: '平均房价', value: '546', unit: '元', status: 'warning' },
      { id: 'hotel-rev', label: '房费收入', value: '31.9', unit: '万', status: 'normal' },
    ],
    signals: [
      { id: 'hotel-signal-1', label: '团散结构', value: '297 / 297', status: 'normal' },
      { id: 'hotel-signal-2', label: '低出租物业', value: '林间 12.5%', status: 'warning' },
      { id: 'hotel-signal-3', label: '房价弹性', value: '仍可保留', status: 'normal' },
    ],
    rows: [
      { id: 'hotel-row-1', name: '湖岸酒店', value: '40.0% / ¥545.63', note: '房价稳，但同比略低，需要盯散客恢复。' },
      { id: 'hotel-row-2', name: '艺术酒店', value: '49.7% / ¥473.24', note: '最能带量，适合继续承接散客。' },
      { id: 'hotel-row-3', name: '观澜院', value: '39.5% / ¥537.10', note: '价格健康，仍有补量空间。' },
    ],
    trend: [
      { label: '周一', value: 38, compare: 35 },
      { label: '周二', value: 41, compare: 39 },
      { label: '周三', value: 43, compare: 42 },
      { label: '周四', value: 45, compare: 44 },
    ],
  },
  {
    id: 'ticket',
    title: '票务核销',
    summary: '关键是盯入园增长、通道效率和高峰承接，而不是只看收入。',
    stats: [
      { id: 'ticket-people', label: '今日入园', value: '713', unit: '人', status: 'warning' },
      { id: 'ticket-income', label: '票务收入', value: '2.91', unit: '万', status: 'normal' },
      { id: 'ticket-check', label: '核销效率', value: '91', unit: '%', status: 'normal' },
      { id: 'ticket-paid', label: '购票占比', value: '70.7', unit: '%', status: 'normal' },
    ],
    signals: [
      { id: 'ticket-signal-1', label: '午后峰值', value: '13:00-15:00', status: 'warning' },
      { id: 'ticket-signal-2', label: '主力票型', value: '门票 + 车票', status: 'normal' },
      { id: 'ticket-signal-3', label: '核销动作', value: '需增开通道', status: 'warning' },
    ],
    rows: [
      { id: 'ticket-row-1', name: '门票', value: '636 张 / ¥20,378', note: '当前票务收入主来源。' },
      { id: 'ticket-row-2', name: '车票', value: '457 张 / ¥8,080', note: '与景区项目联动最明显。' },
      { id: 'ticket-row-3', name: '游客类型', value: '散客 480 人', note: '散客仍是当前核销主力。' },
    ],
    trend: [
      { label: '09', value: 62, compare: 54 },
      { label: '10', value: 118, compare: 96 },
      { label: '11', value: 176, compare: 161 },
      { label: '12', value: 221, compare: 205 },
    ],
  },
  {
    id: 'business',
    title: '商业二消',
    summary: '商业页不讲空话，直接回答为什么客流有了、消费却没跟上。',
    stats: [
      { id: 'business-orders', label: '订单数', value: '35', unit: '单', status: 'risk' },
      { id: 'business-amount', label: '商业收入', value: '550', unit: '元', status: 'risk' },
      { id: 'business-conv', label: '转化率', value: '0.92', unit: '%', status: 'risk' },
      { id: 'business-ticket', label: '客单价', value: '15.7', unit: '元', status: 'warning' },
    ],
    signals: [
      { id: 'business-signal-1', label: '问题定位', value: '链路断层', status: 'risk' },
      { id: 'business-signal-2', label: '主力商品', value: '文创雪糕', status: 'normal' },
      { id: 'business-signal-3', label: '优先动作', value: '先查开业', status: 'risk' },
    ],
    rows: [
      { id: 'business-row-1', name: '站台零售', value: '10 单 / ¥335', note: '通道位更强，说明动线影响很大。' },
      { id: 'business-row-2', name: '文创店', value: '25 单 / ¥215', note: '有量但客单低，缺少高价值转化。' },
      { id: 'business-row-3', name: '热卖商品', value: '雪糕 14 件 / ¥280', note: '热卖品有吸引力，但曝光不足。' },
    ],
    trend: [
      { label: '09', value: 4, compare: 8 },
      { label: '10', value: 9, compare: 16 },
      { label: '11', value: 14, compare: 25 },
      { label: '12', value: 18, compare: 33 },
    ],
  },
  {
    id: 'parking',
    title: '停车承载',
    summary: '停车看的是承载安全与到达节奏，不只是剩余车位一个数。',
    stats: [
      { id: 'parking-in', label: '累计进场', value: '1267', unit: '辆', status: 'normal' },
      { id: 'parking-out', label: '累计离场', value: '838', unit: '辆', status: 'normal' },
      { id: 'parking-left', label: '剩余车位', value: '1861', unit: '个', status: 'normal' },
      { id: 'parking-stay', label: '均停时长', value: '0.42', unit: '时', status: 'warning' },
    ],
    signals: [
      { id: 'parking-signal-1', label: '承载结论', value: '总量安全', status: 'normal' },
      { id: 'parking-signal-2', label: '峰值节奏', value: '提前出现', status: 'warning' },
      { id: 'parking-signal-3', label: '客源结构', value: '本地为主', status: 'normal' },
    ],
    rows: [
      { id: 'parking-row-1', name: '江苏客源', value: '3292 辆', note: '仍是主要自驾来源。' },
      { id: 'parking-row-2', name: '无锡客源', value: '2592 辆', note: '本市占比高，适合分时引导。' },
      { id: 'parking-row-3', name: '昨日峰值', value: '4175 辆 / ¥7,218', note: '当前还没触到历史高点。' },
    ],
    trend: [
      { label: '09', value: 246, compare: 138 },
      { label: '10', value: 438, compare: 236 },
      { label: '11', value: 689, compare: 361 },
      { label: '12', value: 902, compare: 514 },
    ],
  },
  {
    id: 'scenic',
    title: '景区项目',
    summary: '景管模块更关注项目收入结构和项目转化，不重复票务收入口径。',
    stats: [
      { id: 'scenic-revenue', label: '景管收入', value: '8605', unit: '元', status: 'warning' },
      { id: 'scenic-orders', label: '订单数', value: '461', unit: '单', status: 'normal' },
      { id: 'scenic-convert', label: '项目转化', value: '64.6', unit: '%', status: 'warning' },
      { id: 'scenic-price', label: '客单价', value: '18.7', unit: '元', status: 'normal' },
    ],
    signals: [
      { id: 'scenic-signal-1', label: '主力项目', value: '小火车', status: 'normal' },
      { id: 'scenic-signal-2', label: '弱项项目', value: '船票 / 游览车', status: 'warning' },
      { id: 'scenic-signal-3', label: '建议动作', value: '补强联动售卖', status: 'warning' },
    ],
    rows: [
      { id: 'scenic-row-1', name: '小火车', value: '¥7,520 / 428 单', note: '当前最大项目收入来源。' },
      { id: 'scenic-row-2', name: '游览车', value: '¥620 / 31 单', note: '转化明显偏低。' },
      { id: 'scenic-row-3', name: '船票', value: '¥465 / 2 单', note: '高单价但成交稀少。' },
    ],
    trend: [
      { label: '09', value: 1.1, compare: 5.8 },
      { label: '10', value: 2.9, compare: 14.2 },
      { label: '11', value: 5.4, compare: 26.8 },
      { label: '12', value: 8.6, compare: 60.6 },
    ],
  },
]
