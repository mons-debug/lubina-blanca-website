"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiMapPin } from "react-icons/fi";
import { restaurantInfo } from "@/data/restaurantData";

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

export default function Hero() {
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
    }, 7000); // Change slide every 7 seconds

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
      <section id="home" className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-lg">Loading...</p>
        </div>
      </section>
    );
  }

  const slide = slides[currentSlide];
  const nextSlide = slides[(currentSlide + 1) % slides.length];

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Media Layers - Crossfade without white flash */}
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ 
            duration: 2, 
            ease: [0.43, 0.13, 0.23, 0.96] // Custom easing for smooth effect
          }}
          className="absolute inset-0"
        >
          {/* Background Media (Image or Video) with Overlay */}
          <div className="absolute inset-0" style={{ willChange: 'opacity, transform' }}>
            {slide.mediaType === "video" ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ willChange: 'transform' }}
                key={slide.image}
              >
                <source src={slide.image} type="video/mp4" />
                Your browser does not support the video tag.
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
                loading={currentSlide === 0 ? "eager" : "lazy"}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/60" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Preload next video for smooth transition */}
      {slides.length > 1 && nextSlide.mediaType === "video" && (
        <link rel="preload" as="video" href={nextSlide.image} />
      )}

      {/* Content Layer - Modern Layout */}
      <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 z-10 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center"
            >
              {/* Left Column - Text Content */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.8, 
                      delay: 0.2,
                      ease: [0.22, 1, 0.36, 1]
                    }
                  },
                  exit: { 
                    opacity: 0, 
                    y: -20,
                    transition: { duration: 0.4 }
                  }
                }}
                className="text-center lg:text-left space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 w-full"
              >
                {/* Subtitle Badge */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { duration: 0.6, delay: 0.3 }
                    }
                  }}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                >
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#5eb3ce] rounded-full animate-pulse"></span>
                  <span className="text-xs sm:text-sm md:text-base font-medium text-white tracking-wide sm:tracking-wider uppercase">
                    {slide.subtitle}
                  </span>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                variants={{
                    hidden: { opacity: 0, y: 30 },
                  visible: { 
                    opacity: 1, 
                      y: 0,
                    transition: { 
                      duration: 0.9, 
                        delay: 0.4,
                      ease: [0.22, 1, 0.36, 1]
                    }
                  },
                  exit: { 
                    opacity: 0, 
                      y: -20,
                      transition: { duration: 0.3 }
                  }
                }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] tracking-tight px-2 sm:px-0"
                style={{
                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    textShadow: '0 2px 20px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  <span className="block bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent">
                    {slide.title}
                  </span>
                </motion.h1>

                {/* Description */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.8, 
                        delay: 0.6,
                      ease: "easeOut"
                    }
                  },
                  exit: { 
                    opacity: 0, 
                    transition: { duration: 0.3 }
                  }
                }}
                  className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 max-w-xl mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0"
                style={{
                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
                }}
              >
                {slide.description}
              </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        duration: 0.7, 
                        delay: 0.8,
                        ease: "easeOut"
                      }
                    },
                    exit: { 
                      opacity: 0,
                      transition: { duration: 0.3 }
                    }
                  }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2 sm:pt-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => scrollToSection("#menu")}
                    className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#5eb3ce] text-white rounded-lg font-semibold text-sm sm:text-base md:text-lg overflow-hidden shadow-2xl hover:shadow-[#5eb3ce]/50 transition-all duration-300"
                    style={{
                      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                      fontWeight: 600
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      See Menu
                      <motion.svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        initial={{ x: 0 }}
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </motion.svg>
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#3a8fa8] to-[#5eb3ce] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />
                  </motion.button>
                  
                  <motion.a
                    href={restaurantInfo.social.googleBusiness}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-lg font-semibold text-sm sm:text-base md:text-lg hover:bg-white/20 hover:border-white/50 transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
                    style={{
                      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                      fontWeight: 600
                    }}
                  >
                    <FiMapPin size={18} className="sm:w-5 sm:h-5" />
                    <span>Get Directions</span>
                  </motion.a>
                </motion.div>
              </motion.div>

              {/* Right Column - Decorative Element or Stats */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 30 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: { 
                      duration: 0.8, 
                      delay: 0.5,
                      ease: [0.22, 1, 0.36, 1]
                    }
                  },
                  exit: { 
                    opacity: 0, 
                    x: -30,
                    transition: { duration: 0.4 }
                  }
                }}
                className="hidden lg:block"
              >
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Years", value: "10+", color: "from-[#5eb3ce] to-[#3a8fa8]" },
                    { label: "Dishes", value: "50+", color: "from-[#6dd3e3] to-[#5eb3ce]" },
                    { label: "Rating", value: "5★", color: "from-[#5eb3ce] to-[#3a8fa8]" },
                    { label: "Location", value: "Tangier", color: "from-[#6dd3e3] to-[#5eb3ce]" }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                      className="relative p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                      <div className="relative z-10">
                        <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-300 font-medium uppercase tracking-wider">
                          {stat.label}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Indicators - Modern Style */}
      {slides.length > 1 && (
        <div className="absolute bottom-20 sm:bottom-24 left-1/2 transform -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 z-20 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative focus:outline-none"
              aria-label={`Go to slide ${index + 1}`}
            >
              <motion.div
                animate={{
                  width: index === currentSlide ? 20 : 6,
                  backgroundColor: index === currentSlide ? "#5eb3ce" : "rgba(255, 255, 255, 0.4)"
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="h-1.5 sm:h-2 rounded-full"
              />
            </motion.button>
          ))}
        </div>
      )}

      {/* Scroll Indicator - Modern Style */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="flex flex-col items-center gap-1 sm:gap-2 cursor-pointer"
          onClick={() => scrollToSection("#about")}
        >
          <span className="text-[10px] sm:text-xs text-white/70 uppercase tracking-wider font-medium">Scroll</span>
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-1 sm:p-1.5 backdrop-blur-sm bg-white/5"
          >
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-1 h-2 sm:w-1.5 sm:h-3 bg-[#5eb3ce] rounded-full" 
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

