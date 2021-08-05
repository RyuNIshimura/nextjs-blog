module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: [
        '-apple-system',
        'blinkmacsystemfont',
        'segoe ui',
        'helvetica',
        'arial',
        'sans-serif',
        'apple color emoji',
        'segoe ui emoji'
      ]
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1120px',
      // => @media (min-width: 1120px) { ... }

      '2xl': '1536px'
      // => @media (min-width: 1536px) { ... }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
