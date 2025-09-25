# 效能測試管理指南

## 📋 測試檔案概覽

本專案包含三個效能測試相關檔案：

### 1. 測試工具檔案
- **`test-performance.html`** (13.2KB) - 瀏覽器端互動式效能測試工具
- **`performance-test-report.json`** (2.9KB) - 基本效能測試報告
- **`advanced-performance-test-report.json`** (2.9KB) - 進階效能測試報告

### 2. 測試腳本
- **`scripts/test-performance.js`** - 基本效能測試腳本
- **`scripts/advanced-performance-test.js`** - 進階效能測試腳本
- **`scripts/cleanup-test-files.js`** - 測試檔案管理腳本

## 🚀 使用方法

### 執行效能測試

```bash
# 執行所有效能測試
npm run test:all

# 執行基本效能測試
npm run test:performance

# 執行進階效能測試
npm run test:advanced
```

### 測試檔案管理

```bash
# 檢查測試檔案狀態
node scripts/cleanup-test-files.js status

# 備份測試檔案
node scripts/cleanup-test-files.js backup

# 清理測試檔案（生產部署前）
npm run cleanup:test

# 恢復測試檔案（開發時）
npm run restore:test
```

### 生產部署

```bash
# 生產建置（自動清理測試檔案）
npm run build:prod
```

## 📊 測試結果解讀

### 基本效能測試 (18 項)
- **關鍵資源載入** (4/4 通過)
- **檔案結構** (4/4 通過)
- **CSS 優化** (3/3 通過)
- **Service Worker** (3/3 通過)
- **效能腳本** (4/4 通過)

### 進階效能測試 (13 項)
- **字體載入優化** (5/5 通過)
- **關鍵路徑優化** (4/4 通過)
- **網路依賴優化** (4/4 通過)

### 效能指標
- **成功率**: 100%
- **高影響測試**: 10/10 通過
- **預期效能提升**: 2,000+ 毫秒

## 🔧 開發工作流程

### 日常開發
1. 保留所有測試檔案
2. 使用 `npm run test:all` 定期檢查效能
3. 使用 `test-performance.html` 進行即時監控

### 生產部署
1. 使用 `npm run build:prod` 自動清理測試檔案
2. 測試檔案會備份到 `test-backups/` 目錄
3. 生產環境保持整潔

### 問題除錯
1. 使用 `npm run restore:test` 恢復測試檔案
2. 使用 `test-performance.html` 進行詳細分析
3. 查看測試報告了解具體問題

## 📁 檔案結構

```
projectNotes/my-book-library/
├── test-performance.html              # 瀏覽器測試工具
├── performance-test-report.json       # 基本測試報告
├── advanced-performance-test-report.json # 進階測試報告
├── test-backups/                      # 測試檔案備份目錄
├── scripts/
│   ├── test-performance.js           # 基本測試腳本
│   ├── advanced-performance-test.js   # 進階測試腳本
│   └── cleanup-test-files.js         # 清理腳本
└── docs/
    └── PERFORMANCE_TESTING.md         # 本說明文件
```

## ⚠️ 注意事項

1. **版本控制**: 測試檔案已加入 `.gitignore`，不會提交到 Git
2. **備份機制**: 清理前會自動備份，可隨時恢復
3. **生產環境**: 部署前務必清理測試檔案
4. **效能監控**: 定期執行測試以確保效能維持

## 🎯 最佳實踐

1. **開發階段**: 保留所有測試檔案，便於除錯
2. **部署前**: 執行 `npm run build:prod` 自動清理
3. **問題排查**: 使用 `npm run restore:test` 恢復測試工具
4. **定期檢查**: 使用 `npm run test:all` 監控效能狀態

---

*最後更新: 2025-09-25*
