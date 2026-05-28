import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#000000',
        stage: '#0a0807',
        fg: '#ffffff',
        // Tuned for WCAG AA (≥ 4.5:1 against #000)
        'fg-muted': '#b8b4af', // ≈ 11.2:1
        'fg-dim': '#8a8782',   // ≈ 5.6:1, was 4.0:1 (failed)
        'fg-ghost': 'rgba(255, 255, 255, 0.06)',
      },
      fontFamily: {
        display: ['"Inter"', '"Inter Display"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        cn: ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { wider: '0.04em', widest: '0.12em' },
    },
  },
  plugins: [],
} satisfies Config
