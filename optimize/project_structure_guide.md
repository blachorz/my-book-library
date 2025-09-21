# `my-book-library` 專案結構重構與維護指南

本文件旨在提供一套標準化流程，將 `my-book-library` 專案從手動配置的多頁面應用（MPA）重構為一個自動化、可擴展的結構。遵循此指南將大幅簡化未來新增書籍筆記的流程，並提高專案的穩定性。

## 🎯 **重構目標**

1.  **自動化建置**：讓 Vite 自動偵測所有 HTML 頁面，無需手動修改設定檔。
2.  **路徑穩定化**：採用根相對路徑，徹底解決因檔案移動導致樣式、腳本遺失的問題。
3.  **簡化維護**：建立一套清晰的SOP，讓新增頁面變得簡單直觀。

---

## **Part 1：一次性結構重構**

此部分為一次性操作，完成後即可享受自動化帶來的好處。

### **步驟 0：前置準備**

在開始前，請確保完成以下準備：

1.  **版本控制**：執行 `git add .` 及 `git commit -m "chore: pre-refactor"`，建立一個安全的還原點。
2.  **停止伺服器**：若 Vite 開發伺服器正在運行，請在終端機按下 `Ctrl + C` 將其停止。
3.  **安裝依賴**：目前的設定檔需要 `glob` 套件來自動尋找檔案。在專案根目錄 (`projectNotes/my-book-library`) 下執行以下指令：
    ```bash
    npm install glob -D
    ```

### **步驟 1：調整資料夾結構**

我們將所有書籍內頁統一收納至 `bookshelf` 資料夾。

1.  在專案根目錄 (`projectNotes/my-book-library/`) 建立一個新資料夾，命名為 `bookshelf`。
2.  將所有 `book-*.html` 檔案（例如 `book-adversity-quotient.html`）全部**移動**到 `bookshelf` 資料夾內。

完成後，您的核心結構應如下：

```
my-book-library/
├── 📂 bookshelf/
│   ├── 📄 book-adversity-quotient.html
│   ├── 📄 book-art-of-war-gong.html
│   └── 📄 ... (所有其他的書本內頁)
├── 📂 src/
├── 📄 index.html
└── 📄 vite.config.ts
```

### **步驟 2：升級 Vite 設定檔**

這是本次重構的核心。此設定將使 Vite 自動化地處理所有頁面。

請用以下內容**完全取代** `vite.config.ts` 的內容：

```typescript
import { defineConfig } from 'vite'
import { resolve } from 'path'
import { globSync } from 'glob'

// 自動尋找專案中所有 HTML 檔案作為建置入口
// 規則：包含根目錄的 .html 檔案以及 bookshelf 資料夾下的 .html 檔案
const htmlFiles = globSync(['./*.html', './bookshelf/*.html']).reduce((acc, file) => {
  // 建立一個易於理解的名稱，例如 'bookshelf/book-adversity-quotient'
  const name = file
    .replace(/^\.\//, '') // 移除開頭的 ./
    .replace(/\.html$/, '') // 移除 .html 副檔名
  acc[name] = resolve(__dirname, file)
  return acc
}, {} as Record<string, string>)

// https://vitejs.dev/config/
export default defineConfig({
  base: '/my-book-library/',
  build: {
    rollupOptions: {
      input: htmlFiles
    }
  }
})
```

### **步驟 3：標準化 HTML 檔案路徑**

我們將統一使用「根相對路徑」（以 `/` 開頭），確保無論 HTML 檔案在哪個資料夾，都能正確找到資源。

#### **A. 修改 `bookshelf/` 中的所有書籍內頁**

對於 `bookshelf` 資料夾中的**每一個** `book-*.html` 檔案，進行以下修改：

*   **CSS 連結**：
    *   尋找：`href="./src/css/style.css"`
    *   取代為：`href="/src/css/style.css"`
*   **JavaScript 連結**：
    *   尋找：`src="./src/ts/main.ts"`
    *   取代為：`src="/src/ts/main.ts"`
*   **返回首頁連結**：
    *   尋找：`href="./index.html"`
    *   取代為：`href="/"`

#### **B. 修改根目錄的 `index.html`**

對於專案根目錄的 `index.html`，進行以下修改：

*   **CSS & JS 連結** (若有使用 `./` 開頭)：
    *   尋找：`href="./src/` 或 `src="./src/`
    *   取代為：`href="/src/` 或 `src="/src/`
*   **書籍內頁連結**：
    *   尋找：`href="book-`
    *   取代為：`href="/bookshelf/book-`
    *   *(範例：`href="book-adversity-quotient.html"` 應改為 `href="/bookshelf/book-adversity-quotient.html"`)*

### **步驟 4：驗證與測試**

所有修改完成後，進行最終驗證。

1.  **啟動開發伺服器**：
    ```bash
    npm run dev
    ```
2.  **功能測試清單**：
    *   [ ] 首頁 (`index.html`) 的樣式與功能是否正常載入？
    *   [ ] 點擊首頁上的任一本書籍，是否能成功跳轉到 `http://localhost:xxxx/bookshelf/book-....html`？
    *   [ ] 書籍內頁的樣式與功能是否正常載入？
    *   [ ] 在書籍內頁點擊「返回書庫首頁」，是否能成功回到首頁？
3.  **執行建置命令** (可選，用於部署前驗證)：
    ```bash
    npm run build
    ```
    建置成功後，可以檢查 `dist` 資料夾內的檔案路徑是否被 Vite 正確處理。

---

## **Part 2：未來維護流程**

完成一次性重構後，未來新增書籍筆記的流程將大幅簡化。

### **如何新增一本新書筆記**

假設您要新增一本名為《原子習慣》的筆記：

1.  在 `bookshelf` 資料夾中，建立一個新的 HTML 檔案，例如 `book-atomic-habits.html`。
2.  複製任一個既有的書籍內頁 HTML 內容作為模板。
3.  確保檔案中所有的資源路徑（CSS, JS, 圖片等）和返回首頁的連結都使用**根相對路徑**（以 `/` 開頭）。
4.  打開根目錄的 `index.html`，新增一個指向新書的連結卡片：
    ```html
    <!-- Card for "原子習慣" -->
    <div class="book-card ...">
        ...
        <a href="/bookshelf/book-atomic-habits.html" ...>閱讀筆記</a>
        ...
    </div>
    ```
5.  **完成！** 重新整理瀏覽器即可看到更新。您**完全不需要**再觸碰 `vite.config.ts` 設定檔。
