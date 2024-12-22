/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        "League Spartan": ["Poppins", "serif"]
      },
      colors: {
        "pri-blue": "#133E87",
        "sec-blue": "#608BC1",
        "acc-blue": "#CBDCEB",
        "sec-gold": "#ffca2a"
      }
    },
  },
  plugins: [],
}

