/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#f7f4ef',
        foreground: '#1f2428',
        muted: '#eef0ea',
        'muted-foreground': '#4f5b57',
        border: '#d8ded8',
        line: '#e3e5df',
        lake: '#2f6f62',
        terracotta: '#b8693b',
        gold: '#b89245',
        ink: '#1f2428',
        risk: '#a4514f',
        warning: '#b78a35',
        panel: '#ffffff',
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
