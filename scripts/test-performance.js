#!/usr/bin/env node

/**
 * 效能測試自動化腳本
 * 用於測試 Readpiration 網站的效能優化效果
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class PerformanceTestRunner {
    constructor() {
        this.results = {
            timestamp: new Date().toISOString(),
            tests: [],
            summary: {}
        };
    }

    // 測試 1: 檢查關鍵資源載入
    testCriticalResources() {
        console.log('🔍 測試 1: 檢查關鍵資源載入...');
        
        const indexPath = path.join(__dirname, '../index.html');
        const indexContent = fs.readFileSync(indexPath, 'utf8');
        
        const tests = [
            {
                name: '字體預載入',
                check: indexContent.includes('rel="preload"') && indexContent.includes('fonts.googleapis.com'),
                expected: true
            },
            {
                name: '關鍵 CSS 載入',
                check: indexContent.includes('critical.css'),
                expected: true
            },
            {
                name: '非阻塞 CSS 載入',
                check: indexContent.includes('onload="this.onload=null;this.rel=\'stylesheet\'"'),
                expected: true
            },
            {
                name: '效能腳本載入',
                check: indexContent.includes('performance.js'),
                expected: true
            }
        ];

        tests.forEach(test => {
            const result = test.check === test.expected;
            console.log(`  ${result ? '✅' : '❌'} ${test.name}: ${result ? '通過' : '失敗'}`);
            this.results.tests.push({
                category: 'critical-resources',
                name: test.name,
                passed: result,
                expected: test.expected,
                actual: test.check
            });
        });
    }

    // 測試 2: 檢查檔案結構
    testFileStructure() {
        console.log('🔍 測試 2: 檢查檔案結構...');
        
        const requiredFiles = [
            'src/css/critical.css',
            'src/css/style.css',
            'src/js/performance.js',
            'sw.js'
        ];

        requiredFiles.forEach(file => {
            const filePath = path.join(__dirname, '..', file);
            const exists = fs.existsSync(filePath);
            console.log(`  ${exists ? '✅' : '❌'} ${file}: ${exists ? '存在' : '不存在'}`);
            this.results.tests.push({
                category: 'file-structure',
                name: file,
                passed: exists,
                expected: true,
                actual: exists
            });
        });
    }

    // 測試 3: 檢查 CSS 優化
    testCSSOptimization() {
        console.log('🔍 測試 3: 檢查 CSS 優化...');
        
        const criticalCSSPath = path.join(__dirname, '../src/css/critical.css');
        const criticalCSS = fs.readFileSync(criticalCSSPath, 'utf8');
        
        const tests = [
            {
                name: '關鍵 CSS 包含基礎樣式',
                check: criticalCSS.includes('body {') && criticalCSS.includes('font-family'),
                expected: true
            },
            {
                name: '關鍵 CSS 包含容器樣式',
                check: criticalCSS.includes('.container'),
                expected: true
            },
            {
                name: '關鍵 CSS 包含響應式設計',
                check: criticalCSS.includes('@media'),
                expected: true
            }
        ];

        tests.forEach(test => {
            const result = test.check === test.expected;
            console.log(`  ${result ? '✅' : '❌'} ${test.name}: ${result ? '通過' : '失敗'}`);
            this.results.tests.push({
                category: 'css-optimization',
                name: test.name,
                passed: result,
                expected: test.expected,
                actual: test.check
            });
        });
    }

    // 測試 4: 檢查 Service Worker
    testServiceWorker() {
        console.log('🔍 測試 4: 檢查 Service Worker...');
        
        const swPath = path.join(__dirname, '../sw.js');
        const swContent = fs.readFileSync(swPath, 'utf8');
        
        const tests = [
            {
                name: 'Service Worker 存在',
                check: fs.existsSync(swPath),
                expected: true
            },
            {
                name: '包含快取策略',
                check: swContent.includes('CACHE_NAME') && swContent.includes('urlsToCache'),
                expected: true
            },
            {
                name: '包含快取事件處理',
                check: swContent.includes('addEventListener') && swContent.includes('fetch'),
                expected: true
            }
        ];

        tests.forEach(test => {
            const result = test.check === test.expected;
            console.log(`  ${result ? '✅' : '❌'} ${test.name}: ${result ? '通過' : '失敗'}`);
            this.results.tests.push({
                category: 'service-worker',
                name: test.name,
                passed: result,
                expected: test.expected,
                actual: test.check
            });
        });
    }

    // 測試 5: 檢查效能腳本
    testPerformanceScript() {
        console.log('🔍 測試 5: 檢查效能腳本...');
        
        const perfScriptPath = path.join(__dirname, '../src/js/performance.js');
        const perfScript = fs.readFileSync(perfScriptPath, 'utf8');
        
        const tests = [
            {
                name: '效能腳本存在',
                check: fs.existsSync(perfScriptPath),
                expected: true
            },
            {
                name: '包含 CSS 載入優化',
                check: perfScript.includes('loadCSS') && perfScript.includes('stylesheet'),
                expected: true
            },
            {
                name: '包含圖片優化',
                check: perfScript.includes('loading') && perfScript.includes('lazy'),
                expected: true
            },
            {
                name: '包含 Service Worker 註冊',
                check: perfScript.includes('serviceWorker') && perfScript.includes('register'),
                expected: true
            }
        ];

        tests.forEach(test => {
            const result = test.check === test.expected;
            console.log(`  ${result ? '✅' : '❌'} ${test.name}: ${result ? '通過' : '失敗'}`);
            this.results.tests.push({
                category: 'performance-script',
                name: test.name,
                passed: result,
                expected: test.expected,
                actual: test.check
            });
        });
    }

    // 生成測試報告
    generateReport() {
        console.log('\n📊 生成測試報告...');
        
        const totalTests = this.results.tests.length;
        const passedTests = this.results.tests.filter(test => test.passed).length;
        const failedTests = totalTests - passedTests;
        
        this.results.summary = {
            total: totalTests,
            passed: passedTests,
            failed: failedTests,
            successRate: ((passedTests / totalTests) * 100).toFixed(2) + '%'
        };

        console.log(`\n📈 測試結果摘要:`);
        console.log(`  總測試數: ${totalTests}`);
        console.log(`  通過: ${passedTests} ✅`);
        console.log(`  失敗: ${failedTests} ❌`);
        console.log(`  成功率: ${this.results.summary.successRate}`);

        // 按類別分組結果
        const categories = {};
        this.results.tests.forEach(test => {
            if (!categories[test.category]) {
                categories[test.category] = { passed: 0, total: 0 };
            }
            categories[test.category].total++;
            if (test.passed) categories[test.category].passed++;
        });

        console.log(`\n📋 各類別測試結果:`);
        Object.keys(categories).forEach(category => {
            const { passed, total } = categories[category];
            const rate = ((passed / total) * 100).toFixed(1);
            console.log(`  ${category}: ${passed}/${total} (${rate}%)`);
        });

        // 保存詳細報告
        const reportPath = path.join(__dirname, '../performance-test-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
        console.log(`\n💾 詳細報告已保存至: ${reportPath}`);

        return this.results;
    }

    // 執行所有測試
    async runAllTests() {
        console.log('🚀 開始執行 Readpiration 效能測試...\n');
        
        try {
            this.testCriticalResources();
            console.log('');
            this.testFileStructure();
            console.log('');
            this.testCSSOptimization();
            console.log('');
            this.testServiceWorker();
            console.log('');
            this.testPerformanceScript();
            console.log('');
            
            const results = this.generateReport();
            
            if (results.summary.failed === 0) {
                console.log('\n🎉 所有測試通過！您的網站效能優化配置正確。');
            } else {
                console.log('\n⚠️  部分測試失敗，請檢查上述失敗項目。');
            }
            
            return results;
            
        } catch (error) {
            console.error('❌ 測試執行失敗:', error.message);
            throw error;
        }
    }
}

// 如果直接執行此腳本
const tester = new PerformanceTestRunner();
tester.runAllTests().catch(console.error);

export default PerformanceTestRunner;
