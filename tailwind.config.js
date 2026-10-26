/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Jal Seva Brand Tokens
        'jal-navy': '#0B2545',
        'jal-blue': '#087DB8',
        'jal-cyan': '#2DBFD0',
        'jal-teal': '#239F83',
        'jal-amber': '#F4A340',
        'jal-pale-blue': '#EEF8FC',
        
        // Stitch / Semantic UI Tokens
        primary: {
          DEFAULT: '#001026',
          container: '#0B2545',
          light: '#314769',
        },
        secondary: {
          DEFAULT: '#006495',
          container: '#6cc0ff',
          dark: '#004b71',
        },
        tertiary: {
          DEFAULT: '#009baa',
          container: '#002a2f',
          accent: '#239F83',
        },
        surface: {
          DEFAULT: '#f7f9ff',
          dim: '#c9dcf0',
          container: '#e1efff',
          'container-low': '#ecf4ff',
          'container-high': '#d7eaff',
          'container-highest': '#d1e5f9',
          'container-lowest': '#ffffff',
        },
        'on-surface': {
          DEFAULT: '#091d2c',
          variant: '#44474e',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans Devanagari"', '"Noto Sans"', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['"Noto Sans Devanagari"', '"Noto Sans"', 'system-ui', 'sans-serif'],
        devanagari: ['"Noto Sans Devanagari"', '"Mukta"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
