/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'kghappy': ['KGHappy', 'sans-serif'],
        'lexend': ['Lexend', 'sans-serif'],
        'jost': ['Jost', 'sans-serif']
    },
    },
  },
  plugins: [],
};
