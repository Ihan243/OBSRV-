/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsrv: {
          black: '#0B0B0B',
          card: '#121212',
          charcoal: '#1A1A1A',
          muted: '#858585',
          white: '#F2F0EA',
          accent: '#E53E3E',
          border: '#262626'
        }
      },
      fontFamily: {
        serif: ['"Bodoni Moda"', 'serif'],
        sans: ['"Space Grotesk"', 'sans-serif'],
        brand: ['"Syncopate"', 'sans-serif'],
        mono: ['"Space Grotesk"', 'monospace']
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        }
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'float-slow': 'floatSlow 4s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}
