/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./booking/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./data/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#2d2926",
        cream: "#fbf7f1",
        mist: "#eee7df",
        clay: "#b78172",
        leaf: "#60715f",
        rose: "#d9aaa0",
        nude: {
          50: "#fffaf5",
          100: "#f7eee6",
          200: "#eadbd0",
          300: "#d7bfb1",
          500: "#9a7467",
          700: "#654840"
        }
      },
      boxShadow: {
        soft: "0 16px 45px rgba(45, 41, 38, .08)",
        petal: "0 24px 70px rgba(154, 116, 103, .18)"
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
