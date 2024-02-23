/** @type {import('tailwindcss').Config} */

const nativewind = require("nativewind/tailwind/css")

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}", "./modals/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        '10pct': '10%',
      },
      boxShadow : {
        "exitButtonShadow" : "0 5px 0 rgba(61, 61, 61)",
      },
      fontFamily: {
        'kghappy': ['KGHappy', 'sans-serif'],
        'lexend': ['Lexend', 'sans-serif'],
        'lexend-bold': ['LexendBold', 'sans-serif'],
        'jost': ['Jost', 'sans-serif'],
        'futura-medium': ['Futura-Medium', 'sans-serif'],
      },
      colors: {
        "grey-background": "#E5E7EB",
        "grey-1": "#B3B3B3",
        "grey-2": "#909090",
        "grey-3": "#646464",
        "grey-4": "#3D3D3D",
        "light-yellow": "#F6C443)",
        "dark-yellow": "#E69535",
        "light-red": "#FAD1D1",
        "dark-red": "#EE807C",
        "darker-red": "#E95750",
        "light-purple": "#DED1E4",
        "light-blue": "#80C9FA",
        "dark-blue": "#53ADF0",
        "light-green": "#DEFEBF",
        "dark-green": "#78C93C",
        "darker-green": "#6BA530",
        "white": "#FFF"
      },
    },
  },
  plugins: [nativewind],
};