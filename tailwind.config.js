/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        primary: '#FFFFFF',
        secondary: '#A1A1AA',
        border: '#27272A',
        card: '#0A0A0A',
        hover: '#18181B',
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'sans-serif'],
      },
      backgroundImage: {
        'linear-to-br': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
        'linear-to-tl': 'linear-gradient(to top left, var(--tw-gradient-stops))',
        'linear-to-tr': 'linear-gradient(to top right, var(--tw-gradient-stops))',
        'linear-to-bl': 'linear-gradient(to bottom left, var(--tw-gradient-stops))',
      },
      spacing: {
        '100': '400px',
        '125': '500px',
        '150': '600px',
      },
    },
  },
  plugins: [],
}
