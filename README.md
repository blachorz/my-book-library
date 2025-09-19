# 我的書庫 (My Book Library)

這是一個基於 Vite + TypeScript + Tailwind CSS 打造的個人線上書庫，用於彙整與展示所有的讀書筆記。網站透過 GitHub Actions 實現 CI/CD，能自動部署到 GitHub Pages。

**線上預覽:** [https://blachorz.github.io/my-book-library/](https://blachorz.github.io/my-book-library/)

---

## ✨ 專案特色

*   **多頁面架構**: 每本讀書筆記都是一個獨立的頁面，方便分享與管理。
*   **模板化**: 所有筆記頁面共用統一的樣式與互動腳本，確保視覺一致性。
*   **響應式設計**: 使用 Tailwind CSS 打造，在桌面與行動裝置上都有良好的閱讀體驗。
*   **自動化部署**: 每次 `git push` 到 `main` 分支後，GitHub Actions 都會自動建置與部署網站。
*   **UI 元件庫**: 整合 [Flowbite](https://flowbite.com/)，並**客製化**其樣式以符合網站整體的蘋果簡約風格。

## 🛠️ 技術棧

*   **建置工具**: [Vite](https://vitejs.dev/)
*   **程式語言**: [TypeScript](https://www.typescriptlang.org/)
*   **樣式框架**: [Tailwind CSS](https://tailwindcss.com/)
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

請遵循以下標準作業流程 (SOP)：

1.  **複製模板**:
    在專案根目錄，複製一份現有的 `book-*.html` 檔案 (例如 `book-how-to-raise-social-child.html`)，並將其重新命名為新書的檔案名，例如 `book-atomic-habits.html`。

2.  **更新筆記內容**:
    打開新的 `book-atomic-habits.html` 檔案，將 `<main>` 標籤內的所有內容，替換為您的新讀書筆記。

3.  **更新 Vite 設定**:
    打開 `vite.config.ts` 檔案，在 `build.rollupOptions.input` 物件中，新增一行指向您的新檔案：
    ```ts
    // ...
    input: {
      main: resolve(__dirname, 'index.html'),
      book1: resolve(__dirname, 'book-how-to-raise-social-child.html'),
      book2: resolve(__dirname, 'book-atomic-habits.html'), // <-- 新增這一行
    }
    // ...
    ```

4.  **更新書庫首頁**:
    打開 `index.html` 檔案，在 `<div id="book-list">` 中，複製一個 `<div class="book-card">...</div>` 區塊，修改其中的書名、作者、簡介，並將連結 `<a>` 的 `href` 屬性指向您剛剛建立的新 HTML 檔案。

5.  **推送部署**:
    將所有變更加入版控並推送到 GitHub，網站將會自動更新。
    ```bash
    git add .
    git commit -m "feat: Add 'Atomic Habits' book note"
    git push origin main
    ```
