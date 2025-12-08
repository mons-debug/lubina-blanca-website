"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Language, languages, translations } from './translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    isRTL: boolean;
    direction: 'ltr' | 'rtl';
    languageSelected: boolean;
    setLanguageSelected: (selected: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'lubinablanca-language';
const LANGUAGE_SELECTED_KEY = 'lubinablanca-language-selected';

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en');
    const [languageSelected, setLanguageSelectedState] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize from localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
            const wasSelected = localStorage.getItem(LANGUAGE_SELECTED_KEY) === 'true';

            if (savedLanguage && languages.some(l => l.code === savedLanguage)) {
                setLanguageState(savedLanguage);
            }
            setLanguageSelectedState(wasSelected);
            setIsInitialized(true);
        }
    }, []);

    // Update document direction when language changes
    useEffect(() => {
        if (typeof window !== 'undefined' && isInitialized) {
            const langInfo = languages.find(l => l.code === language);
            const dir = langInfo?.direction || 'ltr';

            document.documentElement.lang = language;
            document.documentElement.dir = dir;
        }
    }, [language, isInitialized]);

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
        if (typeof window !== 'undefined') {
            localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
        }
    }, []);

    const setLanguageSelected = useCallback((selected: boolean) => {
        setLanguageSelectedState(selected);
        if (typeof window !== 'undefined') {
            localStorage.setItem(LANGUAGE_SELECTED_KEY, selected.toString());
        }
    }, []);

    const langInfo = languages.find(l => l.code === language);
    const isRTL = langInfo?.direction === 'rtl';
    const direction = langInfo?.direction || 'ltr';

    // Don't render until initialized to prevent hydration mismatch
    if (!isInitialized) {
        return null;
    }

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                isRTL,
                direction,
                languageSelected,
                setLanguageSelected,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

// Hook to access language context
export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

// Hook to get translations
export function useTranslation() {
    const { language } = useLanguage();

    const t = useCallback(
        <S extends keyof typeof translations>(
            section: S,
            key: keyof typeof translations[S]
        ): string => {
            const sectionData = translations[section];
            if (!sectionData) return String(key);

            const keyData = sectionData[key] as Record<Language, string> | undefined;
            if (!keyData) return String(key);

            return keyData[language] || keyData['en'] || String(key);
        },
        [language]
    );

    // Helper for getting category translations
    const tCategory = useCallback(
        (category: string): string => {
            const categoryMap: Record<string, keyof typeof translations.menu.categories> = {
                'All': 'all',
                'Paella': 'paella',
                'Couscous': 'couscous',
                'Salads': 'salads',
                'Soups': 'soups',
                'Fish Dishes': 'fishDishes',
                'Fish by Kilo': 'fishByKilo',
                'Desserts': 'desserts',
                'Drinks': 'drinks',
            };

            const key = categoryMap[category];
            if (!key) return category;

            const categoryData = translations.menu.categories[key];
            return categoryData[language] || categoryData['en'] || category;
        },
        [language]
    );

    // Helper for getting menu item name with translation support
    const getMenuItemName = useCallback(
        (item: { name: string; nameTranslations?: { en?: string; ar?: string; fr?: string; es?: string } }): string => {
            if (item.nameTranslations && item.nameTranslations[language]) {
                return item.nameTranslations[language]!;
            }
            // Fallback to original name (which may already be in the right language like French)
            return item.name;
        },
        [language]
    );

    // Helper for getting menu item description with translation support
    const getMenuItemDesc = useCallback(
        (item: { description: string; descriptionTranslations?: { en?: string; ar?: string; fr?: string; es?: string } }): string => {
            if (item.descriptionTranslations && item.descriptionTranslations[language]) {
                return item.descriptionTranslations[language]!;
            }
            // Fallback to original description
            return item.description;
        },
        [language]
    );

    return { t, tCategory, getMenuItemName, getMenuItemDesc, language };
}

