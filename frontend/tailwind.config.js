/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neo-primary': '#3B82F6',
        'neo-secondary': '#EF4444',
        'neo-accent': '#10B981',
        'neo-dark': '#1F2937',
        'neo-light': '#F3F4F6',
      },
      boxShadow: {
        // Neo-Brutalist Shadows
        'neo-brutal': '8px 8px 0px 0px rgba(0, 0, 0, 1)',
        'neo-brutal-sm': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
        'neo-brutal-lg': '12px 12px 0px 0px rgba(0, 0, 0, 1)',
        'neo-brutal-xl': '16px 16px 0px 0px rgba(0, 0, 0, 1)',
        
        // Colored Neo-Brutalist Shadows
        'neo-brutal-red': '8px 8px 0px 0px rgba(239, 68, 68, 1)',
        'neo-brutal-red-lg': '12px 12px 0px 0px rgba(239, 68, 68, 1)',
        'neo-brutal-blue': '8px 8px 0px 0px rgba(59, 130, 246, 1)',
        'neo-brutal-blue-lg': '12px 12px 0px 0px rgba(59, 130, 246, 1)',
        'neo-brutal-green': '8px 8px 0px 0px rgba(34, 197, 94, 1)',
        'neo-brutal-green-lg': '12px 12px 0px 0px rgba(34, 197, 94, 1)',
        'neo-brutal-yellow': '8px 8px 0px 0px rgba(234, 179, 8, 1)',
        'neo-brutal-yellow-lg': '12px 12px 0px 0px rgba(234, 179, 8, 1)',
        'neo-brutal-purple': '8px 8px 0px 0px rgba(147, 51, 234, 1)',
        'neo-brutal-purple-lg': '12px 12px 0px 0px rgba(147, 51, 234, 1)',
        'neo-brutal-pink': '8px 8px 0px 0px rgba(236, 72, 153, 1)',
        'neo-brutal-pink-lg': '12px 12px 0px 0px rgba(236, 72, 153, 1)',
        'neo-brutal-orange': '8px 8px 0px 0px rgba(249, 115, 22, 1)',
        'neo-brutal-orange-lg': '12px 12px 0px 0px rgba(249, 115, 22, 1)',
      },
      fontFamily: {
        'neo': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.neo-brutal-border': {
          border: '4px solid black',
        },
        '.neo-brutal-border-sm': {
          border: '2px solid black',
        },
        '.neo-brutal-border-lg': {
          border: '6px solid black',
        },
        '.neo-brutal-border-xl': {
          border: '8px solid black',
        },
        '.input-brutal': {
          width: '100%',
          padding: '1.5rem 1rem',
          fontSize: '1.125rem',
          fontWeight: 'bold',
          color: 'black',
          backgroundColor: 'white',
          border: '4px solid black',
          borderRadius: '1rem',
          boxShadow: '6px 6px 0px 0px rgba(0, 0, 0, 1)',
          transition: 'all 0.2s ease',
        },
        '.input-brutal:focus': {
          outline: 'none',
          transform: 'translate(-2px, -2px)',
          boxShadow: '8px 8px 0px 0px rgba(0, 0, 0, 1)',
        },
        '.input-brutal::placeholder': {
          color: '#6B7280',
          fontWeight: '600',
        },
        '.btn-brutal': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem 2rem',
          fontSize: '1.125rem',
          fontWeight: '900',
          textTransform: 'uppercase',
          border: '4px solid black',
          borderRadius: '1rem',
          boxShadow: '6px 6px 0px 0px rgba(0, 0, 0, 1)',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
        },
        '.btn-brutal:hover': {
          transform: 'translate(-2px, -2px)',
          boxShadow: '8px 8px 0px 0px rgba(0, 0, 0, 1)',
        },
        '.btn-brutal:active': {
          transform: 'translate(2px, 2px)',
          boxShadow: '2px 2px 0px 0px rgba(0, 0, 0, 1)',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover', 'focus'])
    }
  ],
}