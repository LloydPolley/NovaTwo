/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/layout.tsx",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        royalPurple: {
          100: "#e9e5f7",
          200: "#c9bff0",
          300: "#a692e7",
          400: "#8c73db",
          500: "#6e54b5",
          600: "#5a4495",
          700: "#493774",
          800: "#392b59",
          900: "#2c2144",
        },
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s forwards ease-in-out",
      },
    },
  },
  plugins: [],
};
