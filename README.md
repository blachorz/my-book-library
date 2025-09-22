# Readpiration (Read + Inspiration)

這是一個基於 Vite + TypeScript + Tailwind CSS 打造的個人線上書庫，用於展示我的讀書筆記。網站透過 GitHub Actions 實現 CI/CD，能自動部署到 GitHub Pages。

**線上預覽:** [https://blachorz.github.io/my-book-library/](https://blachorz.github.io/my-book-library/)

---

## ✨ 專案特色

*   **多頁面架構**: 每本讀書筆記都是一個獨立的頁面，方便分享與管理。
*   **多國語言支援 (i18n)**: 全站支援中英雙語切換，所有 UI 文字與筆記內容皆可動態翻譯。
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
    *   **資料庫**: 使用 `src/data/translations.json` 存放中英雙語的鍵值對。
    *   **動態渲染**: 透過 `[data-t]` 屬性標記 HTML 元素，並利用 TypeScript 腳本實現動態內容切換。
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

1.  **複製模板**:
    *   在 `bookshelf/` 目錄下，複製一份現有的 `book-*.html` 檔案 (任選一本即可)，並將其重新命名為新書的檔案名 (e.g., `book-atomic-habits.html`)。

2.  **更新翻譯資料庫**:
    *   打開 `src/data/translations.json` 檔案。
    *   為新書筆記中的**所有**使用者可見文字（包含書名、作者、章節標題、內文段落、甚至是「提及書目」裡的項目），新增對應的 `zh` (繁體中文) 與 `en` (英文) 翻譯。
    *   **請務必為每個鍵值 (key) 加上能識別書籍的前綴**，例如 `atomicHabits_mainTitle`，以避免與其他書籍的鍵值衝突。

3.  **更新 HTML 內容與標籤**:
    *   打開新的 `book-*.html` 檔案。
    *   將 `<header>` 與 `<main>` 標籤內的舊內容，替換為您的新讀書筆記。
    *   為**每一個**需要翻譯的 HTML 元素，掛上對應的 `data-t` 屬性，其值為您在 `translations.json` 中設定好的鍵名。
    *   **範例**: `<h1 data-t="atomicHabits_mainTitle">原子習慣</h1>`

4.  **整合心智圖 (Markmap)**:
    *   根據新的筆記內容，提煉一份階層式的 Markdown 摘要。
    *   找到頁面底部的 `<script>` 區塊，將 `const markdown = \`...\`` 裡面的內容，替換為新的摘要。

5.  **更新 Vite 設定**:
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

6.  **更新書庫首頁**:
    *   打開 `index.html` 檔案，在 `<div id="book-list">` 中，複製一個 `<div class="book-card">...</div>` 區塊。
    *   為卡片上的各個元素（書名、作者、簡介）掛上 `data-t` 屬性，並將連結 `<a>` 的 `href` 指向新建立的 HTML 檔案。

7.  **推送部署**:
    *   將所有變更加入版控並推送到 GitHub，網站將會自動更新。
    ```bash
    git add .
    git commit -m "feat: Add 'Atomic Habits' book note with i18n support"
    git push origin main
    ```
