/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--color-background) / <alpha-value>)',
        foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        'muted-foreground': 'rgb(var(--color-muted-foreground) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        line: 'rgb(var(--color-line) / <alpha-value>)',
        lake: 'rgb(var(--color-lake) / <alpha-value>)',
        aqua: 'rgb(var(--color-aqua) / <alpha-value>)',
        terracotta: 'rgb(var(--color-terracotta) / <alpha-value>)',
        gold: 'rgb(var(--color-gold) / <alpha-value>)',
        iris: 'rgb(var(--color-iris) / <alpha-value>)',
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        risk: 'rgb(var(--color-risk) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
        panel: 'rgb(var(--color-panel) / <alpha-value>)',
        mint: 'rgb(var(--color-mint) / <alpha-value>)',
        peach: 'rgb(var(--color-peach) / <alpha-value>)',
        sky: 'rgb(var(--color-sky) / <alpha-value>)',
        butter: 'rgb(var(--color-butter) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'SF Pro Text', 'PingFang SC', 'Microsoft YaHei', 'system-ui', 'sans-serif'],
        amount: ['DIN Alternate', 'Inter', 'SF Pro Display', 'PingFang SC', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        panel: '8px',
      },
      boxShadow: {
        line: '0 0 0 1px rgba(31, 36, 40, 0.06)',
      },
    },
  },
  plugins: [],
}
