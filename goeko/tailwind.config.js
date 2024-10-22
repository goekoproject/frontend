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
        textError: 'rgb(124 28 28)',
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
        blueLightPastel: 'var(--blue-light-pastel)',
      },
    },
    animation: {
      fadeIn: 'fadeIn 1s ease-in-out',
      fadeOut: 'fadeOut 200ms ease-in-out',
      fadeOutLeft: 'fadeOutLeft 300ms ease-in-out',
      fadeInRight: 'fadeInRight 300ms ease-in-out',
      fadeOutRight: 'fadeOutRight 300ms ease-in-out',
      fadeOutRightLarge: 'fadeOutRight 3s 5s ease-in-out',
    },
    keyframes: {
      fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
      fadeOut: { '0%': { opacity: '1' }, '100%': { opacity: '0' } },
      fadeInRight: {
        '0%': { opacity: '0', transform: 'translateX(100%)' },
        '100%': { opacity: '1', transform: 'translateX(0)' },
      },
      fadeOutRight: {
        '0%': { opacity: '1', transform: 'translateX(0)' },
        '100%': { opacity: '0', transform: 'translateX(100%)' },
      },
      fadeOutLeft: {
        '0%': { opacity: '1', transform: 'translateX(0)' },
        '100%': { opacity: '0', transform: 'translateX(-100%)' },
      },
    },
  },
  plugins: [{ ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}) }, 'prettier-plugin-tailwindcss'],
}
