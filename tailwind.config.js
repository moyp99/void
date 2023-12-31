/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

const redValorant = '#FF4654';
const darkValorant = '#0F1923';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    colors: { 'red-valorant': redValorant, 'dark-valorant': darkValorant, ...colors },

    extend: {
      backgroundImage: {
        'card-gradient': `-webkit-linear-gradient(320deg, ${redValorant} 64%, ${darkValorant} 64%)`,
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },

      fontFamily: {
        krona: ['Krona One', 'sans-serif']
      }
    }
  },
  plugins: []
};
