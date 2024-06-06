/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: [],
  theme: {
    screens: {
      smm: '300px',
      sm: '500px',
      md: '880px',
      lg: '1100px',
      xl: '1440pxpx'
    },
    extend: {
      colors: {
        'main-blue': '#2e5df4',
        'main-gray': '#eeeff5',
        'main-white': '#f7f2f2',
        'main-black': '#2a2a2e',
        success: '#c2f1b6',
        failure: '#f5bab7',
        'dark-one': '#1d1f24',
        'dark-two': '#3a3d44',
        'dark-three': '#6b6e75',
        'dark-four': '#a3a5ab',

        'color-one': '#222683',
        'color-two': '#4a86e4',
        'color-three': '#ef746d',
        'color-four': '#5d923d',
        'color-five': '#dbdd32'
      },
      fontFamily: {
        anek: ['Anek Odia', 'sans-serif'],
        sans: ['Encode Sans Expanded', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif']
      },

      backgroundImage: {
        'gradient-main':
          'linear-gradient(83deg, rgba(231,213,51,0.75) 0%, rgba(0,35,102,0.75) 100%);'
      }
    }
  },
  plugins: []
}
