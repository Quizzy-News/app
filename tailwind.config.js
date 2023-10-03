/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'kghappy': ['KGHappy', 'sans-serif'],
        'lexend-thin': ['Lexend-Thin', 'sans-serif'],
        'lexend-extralight': ['Lexend-ExtraLight', 'sans-serif'],
        'lexend-light': ['Lexend-Light', 'sans-serif'],
        'lexend-regular': ['Lexend-Regular', 'sans-serif'],
        'lexend-medium': ['Lexend-Medium', 'sans-serif'],
        'lexend-semibold': ['Lexend-SemiBold', 'sans-serif'],
        'lexend-bold': ['Lexend-Bold', 'sans-serif'],
        'lexend-extrabold': ['Lexend-ExtraBold', 'sans-serif'],
        'lexend-black': ['Lexend-Black', 'sans-serif'],
        'jost': ['Jost', 'sans-serif'],
      },
      colors: {
        "grey-1": "var(--grey-1)",
        "grey-2": "var(--grey-2)",
        "grey-3": "var(--grey-3)",
        "grey-4": "var(--grey-4)",
        "light-yellow": "var(--light-yellow)",
        "dark-yellow": "var(--dark-yellow)",
        "light-red": "var(--light-red)",
        "dark-red": "var(--dark-red)",
        "darker-red": "var(--darker-red)",
        "light-purple": "var(--light-purple)",
        "light-blue": "var(--light-blue)",
        "dark-blue": "var(--dark-blue)",
        "light-green": "var(--light-green)",
        "dark-green": "var(--dark-green)",
        "darker-green": "var(--darker-green)",
      },
    },
  },
  plugins: [],
};