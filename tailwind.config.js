/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{hbs,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
  output: {
    dir: './static',
    filename: 'style.css'
  }
}

