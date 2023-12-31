/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      variants: {
        height: ['responsive', 'hover', 'focus']
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'max-height': 'max-height',
      },
      colors: {
        ghostwhite: {
          50: "#f8f8ff",
          100: "#dfdfe5",
          200: "#c6c6cc",
          300: "#adadb2",
          400: "#949499",
          500: "#7c7c7f",
          600: "#636366",
          700: "#4a4a4c",
          800: "#313133",
          900: "#181819",
        },
        lightblue: {
          50: "#eaf3fc",
          100: "#d2d8e0",
          200: "#b8bec6",
          300: "#9da4ae",
          400: "#828a96",
          500: "#69717d",
          600: "#515862",
          700: "#393f47",
          800: "#21262d",
          900: "#030e16",
        },
        indigo: {
          50: "#e7e7ff",
          100: "#b8bbfd",
          200: "#8a8ef6",
          300: "#5b60f0",
          350: "#5358D2",
          400: "#4A4DB4",
          500: "#161ad2",
          600: "#0f14a4",
          700: "#080e76",
          800: "#030749",
          900: "#00021d",
        },
        navyblue: {
          50: "#edeff7",
          100: "#cbd0e3",
          200: "#a8b0d1",
          300: "#8691c1",
          400: "#6371b2",
          500: "#4a5898",
          600: "#3a4475",
          700: "#2a3154",
          800: "#191d32",
          900: "#080a12",
        },
        darkblue: {
          50: "#ebf1fc",
          100: "#ccd4e5",
          200: "#acb7d1",
          300: "#8b9abf",
          400: "#6a7dad",
          500: "#506493",
          600: "#3e4d73",
          700: "#2c3752",
          800: "#1a2133",
          900: "#070b15",
        },
      },
      fontFamily: {
        mooli: ["Mooli", "sans-serif"],
        sarabun: ["Sarabun", "sans-serif"],
      },
      screens: {
        sm: "480px",
        md: "960px",
        lg: "1366px",
        xl: "1600px",
        "2xl": "1920px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};