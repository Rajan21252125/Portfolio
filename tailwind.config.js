/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#FAF6F1',
          100: '#F5EFE7',
          200: '#D4BFA8',
          300: '#D4A574',
          400: '#8B6F47',
          500: '#6B4423',
          600: '#8B5A3C',
          700: '#3D2817',
          800: '#8B7355',
        },
      },
      animation: {
        scroll: 'scroll 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
          '100%': { transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}