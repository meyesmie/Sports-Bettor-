// frontend/tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/providers/**/*.{js,ts,jsx,tsx,mdx}',
    './src/hooks/**/*.{js,ts,jsx,tsx,mdx}', // if any component uses className inside
  ],
  theme: {
    extend: {
      colors: {
        // Primary blue palette
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Dark navy (used in admin sidebar, dark backgrounds)
        navy: {
          800: '#1e2a4a',
          900: '#111a30',
        },
        // Glassmorphism card background
        glass: {
          light: 'rgba(255,255,255,0.7)',
          dark: 'rgba(17,25,40,0.75)',
        },
      },
      backgroundImage: {
        'gradient-premium': 'linear-gradient(135deg, #fbbf24 0%, #f97316 100%)',
        'gradient-hero': 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
      },
      boxShadow: {
        'card-hover': '0 10px 40px -10px rgba(0, 0, 0, 0.15)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // optional, for better form styling
  ],
};

export default config;
