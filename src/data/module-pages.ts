import type { Metric, MetricStatus, TrendPoint } from '@/types/domain'

export type ModuleIcon =
  | 'gauge'
  | 'history'
  | 'calendarDays'
  | 'calendarClock'
  | 'network'
  | 'clipboardList'
  | 'hotel'
  | 'ticket'
  | 'store'
  | 'landmark'
  | 'parking'
  | 'users'

export type ModuleGroupId = 'overview' | 'operation' | 'business' | 'traffic'

export interface ModuleChange {
  id: string
  label: string
  current: string
  compareLabel: string
  compare: string
  change: string
  status: MetricStatus
}

export interface ModuleDetail {
  id: string
  label: string
  value: string
  note: string
}

export interface ModulePageConfig {
  id: string
  title: string
  mobileLabel: string
  path: string
  icon: ModuleIcon
  group: ModuleGroupId
  sourceDir: string
  updatedAt: string
  summary: string
  metrics: Metric[]
  changes: ModuleChange[]
  details: ModuleDetail[]
  trend: TrendPoint[]
  chart: {
    title: string
    subtitle: string
    type?: 'line' | 'bar'
    valueLabel?: string
    compareLabel?: string
  }
}

export const moduleGroups: Array<{ id: ModuleGroupId; label: string; moduleIds: string[] }> = [
  { id: 'overview', label: '总览', moduleIds: ['live', 'history'] },
  { id: 'operation', label: '经营分析', moduleIds: ['holiday', 'presale', 'channel', 'review'] },
  { id: 'business', label: '业态分析', moduleIds: ['hotel', 'ticket', 'commerce', 'scenic'] },
  { id: 'traffic', label: '客源与停车', moduleIds: ['parking', 'source'] },
]

