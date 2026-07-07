/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1CB0F6',
          light: '#4DC4FF',
          dark: '#1899D6',
        },
        secondary: {
          DEFAULT: '#FFC800',
          light: '#FFE566',
          dark: '#E6B400',
        },
        accent: {
          DEFAULT: '#FF4B4B',
          light: '#FF7A7A',
          dark: '#E63030',
        },
        neutral: {
            light: '#FFFFFF',
            DEFAULT: '#F7F7F7',
            dark: '#050505',
        },
        text: {
          primary: '#3C3C3C',
          secondary: '#777777',
          light: '#AFAFAF',
        },
        locked: '#D9D9D9',
      },
      fontFamily: {
        sans: ['Nunito', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'button': '0 4px 0 0 rgba(0, 0, 0, 0.2)',
        'button-active': '0 2px 0 0 rgba(0, 0, 0, 0.2)',
        'card': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'panel': '0 1px 2px rgba(0, 0, 0, 0.04), 0 8px 20px rgba(0, 0, 0, 0.06)',
        'panel-dark': '0 1px 2px rgba(0, 0, 0, 0.3), 0 8px 24px rgba(0, 0, 0, 0.4)',
        'divider': 'inset 0 -1px 0 rgba(0, 0, 0, 0.06)',
        'divider-top': 'inset 0 1px 0 rgba(0, 0, 0, 0.06)',
        'overlay': '0 24px 60px rgba(0, 0, 0, 0.25)',
      },
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-top': 'env(safe-area-inset-top)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'logo-pop': {
          '0%': { opacity: '0', transform: 'scale(0.6) rotate(-8deg)' },
          '60%': { opacity: '1', transform: 'scale(1.08) rotate(2deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(0deg)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'overlay-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out both',
        'fade-in-up': 'fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        'logo-pop': 'logo-pop 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
        'shimmer': 'shimmer 2.2s linear infinite',
        'overlay-in': 'overlay-in 0.25s ease-out both',
      },
    },
  },
  plugins: [],
};
