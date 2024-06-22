/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./apps/**/*.{html,ts}', './libs/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        darkAccent: '#163953',
        lightAccent: '#41c4e6',
        softDark: '#094056',
        secondaryAccent: '#21a650',
        dark: '#27272a',
        white: '#ffffff',
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#b9e7fe',
          300: '#7cd5fd',
          400: '#36c1fa',
          500: '#0ca9eb',
          main: '#0090d6',
          700: '#016ba3',
          800: '#065b86',
          900: '#0b4b6f',
          950: '#07304a',
        },
        co2Emission: '#969696',
        waste: '#00a039',
        hp: '#d00000',
        water: '#02d8e0',
        waterConsumption: '#02d8e0',
        borderColor: '#d9dbe9',
      },
    },
    animation: {
      fadeIn: 'fadeIn 1s ease-in-out',
      fadeOut: 'fadeOut 3s ease-in-out',
    },
    keyframes: {
      fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
      fadeOut: { '0%': { opacity: '1' }, '100%': { opacity: '0' } },
    },
  },
  plugins: [{ ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}) }, 'prettier-plugin-tailwindcss'],
}
