import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#000000',
        stage: '#0a0807',
        fg: '#ffffff',
        'fg-muted': '#a8a4a0',
        'fg-dim': '#6b6864',
        'fg-ghost': 'rgba(255, 255, 255, 0.06)',
      },
      fontFamily: {
        display: ['"Inter"', '"Inter Display"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        serif: ['"Fraunces"', 'Georgia', 'serif'],
        cn: ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { wider: '0.04em', widest: '0.12em' },
    },
  },
  plugins: [],
} satisfies Config
