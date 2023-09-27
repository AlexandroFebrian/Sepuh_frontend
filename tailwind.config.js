/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ghostwhite: "#F8F8FF",
        lightgray: "#9DA4AE",
        indigo: "#6267F1",
        navyblue: "#0E1221",
        darkblue: "#1C2437"
      }
    },
  },
  plugins: [],
}

