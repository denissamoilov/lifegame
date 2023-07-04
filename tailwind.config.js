/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      black: "#010101",
      white: "#ffffff",
      grid: "#9C9C9C",
      alive: "#A3F7BB",
      dead: "#FFF8F2",
      hover: "#F5CB97",
      primary: {
        100: "#D7BCF7",
        300: "#8B71AB",
        500: "#AF72F9",
        900: "#312B38",
      },
    },
    fontSize: {
      sm: ["14px", "20px"],
      base: ["16px", "24px"],
      lg: ["20px", "28px"],
      xl: ["24px", "32px"],
    },
    extend: {},
  },
  plugins: [],
};
