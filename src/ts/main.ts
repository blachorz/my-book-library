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
const loadAllTranslations = async () => {
    const zhModules = import.meta.glob('/src/data/locales/zh/*.json');
    const enModules = import.meta.glob('/src/data/locales/en/*.json');

    const loadLangFiles = async (modules: Record<string, () => Promise<unknown>>): Promise<Record<string, string>> => {
        let loadedTranslations: Record<string, string> = {};
        for (const path in modules) {
            const module = await modules[path]();
            const fileName = path.split('/').pop()?.replace('.json', '');
            if (fileName && typeof module === 'object' && module !== null && 'default' in module) {
                const content = (module as { default: Record<string, string> }).default;
                if (fileName === 'common' || fileName === 'index') {
                    loadedTranslations = { ...loadedTranslations, ...content };
                } else {
                    // For book-specific files, merge them directly
                    loadedTranslations = { ...loadedTranslations, ...content };
                }
            }
        }
        return loadedTranslations;
    };
    
    // Preload all translations into the translations object
    translations.zh = await loadLangFiles(zhModules);
    translations.en = await loadLangFiles(enModules);
};


/**
 * Applies the loaded translations to all elements with a `data-t` attribute.
 * @param lang - The language to apply.
 */
const applyTranslations = (lang: Language) => {
    const bookId = document.body.dataset.bookId || 'index';
    
    document.querySelectorAll<HTMLElement>('[data-t]').forEach(el => {
        const key = el.dataset.t;
        // Determine which translation set to use
        const translationSet = translations[lang];

        if (key && translationSet && translationSet[key]) {
            el.innerHTML = translationSet[key];
        }
    });
};

/**
 * Sets the application language. It applies the pre-loaded translations
 * to the DOM and saves the preference.
 * @param lang - The language to set.
 */
const setLanguage = (lang: Language) => {
    applyTranslations(lang);

    // Update the lang attribute for SEO and accessibility
    document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : 'en';
    
    // Store language preference
    localStorage.setItem('language', lang);

    // Specifically update the language switcher text
    const langSwitcherSpan = document.querySelector('#lang-switcher span');
    if (langSwitcherSpan && translations[lang] && translations[lang]['langSwitcher']) {
        langSwitcherSpan.textContent = translations[lang]['langSwitcher'];
    }
};

// --- Core Logic End ---


// Main execution block after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', async () => {
    
    // Pre-load all translation files at startup
    await loadAllTranslations();

    const langSwitcher = document.getElementById('lang-switcher');
    
    // Determine and set the initial language
    const initialLang: Language = localStorage.getItem('language') as Language || 'zh';
    setLanguage(initialLang);

    // Add click event listener for the language switcher
    langSwitcher?.addEventListener('click', () => {
        const currentLang = localStorage.getItem('language') as Language || 'zh';
        const newLang: Language = currentLang === 'zh' ? 'en' : 'zh';
        setLanguage(newLang);
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
