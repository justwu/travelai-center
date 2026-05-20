# TravelAI Center

文旅经营中枢前端 demo。项目基于竞品 XDMP 的页面与接口采集结果重新设计，不做传统后台复刻，而是做一个更克制、更有经营判断力的作品型产品。

## 技术栈

- Vue 3 + Vite + TypeScript
- Tailwind CSS
- shadcn-vue 风格组件 + Reka UI 基础能力
- ECharts / vue-echarts
- Vue Router
- Pinia
- Vitest

## 先读文档

- `design.md`：页面设计标准，所有页面实现前必须先读。
- `IMPLEMENTATION_PLAN.md`：持久实施计划和后续交接说明。

## 页面范围

- `/`：经营首页
- `/monitor`：实时监控
- `/forecast`：预售预测
- `/report`：复盘报告

## 本地运行

```bash
npm install
npm run dev
```

## 验证

```bash
npm run test
npm run build
```

## 发布建议

推荐 GitHub + Vercel：

1. 推送到 GitHub 仓库 `justwu/travelai-center`。
2. Vercel 连接 GitHub 仓库。
3. Build Command 使用 `npm run build`。
4. Output Directory 使用 `dist`。

当前机器直接推送 GitHub 需要配置 SSH key 或 HTTPS token。GitHub 不支持账号密码推送；HTTPS 推送时，命令行的 password 位置需要粘贴 Personal Access Token。

不用安装 `gh` CLI 也可以推送。可在 GitHub 网页生成 token 后执行：

```bash
git remote set-url origin https://github.com/justwu/travelai-center.git
git push -u origin main
```

提示 username 时输入 GitHub 用户名，提示 password 时粘贴 token。

## 截图留证

浏览器检查截图保存在 `artifacts/`，包含桌面端和移动端页面。
