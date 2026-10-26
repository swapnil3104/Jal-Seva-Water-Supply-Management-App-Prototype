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
        'jal-border': '#D7E5EC',
        'jal-danger': '#C74646',
        'jal-slate': {
          900: '#182B3A',
          600: '#5D6B78',
        },
        
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
      borderRadius: {
        'card': '16px',
        'button': '12px',
        'input': '12px',
      },
      boxShadow: {
        'card': '0 2px 8px -2px rgba(11, 37, 69, 0.06), 0 1px 4px -1px rgba(11, 37, 69, 0.04)',
        'card-hover': '0 8px 20px -4px rgba(11, 37, 69, 0.10), 0 4px 8px -2px rgba(11, 37, 69, 0.06)',
        'elevated': '0 12px 28px -6px rgba(11, 37, 69, 0.14), 0 6px 12px -3px rgba(11, 37, 69, 0.08)',
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
