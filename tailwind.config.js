/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-brown": "#633813",
        cream: "#E9CA9A",
        "transparent-cream": "rgba(233, 202, 154, 0.1)",
        "gray-3": "#585858",
        "gray-4": "#737373",
        "gray-6": "#C4C4C4",
        "gray-10": "#F5F5F5",
        "gray-bera": "#DBDBDB",
        link: "#61A9E4",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [],
  },
};
