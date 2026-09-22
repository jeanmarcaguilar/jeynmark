/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Slightly blue-tinted charcoal instead of flat #050505 — reads richer
        // on screen and stops large panels from looking like dead black.
        background: '#0A0B0F',
        // Elevated surface, warmed a touch so cards separate from the page
        // without needing a heavy border.
        card: '#141620',
        // Hover/active surface, one step up from card.
        hover: '#1C1F2B',
        // Border with a visible but quiet blue undertone.
        border: '#262A38',
        // Off-white instead of pure #FFFFFF — less glare, still crisp.
        primary: '#F2F3F5',
        // Muted slate-blue instead of neutral grey — ties secondary text
        // back into the same cool palette as background/card/border.
        secondary: '#9497AC',
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