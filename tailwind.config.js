/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/index.js",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "form-bg":"#e6f3ff"
      }
    },
  },
  plugins: [],
}

