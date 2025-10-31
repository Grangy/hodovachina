/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        'purple-primary': '#7E3FF2',
        'purple-light': '#F3EDFF',
        'purple-dark': '#6B2DD9',
        'blue-primary': '#3B82F6',
        'blue-light': '#E8F4F8',
        'blue-dark': '#2563EB',
        'mono-primary': '#4a4a4a',
        'mono-light': '#f0f0f0',
        'mono-dark': '#2a2a2a',
        'mono-hero': '#f5f5f5',
        'black': '#000000',
        'white': '#FFFFFF',
        'gray-light': '#F5F5F5',
        'gray-dark': '#1A1A1A',
      },
      fontFamily: {
        sans: ['var(--font-roboto)', 'sans-serif'],
        heading: ['var(--font-manrope)', 'sans-serif'],
        handwritten: ['var(--font-dancing)', 'cursive'],
      },
    },
  },
  plugins: [
    function({ addVariant }) {
      addVariant('blue', '[data-theme="blue"] &');
      addVariant('monochrome', '[data-theme="monochrome"] &');
    },
  ],
}

