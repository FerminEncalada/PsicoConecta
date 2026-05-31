/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        arena: {
          50: "#fdfbf7",
          100: "#f7eedc",
          200: "#ead7ad",
        },
        bosque: {
          500: "#148478",
          600: "#0f766e",
          700: "#115e59",
          900: "#123c3a",
        },
      },
      boxShadow: {
        suave: "0 20px 55px rgba(15, 118, 110, 0.12)",
      },
    },
  },
  plugins: [],
};
