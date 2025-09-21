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
