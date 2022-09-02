/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,jsx, js}'],
  theme: {
    extend: {
      fontFamily: {
        'poppins' : ['Poppins', 'sans-serif'],
        'inter' : ['Inter', 'sans-serif'],
        'montserrat' : ['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: [],
}
