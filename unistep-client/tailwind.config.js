/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fece2e",
        textPrimary: "#000000",
        background: "#fafafa",
        neutrals: "#faf6f5",
        neutralsLight: "#e8ded9",
      },
    },
  },
  plugins: [],
};
