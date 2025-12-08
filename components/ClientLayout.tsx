"use client";

import { ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider, useLanguage } from '@/lib/LanguageContext';
import LanguageSelector from './LanguageSelector';
import LoadingScreen from './LoadingScreen';

function ClientLayoutInner({ children }: { children: ReactNode }) {
    const { languageSelected } = useLanguage();

    return (
        <>
            <AnimatePresence mode="wait">
                {!languageSelected && <LanguageSelector key="language-selector" />}
            </AnimatePresence>
            {languageSelected && (
                <LoadingScreen>
                    {children}
                </LoadingScreen>
            )}
        </>
    );
}

export default function ClientLayout({ children }: { children: ReactNode }) {
    return (
        <LanguageProvider>
            <ClientLayoutInner>{children}</ClientLayoutInner>
        </LanguageProvider>
    );
}
