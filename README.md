# Readpiration (Read + Inspiration)

全站以 Vite、TypeScript、Tailwind CSS 為基礎，結合中英雙語切換、互動式心智圖，並透過 GitHub Actions 實現 CI/CD，打造簡單有趣的閱讀與靈感分享體驗。

**線上預覽:** [https://blachorz.github.io/my-book-library/](https://blachorz.github.io/my-book-library/)

---

## ✨ 專案特色

*   **多頁面架構**: 每本讀書筆記都是一個獨立的頁面，方便分享與管理。
*   **多國語言支援 (i18n)**: 全站支援中英雙語切換，所有 UI 文字與筆記內容皆可動態翻譯。
*   **高效能載入 (High-Performance Loading)**: 經過深度效能優化，採用依需載入 (On-demand Loading) 策略處理翻譯資源，並確保 CSS 渲染流程順暢，在行動裝置與桌面環境皆提供極速的載入體驗。
*   **模板化**: 所有筆記頁面共用統一的樣式與互動腳本，確保視覺一致性。
*   **響應式設計**: 使用 Tailwind CSS 打造，在桌面與行動裝置上都有良好的閱讀體驗。
*   **互動式心智圖**: 整合 [Markmap.js](https://markmap.js.org/)，將書本的核心概念視覺化為可互動的心智圖，提升理解效率。
*   **自動化部署**: 每次 `git push` 到 `main` 分支後，GitHub Actions 都會自動建置與部署網站。
*   **UI 元件庫**: 整合 [Flowbite](https://flowbite.com/)，並**客製化**其樣式以符合網站整體的蘋果簡約風格。

## 🛠️ 技術棧

*   **建置工具**: [Vite](https://vitejs.dev/)
*   **程式語言**: [TypeScript](https://www.typescriptlang.org/)
*   **樣式框架**: [Tailwind CSS](https://tailwindcss.com/)
*   **國際化 (i18n)**:  
    *   **資料結構**：所有翻譯內容集中於 `src/data/locales/`，分為英文（en）與繁中（zh），並以 `common`/`index`/`[book-id]`做模組化管理。
    *   **動態切換**：結合 `[data-book-id]`、`[data-t]` 屬性與 TypeScript + Vite `import.meta.glob`，實現**依需動態載入**的即時語言切換，大幅提升初始載入效能。
*   **資料視覺化**: [Markmap.js](https://markmap.js.org/)
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
