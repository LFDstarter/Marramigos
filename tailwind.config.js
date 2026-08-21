/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F8F5F0',
        beige: {
          light: '#F2EFE9',
          DEFAULT: '#E8E4DB',
          dark: '#D8D4C9',
        },
        terracotta: {
          light: '#E07A5F',
          DEFAULT: '#C5532C',
          dark: '#A33D1A',
        },
        textDark: '#1A1A1A',
        textMedium: '#4A4A4A',
        textLight: '#6D6D6D',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Work Sans"', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '6rem',
          '2xl': '8rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1400px',
        },
      },
      height: {
        'screen-90': '90vh',
      },
      transitionDuration: {
        '2000': '2000ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};