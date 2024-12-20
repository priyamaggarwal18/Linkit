/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-green': '#49aa27',
        'custom-grey-color': '#1e2330', 
      },
    },
  },
  plugins: [],
}