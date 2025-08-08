/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5B4FE5',
        'primary-hover': '#4A3DD1',
        secondary: '#8B80F9',
        accent: '#FFB84D',
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
        surface: '#FFFFFF',
        background: '#F8F9FB',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-gentle': 'pulse 2s ease-in-out infinite',
        'bounce-subtle': 'bounce 0.8s ease-out',
        'slide-right': 'slide-right 0.3s ease-out forwards',
      },
      keyframes: {
        'slide-right': {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '50%': { transform: 'translateX(20px)', opacity: '0.5' },
          '100%': { transform: 'translateX(100%)', opacity: '0' }
        }
      }
    },
  },
  plugins: [],
}