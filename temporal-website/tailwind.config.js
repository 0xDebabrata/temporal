/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,tsx, jsx}",
    "./components/**/*.{js,ts,tsx, jsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        800: "800px"
      },
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
        Michroma: ["Michroma", "sans-serif"]
      },
      colors: {
        "light-blue": "#CBB2FF",
        "light-pink": "#D6B9F7"
      }
    },
  },
  plugins: [],
}
