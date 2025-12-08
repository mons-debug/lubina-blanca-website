"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiChevronDown } from "react-icons/fi";
import { useTranslation, useLanguage } from "@/lib/LanguageContext";
import { translations, Language } from "@/lib/translations";

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  mediaType?: "image" | "video";
  active: boolean;
  order: number;
}

// Helper to get translated slide content
const getSlideTranslation = (slideIndex: number, language: Language) => {
  const slideKeys = ['welcome', 'freshFish', 'dining', 'specialties'] as const;
  const key = slideKeys[slideIndex % slideKeys.length];
  const slideData = translations.hero.slides[key];
  return {
    title: slideData?.title?.[language] || slideData?.title?.['en'] || '',
    subtitle: slideData?.subtitle?.[language] || slideData?.subtitle?.['en'] || '',
    description: slideData?.description?.[language] || slideData?.description?.['en'] || '',
  };
};

export default function Hero() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch("/api/hero");
        const data = await response.json();
        const activeSlides = data.filter((slide: HeroSlide) => slide.active);
        setSlides(activeSlides);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching hero slides:", error);
        setIsLoading(false);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading || slides.length === 0) {
    return (
      <section id="home" className="relative h-screen w-full overflow-hidden bg-slate-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-2 border-white/30 border-t-white rounded-full"
        />
      </section>
    );
  }

  const slide = slides[currentSlide];

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">

      {/* Mobile Video Background - Shows only on mobile */}
      <div className="md:hidden absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-mobile.webm" type="video/webm" />
        </video>
        {/* Dark overlay for mobile video */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* Desktop Background Media - Hidden on mobile */}
      <div className="hidden md:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            {slide.mediaType === "video" ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                key={slide.image}
              >
                <source src={slide.image} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority={currentSlide === 0}
                quality={90}
              />
            )}

            {/* Clean dark overlay - no blue */}
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-6 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Subtitle - translated */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white text-sm uppercase tracking-[0.4em] font-light mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              >
                {getSlideTranslation(currentSlide, language).subtitle || slide.subtitle}
              </motion.p>

              {/* Main Title - translated */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight text-white mb-8 leading-[0.95] tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
                style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}
              >
                {getSlideTranslation(currentSlide, language).title || slide.title}
              </motion.h1>

              {/* Thin decorative line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="w-20 h-[1px] bg-white/40 mx-auto mb-8"
              />

              {/* Description - translated */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg md:text-xl text-white max-w-xl mx-auto mb-12 font-light leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              >
                {getSlideTranslation(currentSlide, language).description || slide.description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <button
                  onClick={() => scrollToSection("#menu")}
                  className="px-10 py-4 bg-white text-slate-900 font-medium tracking-wide hover:bg-[#5eb3ce] hover:text-white transition-all duration-300 shadow-lg"
                >
                  {t('common', 'viewMenu')}
                </button>
                <button
                  onClick={() => scrollToSection("#contact")}
                  className="px-10 py-4 border border-white/30 text-white font-light tracking-wide hover:bg-white/10 transition-all duration-300"
                >
                  {t('common', 'reservations')}
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide indicators */}
        {slides.length > 1 && (
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-12 h-[2px] transition-all duration-500 ${index === currentSlide ? "bg-white" : "bg-white/30"
                  }`}
              />
            ))}
          </div>
        )}

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={() => scrollToSection("#about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FiChevronDown size={28} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
