"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiMaximize2 } from "react-icons/fi";
import { useTranslation } from "@/lib/LanguageContext";

interface InteriorImage {
  id: number;
  url: string;
  alt: string;
  order: number;
  description?: string;
}

export default function Interior() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [images, setImages] = useState<InteriorImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<InteriorImage | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/interior");
      const data = await response.json();
      if (Array.isArray(data)) {
        const sorted = data.sort((a: InteriorImage, b: InteriorImage) => (a.order || 0) - (b.order || 0));
        setImages(sorted);
      }
    } catch (error) {
      console.error("Error fetching interior images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  if (images.length === 0 && !isLoading) return null;

  return (
    <section id="interior" className="relative py-16 md:py-20 bg-slate-50 overflow-hidden">
      {/* Zellige pattern overlay */}
      <div className="absolute inset-0 zellige-pattern-white pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-slate-400 text-sm uppercase tracking-[0.3em] mb-4">{t('interior', 'subtitle')}</p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-extralight text-slate-900 mb-6"
            style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}
          >
            {t('interior', 'title')}
          </h2>
          <div className="w-16 h-[1px] bg-slate-300 mx-auto mb-6" />
          <p className="text-slate-500 max-w-2xl mx-auto font-light">
            {t('interior', 'subtitle')}
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-600 rounded-full animate-spin" />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Mobile View: Horizontal Snap Scroll */}
            <div className="md:hidden relative">
              <div
                className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 scrollbar-hide -mx-4 px-4"
                style={{ scrollPaddingLeft: '1rem', scrollPaddingRight: '1rem' }}
              >
                {images.map((image, index) => (
                  <div
                    key={image.id}
                    className="flex-shrink-0 w-[85vw] snap-center relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg"
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="85vw"
                      loading={index < 2 ? "eager" : "lazy"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <p className="text-white font-medium">{image.alt}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Swipe Indicator */}
              <div className="flex justify-center gap-2 mt-4">
                <div className="w-16 h-1 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-400 w-1/3 rounded-full animate-pulse" />
                </div>
              </div>
            </div>

            {/* Desktop View: Grid Layout */}
            <div className="hidden md:grid grid-cols-12 gap-6 auto-rows-[300px]">
              {images.map((image, index) => {
                // Create an interesting layout pattern
                // Index 0: Large (8 cols)
                // Index 1: Tall/Right (4 cols)
                // Index 2,3,4: Small (4 cols)
                let gridClass = "col-span-4";
                if (index === 0) gridClass = "col-span-8 row-span-2";
                if (index === 1) gridClass = "col-span-4 row-span-2";
                if (index > 4) gridClass = "col-span-4"; // Default for rest

                return (
                  <motion.div
                    key={image.id}
                    whileHover={{ y: -5 }}
                    className={`relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer ${gridClass}`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <FiMaximize2 className="text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300" size={32} />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Desktop Scroll Controls (if needed for overflow) */}
            {/* Not needed for grid layout */}

          </motion.div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-6xl w-full h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.url}
              alt={selectedImage.alt}
              fill
              className="object-contain"
              sizes="100vw"
              quality={100}
            />
            <button
              className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-white/20 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <FiMaximize2 className="rotate-45" size={24} />
            </button>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-light">{selectedImage.alt}</h3>
              {selectedImage.description && <p className="text-white/70 text-sm mt-1">{selectedImage.description}</p>}
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
