/** @type {import('tailwindcss').Config} */

const nativewind = require("nativewind/tailwind/css");

module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ["./App.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}", "./modals/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'sm' : '360px',
        'md' : '834px',
        'lg' : '1512px',
      },
      spacing: {
        '01' : '.01rem',
        '2' : '2rem',
        '21' : '0.05vw',
        '37' : '0.10vw',
        '28' : '0.07vw',
        '125' : '1.25rem',
        '10pct' : '10%',
      },
      height: {
        '9pct': '9%',
        '10pct': '10%',
        'timer-height': '60px !important',
      },
      width: {
          'timer-width': '60px !important',
      },
      boxShadow : {
        "exitButtonShadow" : "0 5px 0 rgba(61, 61, 61)",
        "choiceDisplayButtonShadow": "0 5px 0 rgba(179,179,179)",
        "correctChoiceDisplayButtonShadow" : "0 5px 0 rgb(107,165,48)",
        "incorrectChoiceDisplayButtonShadow" : "0 5px 0 rgb(233,87,80)"
      },
      translate : {
        "5" : "5px"
      },
      fontFamily: {
        'kghappy': ['KGHappy', 'sans-serif'],
        'lexend': ['LexendRegular', 'sans-serif'],
        'lexend-bold': ['LexendBold', 'sans-serif'],
        'lexend-black': ['LexendBlack', 'sans-serif'], 
        'jost': ['Jost', 'sans-serif'],
        'futura-medium': ['FuturaMedium', 'sans-serif'],
      },
      
      colors: {
        "home-blue": "#ECF5FB",
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
        "light-purple": "#EAD6F3",
        "medium-purple": "#B67DD0",
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