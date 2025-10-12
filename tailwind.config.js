/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'fade-in-slide-up': 'fade-in-slide-up 0.5s ease-out forwards',
        'blink': 'blink 1s linear infinite',
      },
      keyframes: {
        'blink': {
          '50%': {
            opacity: 0,
          }
        },
        'fade-in-slide-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
};
