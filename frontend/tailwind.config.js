/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
      width: 'width',
      },
      fontFamily: 
      {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}