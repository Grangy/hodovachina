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
        'mono-primary': '#111111',
        'mono-light': '#f0f0f0',
        'mono-dark': '#1f1f1f',
        'mono-hero': '#d0d0d0',
        'mono-muted': '#b5b5b5',
        'mono-outline': '#c8c8c8',
        'black': '#000000',
        'white': '#FFFFFF',
        'gray-light': '#F5F5F5',
        'gray-dark': '#1A1A1A',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        heading: ['var(--font-raleway)', 'var(--font-inter)', 'sans-serif'],
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

