/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors:{
        digibg: "#F3E5F7",
        digipurple: "#751E9C",
      }
    },
  },
  plugins: [],
}

