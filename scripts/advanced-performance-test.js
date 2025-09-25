#!/usr/bin/env node

/**
 * 進階效能測試腳本
 * 針對字體載入和網路依賴樹狀結構進行深度測試
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AdvancedPerformanceTester {
    constructor() {
        this.results = {
            timestamp: new Date().toISOString(),
            tests: [],
            summary: {},
            recommendations: []
        };
    }

    // 測試字體載入優化
    testFontOptimization() {
        console.log('🔍 測試字體載入優化...');
        
        const indexPath = path.join(__dirname, '../index.html');
        const indexContent = fs.readFileSync(indexPath, 'utf8');
        
        const tests = [
            {
                name: '字體預載入策略',
                check: indexContent.includes('rel="preload"') && indexContent.includes('font/woff2'),
                expected: true,
                impact: 'high'
            },
            {
                name: '字體權重減少',
                check: indexContent.includes('wght@400;700') && !indexContent.includes('wght@400;500;700'),
                expected: true,
                impact: 'high'
            },
            {
                name: '字體子集化',
                check: indexContent.includes('&text=') && indexContent.includes('Readpiration'),
                expected: true,
                impact: 'high'
            },
            {
                name: '字體降級策略',
                check: indexContent.includes('PingFang TC') && indexContent.includes('Microsoft JhengHei'),
                expected: true,
                impact: 'medium'
            },
            {
                name: '字體載入優化 CSS',
                check: fs.existsSync(path.join(__dirname, '../src/css/font-optimization.css')),
                expected: true,
                impact: 'high'
            }
        ];

        tests.forEach(test => {
            const result = test.check === test.expected;
            const status = result ? '✅' : '❌';
            const impact = test.impact === 'high' ? '🔥' : test.impact === 'medium' ? '⚡' : '💡';
            console.log(`  ${status} ${impact} ${test.name}: ${result ? '通過' : '失敗'}`);
            this.results.tests.push({
                category: 'font-optimization',
                name: test.name,
                passed: result,
                expected: test.expected,
                actual: test.check,
                impact: test.impact
            });
        });
    }

    // 測試關鍵路徑優化
    testCriticalPathOptimization() {
        console.log('🔍 測試關鍵路徑優化...');
        
        const tests = [
            {
                name: 'CSS 載入策略',
                check: this.checkCSSLoadingStrategy(),
                expected: true,
                impact: 'high'
            },
            {
                name: '資源預載入',
                check: this.checkResourcePreloading(),
                expected: true,
                impact: 'high'
            },
            {
                name: '非阻塞腳本載入',
                check: this.checkNonBlockingScripts(),
                expected: true,
                impact: 'medium'
            },
            {
                name: 'Service Worker 快取',
                check: this.checkServiceWorkerCache(),
                expected: true,
                impact: 'high'
            }
        ];

        tests.forEach(test => {
            const result = test.check === test.expected;
            const status = result ? '✅' : '❌';
            const impact = test.impact === 'high' ? '🔥' : test.impact === 'medium' ? '⚡' : '💡';
            console.log(`  ${status} ${impact} ${test.name}: ${result ? '通過' : '失敗'}`);
            this.results.tests.push({
                category: 'critical-path',
                name: test.name,
                passed: result,
                expected: test.expected,
                actual: test.check,
                impact: test.impact
            });
        });
    }

    // 檢查 CSS 載入策略
    checkCSSLoadingStrategy() {
        const indexPath = path.join(__dirname, '../index.html');
        const indexContent = fs.readFileSync(indexPath, 'utf8');
        
        return indexContent.includes('critical.css') && 
               indexContent.includes('preload') && 
               indexContent.includes('onload');
    }

    // 檢查資源預載入
    checkResourcePreloading() {
        const indexPath = path.join(__dirname, '../index.html');
        const indexContent = fs.readFileSync(indexPath, 'utf8');
        
        return indexContent.includes('preconnect') && 
               indexContent.includes('preload') &&
               indexContent.includes('fonts.googleapis.com');
    }

    // 檢查非阻塞腳本載入
    checkNonBlockingScripts() {
        const indexPath = path.join(__dirname, '../index.html');
        const indexContent = fs.readFileSync(indexPath, 'utf8');
        
        return indexContent.includes('advanced-performance.js') &&
               !indexContent.includes('async') && // 應該使用 defer 或正常載入
               indexContent.includes('performance.js');
    }

    // 檢查 Service Worker 快取
    checkServiceWorkerCache() {
        const swPath = path.join(__dirname, '../sw.js');
        if (!fs.existsSync(swPath)) return false;
        
        const swContent = fs.readFileSync(swPath, 'utf8');
        return swContent.includes('CACHE_NAME') && 
               swContent.includes('urlsToCache') &&
               swContent.includes('addEventListener');
    }

    // 測試網路依賴優化
    testNetworkDependencyOptimization() {
        console.log('🔍 測試網路依賴優化...');
        
        const tests = [
            {
                name: '字體檔案數量優化',
                check: this.checkFontFileReduction(),
                expected: true,
                impact: 'high'
            },
            {
                name: '字體大小優化',
                check: this.checkFontSizeOptimization(),
                expected: true,
                impact: 'high'
            },
            {
                name: '字體載入順序優化',
                check: this.checkFontLoadingOrder(),
                expected: true,
                impact: 'medium'
            },
            {
                name: '字體快取策略',
                check: this.checkFontCaching(),
                expected: true,
                impact: 'high'
            }
        ];

        tests.forEach(test => {
            const result = test.check === test.expected;
            const status = result ? '✅' : '❌';
            const impact = test.impact === 'high' ? '🔥' : test.impact === 'medium' ? '⚡' : '💡';
            console.log(`  ${status} ${impact} ${test.name}: ${result ? '通過' : '失敗'}`);
            this.results.tests.push({
                category: 'network-dependency',
                name: test.name,
                passed: result,
                expected: test.expected,
                actual: test.check,
                impact: test.impact
            });
        });
    }

    // 檢查字體檔案數量減少
    checkFontFileReduction() {
        const indexPath = path.join(__dirname, '../index.html');
        const indexContent = fs.readFileSync(indexPath, 'utf8');
        
        // 檢查是否只載入必要的字體權重
        const fontWeights = indexContent.match(/wght@([^&]+)/);
        if (!fontWeights) return false;
        
        const weights = fontWeights[1].split(';');
        return weights.length <= 2; // 只載入 400 和 700
    }

    // 檢查字體大小優化
    checkFontSizeOptimization() {
        const indexPath = path.join(__dirname, '../index.html');
        const indexContent = fs.readFileSync(indexPath, 'utf8');
        
        // 檢查是否使用字體子集化
        return indexContent.includes('&text=') && 
               indexContent.includes('Readpiration');
    }

    // 檢查字體載入順序
    checkFontLoadingOrder() {
        const indexPath = path.join(__dirname, '../index.html');
        const indexContent = fs.readFileSync(indexPath, 'utf8');
        
        // 檢查是否先預載入關鍵字體
        const preloadIndex = indexContent.indexOf('rel="preload"');
        const stylesheetIndex = indexContent.indexOf('rel="stylesheet"');
        
        return preloadIndex < stylesheetIndex;
    }

    // 檢查字體快取策略
    checkFontCaching() {
        const swPath = path.join(__dirname, '../sw.js');
        if (!fs.existsSync(swPath)) return false;
        
        const swContent = fs.readFileSync(swPath, 'utf8');
        return swContent.includes('fonts.googleapis.com') || 
               swContent.includes('fonts.gstatic.com');
    }

    // 生成優化建議
    generateRecommendations() {
        console.log('💡 生成優化建議...');
        
        const failedTests = this.results.tests.filter(test => !test.passed);
        const highImpactTests = this.results.tests.filter(test => test.impact === 'high' && !test.passed);
        
        if (highImpactTests.length > 0) {
            this.results.recommendations.push({
                priority: 'high',
                message: '發現高影響效能問題，建議立即修復',
                tests: highImpactTests.map(test => test.name)
            });
        }
        
        if (failedTests.length > 0) {
            this.results.recommendations.push({
                priority: 'medium',
                message: '部分優化未完成，建議進一步改善',
                tests: failedTests.map(test => test.name)
            });
        }
        
        // 基於測試結果的具體建議
        this.results.recommendations.push({
            priority: 'low',
            message: '考慮使用 CDN 加速字體載入',
            tests: ['字體 CDN 優化']
        });
        
        this.results.recommendations.push({
            priority: 'low',
            message: '考慮實作字體壓縮和子集化',
            tests: ['字體壓縮優化']
        });
    }

    // 生成測試報告
    generateReport() {
        console.log('\n📊 生成進階效能測試報告...');
        
        const totalTests = this.results.tests.length;
        const passedTests = this.results.tests.filter(test => test.passed).length;
        const failedTests = totalTests - passedTests;
        
        // 按影響程度分類
        const highImpactTests = this.results.tests.filter(test => test.impact === 'high');
        const highImpactPassed = highImpactTests.filter(test => test.passed).length;
        
        this.results.summary = {
            total: totalTests,
            passed: passedTests,
            failed: failedTests,
            successRate: ((passedTests / totalTests) * 100).toFixed(2) + '%',
            highImpactTests: highImpactTests.length,
            highImpactPassed: highImpactPassed,
            highImpactSuccessRate: ((highImpactPassed / highImpactTests.length) * 100).toFixed(2) + '%'
        };

        console.log(`\n📈 進階測試結果摘要:`);
        console.log(`  總測試數: ${totalTests}`);
        console.log(`  通過: ${passedTests} ✅`);
        console.log(`  失敗: ${failedTests} ❌`);
        console.log(`  成功率: ${this.results.summary.successRate}`);
        console.log(`\n🔥 高影響測試:`);
        console.log(`  總數: ${highImpactTests.length}`);
        console.log(`  通過: ${highImpactPassed} ✅`);
        console.log(`  成功率: ${this.results.summary.highImpactSuccessRate}`);

        // 按類別分組結果
        const categories = {};
        this.results.tests.forEach(test => {
            if (!categories[test.category]) {
                categories[test.category] = { passed: 0, total: 0, highImpact: 0 };
            }
            categories[test.category].total++;
            if (test.passed) categories[test.category].passed++;
            if (test.impact === 'high') categories[test.category].highImpact++;
        });

        console.log(`\n📋 各類別測試結果:`);
        Object.keys(categories).forEach(category => {
            const { passed, total, highImpact } = categories[category];
            const rate = ((passed / total) * 100).toFixed(1);
            console.log(`  ${category}: ${passed}/${total} (${rate}%) - 高影響: ${highImpact}`);
        });

        // 顯示建議
        if (this.results.recommendations.length > 0) {
            console.log(`\n💡 優化建議:`);
            this.results.recommendations.forEach(rec => {
                const priority = rec.priority === 'high' ? '🔥' : rec.priority === 'medium' ? '⚡' : '💡';
                console.log(`  ${priority} ${rec.message}`);
            });
        }

        // 保存詳細報告
        const reportPath = path.join(__dirname, '../advanced-performance-test-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
        console.log(`\n💾 詳細報告已保存至: ${reportPath}`);

        return this.results;
    }

    // 執行所有測試
    async runAllTests() {
        console.log('🚀 開始執行 Readpiration 進階效能測試...\n');
        
        try {
            this.testFontOptimization();
            console.log('');
            this.testCriticalPathOptimization();
            console.log('');
            this.testNetworkDependencyOptimization();
            console.log('');
            this.generateRecommendations();
            console.log('');
            
            const results = this.generateReport();
            
            if (results.summary.failed === 0) {
                console.log('\n🎉 所有進階測試通過！您的網站效能優化已達到最佳狀態。');
            } else if (results.summary.highImpactPassed === results.summary.highImpactTests) {
                console.log('\n✅ 高影響測試全部通過！網站效能已顯著改善。');
            } else {
                console.log('\n⚠️  部分高影響測試失敗，建議優先修復這些問題。');
            }
            
            return results;
            
        } catch (error) {
            console.error('❌ 進階測試執行失敗:', error.message);
            throw error;
        }
    }
}

// 執行進階測試
const tester = new AdvancedPerformanceTester();
tester.runAllTests().catch(console.error);

export default AdvancedPerformanceTester;
