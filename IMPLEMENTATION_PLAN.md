# TravelAI Center Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished, responsive Vue 3 demo for TravelAI Center, a tourism operation command center inspired by the XDMP competitor analysis but visually and structurally distinct.

**Architecture:** This is a frontend-first demo using local mock data. The app should be organized around reusable business components and a small API adapter boundary so a future Spring Boot backend can replace mock data without rewriting pages.

**Tech Stack:** Vue 3, Vite, TypeScript, Tailwind CSS, shadcn-vue, Reka UI, ECharts, Vue Router, Pinia, Vitest, Playwright/manual browser verification.

---

## 0. Must Read First

- `design.md`: project design standard, visual rules, page scope, UI constraints.
- `../pageimg/竞品对标设计分析.md`: competitor critique and differentiation.
- `../pageimg/RPD.md`: product requirements.
- `../pageimg/design.md`: earlier product design proposal.

The most important visual rules from `design.md`:

- Titles must not be too bold.
- Small text must not be too small or too pale.
- Avoid all-caps words.
- Avoid too many cards.
- Avoid shadows where possible.
- Avoid status dots.
- Improve contrast on white backgrounds.
- Red should be muted, not bright.
- Never put cards inside cards.
- Amounts and headings can use a more stylish common UI font stack.

## 1. Repository And Deployment Notes

- Local project path: `/Users/just/devdata/AI制品/pbtest/yhxz/travelai-center`
- GitHub repository: `https://github.com/justwu/travelai-center`
- Preferred remote URL after auth is ready: `git@github.com:justwu/travelai-center.git` or HTTPS with a token.
- Current machine check: HTTPS requires a Personal Access Token; SSH currently reports `Permission denied (publickey)`. Push may need user auth setup.
- GitHub does not support account-password git push. If using HTTPS, paste a Personal Access Token when Git asks for password.
- Vercel target: connect GitHub repo, build command `npm run build`, output directory `dist`.

## 2. File Structure Target

Create or maintain this structure:

```text
travelai-center/
  design.md
  IMPLEMENTATION_PLAN.md
  package.json
  vite.config.ts
  tsconfig.json
  index.html
  src/
    main.ts
    App.vue
    styles/globals.css
    router/index.ts
    stores/app.ts
    data/mock-dashboard.ts
    data/mock-monitor.ts
    data/mock-forecast.ts
    data/mock-report.ts
    lib/utils.ts
    types/domain.ts
    components/
      shell/AppShell.vue
      shell/SideNav.vue
      shell/MobileTabBar.vue
      ui/...
      business/ProjectStatusBar.vue
      business/MetricStrip.vue
      business/MetricCard.vue
      business/RiskQueue.vue
      business/ActionList.vue
      business/JourneyFlow.vue
      business/TrendPanel.vue
      business/ForecastCalendar.vue
      business/ReportSummary.vue
      business/EvidenceList.vue
    pages/
      DashboardPage.vue
      MonitorPage.vue
      ForecastPage.vue
      ReportPage.vue
    tests/
      domain.spec.ts
```

## 3. Task List

### Task 1: Initialize The Frontend Project

**Files:**

- Create/modify: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.ts`, `src/App.vue`
- Keep: `design.md`, `IMPLEMENTATION_PLAN.md`

- [ ] Run Vite scaffold in this directory or create equivalent files manually.
- [ ] Install dependencies:

```bash
npm install vue vue-router pinia echarts vue-echarts reka-ui class-variance-authority clsx tailwind-merge lucide-vue-next
npm install -D @vitejs/plugin-vue typescript vite tailwindcss postcss autoprefixer vitest jsdom vue-tsc
```

- [ ] Initialize Tailwind:

```bash
npx tailwindcss init -p
```

- [ ] Verify:

```bash
npm run dev
npm run build
```

Expected: Vite dev server starts and build writes `dist/`.

### Task 2: Add Design Tokens And Global Styles

**Files:**

- Create: `src/styles/globals.css`
- Modify: `tailwind.config.js` or `tailwind.config.ts`
- Modify: `src/main.ts`

- [ ] Encode the color and typography rules from `design.md`.
- [ ] Use muted risk red `#a85b58`, lake green `#2f7d68`, aqua `#3d86a6`, terracotta `#c97845`, warm bright background `#fbfaf6`.
- [ ] Avoid heavy font weights by default.
- [ ] Add utility classes for tabular amount text.
- [ ] Verify in browser that default text contrast is readable.

### Task 3: Add Domain Types And Mock Data

**Files:**

