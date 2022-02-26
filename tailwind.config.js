module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  darkMode: "class", // or 'media' or 'class'
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
      animation: {
        "gradient-xy": "gradient-xy 10s linear infinite",
      },
      keyframes: {
        "gradient-xy": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "left top",
          },
          "25%": {
            "background-size": "400% 400%",
            "background-position": "right bottom",
          },
          "50%": {
            "background-size": "400% 400%",
            "background-position": "left center",
          },
          "75%": {
            "background-size": "400% 400%",
            "background-position": "right top",
          },
        },
      },
    },
  },
  plugins: [],
};
