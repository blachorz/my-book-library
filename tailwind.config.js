/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./book-*.html", // Scans all future book pages
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#ffffff',
        'text': '#1d1d1f',
        'primary': '#007aff',
        'secondary-text': '#6e6e73',
        'border': '#d2d2d7',
        'card-bg': '#f5f5f7',
      },
      fontFamily: {
        'sans': ['Noto Sans TC', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
