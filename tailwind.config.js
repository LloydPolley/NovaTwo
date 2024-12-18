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
      scrollSnapAlign: {
        start: "start",
      },
      colors: {
        widgetBlack: {
          100: "#f2f2f2",
          200: "#d9d9d9",
          300: "#bfbfbf",
          400: "#808080",
          500: "#101010",
          600: "#0d0d0d",
          700: "#0b0b0b",
          800: "#080808",
          900: "#050505",
        },
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
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".hide-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
      });
    },
  ],
};
