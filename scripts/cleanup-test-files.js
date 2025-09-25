#!/usr/bin/env node

/**
 * 測試檔案清理腳本
 * 用於在生產部署前清理測試檔案
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class TestFileCleanup {
    constructor() {
        this.testFiles = [
            'test-performance.html',
            'performance-test-report.json',
            'advanced-performance-test-report.json'
        ];
        this.backupDir = path.join(__dirname, '../test-backups');
    }

    // 備份測試檔案
    backupTestFiles() {
        console.log('📦 備份測試檔案...');
        
        // 建立備份目錄
        if (!fs.existsSync(this.backupDir)) {
            fs.mkdirSync(this.backupDir, { recursive: true });
        }

        this.testFiles.forEach(file => {
            const sourcePath = path.join(__dirname, '..', file);
            const backupPath = path.join(this.backupDir, file);
            
            if (fs.existsSync(sourcePath)) {
                fs.copyFileSync(sourcePath, backupPath);
                console.log(`  ✅ 已備份: ${file}`);
            }
        });
    }

    // 清理測試檔案
    cleanupTestFiles() {
        console.log('🧹 清理測試檔案...');
        
        this.testFiles.forEach(file => {
            const filePath = path.join(__dirname, '..', file);
            
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log(`  ✅ 已刪除: ${file}`);
            } else {
                console.log(`  ⚠️  檔案不存在: ${file}`);
            }
        });
    }

    // 恢復測試檔案
    restoreTestFiles() {
        console.log('🔄 恢復測試檔案...');
        
        this.testFiles.forEach(file => {
            const backupPath = path.join(this.backupDir, file);
            const targetPath = path.join(__dirname, '..', file);
            
            if (fs.existsSync(backupPath)) {
                fs.copyFileSync(backupPath, targetPath);
                console.log(`  ✅ 已恢復: ${file}`);
            } else {
                console.log(`  ⚠️  備份不存在: ${file}`);
            }
        });
    }

    // 檢查檔案狀態
    checkFileStatus() {
        console.log('📋 檢查檔案狀態...');
        
        this.testFiles.forEach(file => {
            const filePath = path.join(__dirname, '..', file);
            const exists = fs.existsSync(filePath);
            const size = exists ? fs.statSync(filePath).size : 0;
            
            console.log(`  ${exists ? '✅' : '❌'} ${file}: ${exists ? `${(size/1024).toFixed(1)}KB` : '不存在'}`);
        });
    }

    // 執行清理
    run(action = 'cleanup') {
        console.log(`🚀 開始執行測試檔案${action}...\n`);
        
        switch (action) {
            case 'backup':
                this.backupTestFiles();
                break;
            case 'cleanup':
                this.backupTestFiles();
                this.cleanupTestFiles();
                break;
            case 'restore':
                this.restoreTestFiles();
                break;
            case 'status':
                this.checkFileStatus();
                break;
            default:
                console.log('❌ 無效的操作，請使用: backup, cleanup, restore, status');
                return;
        }
        
        console.log(`\n✅ ${action} 完成！`);
    }
}

// 執行清理腳本
const cleanup = new TestFileCleanup();
const action = process.argv[2] || 'cleanup';
cleanup.run(action);

export default TestFileCleanup;
