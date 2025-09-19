import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/my-book-library/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        book1: resolve(__dirname, 'book-how-to-raise-social-child.html'),
        book2: resolve(__dirname, 'book-unconscious-obedience-and-awareness.html'),
        book3: resolve(__dirname, 'book-you-are-your-childs-best-toy.html'),
        book4: resolve(__dirname, 'book-brain-science-of-studying.html')
      }
    }
  }
})
