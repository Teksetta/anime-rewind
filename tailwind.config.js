/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vhs-black': '#0a0a0a',
        'vhs-white': '#e0e0e0',
        'vhs-red': '#ff2a6d',
        'vhs-cyan': '#05d9e8',
        'vhs-yellow': '#f7ef8a',
        'vhs-purple': '#d62ad0',
        'vhs-green': '#01ffaa',
        'vhs-blue': '#1e3799',
      },
      fontFamily: {
        'vhs': ['VT323', 'monospace'],
        'retro': ['Press Start 2P', 'cursive'],
        'orbitron': ['Orbitron', 'sans-serif'],
      },
      animation: {
        'scanline': 'scanline-move 8s linear infinite',
        'flicker': 'flicker 0.15s infinite',
        'noise': 'noise 0.2s steps(10) infinite',
        'glitch': 'glitch-anim 5s infinite',
        'title-pulse': 'title-pulse 2s ease-in-out infinite',
        'blink': 'blink 1s step-start infinite',
        'loading-sweep': 'loading-sweep 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
