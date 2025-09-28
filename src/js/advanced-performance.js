// 進階效能優化腳本
(function() {
  'use strict';

  // 字體載入優化
  class FontOptimizer {
    constructor() {
      this.fontsLoaded = false;
      this.loadingTimeout = 3000; // 3秒超時
      this.init();
    }

    init() {
      this.preloadCriticalFonts();
      this.optimizeFontLoading();
      this.setupFontFallback();
    }

    // 預載入關鍵字體
    preloadCriticalFonts() {
      const criticalFonts = [
        'https://fonts.gstatic.com/s/notosanstc/v38/-nF7OG829....110.woff2',
        'https://fonts.gstatic.com/s/notosanstc/v38/-nF7OG829....111.woff2'
      ];

      criticalFonts.forEach(fontUrl => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = fontUrl;
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
    }

    // 優化字體載入
    optimizeFontLoading() {
      // 使用 FontFace API 進行更精確的字體載入控制
      if ('fonts' in document) {
        const font400 = new FontFace('Noto Sans TC', 'url(https://fonts.gstatic.com/s/notosanstc/v38/-nF7OG829....110.woff2)');
        const font700 = new FontFace('Noto Sans TC', 'url(https://fonts.gstatic.com/s/notosanstc/v38/-nF7OG829....111.woff2)');

        Promise.all([font400.load(), font700.load()])
          .then(() => {
            document.fonts.add(font400);
            document.fonts.add(font700);
            this.onFontsLoaded();
          })
          .catch(() => {
            this.onFontsFailed();
          });

        // 設置超時機制
        setTimeout(() => {
          if (!this.fontsLoaded) {
            this.onFontsTimeout();
          }
        }, this.loadingTimeout);
      } else {
        // 降級到傳統載入方式
        this.loadFontsTraditional();
      }
    }

    // 傳統字體載入方式
    loadFontsTraditional() {
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=swap';
      link.rel = 'stylesheet';
      link.onload = () => this.onFontsLoaded();
      link.onerror = () => this.onFontsFailed();
      document.head.appendChild(link);
    }

    // 字體載入成功
    onFontsLoaded() {
      this.fontsLoaded = true;
      document.documentElement.classList.add('fonts-loaded');
      this.optimizeFontRendering();
    }

    // 字體載入失敗
    onFontsFailed() {
      console.warn('字體載入失敗，使用系統字體');
      document.documentElement.classList.add('fonts-failed');
    }

    // 字體載入超時
    onFontsTimeout() {
      console.warn('字體載入超時，使用系統字體');
      document.documentElement.classList.add('fonts-timeout');
    }

    // 優化字體渲染
    optimizeFontRendering() {
      // 啟用字體平滑
      document.body.style.fontSmoothing = 'antialiased';
      document.body.style.webkitFontSmoothing = 'antialiased';
      document.body.style.mozOsxFontSmoothing = 'grayscale';
    }

    // 設置字體降級策略
    setupFontFallback() {
      const style = document.createElement('style');
      style.textContent = `
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang TC', 'Microsoft JhengHei', sans-serif;
        }
        .fonts-loaded body {
          font-family: 'Noto Sans TC', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang TC', 'Microsoft JhengHei', sans-serif;
        }
      `;
      document.head.appendChild(style);
    }
  }

  // 資源載入優化
  class ResourceOptimizer {
    constructor() {
      this.init();
    }

    init() {
      this.optimizeCSSLoading();
      this.optimizeImageLoading();
      this.setupResourceHints();
    }

    // 優化 CSS 載入
    optimizeCSSLoading() {
      // 延遲載入非關鍵 CSS
      const nonCriticalCSS = [
        '/src/css/style.css'
      ];

      nonCriticalCSS.forEach(cssUrl => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = cssUrl;
        link.as = 'style';
        link.onload = function() {
          this.rel = 'stylesheet';
        };
        document.head.appendChild(link);
      });
    }

    // 優化圖片載入
    optimizeImageLoading() {
      // 為所有圖片添加懶載入
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        if (!img.loading) {
          img.loading = 'lazy';
        }
        // 添加載入錯誤處理
        img.onerror = function() {
          this.style.display = 'none';
        };
      });
    }

    // 設置資源提示
    setupResourceHints() {
      // 預連接到關鍵域名
      const domains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com'
      ];

      domains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
    }
  }

  // 效能監控
  class PerformanceMonitor {
    constructor() {
      this.metrics = {};
      this.init();
    }

    init() {
      this.measurePageLoad();
      this.measureFontLoading();
      this.measureResourceLoading();
      this.setupWebVitals();
    }

    // 測量頁面載入時間
    measurePageLoad() {
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0];
        this.metrics.pageLoad = {
          loadTime: navigation.loadEventEnd - navigation.loadEventStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          firstByte: navigation.responseStart - navigation.requestStart
        };
        console.log('頁面載入指標:', this.metrics.pageLoad);
      });
    }

    // 測量字體載入時間
    measureFontLoading() {
      if ('fonts' in document) {
        document.fonts.ready.then(() => {
          const fontEntries = performance.getEntriesByType('resource')
            .filter(entry => entry.name.includes('fonts.gstatic.com'));
          
          this.metrics.fontLoading = {
            count: fontEntries.length,
            totalTime: fontEntries.reduce((sum, entry) => sum + entry.duration, 0),
            averageTime: fontEntries.reduce((sum, entry) => sum + entry.duration, 0) / fontEntries.length
          };
          console.log('字體載入指標:', this.metrics.fontLoading);
        });
      }
    }

    // 測量資源載入時間
    measureResourceLoading() {
      const resources = performance.getEntriesByType('resource');
      this.metrics.resourceLoading = {
        total: resources.length,
        css: resources.filter(r => r.name.includes('.css')).length,
        fonts: resources.filter(r => r.name.includes('fonts.gstatic.com')).length,
        totalSize: resources.reduce((sum, r) => sum + (r.transferSize || 0), 0)
      };
      console.log('資源載入指標:', this.metrics.resourceLoading);
    }

    // 設置 Web Vitals 監控
    setupWebVitals() {
      // 監控 LCP
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.lcp = lastEntry.startTime;
        console.log('LCP:', this.metrics.lcp);
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // 監控 CLS
      let clsValue = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        this.metrics.cls = clsValue;
        console.log('CLS:', this.metrics.cls);
      }).observe({ entryTypes: ['layout-shift'] });
    }
  }

  // 初始化所有優化器 - 優化手機性能
  document.addEventListener('DOMContentLoaded', function() {
    // 延遲初始化非關鍵優化器，優先處理關鍵渲染路徑
    new FontOptimizer();
    
    // 使用 requestIdleCallback 延遲非關鍵優化
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        new ResourceOptimizer();
        new PerformanceMonitor();
      });
    } else {
      // 降級到 setTimeout
      setTimeout(() => {
        new ResourceOptimizer();
        new PerformanceMonitor();
      }, 100);
    }
  });

})();
