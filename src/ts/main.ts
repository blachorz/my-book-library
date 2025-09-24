import 'flowbite';

// Define language type and the structure for storing translations
type Language = 'zh' | 'en';
type TranslationData = Record<string, Record<string, string>>;
let translations: TranslationData = {
    zh: {},
    en: {}
};

// --- Translation Logic Core ---

/**
 * Use Vite's import.meta.glob to statically import all translation files.
 * This allows Vite to handle path resolution and bundling, avoiding runtime path issues.
 */
const loadTranslationsForPage = async (lang: Language, pageId: string) => {
    const modules = import.meta.glob('/src/data/locales/**/*.json');
    let loadedTranslations: Record<string, string> = {};

    // Define which files are needed for which page
    const requiredFiles = ['common', pageId];

    for (const path in modules) {
        const fileName = path.split('/').pop()?.replace('.json', '');
        const fileLang = path.includes('/zh/') ? 'zh' : 'en';

        if (fileLang === lang && fileName && requiredFiles.includes(fileName)) {
            const module = await modules[path]();
            if (typeof module === 'object' && module !== null && 'default' in module) {
                const content = (module as { default: Record<string, string> }).default;
                loadedTranslations = { ...loadedTranslations, ...content };
            }
        }
    }
    return loadedTranslations;
};

/**
 * Applies the loaded translations to all elements with a `data-t` attribute.
 * @param lang - The language to apply.
 */
const applyTranslations = (lang: Language) => {
    document.querySelectorAll<HTMLElement>('[data-t]').forEach(el => {
        const key = el.dataset.t;
        const translationSet = translations[lang];

        if (key && translationSet && translationSet[key]) {
            el.innerHTML = translationSet[key];
        }
    });
};

/**
 * Sets the application language. It dynamically loads the required translations,
 * applies them to the DOM, and saves the preference.
 * @param lang - The language to set.
 */
const setLanguage = async (lang: Language) => {
    const pageId = document.body.dataset.bookId || 'index';
    
    // Load only the necessary translations for the current page and language
    translations[lang] = await loadTranslationsForPage(lang, pageId);
    
    applyTranslations(lang);

    // Update the lang attribute for SEO and accessibility
    document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : 'en';
    
    // Store language preference
    localStorage.setItem('language', lang);

    // Specifically update the language switcher text
    const langSwitcherSpan = document.querySelector('#lang-switcher span');
    if (langSwitcherSpan) {
        const key = langSwitcherSpan.dataset.t;
        if (key && translations[lang] && translations[lang][key]) {
            langSwitcherSpan.textContent = translations[lang][key];
        }
    }

    // Update theme toggle text based on current theme and language
    const themeToggleSpan = document.querySelector('#theme-toggle span');
    if (themeToggleSpan) {
        const currentTheme = localStorage.getItem('theme') || 'light';
        if (currentTheme === 'dark') {
            themeToggleSpan.textContent = lang === 'zh' ? '淺色' : 'Light';
        } else {
            themeToggleSpan.textContent = lang === 'zh' ? '深色' : 'Dark';
        }
    }
};

// --- Core Logic End ---


// --- Theme Management ---

/**
 * Sets the application theme (light/dark mode).
 * @param theme - The theme to set ('light' or 'dark').
 */
const setTheme = (theme: 'light' | 'dark') => {
    const html = document.documentElement;
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const themeToggleSpan = document.querySelector('#theme-toggle span');
    
    if (theme === 'dark') {
        html.classList.add('dark');
        sunIcon?.classList.remove('hidden');
        moonIcon?.classList.add('hidden');
        if (themeToggleSpan) {
            // Check current language to show appropriate text
            const currentLang = localStorage.getItem('language') || 'zh';
            themeToggleSpan.textContent = currentLang === 'zh' ? '淺色' : 'Light';
        }
    } else {
        html.classList.remove('dark');
        sunIcon?.classList.add('hidden');
        moonIcon?.classList.remove('hidden');
        if (themeToggleSpan) {
            // Check current language to show appropriate text
            const currentLang = localStorage.getItem('language') || 'zh';
            themeToggleSpan.textContent = currentLang === 'zh' ? '深色' : 'Dark';
        }
    }
    
    // Store theme preference
    localStorage.setItem('theme', theme);
};

/**
 * Gets the current theme from localStorage or system preference.
 */
const getInitialTheme = (): 'light' | 'dark' => {
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (storedTheme) {
        return storedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    
    return 'light';
};

// Main execution block after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', async () => {
    
    const langSwitcher = document.getElementById('lang-switcher');
    const themeToggle = document.getElementById('theme-toggle');
    
    // Determine and set the initial language
    const initialLang: Language = localStorage.getItem('language') as Language || 'zh';
    await setLanguage(initialLang);

    // Determine and set the initial theme
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);

    // Add click event listener for the language switcher
    langSwitcher?.addEventListener('click', async () => {
        const currentLang = localStorage.getItem('language') as Language || 'zh';
        const newLang: Language = currentLang === 'zh' ? 'en' : 'zh';
        await setLanguage(newLang);
    });

    // Add click event listener for the theme toggle
    themeToggle?.addEventListener('click', () => {
        const currentTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });

    // --- Existing scroll fade-in functionality ---
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
