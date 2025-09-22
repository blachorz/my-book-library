import { defineConfig } from 'vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  base: '/my-book-library/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'book-how-to-raise-social-child': resolve(__dirname, 'bookshelf/book-how-to-raise-social-child.html'),
        'book-unconscious-obedience-and-awareness': resolve(__dirname, 'bookshelf/book-unconscious-obedience-and-awareness.html'),
        'book-you-are-your-childs-best-toy': resolve(__dirname, 'bookshelf/book-you-are-your-childs-best-toy.html'),
        'book-brain-science-of-studying': resolve(__dirname, 'bookshelf/book-brain-science-of-studying.html'),
        'book-high-performance-coaching': resolve(__dirname, 'bookshelf/book-high-performance-coaching.html'),
        'book-art-of-war-gong': resolve(__dirname, 'bookshelf/book-art-of-war-gong.html'),
        'book-adversity-quotient': resolve(__dirname, 'bookshelf/book-adversity-quotient.html'),
        'book-business-made-simple': resolve(__dirname, 'bookshelf/book-business-made-simple.html'),
        'book-nonviolent-communication': resolve(__dirname, 'bookshelf/book-nonviolent-communication.html'),
        'book-rewire-your-anxious-brain': resolve(__dirname, 'bookshelf/book-rewire-your-anxious-brain.html'),
        'book-impromptu-speaking': resolve(__dirname, 'bookshelf/book-impromptu-speaking.html'),
        'book-awakening-of-growth': resolve(__dirname, 'bookshelf/book-awakening-of-growth.html'),
        'book-building-a-storybrand': resolve(__dirname, 'bookshelf/book-building-a-storybrand.html'),
        'book-never-split-the-difference': resolve(__dirname, 'bookshelf/book-never-split-the-difference.html'),
        'book-crucial-conversations': resolve(__dirname, 'bookshelf/book-crucial-conversations.html'),
        'book-resilience': resolve(__dirname, 'bookshelf/book-resilience.html'),
      }
    }
  }
})
