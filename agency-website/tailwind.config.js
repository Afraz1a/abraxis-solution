/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0ea5e9',     // electric cyan/teal – main vibrant energy
          dark:   '#0284c7',
          light:  '#38bdf8',
        },
        accent: {
          DEFAULT: '#f472b6',     // warm coral-pink – playful retro touch
          dark:   '#ec4899',
        },
        warm: {
          DEFAULT: '#fbbf24',     // sunny warm yellow – optimistic, old-school fun
          dark:   '#f59e0b',
        },
        dark: {
          950: '#020617',
          900: '#0f172a',
          800: '#1e293b',
        },
        text: {
          primary:   '#f0f9ff',   // bright off-white
          secondary: '#c0d9ff',   // soft cyan-gray
          muted:     '#94a3b8',
        },
      },
      fontFamily: {
        sans:   ['Geist', 'system-ui', 'sans-serif'],
        display: ['Geist', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '8xl': ['6rem',   { lineHeight: '1' }],
        '9xl': ['7.5rem', { lineHeight: '0.95' }],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      boxShadow: {
        'glow-primary': '0 0 40px -8px rgba(14, 165, 233, 0.5)',
        'glow-accent':  '0 0 40px -8px rgba(244, 114, 182, 0.4)',
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #0284c7 100%)',
        'gradient-cta':  'linear-gradient(135deg, #0ea5e9 0%, #f472b6 70%, #fbbf24 100%)',
      },
    },
  },
  plugins: [],
}