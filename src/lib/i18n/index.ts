/* eslint-disable @typescript-eslint/no-explicit-any */
import en from '@/locales/en.json';
import de from '@/locales/de.json';
import es from '@/locales/es.json';
import fr from '@/locales/fr.json';
import it from '@/locales/it.json';
import pl from '@/locales/pl.json';
import pt from '@/locales/pt.json';

/** Supported language codes */
export type Language = 'en' | 'de' | 'es' | 'fr' | 'it' | 'pl' | 'pt';

/** Map of language codes to their display names */
export const languages: Record<Language, string> = {
    en: 'English',
    de: 'Deutsch',
    es: 'Español',
    fr: 'Français',
    it: 'Italiano',
    pl: 'Polski',
    pt: 'Português'
};

/** Map of language codes to their flag icons */
export const languageIcons: Record<Language, string> = {
    en: '/images/lang/en.png',
    de: '/images/lang/de.png',
    es: '/images/lang/es.png',
    fr: '/images/lang/fr.png',
    it: '/images/lang/it.png',
    pl: '/images/lang/pl.png',
    pt: '/images/lang/pt.png'
};

/** Object containing all translation dictionaries */
export const translations = {
    en,
    de,
    es,
    fr,
    it,
    pl,
    pt
} as const;

/** Utility type for joining string literals */
type Join<K, P> = K extends string | number ?
    P extends string | number ?
    `${K}${'' extends P ? '' : '.'}${P}`
    : never : never;

/** Utility type for previous numbers */
type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[]];

/** Utility type for generating nested object paths */
type Paths<T, D extends number = 10> = [D] extends [never] ? never : T extends object ?
    { [K in keyof T]-?: K extends string | number ?
        `${K}` | Join<K, Paths<T[K], Prev[D]>>
        : never
    }[keyof T] : '';

/** Type representing all possible translation keys */
export type TranslationKey = Paths<typeof en>;

/**
 * Retrieves a translation for a given language and key
 * @param lang The language code
 * @param key The translation key
 * @returns The translated string
 */
export function getTranslation(lang: Language, key: TranslationKey): string {
    const keys = key.split('.');
    let current: any = translations[lang];

    for (const k of keys) {
        if (!current || !(k in current)) {
            console.warn(`Translation key not found: ${key} for language ${lang}`);
            return key.split('.').reduce((acc, part) => acc?.[part] ?? key, translations.en as any);
        }
        current = current[k];
    }

    return current as string;
}

/**
 * Hook for using translations in components
 * @param lang The current language
 * @returns Object with translation function and language information
 */
export function useTranslation(lang: Language) {
    return {
        t: (key: TranslationKey) => getTranslation(lang, key),
        languages,
        currentLanguage: lang
    };
}