import { defineConfig } from 'vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import sitemap from 'vite-plugin-sitemap'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  base: '/my-book-library/',
  plugins: [
    sitemap({
      hostname: 'https://blachorz.github.io/my-book-library',
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'book-almanack-of-naval': resolve(__dirname, 'bookshelf/book-almanack-of-naval.html'),
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
        'book-effective-speech': resolve(__dirname, 'bookshelf/book-effective-speech.html'),
        'book-speak-with-facts': resolve(__dirname, 'bookshelf/book-speak-with-facts.html'),
        'book-peak': resolve(__dirname, 'bookshelf/book-peak.html'),
        'book-replicable-leadership': resolve(__dirname, 'bookshelf/book-replicable-leadership.html'),
        'book-strengthen-your-vagus-nerve': resolve(__dirname, 'bookshelf/book-strengthen-your-vagus-nerve.html'),
        'book-enterprise-evolution-theory': resolve(__dirname, 'bookshelf/book-enterprise-evolution-theory.html'),
      }
    }
  }
})
