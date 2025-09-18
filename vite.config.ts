import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        book1: resolve(__dirname, 'book-how-to-raise-social-child.html')
      }
    }
  }
})
