module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#0A1929",
        secondary: "#132F4C",
        "border-dark": "#5090D3",
        "primary-accent": "#7964FF",
        "secondary-accent": "#7f75ef",
      },
    },
  },
  plugins: [],
};
