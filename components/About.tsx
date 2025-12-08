"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslation } from "@/lib/LanguageContext";

interface AboutImage {
  id: number;
  url: string;
  alt: string;
  order: number;
}

export default function About() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [images, setImages] = useState<AboutImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showModal]);

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/about-images");
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setImages(data);
      }
    } catch (error) {
      console.error("Error fetching about images:", error);
    }
  };

  // Auto-rotate images
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id="about" className="relative py-12 md:py-16 lg:py-20 bg-white overflow-hidden">
      {/* Subtle decorative pattern overlay */}
      <div className="absolute inset-0 zellige-pattern-white pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Always 2 columns - same layout on mobile and desktop */}
        <div ref={ref} className="grid grid-cols-2 gap-4 md:gap-12 lg:gap-24 items-center">

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-lg md:rounded-none">
              {images.length > 0 ? (
                <>
                  <Image
                    src={images[currentIndex]?.url || "/placeholder.jpg"}
                    alt={images[currentIndex]?.alt || "About Lubina Blanca"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 40vw"
                  />
                  {/* Image dots */}
                  {images.length > 1 && (
                    <div className="absolute bottom-2 left-2 md:bottom-6 md:left-6 flex gap-1 md:gap-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentIndex(index)}
                          className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${index === currentIndex ? "bg-white w-4 md:w-6" : "bg-white/50"
                            }`}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full bg-slate-100" />
              )}
            </div>

            {/* Decorative frame - hidden on mobile */}
            <div className="hidden md:block absolute -bottom-6 -right-6 w-full h-full border border-slate-200 -z-10" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className=""
          >
            <p className="text-slate-400 text-[10px] md:text-sm uppercase tracking-[0.15em] md:tracking-[0.3em] mb-2 md:mb-4">{t('about', 'ourStory')}</p>

            <h2
              className="text-xl md:text-4xl lg:text-6xl font-extralight text-slate-900 mb-2 md:mb-8 leading-tight"
              style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}
            >
              {t('about', 'title')}
            </h2>

            <div className="w-8 md:w-16 h-[1px] bg-slate-300 mb-2 md:mb-8" />

            <p className="text-xs md:text-lg text-slate-600 leading-relaxed mb-2 md:mb-6 font-light line-clamp-3 md:line-clamp-none">
              {t('about', 'description')}
            </p>

            {/* Read More button - Mobile only */}
            <button
              onClick={() => setShowModal(true)}
              className="md:hidden text-xs text-amber-600 hover:text-amber-700 font-medium mb-3 flex items-center gap-1 transition-colors"
            >
              {t('common', 'readMore')}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <p className="hidden md:block text-sm md:text-base text-slate-500 leading-relaxed mb-6 md:mb-12 font-light">
              {t('about', 'commitment')}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 md:gap-8">
              {[
                { value: "10+", labelKey: 'statsYears' as const },
                { value: "50+", labelKey: 'statsDishes' as const },
                { value: "5★", labelKey: 'statsRating' as const }
              ].map((stat, index) => (
                <motion.div
                  key={stat.labelKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div
                    className="text-lg md:text-4xl font-extralight text-slate-900 mb-0.5 md:mb-1"
                    style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[8px] md:text-xs text-slate-400 uppercase tracking-wide md:tracking-widest">
                    {t('about', stat.labelKey)}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* About Modal - Mobile */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center md:hidden"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white w-full max-h-[85vh] rounded-t-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Handle */}
              <div className="sticky top-0 bg-white pt-3 pb-2 px-6 border-b border-slate-100">
                <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-3" />
                <div className="flex items-center justify-between">
                  <h3
                    className="text-xl font-light text-slate-900"
                    style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}
                  >
                    {t('about', 'title')}
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)]">
                <p className="text-slate-400 text-xs uppercase tracking-[0.2em] mb-3">{t('about', 'ourStory')}</p>

                <div className="w-12 h-[1px] bg-slate-300 mb-4" />

                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {t('about', 'description')}
                </p>

                <p className="text-sm text-slate-500 leading-relaxed mb-6">
                  {t('about', 'commitment')}
                </p>

                {/* Stats in Modal */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                  {[
                    { value: "10+", labelKey: 'statsYears' as const },
                    { value: "50+", labelKey: 'statsDishes' as const },
                    { value: "5★", labelKey: 'statsRating' as const }
                  ].map((stat) => (
                    <div key={stat.labelKey} className="text-center">
                      <div
                        className="text-2xl font-extralight text-slate-900 mb-1"
                        style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                        {t('about', stat.labelKey)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

