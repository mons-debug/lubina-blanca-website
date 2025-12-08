"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiInstagram, FiGlobe, FiChevronDown } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { restaurantInfo } from "@/data/restaurantData";
import { useLanguage, useTranslation } from "@/lib/LanguageContext";
import { languages, Language } from "@/lib/translations";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, isRTL } = useLanguage();
  const { t } = useTranslation();

  // Get translated nav links
  const navLinks = [
    { name: t('nav', 'home'), href: "#home" },
    { name: t('nav', 'about'), href: "#about" },
    { name: t('nav', 'menu'), href: "#menu" },
    { name: t('nav', 'gallery'), href: "#gallery" },
    { name: t('nav', 'contact'), href: "#contact" },
  ];

  // Hide navigation on tablet-menu page (it has its own header)
  if (pathname === "/tablet-menu") {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const currentLang = languages.find(l => l.code === language);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-[#0a1628]/95 backdrop-blur-lg shadow-xl py-3"
        : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection("#home")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <img
              src="/lubinalogo-white.png"
              alt="Lubina Blanca Logo"
              className="h-12 md:h-16 w-auto"
            />
          </motion.button>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-8`}>
            {navLinks.map((link) => (
              <motion.button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white/80 hover:text-[#5eb3ce] font-medium transition-colors text-sm tracking-wide"
              >
                {link.name}
              </motion.button>
            ))}

            {/* Language Switcher */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-2 text-white/80 hover:text-[#5eb3ce] font-medium transition-colors text-sm"
              >
                <FiGlobe size={16} />
                <span>{currentLang?.flag}</span>
                <FiChevronDown size={14} className={`transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className={`absolute ${isRTL ? 'left-0' : 'right-0'} top-full mt-2 bg-white rounded-lg shadow-xl overflow-hidden min-w-[160px]`}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors ${language === lang.code ? 'bg-slate-100' : ''
                          }`}
                      >
                        <span className="text-xl">{lang.flag}</span>
                        <span className="text-slate-700 text-sm font-medium">{lang.nativeName}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Social Icons */}
            <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-4 ml-4 border-l border-white/20 pl-4`}>
              <motion.a
                href={restaurantInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="text-white/70 hover:text-[#5eb3ce] transition-colors"
              >
                <FiInstagram size={20} />
              </motion.a>
              <motion.a
                href={restaurantInfo.social.googleBusiness}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className="text-white/70 hover:text-[#5eb3ce] transition-colors"
              >
                <FaGoogle size={20} />
              </motion.a>
            </div>
          </div>

          {/* Mobile Menu Button - Hidden when menu is open */}
          {!isOpen && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              className="md:hidden text-white"
            >
              <FiMenu size={28} />
            </motion.button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop - appears immediately */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 md:hidden"
              style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 9998
              }}
              onClick={() => setIsOpen(false)}
            />
            {/* Menu Panel - Solid White Full Screen */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed md:hidden overflow-hidden"
              style={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: '#ffffff',
                zIndex: 9999,
              }}
            >
              {/* Close Button - Top Right */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.1 }}
                onClick={() => setIsOpen(false)}
                className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors`}
                style={{ zIndex: 10000 }}
                aria-label="Close menu"
              >
                <FiX size={24} className="text-gray-800" />
              </motion.button>

              <div className="flex flex-col items-center justify-center h-full space-y-8 px-4" style={{ backgroundColor: '#ffffff' }}>
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(link.href)}
                    className="text-2xl font-medium text-gray-800 hover:text-[#5eb3ce] transition-colors"
                  >
                    {link.name}
                  </motion.button>
                ))}

                {/* Mobile Language Switcher */}
                <motion.div
                  initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap justify-center gap-3 pt-4"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsOpen(false);
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${language === lang.code
                        ? 'bg-[#5eb3ce] text-white border-[#5eb3ce]'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-[#5eb3ce]'
                        }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="text-sm font-medium">{lang.nativeName}</span>
                    </button>
                  ))}
                </motion.div>

                {/* Mobile Social Icons */}
                <div className="flex items-center space-x-6 pt-4">
                  <motion.a
                    href={restaurantInfo.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-800"
                  >
                    <FiInstagram size={32} />
                  </motion.a>
                  <motion.a
                    href={restaurantInfo.social.googleBusiness}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-800"
                  >
                    <FaGoogle size={32} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
