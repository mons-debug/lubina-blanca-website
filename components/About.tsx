"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
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

  // Auto-rotate images
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id="about" className="relative py-12 md:py-24 lg:py-32 bg-white overflow-hidden">
      {/* Subtle decorative pattern overlay */}
      <div className="absolute inset-0 zellige-pattern-white pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-24 items-center">

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] md:aspect-[4/5] overflow-hidden">
              {images.length > 0 ? (
                <>
                  <Image
                    src={images[currentIndex]?.url || "/placeholder.jpg"}
                    alt={images[currentIndex]?.alt || "About Lubina Blanca"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Image dots */}
                  {images.length > 1 && (
                    <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 flex gap-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "bg-white w-6" : "bg-white/50"
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
            <p className="text-slate-400 text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] mb-3 md:mb-4">Our Story</p>

            <h2
              className="text-3xl md:text-4xl lg:text-6xl font-extralight text-slate-900 mb-4 md:mb-8 leading-tight"
              style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}
            >
              About Us
            </h2>

            <div className="w-12 md:w-16 h-[1px] bg-slate-300 mb-4 md:mb-8" />

            <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-4 md:mb-6 font-light">
              {restaurantInfo.description}
            </p>

            <p className="text-sm md:text-base text-slate-500 leading-relaxed mb-6 md:mb-12 font-light">
              Our commitment to quality and authenticity shines through in every dish we serve.
              From the freshest seafood to carefully selected ingredients, we bring the flavors
              of the Mediterranean coast directly to your table.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              {[
                { value: "10+", label: "Years" },
                { value: "50+", label: "Dishes" },
                { value: "5★", label: "Rating" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div
                    className="text-2xl md:text-4xl font-extralight text-slate-900 mb-1"
                    style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wider md:tracking-widest">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
