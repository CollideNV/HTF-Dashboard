/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'fade-in-slide-up': 'fade-in-slide-up 0.5s ease-out forwards',
        'blink': 'blink 1s linear infinite',
        'drop-fall': 'drop-fall 2s ease-in infinite',
        'spin-compass': 'spin-compass 3s linear infinite',
        'bounce-anchor': 'bounce-anchor 2s ease-in-out infinite',
        'pulse-heart': 'pulse-heart 2s ease-in-out infinite',
        'flash-lightning': 'flash-lightning 1.5s ease-in-out infinite',
        'rise-depth': 'rise-depth 2.5s ease-in-out infinite',
        'ping-signal': 'ping-signal 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'cleanup': 'cleanup 2s ease-in-out infinite',
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
        'drop-fall': {
          '0%': {
            transform: 'translateY(-10px)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(10px)',
            opacity: '0.3',
          },
        },
        'spin-compass': {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
        'bounce-anchor': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-5px)',
          },
        },
        'pulse-heart': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.5',
          },
        },
        'flash-lightning': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.4',
          },
        },
        'rise-depth': {
          '0%': {
            transform: 'translateY(10px)',
            opacity: '0.3',
          },
          '100%': {
            transform: 'translateY(-10px)',
            opacity: '1',
          },
        },
        'ping-signal': {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: '0',
          },
        },
        'cleanup': {
          '0%, 100%': {
            transform: 'rotate(0deg) scale(1)',
          },
          '50%': {
            transform: 'rotate(10deg) scale(1.1)',
          },
        },
      },
    },
  },
  plugins: [],
};
