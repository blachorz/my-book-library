// 手機性能優化腳本 - 輕量級版本
(function() {
  'use strict';

  // 關鍵渲染路徑優化
  function optimizeCriticalPath() {
    // 立即設置字體載入狀態
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        document.documentElement.classList.add('fonts-loaded');
      });
    }

    // 預載入關鍵資源
    const criticalResources = [
      '/src/css/style.css'
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = 'style';
      link.onload = function() {
        this.rel = 'stylesheet';
      };
      document.head.appendChild(link);
    });
  }

  // 延遲載入非關鍵資源
  function loadNonCriticalResources() {
    // 使用 requestIdleCallback 或降級到 setTimeout
    const loadResources = () => {
      // 預載入下一個可能訪問的頁面
      const bookLinks = document.querySelectorAll('a[href*="bookshelf/"]');
      if (bookLinks.length > 0) {
        const nextPage = bookLinks[0].href;
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = nextPage;
        document.head.appendChild(link);
      }

      // 優化圖片載入
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        if (!img.loading) {
          img.loading = 'lazy';
        }
      });
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadResources);
    } else {
      setTimeout(loadResources, 100);
    }
  }

  // 性能監控（輕量級）
  function setupLightweightMonitoring() {
    // 監控 LCP
    if ('PerformanceObserver' in window) {
      try {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('LCP:', lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // 靜默處理錯誤
      }
    }
  }

  // 初始化
  function init() {
    // 立即執行關鍵路徑優化
    optimizeCriticalPath();
    
    // 延遲載入非關鍵資源
    loadNonCriticalResources();
    
    // 設置輕量級監控
    setupLightweightMonitoring();
  }

  // 根據頁面載入狀態初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
