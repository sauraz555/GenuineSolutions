/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        eucalyptus: {
          DEFAULT: 'rgb(var(--color-eucalyptus) / <alpha-value>)',
          light: 'rgb(var(--color-eucalyptus-light) / <alpha-value>)',
          dark: 'rgb(var(--color-eucalyptus-dark) / <alpha-value>)',
        },
        wattle: {
          DEFAULT: 'rgb(var(--color-wattle) / <alpha-value>)',
          light: 'rgb(var(--color-wattle-light) / <alpha-value>)',
          dark: 'rgb(var(--color-wattle-dark) / <alpha-value>)',
        },
        ocean: {
          DEFAULT: 'rgb(var(--color-ocean) / <alpha-value>)',
          light: 'rgb(var(--color-ocean-light) / <alpha-value>)',
          dark: 'rgb(var(--color-ocean-dark) / <alpha-value>)',
        },
        sand: 'rgb(var(--color-sand) / <alpha-value>)',
        terracotta: 'rgb(var(--color-terracotta) / <alpha-value>)',
        slate: 'rgb(var(--color-slate) / <alpha-value>)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
};