export const modulePages: ModulePageConfig[] = [
  {
    id: 'live',
    title: '实时总览',
    mobileLabel: '实时',
    path: '/live',
    icon: 'gauge',
    group: 'overview',
    sourceDir: '01-实时总览',
    updatedAt: '2026-05-20 10:35:34',
    summary: '聚合酒店、票务、停车和收入快报，保留经营现场最常用的实时口径。',
    metrics: [
      { id: 'live-occ', label: '本夜入住率', value: '42.96', unit: '%', status: 'normal', insight: '环比 41.18%，提高 3.95%' },
      { id: 'live-revenue', label: '今日总收入', value: '34.54', unit: '万', status: 'warning', insight: '客房收入 ¥320,099.64，占主要来源' },
      { id: 'live-rooms', label: '本夜房数', value: '607', unit: '间', status: 'normal', insight: '总房数 1418，可卖 806 间' },
      { id: 'live-visitors', label: '实时入园人数', value: '755', unit: '人', status: 'normal', insight: '收费 460 人，免费 295 人' },
    ],
    changes: [
      { id: 'live-occ-mom', label: '入住率环比', current: '42.96%', compareLabel: '环比', compare: '41.18%', change: '+3.95%', status: 'normal' },
      { id: 'live-occ-yoy', label: '入住率同比', current: '42.96%', compareLabel: '同比', compare: '44.51%', change: '-3.83%', status: 'warning' },
      { id: 'live-room-rev', label: '客房收入', current: '¥320,099.64', compareLabel: '今日合计', compare: '¥345,367.64', change: '92.68%', status: 'normal' },
      { id: 'live-ticket-rev', label: '票务核销收入', current: '¥24,908.00', compareLabel: '票务销售收入', compare: '¥42,844.90', change: '58.14%', status: 'warning' },
    ],
    details: [
      { id: 'live-hotel', label: '房态分布', value: '占用 607 / 可卖 806 / 停售 5', note: '客源构成为散客 298、团队 297' },
      { id: 'live-ticket', label: '票务构成', value: '核销票数 988 / 售卖票数 1434', note: '主园区 640 人，湿地剧场 115 人' },
      { id: 'live-parking', label: '停车收入', value: '¥351.00', note: '作为实时总览收入快报的停车场口径' },
    ],
    trend: [
      { label: '08:00', value: 4.8, compare: 5.1 },
      { label: '09:00', value: 7.2, compare: 8.4 },
      { label: '10:00', value: 11.9, compare: 13.1 },
      { label: '11:00', value: 16.4, compare: 18.6 },
      { label: '12:00', value: 22.7, compare: 25.3 },
      { label: '13:00', value: 28.5, compare: 31.2 },
      { label: '14:00', value: 34.5, compare: 37.8 },
    ],
    chart: { title: '今日收入分时', subtitle: '单位：万元，对比参考日收入推进速度。', valueLabel: '今日', compareLabel: '参考日' },
  },
  {
    id: 'history',
    title: '历史分析',
    mobileLabel: '历史',
    path: '/history',
    icon: 'history',
    group: 'overview',
    sourceDir: '02-历史分析',
    updatedAt: '2026-05-20 10:40:12',
    summary: '以昨日、同比和分业态收入为主，适合查看当天经营是否偏离常态。',
    metrics: [
      { id: 'history-occ', label: '入住率', value: '41.18', unit: '%', status: 'warning', insight: '昨日 50.00%，环比下降 17.63%' },
      { id: 'history-revenue', label: '总收入', value: '58.34', unit: '万', status: 'warning', insight: '昨日 ¥839,905.60，环比下降 30.54%' },
      { id: 'history-visitors', label: '入园人数', value: '4,086', unit: '人', status: 'warning', insight: '主园区 3,799 人，湿地剧场 287 人' },
      { id: 'history-adr', label: '含早餐平均房价', value: '511.06', unit: '元', status: 'normal', insight: '昨日 525.16 元，同比 526.71 元' },
    ],
    changes: [
      { id: 'history-occ-mom', label: '入住率', current: '41.18%', compareLabel: '昨日', compare: '50.00%', change: '-17.63%', status: 'warning' },
      { id: 'history-occ-yoy', label: '入住率', current: '41.18%', compareLabel: '同比', compare: '32.70%', change: '+25.94%', status: 'normal' },
      { id: 'history-revenue-mom', label: '总收入', current: '¥583,359.32', compareLabel: '昨日', compare: '¥839,905.60', change: '-30.54%', status: 'warning' },
      { id: 'history-visitor-mom', label: '入园人数', current: '4,086 人', compareLabel: '环比', compare: '8,275 人', change: '-50.62%', status: 'risk' },
    ],
    details: [
      { id: 'history-room-state', label: '房态概况', value: '占用 584 / 可卖 834 / 停售 0', note: '总房数 1418 间' },
      { id: 'history-ticket', label: '票务详情', value: '免费 38.84% / 付费 61.16%', note: '散客 70.88%，团队 29.12%' },
      { id: 'history-report', label: '可导出内容', value: '营业日报 / 历史销售趋势指标', note: '竞品提供 Excel 导出入口' },
    ],
    trend: [
      { label: '5/14', value: 71.2, compare: 45.3 },
      { label: '5/15', value: 66.4, compare: 46.8 },
      { label: '5/16', value: 92.8, compare: 58.2 },
      { label: '5/17', value: 105.4, compare: 63.7 },
      { label: '5/18', value: 87.5, compare: 51.4 },
      { label: '5/19', value: 84.0, compare: 50.0 },
      { label: '5/20', value: 58.3, compare: 41.2 },
    ],
    chart: { title: '近 7 日收入与出租率', subtitle: '收入单位：万元；参考线为出租率。', valueLabel: '总收入', compareLabel: '出租率' },
  },
  {
    id: 'holiday',
    title: '节假日分析',
    mobileLabel: '节假',
    path: '/holiday',
    icon: 'calendarDays',
    group: 'operation',
    sourceDir: '03-节假日分析',
    updatedAt: '2026-05-20 10:47:18',
    summary: '按年度节假日聚合收入、入园、出租和人均消费，重点看节日经营质量。',
    metrics: [
      { id: 'holiday-visitors', label: '入园人数', value: '212,749', unit: '人', status: 'normal', insight: '同比增长 30.98%' },
      { id: 'holiday-rooms', label: '出租房数', value: '6,209', unit: '间', status: 'normal', insight: '同比增长 16.32%' },
      { id: 'holiday-revenue', label: '收入', value: '2,495.12', unit: '万', status: 'normal', insight: '同比增长 19.07%' },
      { id: 'holiday-spend', label: '人均消费', value: '117.28', unit: '元', status: 'warning', insight: '同比下降 9.09%' },
    ],
    changes: [
      { id: 'holiday-ticket', label: '门票收入', current: '¥8,663,711.00', compareLabel: '收入占比', compare: '34.72%', change: '第一来源', status: 'normal' },
      { id: 'holiday-room', label: '客房收入', current: '¥7,696,973.36', compareLabel: '收入占比', compare: '30.85%', change: '第二来源', status: 'normal' },
      { id: 'holiday-food', label: '餐饮收入', current: '¥3,916,519.94', compareLabel: '收入占比', compare: '15.70%', change: '稳定', status: 'normal' },
      { id: 'holiday-commercial', label: '商业收入', current: '¥78,746.00', compareLabel: '收入占比', compare: '0.32%', change: '偏低', status: 'warning' },
    ],
    details: [
      { id: 'holiday-hotel-top', label: '酒店合计出租率', value: '87.57%', note: '去年同比 81.10%，节假日住宿端表现强' },
      { id: 'holiday-adr', label: '酒店平均房价', value: '¥1,239.01', note: '合计房费收入 ¥7,692,999.36' },
      { id: 'holiday-train', label: '小火车收入', value: '¥2,066,104.00', note: '收入占比 8.28%，高于商业零售' },
    ],
    trend: [
      { label: '元旦', value: 312.4, compare: 72.1 },
      { label: '春节', value: 982.6, compare: 89.3 },
      { label: '清明', value: 286.9, compare: 74.5 },
      { label: '劳动', value: 613.2, compare: 87.6 },
      { label: '端午', value: 0, compare: 0 },
      { label: '中秋', value: 0, compare: 0 },
      { label: '国庆', value: 0, compare: 0 },
    ],
    chart: { title: '节假日收入与出租率', subtitle: '收入单位：万元；下半年节日当前为待发生状态。', type: 'bar', valueLabel: '收入', compareLabel: '出租率' },
  },
  {
    id: 'presale',
    title: '预售分析',
    mobileLabel: '预售',
    path: '/presale',
    icon: 'calendarClock',
    group: 'operation',
    sourceDir: '04-预售分析',
    updatedAt: '2026-05-20 10:53:49',
    summary: '查看未来日期的客房预订、预订收入和各酒店出租率排行。',
    metrics: [
      { id: 'presale-occ', label: '预计出租率', value: '46.05', unit: '%', status: 'normal', insight: '当前预售日期口径' },
      { id: 'presale-rooms', label: '今日预订数', value: '653', unit: '间', status: 'normal', insight: '用于判断未来入住压力' },
      { id: 'presale-revenue', label: '预订收入', value: '34.34', unit: '万', status: 'normal', insight: '页面原始值 ¥343,369' },
      { id: 'presale-adr', label: '平均房价', value: '525.83', unit: '元', status: 'normal', insight: '与实时 ADR 接近' },
    ],
    changes: [
      { id: 'presale-room-chart', label: '客房预售详情', current: '653 间', compareLabel: '预计出租率', compare: '46.05%', change: '可承接', status: 'normal' },
      { id: 'presale-adr', label: '平均房价', current: '¥525.83', compareLabel: '实时平均房价', compare: '¥527.35', change: '-0.29%', status: 'normal' },
      { id: 'presale-revenue', label: '预订收入', current: '¥343,369', compareLabel: '实时今日收入', compare: '¥345,367.64', change: '-0.58%', status: 'normal' },
      { id: 'presale-top', label: '各酒店出租率', current: 'Top10', compareLabel: '排序方式', compare: '出租率 / 收入', change: '双口径', status: 'normal' },
    ],
    details: [
      { id: 'presale-date', label: '筛选条件', value: '预售日期', note: '竞品页面以日期查询为核心入口' },
      { id: 'presale-hotel-top', label: '酒店排行', value: '按出租率 / 按收入', note: '适合判断高需求酒店和补量酒店' },
      { id: 'presale-ticket', label: '预售明细', value: '客房预售 / 票务预售', note: '后续可接 Spring Boot 接口拆分数据源' },
    ],
    trend: [
      { label: '今天', value: 34.3, compare: 46.1 },
      { label: '明天', value: 39.8, compare: 49.5 },
      { label: '周五', value: 48.6, compare: 57.2 },
      { label: '周六', value: 72.4, compare: 76.8 },
      { label: '周日', value: 61.1, compare: 68.0 },
      { label: '周一', value: 28.9, compare: 39.4 },
      { label: '周二', value: 26.2, compare: 35.7 },
    ],
    chart: { title: '未来 7 天预订收入', subtitle: '收入单位：万元；参考线为预计出租率。', valueLabel: '预订收入', compareLabel: '预计出租率' },
  },
  {
    id: 'channel',
    title: '渠道销售分析',
    mobileLabel: '渠道',
    path: '/channel-sales',
    icon: 'network',
    group: 'operation',
    sourceDir: '05-渠道销售分析',
    updatedAt: '2026-05-20 10:56:07',
    summary: '拆分客房和票务渠道收入，适合检查直销、OTA 和票务渠道贡献。',
    metrics: [
      { id: 'channel-room-revenue', label: '客房渠道总收入', value: '31.95', unit: '万', status: 'normal', insight: '原始金额 ¥319,478.64' },
      { id: 'channel-ticket-revenue', label: '票务渠道总收入', value: '4.75', unit: '万', status: 'normal', insight: '原始金额 ¥47,475.90' },
      { id: 'channel-room-share', label: '客房收入占比', value: '87.07', unit: '%', status: 'normal', insight: '按客房与票务渠道合计测算' },
      { id: 'channel-ticket-share', label: '票务收入占比', value: '12.93', unit: '%', status: 'warning', insight: '票务渠道仍有放大空间' },
    ],
    changes: [
      { id: 'channel-room', label: '客房渠道销售', current: '¥319,478.64', compareLabel: '展示维度', compare: '收入 / 房数', change: '主来源', status: 'normal' },
      { id: 'channel-ticket', label: '票务渠道销售', current: '¥47,475.90', compareLabel: '展示维度', compare: '收入 / 票数', change: '需扩量', status: 'warning' },
      { id: 'channel-trend', label: '趋势指标', current: '按天趋势', compareLabel: '明细', compare: '销售明细', change: '可钻取', status: 'normal' },
      { id: 'channel-export', label: '查询动作', current: '查询', compareLabel: '当前页面', compare: '无导出按钮', change: '可补充', status: 'warning' },
    ],
    details: [
      { id: 'channel-room-detail', label: '客房渠道', value: '收入 / 房数', note: '先看收入贡献，再看间夜数量' },
      { id: 'channel-ticket-detail', label: '票务渠道', value: '收入 / 票数', note: '后续可做渠道转化率和核销率' },
      { id: 'channel-source', label: '数据来源', value: '渠道销售趋势指标', note: '竞品仅露出汇总、趋势和明细入口' },
    ],
    trend: [
      { label: '5/14', value: 25.2, compare: 3.4 },
      { label: '5/15', value: 27.8, compare: 3.8 },
      { label: '5/16', value: 41.5, compare: 6.2 },
      { label: '5/17', value: 46.9, compare: 7.4 },
      { label: '5/18', value: 37.1, compare: 5.8 },
      { label: '5/19', value: 35.4, compare: 5.1 },
      { label: '5/20', value: 31.9, compare: 4.7 },
    ],
    chart: { title: '渠道收入趋势', subtitle: '单位：万元，客房与票务分渠道对比。', valueLabel: '客房渠道', compareLabel: '票务渠道' },
  },
  {
    id: 'review',
    title: '复盘分析',
    mobileLabel: '复盘',
    path: '/review',
    icon: 'clipboardList',
    group: 'operation',
    sourceDir: '06-复盘分析',
    updatedAt: '2026-05-20 10:58:44',
    summary: '将收入、客源、酒店、票务报告放在一个复盘视图，适合会前快速对齐。',
    metrics: [
      { id: 'review-revenue', label: '总收入', value: '1,007.84', unit: '万', status: 'normal', insight: '同比增长 29.55%' },
      { id: 'review-visitors', label: '接待游客', value: '88,712', unit: '人次', status: 'normal', insight: '去年同比增长 24.73%' },
      { id: 'review-occ', label: '酒店出租率', value: '63.38', unit: '%', status: 'normal', insight: '去年同比增长 35.57%' },
      { id: 'review-ticket', label: '售票数', value: '122,450', unit: '张', status: 'warning', insight: '上周下降 9.65%' },
    ],
    changes: [
      { id: 'review-revenue-week', label: '总收入', current: '¥10,078,407.79', compareLabel: '上周', compare: '-12.03%', change: '短期回落', status: 'warning' },
      { id: 'review-revenue-year', label: '总收入', current: '¥10,078,407.79', compareLabel: '同比', compare: '+29.55%', change: '同比增长', status: 'normal' },
      { id: 'review-visitor-year', label: '接待游客', current: '88,712 人次', compareLabel: '去年', compare: '+24.73%', change: '同比增长', status: 'normal' },
      { id: 'review-ticket-week', label: '售票数', current: '122,450 张', compareLabel: '上周', compare: '-9.65%', change: '需观察', status: 'warning' },
    ],
    details: [
      { id: 'review-source-province', label: '本省游客占比', value: '江苏 19.10%', note: '外省游客占比 80.90%' },
      { id: 'review-source-city', label: '本市游客占比', value: '无锡 3.59%', note: '外地游客占比 96.41%' },
      { id: 'review-hotel-top', label: '酒店出租率 Top1', value: '湖岸酒店 68.28%', note: '上榜酒店 7 家' },
    ],
    trend: [
      { label: '收入', value: 1007.8, compare: 778.0 },
      { label: '游客', value: 88.7, compare: 71.1 },
      { label: '出租率', value: 63.4, compare: 46.8 },
      { label: '售票数', value: 122.5, compare: 135.6 },
      { label: 'ADR', value: 533.0, compare: 493.8 },
    ],
    chart: { title: '复盘关键指标', subtitle: '收入单位：万元；游客和售票数按千级缩放展示。', type: 'bar', valueLabel: '本期', compareLabel: '参考期' },
  },
  {
    id: 'hotel',
    title: '酒店分析',
    mobileLabel: '酒店',
    path: '/hotel',
    icon: 'hotel',
    group: 'business',
    sourceDir: '07-酒店分析',
    updatedAt: '2026-05-20 11:00:09',
    summary: '按酒店拆出租率、团散结构、平均房价和房费收入，突出住宿经营状态。',
    metrics: [
      { id: 'hotel-occ', label: '整体出租率', value: '42.74', unit: '%', status: 'normal', insight: '昨日环比提高 1.56%' },
      { id: 'hotel-rooms', label: '出租房间数', value: '606', unit: '间', status: 'normal', insight: '可卖 807 间，停售 5 间' },
      { id: 'hotel-adr', label: '平均房价', value: '527.19', unit: '元', status: 'normal', insight: '合计口径 ADR' },
      { id: 'hotel-rev', label: '房费收入', value: '31.95', unit: '万', status: 'normal', insight: '页面原始值 ¥319,478.64' },
    ],
    changes: [
      { id: 'hotel-total', label: '合计出租率', current: '42.74%', compareLabel: '昨日环比', compare: '+1.56%', change: '微升', status: 'normal' },
      { id: 'hotel-yoy', label: '合计出租率', current: '42.74%', compareLabel: '同比去年', compare: '-2.08%', change: '略低', status: 'warning' },
      { id: 'hotel-yh', label: '湖岸酒店', current: '40.00%', compareLabel: '同比去年', compare: '-11.26%', change: '需关注', status: 'warning' },
      { id: 'hotel-ych', label: '艺术酒店', current: '49.67%', compareLabel: '同比去年', compare: '+12.94%', change: '增长', status: 'normal' },
    ],
    details: [
      { id: 'hotel-scatter', label: '团散结构', value: '散客 297 间 / 团队 297 间', note: '合计口径接近 1:1' },
      { id: 'hotel-yh-rev', label: '湖岸酒店收入', value: '¥147,319.64', note: '出租 270 间，ADR ¥545.63' },
      { id: 'hotel-yc-rev', label: '艺术酒店收入', value: '¥141,499.50', note: '出租 299 间，ADR ¥473.24' },
    ],
    trend: [
      { label: '湖岸', value: 40.0, compare: 545.6 },
      { label: '9号楼', value: 0, compare: 0 },
      { label: '艺术', value: 49.7, compare: 473.2 },
      { label: '观澜院', value: 39.5, compare: 537.1 },
      { label: '云岭', value: 42.0, compare: 1044.5 },
      { label: '星野客舍', value: 0, compare: 0 },
      { label: '林间', value: 12.5, compare: 669.0 },
    ],
    chart: { title: '酒店出租率与 ADR', subtitle: '柱为出租率，参考线为平均房价。', type: 'bar', valueLabel: '出租率', compareLabel: 'ADR' },
  },
  {
    id: 'ticket',
    title: '票务分析',
    mobileLabel: '票务',
    path: '/ticket',
    icon: 'ticket',
    group: 'business',
    sourceDir: '08-票务分析',
    updatedAt: '2026-05-20 11:01:49',
    summary: '围绕入园、票型、游客类型和未来票务预售查看票务经营状态。',
    metrics: [
      { id: 'ticket-visitors', label: '今日入园', value: '709', unit: '人', status: 'warning', insight: '环比参考 3,799 人' },
      { id: 'ticket-count', label: '票数', value: '1,096', unit: '张', status: 'normal', insight: '门票 636，车票 457，船票 2' },
      { id: 'ticket-revenue', label: '收入', value: '2.91', unit: '万', status: 'normal', insight: '页面原始值 ¥29,123.00' },
      { id: 'ticket-paid', label: '购票人数占比', value: '70.66', unit: '%', status: 'normal', insight: '购票人数 501 人' },
    ],
    changes: [
      { id: 'ticket-visitor-mom', label: '今日入园', current: '709 人', compareLabel: '环比', compare: '3,799 人', change: '-81.34%', status: 'risk' },
      { id: 'ticket-visitor-yoy', label: '今日入园', current: '709 人', compareLabel: '同比', compare: '4,697 人', change: '-84.91%', status: 'risk' },
      { id: 'ticket-person-type', label: '游客类型', current: '散客 480 人', compareLabel: '占比', compare: '67.70%', change: '主力', status: 'normal' },
      { id: 'ticket-car', label: '车票收入', current: '¥8,080.00', compareLabel: '车票数', compare: '457 张', change: '稳定', status: 'normal' },
    ],
    details: [
      { id: 'ticket-door', label: '门票', value: '636 张 / 709 人 / ¥20,378.00', note: '当前票务收入主来源' },
      { id: 'ticket-car-detail', label: '车票', value: '457 张 / 457 人 / ¥8,080.00', note: '和景管小火车类收入有联动关系' },
      { id: 'ticket-guide', label: '导游票', value: '1 张 / 1 人 / ¥200.00', note: '低频但客单价高' },
    ],
    trend: [
      { label: '08:00', value: 42, compare: 120 },
      { label: '09:00', value: 96, compare: 380 },
      { label: '10:00', value: 188, compare: 740 },
      { label: '11:00', value: 309, compare: 1180 },
      { label: '12:00', value: 451, compare: 1760 },
      { label: '13:00', value: 586, compare: 2550 },
      { label: '14:00', value: 709, compare: 3799 },
    ],
    chart: { title: '每小时入园人次', subtitle: '对比昨日同口径累计入园。', valueLabel: '今日', compareLabel: '昨日' },
  },
  {
    id: 'commerce',
    title: '商业分析',
    mobileLabel: '商业',
    path: '/commerce',
    icon: 'store',
    group: 'business',
    sourceDir: '09-商业分析',
    updatedAt: '2026-05-20 11:03:27',
    summary: '查看店铺销售、商品排行、站台零售和入园到消费的转化情况。',
    metrics: [
      { id: 'commerce-visitors', label: '景区入园人数', value: '711', unit: '人', status: 'normal', insight: '实时店铺销售口径' },
      { id: 'commerce-realtime', label: '店铺总营业额', value: '27.00', unit: '元', status: 'risk', insight: '昨日环比下降明显' },
      { id: 'commerce-orders', label: '成交订单数', value: '35', unit: '单', status: 'warning', insight: '历史口径，商业收入 ¥550.00' },
      { id: 'commerce-rate', label: '转化率', value: '0.92', unit: '%', status: 'risk', insight: '入园 3799 人对应商业消费' },
    ],
    changes: [
      { id: 'commerce-store', label: '可口可乐文创店', current: '¥27.00', compareLabel: '昨日环比', compare: '-87.44%', change: '明显回落', status: 'risk' },
      { id: 'commerce-total', label: '实时合计', current: '3 单 / ¥27.00', compareLabel: '昨日环比', compare: '-95.09%', change: '需处理', status: 'risk' },
      { id: 'commerce-history', label: '店铺销售历史', current: '¥550.00', compareLabel: '订单数', compare: '35 单', change: '低转化', status: 'warning' },
      { id: 'commerce-product', label: '站台零售 Top 商品', current: '文创雪糕 14 件', compareLabel: '销售金额', compare: '¥280.00', change: '当前第一', status: 'normal' },
    ],
    details: [
      { id: 'commerce-product-month', label: '文创雪糕', value: '月销量 628 / ¥12,560.00', note: '年度销量同为 628 件' },
      { id: 'commerce-year-store', label: '可口可乐文创店', value: '年度 ¥301,987.38', note: '客单价 ¥15.39' },
      { id: 'commerce-year-station', label: '站台零售', value: '年度 ¥16,575.30', note: '客单价 ¥23.31' },
    ],
    trend: [
      { label: '1月', value: 1.25, compare: 15.39 },
      { label: '2月', value: 7.04, compare: 15.39 },
      { label: '3月', value: 1.99, compare: 15.39 },
      { label: '4月', value: 11.81, compare: 15.39 },
      { label: '5月', value: 9.77, compare: 19.35 },
      { label: '6月', value: 0, compare: 0 },
      { label: '7月', value: 0, compare: 0 },
    ],
    chart: { title: '商业月度销售', subtitle: '单位：万元；参考线为客单价。', type: 'bar', valueLabel: '销售额', compareLabel: '客单价' },
  },
  {
    id: 'scenic',
    title: '景区分析',
    mobileLabel: '景区',
    path: '/scenic',
    icon: 'landmark',
    group: 'business',
    sourceDir: '10-景区分析',
    updatedAt: '2026-05-20 11:05:06',
    summary: '聚焦小火车、游览车和船票等景管项目的订单、收入与转化。',
    metrics: [
      { id: 'scenic-visitors', label: '景区入园人数', value: '713', unit: '人', status: 'normal', insight: '景管实时销售口径' },
      { id: 'scenic-revenue', label: '景管收入合计', value: '8,605', unit: '元', status: 'warning', insight: '昨日环比下降 85.79%' },
      { id: 'scenic-price', label: '客单价', value: '18.67', unit: '元', status: 'normal', insight: '实时销售合计口径' },
      { id: 'scenic-orders', label: '订单数', value: '461', unit: '单', status: 'normal', insight: '小火车票 428 单' },
    ],
    changes: [
      { id: 'scenic-train', label: '小火车票', current: '¥7,520.00', compareLabel: '昨日环比', compare: '-82.00%', change: '回落', status: 'warning' },
      { id: 'scenic-car', label: '游览车票', current: '¥620.00', compareLabel: '昨日环比', compare: '-89.34%', change: '低位', status: 'risk' },
      { id: 'scenic-boat', label: '船票', current: '¥465.00', compareLabel: '昨日环比', compare: '-96.41%', change: '低位', status: 'risk' },
      { id: 'scenic-history', label: '历史销售', current: '¥60,555.00', compareLabel: '转化率', compare: '74.18%', change: '参考', status: 'normal' },
    ],
    details: [
      { id: 'scenic-history-train', label: '小火车历史', value: '2134 单 / ¥41,775.00', note: '历史销售最大项目' },
      { id: 'scenic-history-boat', label: '船票历史', value: '315 单 / ¥12,965.00', note: '历史客单价 ¥41.16' },
      { id: 'scenic-conversion', label: '历史转化率', value: '74.18%', note: '入园 3799 人，订单 2818 单' },
    ],
    trend: [
      { label: '游览车', value: 0.62, compare: 5.82 },
      { label: '小火车', value: 7.52, compare: 41.78 },
      { label: '船票', value: 0.47, compare: 12.97 },
      { label: '合计', value: 8.61, compare: 60.56 },
    ],
    chart: { title: '景管实时与历史收入', subtitle: '单位：千元，对比当前实时口径和历史参考口径。', type: 'bar', valueLabel: '实时', compareLabel: '历史' },
  },
  {
    id: 'parking',
    title: '停车场分析',
    mobileLabel: '停车',
    path: '/parking',
    icon: 'parking',
    group: 'traffic',
    sourceDir: '11-停车场分析',
    updatedAt: '2026-05-20 11:06:31',
    summary: '查看进出场、剩余车位、停车收入和车源区域，判断到达承载压力。',
    metrics: [
      { id: 'parking-in', label: '进场数', value: '1,267', unit: '辆', status: 'normal', insight: '实时停车场数据' },
      { id: 'parking-out', label: '离场数', value: '838', unit: '辆', status: 'normal', insight: '净流入 429 辆' },
      { id: 'parking-income', label: '停车收入', value: '485.00', unit: '元', status: 'warning', insight: '历史昨日收入 ¥7,218.00' },
      { id: 'parking-left', label: '剩余车位', value: '1,861', unit: '个', status: 'normal', insight: '占用 609 个，总车位约 2470' },
    ],
    changes: [
      { id: 'parking-space', label: '车位占用', current: '609', compareLabel: '剩余', compare: '1861', change: '承载安全', status: 'normal' },
      { id: 'parking-stay', label: '均停留时长', current: '0.42 时', compareLabel: '昨日', compare: '2.56 时', change: '实时偏短', status: 'warning' },
      { id: 'parking-province', label: '江苏省占比', current: '78.85%', compareLabel: '无锡市占比', compare: '62.08%', change: '本地为主', status: 'normal' },
      { id: 'parking-history', label: '昨日入场', current: '4175 辆', compareLabel: '收入', compare: '¥7,218.00', change: '参考峰值', status: 'normal' },
    ],
    details: [
      { id: 'parking-source', label: '国内客源', value: '江苏 3292 / 外省 883', note: '本省占比 78.85%' },
      { id: 'parking-city', label: '省内客源', value: '无锡 2592 / 外地 700', note: '本市占比 62.08%' },
      { id: 'parking-table', label: '历史表字段', value: '日期 / 实收金额 / 入场数 / 平均停留', note: '适合后续做明细表格页' },
    ],
    trend: [
      { label: '08:00', value: 118, compare: 72 },
      { label: '09:00', value: 246, compare: 138 },
      { label: '10:00', value: 438, compare: 236 },
      { label: '11:00', value: 689, compare: 361 },
      { label: '12:00', value: 902, compare: 514 },
      { label: '13:00', value: 1104, compare: 676 },
      { label: '14:00', value: 1267, compare: 838 },
    ],
    chart: { title: '车辆分时进出场', subtitle: '累计车辆数，对比进场和离场节奏。', valueLabel: '进场', compareLabel: '离场' },
  },
  {
    id: 'source',
    title: '客源分析',
    mobileLabel: '客源',
    path: '/source',
    icon: 'users',
    group: 'traffic',
    sourceDir: '12-客源分析',
    updatedAt: '2026-05-20 11:07:56',
    summary: '展示住宿和购票游客的来源区域、实名制、年龄与性别结构。',
    metrics: [
      { id: 'source-total', label: '累计接待', value: '88,712', unit: '人次', status: 'normal', insight: '住宿 + 购票口径' },
      { id: 'source-realname', label: '实名制', value: '41,512', unit: '人', status: 'normal', insight: '实名占比约 46.80%' },
      { id: 'source-anonymous', label: '非实名', value: '47,200', unit: '人', status: 'warning', insight: '非实名占比约 53.20%' },
      { id: 'source-female', label: '女性游客占比', value: '58.91', unit: '%', status: 'normal', insight: '女性 24,426 人' },
    ],
    changes: [
      { id: 'source-realname-rate', label: '实名制结构', current: '41,512 人', compareLabel: '非实名', compare: '47,200 人', change: '非实名较高', status: 'warning' },
      { id: 'source-gender-f', label: '女性游客', current: '58.91%', compareLabel: '人数', compare: '24,426 人', change: '占优', status: 'normal' },
      { id: 'source-gender-m', label: '男性游客', current: '41.09%', compareLabel: '人数', compare: '17,039 人', change: '稳定', status: 'normal' },
      { id: 'source-type', label: '分析类型', current: '住宿 + 购票', compareLabel: '可切换', compare: '住宿客人 / 购票游客', change: '双口径', status: 'normal' },
    ],
    details: [
      { id: 'source-map', label: '游客来源区域', value: '区域分布地图', note: '竞品页面以地图和排行呈现来源结构' },
      { id: 'source-age', label: '游客年龄分布', value: '年龄段统计', note: '复盘页显示 30-39 岁占比 25.25%' },
      { id: 'source-type-detail', label: '类型筛选', value: '住宿+购票 / 住宿客人 / 购票游客', note: '适合后续拆成筛选控件' },
    ],
    trend: [
      { label: '非实名', value: 47.2, compare: 53.2 },
      { label: '江苏', value: 16.9, compare: 19.1 },
      { label: '上海', value: 10.0, compare: 11.3 },
      { label: '安徽', value: 3.2, compare: 3.7 },
      { label: '浙江', value: 3.0, compare: 3.4 },
    ],
    chart: { title: '客源结构 Top5', subtitle: '人数单位：千人；参考线为占比。', type: 'bar', valueLabel: '人数', compareLabel: '占比' },
  },
]

export const modulePageById = Object.fromEntries(modulePages.map((page) => [page.id, page])) as Record<string, ModulePageConfig>

export function findModulePageByPath(path: string) {
  return modulePages.find((page) => page.path === path)
}

export function getModuleGroupItems(groupId: ModuleGroupId) {
  return moduleGroups.find((group) => group.id === groupId)?.moduleIds.map((id) => modulePageById[id]).filter(Boolean) ?? []
}
