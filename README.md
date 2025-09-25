# Readpiration (Read + Inspiration)

全站以 Vite、TypeScript、Tailwind CSS 為基礎，結合中英雙語切換、互動式心智圖，並透過 GitHub Actions 實現 CI/CD，打造簡單有趣的閱讀與靈感分享體驗。

**線上預覽:** [https://blachorz.github.io/my-book-library/](https://blachorz.github.io/my-book-library/)

---

## ✨ 專案特色

*   **多頁面架構**: 每本讀書筆記都是一個獨立的頁面，方便分享與管理。
*   **多國語言支援 (i18n)**: 全站支援中英雙語切換，所有 UI 文字與筆記內容皆可動態翻譯。
*   **高效能載入 (High-Performance Loading)**: 經過深度效能優化，採用依需載入 (On-demand Loading) 策略處理翻譯資源，並確保 CSS 渲染流程順暢，在行動裝置與桌面環境皆提供極速的載入體驗。
*   **Dark/Light 模式切換**: 支援完整的主題切換功能，包含懸浮按鈕、滾動透明度控制，以及防 FOUC (Flash of Unstyled Content) 策略，確保流暢的使用者體驗。
*   **響應式心智圖設計**: 整合 [Markmap.js](https://markmap.js.org/)，將書本的核心概念視覺化為可互動的心智圖，採用響應式高度設計（手機 300px、平板 400px、桌面 500px），並使用獨立樣式設計確保閱讀體驗不受主題切換影響。
*   **懸浮按鈕功能**: 提供語言切換和主題切換的懸浮按鈕，具備滾動透明度控制，優化閱讀體驗。
*   **模板化**: 所有筆記頁面共用統一的樣式與互動腳本，確保視覺一致性。
*   **響應式設計**: 使用 Tailwind CSS 打造，在桌面與行動裝置上都有良好的閱讀體驗。
*   **自動化部署**: 每次 `git push` 到 `main` 分支後，GitHub Actions 都會自動建置與部署網站。
*   **UI 元件庫**: 整合 [Flowbite](https://flowbite.com/)，並**客製化**其樣式以符合網站整體的蘋果簡約風格。

## 🛠️ 技術棧

*   **建置工具**: [Vite](https://vitejs.dev/)
*   **程式語言**: [TypeScript](https://www.typescriptlang.org/)
*   **樣式框架**: [Tailwind CSS](https://tailwindcss.com/)
*   **國際化 (i18n)**:  
    *   **資料結構**：所有翻譯內容集中於 `src/data/locales/`，分為英文（en）與繁中（zh），並以 `common`/`index`/`[book-id]`做模組化管理。
    *   **動態切換**：結合 `[data-book-id]`、`[data-t]` 屬性與 TypeScript + Vite `import.meta.glob`，實現**依需動態載入**的即時語言切換，大幅提升初始載入效能。
*   **資料視覺化**: [Markmap.js](https://markmap.js.org/) - 採用響應式高度設計與獨立樣式設計，確保在不同設備上都有最佳的顯示效果。
*   **主題系統**: 支援 Dark/Light 模式切換，使用 Tailwind CSS 的 `darkMode: 'class'` 配置，並實現防 FOUC 策略確保流暢的使用者體驗。
*   **響應式設計**: 使用 Tailwind CSS 斷點系統實現響應式設計，特別針對心智圖採用 `h-[300px] sm:h-[400px] md:h-[500px]` 的響應式高度設計。
*   **UI 元件庫**: [Flowbite](https://flowbite.com/)
*   **自動化**: [GitHub Actions](https://github.com/features/actions)

## 🚀 本地端開發

1.  **安裝依賴**
    ```bash
    npm install
    ```

2.  **啟動開發伺服器**
    ```bash
    npm run dev
    ```
    伺服器將會運行在 `http://localhost:5173`。

3.  **生產環境建置** (僅供本地測試)
    ```bash
    npm run build
    ```

## 📖 如何新增一本讀書筆記？

請遵循以下整合了**國際化 (i18n)** 的標準作業流程 (SOP)：

1.  **複製模板與設定 ID**:
    *   在 `bookshelf/` 目錄下，複製一份現有的 `book-*.html` 檔案，並將其重新命名為新書的檔案名 (e.g., `book-atomic-habits.html`)。
    *   打開新檔案，找到 `<body>` 標籤，為其新增 `data-book-id="[book-id]"` 屬性。`[book-id]` 是一個**自訂的簡短英文代碼** (e.g., `atomicHabits`)，**此 ID 必須與後續建立的翻譯檔檔名完全一致**，是確保翻譯功能正常的關鍵。

2.  **建立筆記頁面翻譯檔**:
    *   在 `src/data/locales/en/` 目錄下，建立一個 `[book-id].json` 檔案 (e.g., `atomicHabits.json`)。
    *   將新書筆記**內頁**的所有英文內容（書名、作者、章節標題、段落等）以鍵值對 (key-value pair) 的形式填入。
    *   在 `src/data/locales/zh/` 目錄下重複此步驟，建立對應的繁體中文翻譯檔。

3.  **更新 HTML 內容與標籤**:
    *   回到新建立的 `book-*.html` 檔案。
    *   將 `<header>` 與 `<main>` 標籤內的舊內容，替換為您的新讀書筆記。
    *   為**每一個**需要翻譯的 HTML 元素，掛上 `data-t` 屬性，其值為您在 `[book-id].json` 中設定好的鍵名。

4.  **更新書庫首頁與其翻譯**:
    *   打開 `index.html`，在 `<div id="book-list">` 中複製一個卡片區塊給新書使用。
    *   將卡片連結 `<a>` 的 `href` 指向新建立的 HTML 檔案。
    *   打開 `src/data/locales/en/index.json` 和 `src/data/locales/zh/index.json`，為新書卡片上的文字（書名、作者、摘要）新增對應的翻譯鍵值對。
    *   回到 `index.html`，為新卡片上的元素掛上對應的 `data-t` 屬性。

5.  **整合心智圖 (Markmap)**:
    *   根據新的筆記內容，提煉一份階層式的 Markdown 摘要。
    *   在新的 `book-*.html` 頁面底部找到 `<script>` 區塊，將 `const markdown = \`...\`` 裡面的內容，替換為新的摘要。
    *   **響應式設計要求**: 確保心智圖容器使用響應式高度設計 `h-[300px] sm:h-[400px] md:h-[500px]`，並使用 `.mindmap-container` 類別實現獨立樣式設計。

6.  **更新 Vite 設定**:
    *   打開 `vite.config.ts` 檔案，在 `build.rollupOptions.input` 物件中，新增一行指向您的新檔案：
    ```ts
    // ...
    input: {
      main: resolve(__dirname, 'index.html'),
      // ...既有的 book entries...
      newBook: resolve(__dirname, 'bookshelf/book-atomic-habits.html'), // <-- 新增這一行
    }
    // ...
    ```

7.  **推送部署**:
    *   將所有變更加入版控並推送到 GitHub，網站將會自動更新。
    ```bash
    git add .
    git commit -m "feat: Add 'Atomic Habits' book note"
    git push origin main
    ```

## 🔧 技術細節與最佳實踐

### 響應式設計最佳實踐
*   **心智圖響應式高度**: 使用 `h-[300px] sm:h-[400px] md:h-[500px]` 確保在不同設備上都有最佳的顯示效果
*   **懸浮按鈕響應式**: 使用 `sm:w-auto sm:rounded-lg sm:px-4 sm:py-2` 實現桌面和行動裝置的不同顯示效果

### 樣式分離原則
*   **心智圖獨立樣式**: 使用 `.mindmap-container` 類別實現獨立樣式設計，確保閱讀體驗不受主題切換影響
*   **主題系統分離**: 心智圖使用固定淺灰色背景 `#f5f5f7`，與 Dark/Light 主題系統完全分離

### 效能優化策略
*   **防 FOUC 策略**: 在 `<head>` 中實現防 FOUC 腳本，確保主題切換時不會出現閃爍
*   **滾動體驗優化**: 懸浮按鈕具備滾動透明度控制，使用 `passive: true` 優化滾動事件性能
*   **依需載入**: 翻譯資源採用依需動態載入策略，大幅提升初始載入效能

### 批量處理與自動化
*   **Python 腳本**: 使用 Python 腳本進行批量修復，確保所有文件的一致性
*   **預防性設計**: 在設計階段就考慮潛在問題，如防 FOUC、按鈕文字預設等
*   **根本原因分析**: 從第一性原理分析問題，優先考慮重構而非修補
