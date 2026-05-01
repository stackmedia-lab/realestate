import type { Config } from 'tailwindcss';
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#d92228', dark: '#a31a1f', light: '#fee2e2' },
        ink: '#0f172a',
        slate2: '#475569'
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      boxShadow: { card: '0 4px 24px -8px rgba(15,23,42,.12)' }
    }
  },
  plugins: []
} satisfies Config;
