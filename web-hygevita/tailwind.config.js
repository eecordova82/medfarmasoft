/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0E9488',
          light: '#14B8A6',
          dark: '#0A6B62',
        },
        secondary: {
          DEFAULT: '#2C3E50',
        },
        accent: {
          DEFAULT: '#F59E0B',
          light: '#FBBF24',
        },
        'teal-tab': '#5EEAD4',
        'light-bg': '#F5F7FA',
        'neutral-text': '#64748B',
        'dark-text': '#0F172A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
