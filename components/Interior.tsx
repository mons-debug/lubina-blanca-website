"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface InteriorImage {
  id: number;
  url: string;
  alt: string;
  order: number;
  description?: string;
}

export default function Interior() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [images, setImages] = useState<InteriorImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  if (images.length === 0 && !isLoading) return null;

  return (
    <section id="interior" className="relative py-24 md:py-32 bg-slate-50 overflow-hidden">
      {/* Zellige pattern overlay */}
      <div className="absolute inset-0 zellige-pattern-white pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-slate-400 text-sm uppercase tracking-[0.3em] mb-4">Experience</p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-extralight text-slate-900 mb-6"
            style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}
          >
            Our Space
          </h2>
          <div className="w-16 h-[1px] bg-slate-300 mx-auto" />
        </motion.div>

        {isLoading ? (
          <div className="flex items-center justify-center h-[500px]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-2 border-slate-200 border-t-slate-600 rounded-full"
            />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-slate-200">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[currentIndex]?.url || ""}
                    alt={images[currentIndex]?.alt || "Interior"}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white flex items-center justify-center transition-all"
                    aria-label="Previous"
                  >
                    <FiChevronLeft size={20} className="text-slate-800" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white flex items-center justify-center transition-all"
                    aria-label="Next"
                  >
                    <FiChevronRight size={20} className="text-slate-800" />
                  </button>
                </>
              )}

              {/* Image info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
                <div className="max-w-3xl">
                  <p className="text-white/70 text-sm uppercase tracking-widest mb-2">
                    {currentIndex + 1} / {images.length}
                  </p>
                  <h3 className="text-white text-2xl md:text-3xl font-light">
                    {images[currentIndex]?.alt || "Our Beautiful Interior"}
                  </h3>
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setCurrentIndex(index)}
                    className={`flex-shrink-0 relative w-24 h-16 overflow-hidden transition-all ${index === currentIndex
                      ? "ring-2 ring-slate-900 ring-offset-2"
                      : "opacity-60 hover:opacity-100"
                      }`}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
