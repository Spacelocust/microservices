/** @type {import('tailwindcss').Config}*/
const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      colors: {
        svelte: '#ff4323',
      }
    },
  },

  plugins: [],
};

module.exports = config;
