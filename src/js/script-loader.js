// 進階腳本載入優化器
(function() {
  'use strict';

  class ScriptLoader {
    constructor() {
      this.loadedScripts = new Set();
      this.loadingScripts = new Set();
      this.scriptQueue = [];
      this.isInitialized = false;
    }

    // 初始化腳本載入器
    init() {
      if (this.isInitialized) return;
      this.isInitialized = true;
      
      // 監聽頁面載入狀態
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.processQueue());
      } else {
        this.processQueue();
      }
    }

    // 載入單個腳本
    loadScript(src, options = {}) {
      return new Promise((resolve, reject) => {
        // 檢查是否已經載入
        if (this.loadedScripts.has(src)) {
          resolve();
          return;
        }

        // 檢查是否正在載入
        if (this.loadingScripts.has(src)) {
          // 等待載入完成
          const checkLoaded = setInterval(() => {
            if (this.loadedScripts.has(src)) {
              clearInterval(checkLoaded);
              resolve();
            }
          }, 50);
          return;
        }

        this.loadingScripts.add(src);

        const script = document.createElement('script');
        script.src = src;
        script.async = options.async !== false;
        script.defer = options.defer || false;
        
        // 設置載入成功回調
        script.onload = () => {
          this.loadedScripts.add(src);
          this.loadingScripts.delete(src);
          resolve();
        };

        // 設置載入失敗回調
        script.onerror = () => {
          this.loadingScripts.delete(src);
          console.warn(`腳本載入失敗: ${src}`);
          if (options.required !== false) {
            reject(new Error(`Required script failed to load: ${src}`));
          } else {
            resolve(); // 非必要腳本失敗時繼續
          }
        };

        // 添加到頁面
        document.head.appendChild(script);
      });
    }

    // 依序載入腳本
    loadScriptsSequentially(scripts, options = {}) {
      return scripts.reduce((promise, script) => {
        return promise.then(() => {
          if (typeof script === 'string') {
            return this.loadScript(script, options);
          } else if (typeof script === 'object') {
            return this.loadScript(script.src, script.options || options);
          }
        });
      }, Promise.resolve());
    }

    // 並行載入腳本
    loadScriptsParallel(scripts, options = {}) {
      const promises = scripts.map(script => {
        if (typeof script === 'string') {
          return this.loadScript(script, options);
        } else if (typeof script === 'object') {
          return this.loadScript(script.src, script.options || options);
        }
      });
      return Promise.all(promises);
    }

    // 載入關鍵腳本
    loadCriticalScripts() {
      const criticalScripts = [
        '/src/js/performance.js',
        '/src/js/advanced-performance.js'
      ];

      return this.loadScriptsSequentially(criticalScripts, {
        async: true,
        required: true
      });
    }

    // 載入非關鍵腳本
    loadNonCriticalScripts() {
      const nonCriticalScripts = [
        '/src/ts/main.ts'
      ];

      return this.loadScriptsParallel(nonCriticalScripts, {
        async: true,
        required: false
      });
    }

    // 處理腳本載入佇列
    async processQueue() {
      try {
        // 載入關鍵腳本
        await this.loadCriticalScripts();
        console.log('關鍵腳本載入完成');

        // 載入非關鍵腳本
        await this.loadNonCriticalScripts();
        console.log('所有腳本載入完成');

        // 觸發自定義事件
        document.dispatchEvent(new CustomEvent('scriptsLoaded', {
          detail: {
            loadedScripts: Array.from(this.loadedScripts),
            timestamp: Date.now()
          }
        }));

      } catch (error) {
        console.error('腳本載入過程中發生錯誤:', error);
      }
    }

    // 預載入腳本
    preloadScript(src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = src;
      link.as = 'script';
      document.head.appendChild(link);
    }

    // 檢查腳本是否已載入
    isScriptLoaded(src) {
      return this.loadedScripts.has(src);
    }

    // 獲取載入統計
    getLoadingStats() {
      return {
        loaded: Array.from(this.loadedScripts),
        loading: Array.from(this.loadingScripts),
        totalLoaded: this.loadedScripts.size,
        totalLoading: this.loadingScripts.size
      };
    }
  }

  // 建立全域腳本載入器實例
  window.scriptLoader = new ScriptLoader();
  
  // 初始化腳本載入器
  window.scriptLoader.init();

  // 導出供其他腳本使用
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScriptLoader;
  }

})();
