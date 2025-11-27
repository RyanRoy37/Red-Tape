// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['"Courier Prime"', '"Courier New"', 'monospace'],
        'vintage': ['"Special Elite"', '"Courier Prime"', 'cursive'],
      },
      colors: {
        'red': {
          500: '#dc2626',
          600: '#b91c1c',
        },
      },
      boxShadow: {
        'brutal': '8px 8px 0px 0px rgba(0,0,0,1)',
        'brutal-lg': '12px 12px 0px 0px rgba(220,38,38,1)',
        'brutal-sm': '4px 4px 0px 0px rgba(0,0,0,1)',
      },
    },
  },
  plugins: [],
}