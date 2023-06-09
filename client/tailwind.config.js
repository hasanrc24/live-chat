/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#412b50",
        "brand-bg": "#f2f2ff",
        "chat-bg": "#e2e5ed",
        "chat-text": "#302e2e",
      },
    },
  },
  plugins: [],
};