- Create: `src/types/domain.ts`
- Create: `src/data/mock-dashboard.ts`
- Create: `src/data/mock-monitor.ts`
- Create: `src/data/mock-forecast.ts`
- Create: `src/data/mock-report.ts`
- Create: `src/tests/domain.spec.ts`

- [ ] Write tests first for at least two data helpers, such as metric status sorting and action priority sorting.
- [ ] Run tests to watch them fail.
- [ ] Implement minimal helpers and mock data.
- [ ] Run tests to pass.

Suggested domain concepts:

```ts
export type MetricStatus = 'normal' | 'warning' | 'risk'

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
  priority: 'high' | 'medium' | 'low'
}
```

### Task 4: Build App Shell And Navigation

**Files:**

- Create: `src/router/index.ts`
- Create: `src/components/shell/AppShell.vue`
- Create: `src/components/shell/SideNav.vue`
- Create: `src/components/shell/MobileTabBar.vue`
- Modify: `src/App.vue`, `src/main.ts`

- [ ] Define routes: `/`, `/monitor`, `/forecast`, `/report`.
- [ ] PC layout uses a restrained left navigation.
- [ ] Mobile layout uses bottom navigation.
- [ ] No heavy shadows, no card nesting.
- [ ] Use lucide icons where useful.

### Task 5: Build Business Components

**Files:**

- Create: `src/components/business/ProjectStatusBar.vue`
- Create: `src/components/business/MetricStrip.vue`
- Create: `src/components/business/MetricCard.vue`
- Create: `src/components/business/RiskQueue.vue`
- Create: `src/components/business/ActionList.vue`
- Create: `src/components/business/JourneyFlow.vue`
- Create: `src/components/business/TrendPanel.vue`
- Create: `src/components/business/ForecastCalendar.vue`
- Create: `src/components/business/ReportSummary.vue`
- Create: `src/components/business/EvidenceList.vue`

- [ ] Keep each component focused and small.
- [ ] Components should accept props, not import page-level data directly.
- [ ] Avoid status dots. Use text labels, subtle borders, and muted color surfaces.
- [ ] Avoid cards inside cards.

### Task 6: Implement Four Pages

**Files:**

- Create: `src/pages/DashboardPage.vue`
- Create: `src/pages/MonitorPage.vue`
- Create: `src/pages/ForecastPage.vue`
- Create: `src/pages/ReportPage.vue`

- [ ] Dashboard page: operating status, risk queue, journey flow, KPI strip, suggested actions.
- [ ] Monitor page: hotel, ticket, business, parking, scenic panels.
- [ ] Forecast page: future heat calendar, risk days, forecast summary.
- [ ] Report page: generated narrative, evidence list, action list.
- [ ] PC and mobile must both be usable.

### Task 7: Browser Verification

**Files:**

- No required source changes unless verification finds issues.

- [ ] Start dev server:

```bash
npm run dev -- --host 0.0.0.0
```

- [ ] Use browser/MCP to check desktop viewport.
- [ ] Use browser/MCP to check mobile viewport.
- [ ] Check the design rules:
  - no over-bold titles
  - no tiny pale text
  - no all-caps labels
  - no card nesting
  - no excessive cards
  - no heavy shadows
  - no bright red
  - readable contrast on white

### Task 8: Build, Commit, And Prepare Push

**Files:**

- Modify as needed.

- [ ] Run:

```bash
npm run build
npm run test
```

- [ ] Initialize Git if needed:

```bash
git init
git add .
git commit -m "feat: scaffold travelai center demo"
```

- [ ] Add remote after auth is ready:

```bash
git remote add origin git@github.com:justwu/travelai-center.git
git push -u origin main
```

If SSH is not configured, use HTTPS with a token or ask the user to run `gh auth login`.

HTTPS fallback:

```bash
git remote set-url origin https://github.com/justwu/travelai-center.git
git push -u origin main
```

When prompted, username is the GitHub username and password is a Personal Access Token.

## 4. Acceptance Criteria

- The app runs locally with `npm run dev`.
- The app builds with `npm run build`.
- The app has four routes: `/`, `/monitor`, `/forecast`, `/report`.
- The app is responsive on PC and mobile.
- UI follows `design.md` constraints.
- Mock data is isolated under `src/data` and typed under `src/types`.
- There is a clear GitHub/Vercel deployment path.

## 5. Current Status

- `design.md` exists and is the design standard.
- This implementation plan exists for handoff.
- GitHub repository exists but local machine needs auth setup before pushing.
- Theme system exists. Default theme is `cambridge`, with eight accepted themes for comparison.
