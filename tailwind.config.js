/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'toast-slide-in': 'toastSlideIn 0.3s ease-in-out',
        'toast-slide-out': 'toastSlideOut 0.3s ease-in-out',
      },
      keyframes: {
        toastSlideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        toastSlideOut: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
      },
    },
  },

  plugins: [],
}
