# 網站國際化 (i18n) 實作與擴充指南

本文件旨在提供「我的書庫」專案中，多國語言（中/英）功能的完整實作流程，以及未來新增頁面時的標準作業程序 (SOP)。

---

## 第一部分：首次 i18n 系統實作 (一次性設定)

此部分涵蓋從零到一建立整個翻譯系統的步驟。

### 步驟一：建立「翻譯資料庫」

此檔案是所有語言文本的唯一來源 (Single Source of Truth)，集中管理所有翻譯。

1.  **建立資料夾**：在 `src/` 目錄下建立一個名為 `data` 的新資料夾。
2.  **建立檔案**：在 `src/data/` 資料夾中，建立一個名為 `translations.json` 的檔案。
3.  **填入內容**：將網站上所有需要翻譯的文字，以「鍵值對」的形式填入。`key` 是程式辨識用的唯一名稱，`value` 則包含 `zh` 和 `en` 兩種語言的文本。

    ```json:projectNotes/my-book-library/src/data/translations.json
    {
      "langSwitcher": {
        "zh": "切換為英文",
        "en": "Switch to Chinese"
      },
      "pageTitle": {
        "zh": "Readpiration",
        "en": "Readpiration"
      },
      "pageSubtitle": {
        "zh": "從閱讀到靈感，只需一個筆記",
        "en": "From Reading to Inspiration, Just a Note Away"
      },
      "readNotesButton": {
        "zh": "閱讀筆記",
        "en": "Read Notes"
      },
      "tooltipText": {
        "zh": "深入了解這本書的精華",
        "en": "Dive deep into the essence of this book"
      }
      // ... 陸續加入其他頁面所有需要翻譯的文字 ...
    }
    ```

### 步驟二：植入「核心翻譯邏輯」

更新主要的 TypeScript 檔案，賦予它讀取翻譯、切換語言的能力。

1.  **打開檔案**：`projectNotes/my-book-library/src/ts/main.ts`
2.  **完整替換內容**：將檔案內容用以下程式碼完全取代。這段程式碼是通用的，它會自動處理所有頁面的翻譯需求。

    ```typescript:projectNotes/my-book-library/src/ts/main.ts
    import 'flowbite';
    // 導入翻譯檔案，使其成為可用的資料來源
    import translations from '../data/translations.json';

    // --- 翻譯邏輯核心區塊 ---

    // 定義語言類型與翻譯資料的結構
    type Language = 'zh' | 'en';
    type Translations = Record<string, Record<Language, string>>;

    // 主要的語言設定函式
    const setLanguage = (lang: Language) => {
        // 1. 找到頁面上所有帶有 `data-t` 屬性的 HTML 元素
        document.querySelectorAll<HTMLElement>('[data-t]').forEach(el => {
            const key = el.dataset.t; // 讀取 data-t 的值 (也就是 key)
            const translationData = translations as Translations;
            // 2. 如果 key 存在於 translations.json 中，就更新該元素的文字
            if (key && translationData[key]) {
                el.innerText = translationData[key][lang];
            }
        });
        // 3. 更新網頁的 lang 屬性，有助於 SEO 與無障礙閱讀
        document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : 'en';
        // 4. 將使用者的語言偏好存入瀏覽器的 localStorage，以便下次記住選擇
        localStorage.setItem('language', lang);
    };

    // --- 核心邏輯結束 ---


    // 當 HTML 文件完全載入後，開始執行以下程式碼
    document.addEventListener('DOMContentLoaded', () => {
        
        // --- 語言切換器初始化 ---
        const langSwitcher = document.getElementById('lang-switcher');
        
        // 嘗試從 localStorage 讀取已儲存的語言，若無，則預設為中文 'zh'
        const initialLang: Language = localStorage.getItem('language') as Language || 'zh';
        // 立即套用初始語言
        setLanguage(initialLang);

        // 為語言切換按鈕綁定點擊事件
        langSwitcher?.addEventListener('click', () => {
            const currentLang = localStorage.getItem('language') as Language || 'zh';
            const newLang: Language = currentLang === 'zh' ? 'en' : 'zh';
            setLanguage(newLang);
        });

        // --- 原有的捲動淡入功能 ---
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, {
            threshold: 0.1
        });

        const elements = document.querySelectorAll('.fade-in-on-scroll');
        elements.forEach(el => observer.observe(el));
    });
    ```

### 步驟三：改造既有 HTML 頁面

讓現有頁面能夠與翻譯邏輯互動。

1.  **遍歷所有 HTML 檔案** (`index.html`, `book-*.html` 等)。
2.  **加入語言切換按鈕**：在頁面的合適位置（例如 `<header>`）加入按鈕元素。按鈕的 `id` 必須是 `lang-switcher`。
    ```html
    <button id="lang-switcher" class="..." data-t="langSwitcher">切換為英文</button>
    ```
3.  **掛上翻譯標籤 (`data-t`)**：在每一個需要翻譯的文字元素上，加入 `data-t` 屬性，其值對應 `translations.json` 中的 `key`。
    ```html
    <h1 data-t="pageTitle">Readpiration</h1>
    <p data-t="pageSubtitle">從閱讀到靈感，只需一個筆記</p>
    <a href="..."><span data-t="readNotesButton">閱讀筆記</span></a>
    ```
    *注意：如果按鈕或連結內除了文字還有圖標 (SVG)，建議用 `<span>` 把文字包起來，並將 `data-t` 加在 `<span>` 上，避免覆蓋掉圖標。*

---

## 第二部分：新增頁面的標準作業流程 (SOP)

當 i18n 系統建立後，未來每次新增書籍內頁時，請遵循以下簡化流程。

### 步驟一：更新「翻譯資料庫」

1.  **打開**：`src/data/translations.json`。
2.  **新增**：為新書頁面所有需要翻譯的文字（書名、作者、內文等）建立新的鍵值對。

### 步驟二：建立並標記「新 HTML 頁面」

1.  **建立檔案**：在 `projectNotes/my-book-library/` 目錄下建立新頁面 (e.g., `book-new-book.html`)。最快的方式是複製一個現有內頁來修改。
2.  **確保元件存在**：檢查頁面是否包含 `id="lang-switcher"` 的按鈕和底部的 `<script type="module" src="./src/ts/main.ts"></script>` 引用。
3.  **掛上標籤**：根據步驟一新增的 `key`，在新頁面的對應 HTML 元素上掛上 `data-t` 屬性。

### 步驟三：在「首頁」建立入口連結

1.  **打開**：`index.html`。
2.  **新增卡片**：複製一個 `<div class="book-card">` 區塊，用來代表您的新書。
3.  **修改內容**：
    *   將 `<a>` 標籤的 `href` 指向您剛建立的新頁面。
    *   同時為這張卡片上的書名、作者等元素，掛上對應的 `data-t` 標籤，讓它們在首頁也能被翻譯。

**最重要的一點：** 在這個迭代流程中，您**完全不需要**再修改 `src/ts/main.ts` 檔案。它的設計就是為了自動處理所有符合上述結構的新頁面。