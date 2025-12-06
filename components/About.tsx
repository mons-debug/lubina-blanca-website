"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, PanInfo, AnimatePresence } from "framer-motion";
import { restaurantInfo } from "@/data/restaurantData";

interface AboutImage {
  id: number;
  url: string;
  alt: string;
  order: number;
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [images, setImages] = useState<AboutImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetchImages();
  }, []);

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

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && images.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 7000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, images.length]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    setIsDragging(false);
    const swipeThreshold = 100;

    if (Math.abs(info.offset.x) > swipeThreshold) {
      if (info.offset.x > 0) {
        // Swiped right - go to previous
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      } else {
        // Swiped left - go to next
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }
      
      // Pause auto-play temporarily when user interacts
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 10000);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Get visible cards for the stack effect
  const getVisibleCards = () => {
    if (images.length === 0) return [];
    
    const cards = [];
    for (let i = 0; i < Math.min(3, images.length); i++) {
      const index = (currentIndex + i) % images.length;
      cards.push({ ...images[index], stackIndex: i });
    }
    return cards;
  };

  const visibleCards = getVisibleCards();

  return (
    <section id="about" className="py-10 md:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:gap-12 items-center">
          {/* Image Stack */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative h-[350px] md:h-[500px] lg:h-[600px] pb-12 md:pb-16"
          >
            {images.length === 0 ? (
              // Loading or fallback
              <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Loading...</p>
              </div>
            ) : (
              <div className="relative h-full perspective-1500">
                <AnimatePresence initial={false}>
                  {visibleCards.map((card, index) => {
                    const isTop = index === 0;
                    // Smaller offsets on mobile, larger on desktop
                    const stackOffset = index * (isMobile ? 12 : 20);
                    const horizontalOffset = index * (isMobile ? 5 : 8);
                    const scale = 1 - index * 0.08;
                    const opacity = 1 - index * 0.25;
                    const zIndex = visibleCards.length - index;
                    const rotation = index * (isMobile ? 1 : 2);

                    return (
                      <motion.div
                        key={`${card.id}-${currentIndex}`}
                        className="absolute rounded-lg md:rounded-2xl overflow-hidden shadow-lg md:shadow-2xl"
                        style={{
                          zIndex,
                          cursor: isTop ? "grab" : "default",
                          left: `${horizontalOffset}px`,
                          right: `${horizontalOffset}px`,
                          top: 0,
                          bottom: `${stackOffset}px`,
                        }}
                        initial={{
                          scale: 0.8,
                          opacity: 0,
                          y: 50,
                        }}
                        animate={{
                          scale,
                          opacity,
                          y: stackOffset,
                          rotateZ: rotation,
                        }}
                        exit={{
                          scale: 0.8,
                          opacity: 0,
                          x: -200,
                          transition: { duration: 0.3 },
                        }}
                        transition={{
                          duration: 0.5,
                          ease: "easeOut",
                        }}
                        drag={isTop ? "x" : false}
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.7}
                        onDragStart={() => isTop && setIsDragging(true)}
                        onDragEnd={isTop ? handleDragEnd : undefined}
                        whileDrag={isTop ? { scale: 1.05, cursor: "grabbing", rotateZ: 0 } : undefined}
                      >
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{
                            backgroundImage: `url('${card.url}')`,
                          }}
                        />
                        {!isTop && (
                          <div className="absolute inset-0 bg-black/30" />
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {/* Indicators */}
                {images.length > 1 && (
                  <div className="absolute bottom-1 md:bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 md:space-x-2 z-50 bg-black/40 px-2 md:px-4 py-1 md:py-2 rounded-full backdrop-blur-sm">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`transition-all duration-300 rounded-full ${
                          index === currentIndex
                            ? "w-4 md:w-8 h-1.5 md:h-2 bg-white"
                            : "w-1.5 md:w-2 h-1.5 md:h-2 bg-white/50 hover:bg-white/70"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h2
              className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3"
            >
              About Us
            </motion.h2>
            
            <motion.div
              className="w-12 md:w-20 h-1 bg-[#5eb3ce] mb-3 md:mb-4"
            />

            <motion.p
              className="text-sm md:text-base lg:text-lg text-gray-700 mb-3 md:mb-6 leading-relaxed"
            >
              {restaurantInfo.description}
            </motion.p>

            <motion.p
              className="text-sm md:text-base lg:text-lg text-gray-700 mb-4 md:mb-8 leading-relaxed hidden md:block"
            >
              Our commitment to quality and authenticity shines through in every dish we serve. 
              From the freshest seafood to carefully selected ingredients, we bring the flavors 
              of the Mediterranean coast directly to your table.
            </motion.p>

            <div className="grid grid-cols-3 gap-2 md:gap-6 mt-6 md:mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#5eb3ce] mb-1 md:mb-2">10+</div>
                <div className="text-xs md:text-sm text-gray-600">Years</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#5eb3ce] mb-1 md:mb-2">50+</div>
                <div className="text-xs md:text-sm text-gray-600">Dishes</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#5eb3ce] mb-1 md:mb-2">5★</div>
                <div className="text-xs md:text-sm text-gray-600">Rating</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
