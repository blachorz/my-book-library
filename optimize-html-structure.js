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

files.forEach(file => {
  const filePath = path.join(baseDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. 優化 script 載入順序 - 將非關鍵 script 移到 body 底部
  if (content.includes('<script src="/src/js/performance.js">')) {
    // 移動 performance.js 到 body 底部
    const performanceScript = '<script src="/src/js/performance.js"></script>';
    content = content.replace(performanceScript, '');
    
    // 在 </body> 前添加
    content = content.replace('</body>', `    ${performanceScript}\n</body>`);
  }

  if (content.includes('<script src="/src/js/advanced-performance.js">')) {
    // 移動 advanced-performance.js 到 body 底部
    const advancedScript = '<script src="/src/js/advanced-performance.js"></script>';
    content = content.replace(advancedScript, '');
    
    // 在 </body> 前添加
    content = content.replace('</body>', `    ${advancedScript}\n</body>`);
  }

  // 2. 添加輕量級手機優化腳本到 head
  if (!content.includes('mobile-optimization.js')) {
    const mobileScript = `
    <!-- 輕量級手機優化腳本 -->
    <script src="/src/js/mobile-optimization.js" defer></script>`;
    
    content = content.replace('</head>', `${mobileScript}\n</head>`);
  }

  // 3. 優化 Markmap 腳本載入 - 添加 defer 屬性
  content = content.replace(
    /<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/d3@7"><\/script>/,
    '<script src="https://cdn.jsdelivr.net/npm/d3@7" defer></script>'
  );
  
  content = content.replace(
    /<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/markmap-lib"><\/script>/,
    '<script src="https://cdn.jsdelivr.net/npm/markmap-lib" defer></script>'
  );
  
  content = content.replace(
    /<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/markmap-view"><\/script>/,
    '<script src="https://cdn.jsdelivr.net/npm/markmap-view" defer></script>'
  );

  // 4. 添加資源提示優化
  if (!content.includes('dns-prefetch')) {
    const dnsPrefetch = `
    <!-- DNS 預解析 -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link rel="dns-prefetch" href="//cdn.jsdelivr.net">`;
    
    content = content.replace('</head>', `${dnsPrefetch}\n</head>`);
  }

  // 5. 優化 meta 標籤順序
  if (!content.includes('robots')) {
    const metaTags = `
    <meta name="robots" content="index, follow">
    <meta name="author" content="Readpiration">
    <meta name="keywords" content="讀書筆記, 心得分享, 個人成長">`;
    
    content = content.replace('</head>', `${metaTags}\n</head>`);
  }

  // 6. 添加結構化數據
  if (!content.includes('application/ld+json')) {
    const structuredData = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "讀書筆記",
      "description": "深度讀書筆記與心得分享",
      "author": {
        "@type": "Person",
        "name": "Readpiration"
      }
    }
    </script>`;
    
    content = content.replace('</head>', `${structuredData}\n</head>`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ HTML 結構已優化: ${file}`);
});

console.log('🎉 HTML 結構優化完成！');
