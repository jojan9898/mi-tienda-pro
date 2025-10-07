/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        background: '#121212',
        panel: '#1E1E1E',
        card: {
          DEFAULT: '#2A2A2A',
          hover: '#3C3C3C',
        },
        border: '#3A3A3A',
        primary: {
          DEFAULT: '#F59E0B',
          dark: '#D97706',
        },
        secondary: '#4285F4',
        text: {
          primary: '#FFFFFF',
          secondary: '#A0A0_A0',
        },
        button: {
          DEFAULT: '#374151',
          hover: '#4b5563',
        },
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(to right, #F59E0B, #D97706)',
        'primary-gradient-hover': 'linear-gradient(to right, #FBBF24, #F59E0B)',
      },
    },
  },
  plugins: [],
};