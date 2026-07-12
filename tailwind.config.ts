import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1360px' },
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0A0B',
          900: '#0A0A0B',
          800: '#141416',
          700: '#1E1E21',
          600: '#2B2B2F',
          500: '#4A4A50',
          400: '#7A7A82',
          300: '#A6A6AC',
          200: '#D4D4D8',
          100: '#EDEDEF',
          50: '#F7F7F8',
        },
        yellow: {
          DEFAULT: '#F5B400',
          50: '#FFF8E6',
          100: '#FFEEBF',
          200: '#FFE08C',
          300: '#FFCF52',
          400: '#FBC02D',
          500: '#F5B400',
          600: '#D69900',
          700: '#AD7B00',
          800: '#7A5700',
          900: '#4D3700',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      maxWidth: {
        '8xl': '90rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(10,10,11,0.04), 0 8px 24px rgba(10,10,11,0.06)',
        lift: '0 20px 60px -15px rgba(10,10,11,0.35)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        fadeUp: 'fadeUp 0.6s ease forwards',
      },
    },
  },
  plugins: [],
};

export default config;
