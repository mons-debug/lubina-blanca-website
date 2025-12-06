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
        // Sort by order
        const sorted = data.sort((a: InteriorImage, b: InteriorImage) => (a.order || 0) - (b.order || 0));
        setImages(sorted);
      }
    } catch (error) {
      console.error("Error fetching interior images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (images.length === 0 && !isLoading) {
    return null;
  }

  return (
    <section id="interior" className="py-10 md:py-14 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-8"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            Our Interior
          </h2>
          <div className="w-16 md:w-20 h-1 bg-[#5eb3ce] mx-auto mb-3" />
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Experience our elegant and welcoming atmosphere, where Mediterranean charm meets modern comfort
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex items-center justify-center h-[500px] md:h-[600px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#5eb3ce] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        ) : images.length === 0 ? (
          <div className="flex items-center justify-center h-[500px] md:h-[600px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl">
            <div className="text-center p-8">
              <div className="text-6xl mb-4">🏛️</div>
              <p className="text-xl font-semibold text-gray-600 mb-2">No interior images yet</p>
              <p className="text-gray-500 text-sm">Add images from the admin panel</p>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop Layout - Grid with Featured Image */}
            <div className="hidden lg:block">
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-12 gap-4 md:gap-6"
              >
                {/* Main Featured Image - Large */}
                <div className="col-span-12 lg:col-span-8 relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-xl group">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={images[currentIndex].url}
                        alt={images[currentIndex].alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 66vw"
                        priority={currentIndex < 2}
                        quality={85}
                        loading={currentIndex < 2 ? "eager" : "lazy"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      
                      {/* Text Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
                        <div className="mb-2">
                          <span className="inline-block bg-[#5eb3ce]/20 backdrop-blur-sm text-[#6dd3e3] px-3 py-1 rounded-full text-xs font-semibold border border-[#5eb3ce]/30">
                            {currentIndex + 1} / {images.length}
                          </span>
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-bold mb-3 leading-tight drop-shadow-lg">
                          {images[currentIndex].alt || "Our Beautiful Interior"}
                        </h3>
                        <p className="text-sm lg:text-base text-gray-200 leading-relaxed line-clamp-2 drop-shadow-md max-w-2xl">
                          {images[currentIndex].description || 
                            "Step into our beautifully designed space where every detail has been carefully crafted to create an unforgettable dining experience."}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {["Elegant Design", "Comfortable", "Mediterranean"].map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-medium border border-white/30"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all hover:scale-110 z-40 opacity-0 group-hover:opacity-100"
                        aria-label="Previous"
                      >
                        <FiChevronLeft size={24} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all hover:scale-110 z-40 opacity-0 group-hover:opacity-100"
                        aria-label="Next"
                      >
                        <FiChevronRight size={24} />
                      </button>
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-50 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                        {images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`transition-all duration-200 rounded-full ${
                              index === currentIndex
                                ? "w-8 h-2 bg-white"
                                : "w-2 h-2 bg-white/60 hover:bg-white/80"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Thumbnail Grid - Side */}
                <div className="col-span-12 lg:col-span-4 space-y-4">
                  {images.slice(0, 4).map((image, index) => (
                    <motion.button
                      key={image.id}
                      onClick={() => goToSlide(index)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className={`relative h-32 lg:h-36 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all w-full ${
                        index === currentIndex ? "ring-2 ring-[#5eb3ce] scale-105" : "hover:scale-102"
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        quality={75}
                        loading="lazy"
                      />
                      <div className={`absolute inset-0 transition-opacity ${
                        index === currentIndex ? "bg-[#5eb3ce]/20" : "bg-black/30 hover:bg-black/20"
                      }`} />
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-white text-xs font-semibold drop-shadow-lg line-clamp-1">
                          {image.alt}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                  {images.length > 4 && (
                    <div className="relative h-32 lg:h-36 rounded-xl bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-600 text-sm font-medium">
                        +{images.length - 4} more
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Mobile/Tablet Layout - Simple Carousel */}
            <div className="lg:hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative h-[500px] md:h-[600px] rounded-xl md:rounded-2xl overflow-hidden shadow-xl"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={images[currentIndex].url}
                      alt={images[currentIndex].alt}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority={currentIndex < 2}
                      quality={85}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <span className="inline-block bg-[#5eb3ce]/20 backdrop-blur-sm text-[#6dd3e3] px-2 py-1 rounded text-xs font-semibold mb-2">
                        {currentIndex + 1} / {images.length}
                      </span>
                      <h3 className="text-xl font-bold mb-2 drop-shadow-lg">
                        {images[currentIndex].alt || "Our Beautiful Interior"}
                      </h3>
                      <p className="text-sm text-gray-200 line-clamp-2 drop-shadow-md">
                        {images[currentIndex].description || 
                          "Step into our beautifully designed space where every detail has been carefully crafted."}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg z-40"
                    >
                      <FiChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg z-40"
                    >
                      <FiChevronRight size={20} />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-50 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`transition-all duration-200 rounded-full ${
                            index === currentIndex
                              ? "w-6 h-1.5 bg-white"
                              : "w-1.5 h-1.5 bg-white/60"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
