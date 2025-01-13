/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        "League-Spartan": ["Poppins", "serif"]
      },
      colors: {
        "pri-blue": "#133E87",
        "sec-blue": "#608BC1",
        "acc-blue": "#CBDCEB",
        "sec-gold": "#ffca2a",
        "sec-gold-yellow": "#FFD700",
        "off-white": "#f6f6f6",
        "sec-orange": "#FFAA33",
        "color-txt": "#373737"
      },
      backgroundImage: {
        'weather-bg': "url('/images/weather-bg.jpg')", // Path relative to the `public` folder
      },
    },
  },
  plugins: [],
}

