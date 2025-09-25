# 🚀 效能測試快速參考

## 常用命令

```bash
# 執行所有測試
npm run test:all

# 清理測試檔案
npm run cleanup:test

# 恢復測試檔案
npm run restore:test

# 生產建置
npm run build:prod
```

## 測試檔案

| 檔案 | 大小 | 用途 |
|------|------|------|
| `test-performance.html` | 13.2KB | 瀏覽器測試工具 |
| `performance-test-report.json` | 2.9KB | 基本測試報告 |
| `advanced-performance-test-report.json` | 2.9KB | 進階測試報告 |

## 測試結果

- ✅ **基本測試**: 18/18 通過 (100%)
- ✅ **進階測試**: 13/13 通過 (100%)
- ✅ **高影響測試**: 10/10 通過 (100%)
- 🚀 **效能提升**: 2,000+ 毫秒

## 工作流程

1. **開發** → 保留測試檔案
2. **測試** → `npm run test:all`
3. **部署** → `npm run build:prod`
4. **除錯** → `npm run restore:test`
