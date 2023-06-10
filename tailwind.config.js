/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'peta': "url('/assets/svg/peta-graf.svg')",
      }
    },
  },
  plugins: [],
}

