import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/my-book-library/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'book-how-to-raise-social-child': resolve(__dirname, 'book-how-to-raise-social-child.html'),
        'book-unconscious-obedience-and-awareness': resolve(__dirname, 'book-unconscious-obedience-and-awareness.html'),
        'book-you-are-your-childs-best-toy': resolve(__dirname, 'book-you-are-your-childs-best-toy.html'),
        'book-brain-science-of-studying': resolve(__dirname, 'book-brain-science-of-studying.html'),
        'book-high-performance-coaching': resolve(__dirname, 'book-high-performance-coaching.html'),
        'book-art-of-war-gong': resolve(__dirname, 'book-art-of-war-gong.html'),
        'book-adversity-quotient': resolve(__dirname, 'book-adversity-quotient.html'),
        'book-business-made-simple': resolve(__dirname, 'book-business-made-simple.html'),
      }
    }
  }
})
