module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        inter: ["Inter", "sans-serif"],
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
