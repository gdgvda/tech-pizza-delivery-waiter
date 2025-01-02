/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{hbs,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-motion')], 
    output: {
    dir: './static',
    filename: 'style.css'
  }
}

