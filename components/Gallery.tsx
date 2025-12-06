"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { galleryImages } from "@/data/restaurantData";

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <section id="gallery" className="py-10 md:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 md:mb-8"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            Gallery
          </h2>
          <div className="w-12 md:w-20 h-1 bg-[#5eb3ce] mx-auto mb-3" />
          <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            A glimpse into our culinary artistry and elegant atmosphere
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              variants={item}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              transition={{ duration: 0.3 }}
              className={`relative overflow-hidden rounded-lg md:rounded-2xl shadow-md md:shadow-lg cursor-pointer ${
                index === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <div
                className={`relative ${
                  index === 0 ? "h-[250px] md:h-[400px] lg:h-full" : "h-[150px] md:h-64"
                }`}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                  sizes={index === 0 ? "(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px" : "(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 400px"}
                  quality={85}
                  loading={index < 3 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

