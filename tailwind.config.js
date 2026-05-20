/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#fbfaf6',
        foreground: '#1f2428',
        muted: '#f0f5ee',
        'muted-foreground': '#45524d',
        border: '#d7e2d8',
        line: '#e4eadf',
        lake: '#2f7d68',
        aqua: '#3d86a6',
        terracotta: '#c97845',
        gold: '#c49a42',
        iris: '#786f9f',
        ink: '#1f2428',
        risk: '#a85b58',
        warning: '#b98b2f',
        panel: '#ffffff',
        mint: '#e8f4ec',
        peach: '#f8ebdf',
        sky: '#e8f2f6',
        butter: '#f7f0d8',
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
