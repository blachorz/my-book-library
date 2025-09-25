// Performance optimization utilities
(function() {
  'use strict';

  // Load non-critical CSS asynchronously
  function loadCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = 'print';
    link.onload = function() {
      this.media = 'all';
    };
    document.head.appendChild(link);
  }

  // Preload critical resources
  function preloadCriticalResources() {
    // Preload next page resources
    const bookLinks = document.querySelectorAll('a[href*="bookshelf/"]');
    if (bookLinks.length > 0) {
      const nextPage = bookLinks[0].href;
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = nextPage;
      document.head.appendChild(link);
    }
  }

  // Optimize images
  function optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.loading) {
        img.loading = 'lazy';
      }
    });
  }

  // Initialize performance optimizations
  function init() {
    // Load non-critical CSS after page load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        loadCSS('/src/css/style.css');
        preloadCriticalResources();
        optimizeImages();
      });
    } else {
      loadCSS('/src/css/style.css');
      preloadCriticalResources();
      optimizeImages();
    }
  }

  // Start optimizations
  init();

  // Service Worker for caching (if supported)
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js')
        .then(function(registration) {
          console.log('SW registered: ', registration);
        })
        .catch(function(registrationError) {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
})();
