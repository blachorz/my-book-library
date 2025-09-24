/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./book-*.html", // Scans all future book pages
    "./bookshelf/book-*.html", // Scans all future book pages
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Light theme colors
        'background': '#ffffff',
        'text': '#1d1d1f',
        'primary': '#007aff',
        'secondary-text': '#6e6e73',
        'border': '#d2d2d7',
        'card-bg': '#f5f5f7',
        
        // Dark theme colors
        'dark-background': '#0a0a0a',
        'dark-text': '#f5f5f7',
        'dark-primary': '#0a84ff',
        'dark-secondary-text': '#8e8e93',
        'dark-border': '#3a3a3c',
        'dark-card-bg': '#1c1c1e',
      },
      fontFamily: {
        'sans': ['Noto Sans TC', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
