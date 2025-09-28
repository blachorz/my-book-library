#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// 需要優化的檔案列表
const files = [
  'book-adversity-quotient.html',
  'book-effective-speech.html',
  'book-building-a-storybrand.html',
  'book-nonviolent-communication.html',
  'book-resilience.html',
  'book-art-of-war-gong.html',
  'book-high-performance-coaching.html',
  'book-impromptu-speaking.html',
  'book-never-split-the-difference.html',
  'book-brain-science-of-studying.html',
  'book-business-made-simple.html',
  'book-how-to-raise-social-child.html',
  'book-crucial-conversations.html',
  'book-awakening-of-growth.html',
  'book-peak.html',
  'book-you-are-your-childs-best-toy.html',
  'book-unconscious-obedience-and-awareness.html',
  'book-speak-with-facts.html',
  'book-rewire-your-anxious-brain.html',
  'book-almanack-of-naval.html'
];

const baseDir = path.resolve(process.cwd(), 'bookshelf');

// 關鍵 CSS 內嵌
const criticalCSS = `
    <!-- Critical CSS inline for fastest rendering -->
    <style>
      /* Critical CSS for above-the-fold content */
      * { box-sizing: border-box; }
      body { 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang TC', 'Microsoft JhengHei', sans-serif;
        margin: 0; padding: 0; line-height: 1.6;
        -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
      }
      .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
      .bg-background { background-color: #ffffff; }
      .dark .dark\\:bg-dark-background { background-color: #0a0a0a; }
      .text-text { color: #1f2937; }
      .dark .dark\\:text-dark-text { color: #f5f5f7; }
      .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
      .font-bold { font-weight: 700; }
      .py-10 { padding-top: 2.5rem; padding-bottom: 2.5rem; }
      .mb-12 { margin-bottom: 3rem; }
      .text-center { text-align: center; }
      .mb-2 { margin-bottom: 0.5rem; }
      .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
      .text-secondary-text { color: #6b7280; }
      .dark .dark\\:text-dark-secondary-text { color: #9ca3af; }
    </style>`;

// 資源預載入
const preloadResources = `
    <!-- Preload next likely page -->
    <link rel="prefetch" href="/bookshelf/book-peak.html">
    <link rel="prefetch" href="/bookshelf/book-effective-speech.html">`;

files.forEach(file => {
  const filePath = path.join(baseDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. 添加關鍵 CSS 內嵌（如果還沒有）
  if (!content.includes('Critical CSS inline for fastest rendering')) {
    // 找到 title 標籤後插入關鍵 CSS
    content = content.replace(
      /(<title>.*?<\/title>)/,
      `$1\n${criticalCSS}`
    );
  }

  // 2. 添加資源預載入（如果還沒有）
  if (!content.includes('Preload next likely page')) {
    // 在 noscript 標籤後添加預載入
    content = content.replace(
      /(<noscript><link rel="stylesheet" href="\/src\/css\/style\.css"><\/noscript>)/,
      `$1\n${preloadResources}`
    );
  }

  // 3. 優化 meta 標籤
  if (!content.includes('theme-color')) {
    content = content.replace(
      /(<meta name="viewport" content="width=device-width, initial-scale=1\.0">)/,
      `$1
    <meta name="theme-color" content="#ffffff">
    <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)">
    <meta name="description" content="深度讀書筆記與心得分享">
    <meta name="robots" content="index, follow">`
    );
  }

  // 4. 添加性能優化的 script
  if (!content.includes('performance-optimization')) {
    const performanceScript = `
    <!-- Performance optimization -->
    <script>
      // 字體載入優化
      if ('fonts' in document) {
        document.fonts.ready.then(() => {
          document.documentElement.classList.add('fonts-loaded');
        });
      }
      
      // 預載入關鍵資源
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.href = '/src/css/style.css';
      preloadLink.as = 'style';
      document.head.appendChild(preloadLink);
    </script>`;
    
    content = content.replace(
      /(<\/head>)/,
      `${performanceScript}\n$1`
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ 已優化: ${file}`);
});

console.log('🎉 手機性能優化完成！');
