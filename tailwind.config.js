/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ffBlack: '#121212',
        ffYellow: '#f4db42',
        ffGreen: '#1b5e20',
        ffLightGrey: '#f4f4f4',
        ffMidGrey: '#b0adad',
        ffDarkGrey: '#4e4c4c',
        // Teal/Mint palette for "on track" status
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
      },
      fontFamily: {
        sans: ['FoundersGrotesk', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
