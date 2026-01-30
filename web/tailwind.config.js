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
          DEFAULT: '#11756A',
          light: '#1A8A7D',
          dark: '#0A5A51',
        },
        secondary: {
          DEFAULT: '#2C3E50',
        },
        accent: {
          DEFAULT: '#F5B800',
          light: '#FFD54F',
        },
        'teal-tab': '#4bc5b8',
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
