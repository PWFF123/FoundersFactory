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
      },
      fontFamily: {
        sans: ['FoundersGrotesk', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
