"use client";

import { motion } from 'framer-motion';
import { languages, Language } from '@/lib/translations';
import { useLanguage } from '@/lib/LanguageContext';

export default function TabletLanguageSelector() {
    const { setLanguage, setLanguageSelected } = useLanguage();

    const handleSelectLanguage = (lang: Language) => {
        setLanguage(lang);
        setLanguageSelected(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6"
        >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: 0.1, type: "spring", damping: 20 }}
                className="relative max-w-lg w-full text-center"
            >
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <img
                        src="/lubinalogo.png"
                        alt="Lubina Blanca"
                        className="h-24 w-auto mx-auto mb-6 drop-shadow-2xl"
                    />
                    <h1
                        className="text-3xl font-light text-white mb-2"
                        style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}
                    >
                        Welcome
                    </h1>
                    <p className="text-white/60 text-lg">مرحبا • Bienvenue • Bienvenido</p>
                </motion.div>

                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-white/80 text-xl mb-8"
                >
                    Choose Your Language / اختر لغتك
                </motion.h2>

                {/* Language Options - 2x2 Grid for tablet */}
                <div className="grid grid-cols-2 gap-4">
                    {languages.map((lang, index) => (
                        <motion.button
                            key={lang.code}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleSelectLanguage(lang.code)}
                            className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 hover:border-[#5eb3ce]/50 rounded-2xl p-6 transition-all duration-300"
                        >
                            {/* Flag */}
                            <div className="text-5xl mb-3">{lang.flag}</div>

                            {/* Language names */}
                            <div>
                                <p className="text-white font-medium text-xl">{lang.nativeName}</p>
                                <p className="text-white/50 text-sm">{lang.name}</p>
                            </div>
                        </motion.button>
                    ))}
                </div>

                {/* Subtle hint */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-white/40 text-sm mt-8"
                >
                    Tap to select your preferred language
                </motion.p>
            </motion.div>
        </motion.div>
    );
}
