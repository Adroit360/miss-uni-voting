/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        box: "repeat(auto-fit, minmax(300px, 1fr))",
      },
      colors: {
        red: "red",
      },

      boxShadow: {
        outline: "0 0.5rem 1.5rem hsl(210deg 8% 62% / 20%)",
      },
    },
  },
  plugins: [],
};
