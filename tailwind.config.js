/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff5f0',
          100: '#ffe8dc',
          200: '#ffd1b8',
          300: '#ffb494',
          400: '#ff9770',
          500: '#FF6B35',
          600: '#F7931E',
          700: '#e67300',
          800: '#cc6600',
          900: '#994d00',
        },
      },
    },
  },
  plugins: [],
}
