/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.html",
    "./build/**/*.html",
    "./src/**/*.js",
    "./src/**/*.scss",
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        primary: '#BAFE35',     
        dark: '#000000',        
        light: '#ffffff',      
        gray: {
          100: '#F9F9F9',       
          700: '#333333',       
          800: '#606060',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'], // или та, что использована в макете
        display: ['"Manrope"', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.06)',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
    },
  },
  plugins: [],
};
