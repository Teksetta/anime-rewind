/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vhs-black': '#0a0a0a',
        'vhs-dark': '#1a1a1a',
        'vhs-neon': '#00ff88',
        'vhs-neon-pink': '#ff006e',
        'vhs-cyan': '#00d9ff',
        'vhs-magenta': '#ff00ff',
        'vhs-yellow': '#ffff00',
      },
      fontFamily: {
        'vhs': ['\'OCR A\'', 'monospace'],
        'retro': ['\'Courier New\'', 'monospace'],
      },
      animation: {
        'flicker': 'flicker 0.15s infinite',
        'glitch': 'glitch 0.3s infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
      },
    },
  },
  plugins: [],
}
