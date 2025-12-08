"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";
import { MenuItem } from "@/data/menuData";
import { FiX, FiChevronLeft, FiChevronRight, FiPhone } from "react-icons/fi";
import PositionedImage from "./PositionedImage";
import { useTranslation, useLanguage } from "@/lib/LanguageContext";

interface MenuItemModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuItemModal({ item, isOpen, onClose }: MenuItemModalProps) {
  const { t, tCategory, getMenuItemName, getMenuItemDesc } = useTranslation();
  const { isRTL } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Combine main image with variant images
  const allImages = item?.images && item.images.length > 0
    ? [item.image, ...item.images]
    : item?.image
      ? [item.image]
      : [];

  const allPositions = item?.imagesPositions && item.imagesPositions.length > 0
    ? [item.imagePosition || { x: 0, y: 0, zoom: 1 }, ...item.imagesPositions]
    : item?.imagePosition
      ? [item.imagePosition]
      : [];

  useEffect(() => {
    setActiveImageIndex(0);
  }, [item?.id]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!item) return null;

  const nextImage = () => setActiveImageIndex((prev) => (prev + 1) % allImages.length);
  const prevImage = () => setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (allImages.length <= 1) return;
    const swipeThreshold = 50;
    if (Math.abs(info.offset.x) > swipeThreshold) {
      if (info.offset.x > 0) prevImage();
      else nextImage();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden relative shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
              >
                <FiX size={20} />
              </button>

              <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
                {/* Image Section */}
                <div className="relative md:w-3/5 bg-slate-900 flex-shrink-0">
                  {/* Main Image */}
                  <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                    className="relative h-72 md:h-[500px] cursor-grab active:cursor-grabbing"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full"
                      >
                        <PositionedImage
                          src={allImages[activeImageIndex]}
                          alt={item.name}
                          position={allPositions[activeImageIndex]}
                          className="w-full h-full"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    {allImages.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
                        >
                          <FiChevronLeft size={20} />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
                        >
                          <FiChevronRight size={20} />
                        </button>
                      </>
                    )}
                  </motion.div>

                  {/* Gallery Thumbnails - Displayed at bottom of image section */}
                  {allImages.length > 1 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <div className="flex justify-center gap-2">
                        {allImages.map((image, index) => (
                          <motion.button
                            key={index}
                            onClick={() => setActiveImageIndex(index)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all ${index === activeImageIndex
                              ? "ring-2 ring-white ring-offset-2 ring-offset-black/50"
                              : "opacity-60 hover:opacity-100"
                              }`}
                          >
                            <Image
                              src={image}
                              alt={`${item.name} variant ${index + 1}`}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                            {index === 0 && allImages.length > 1 && (
                              <div className="absolute inset-0 flex items-end justify-center pb-1">
                                <span className="text-[10px] text-white bg-black/50 px-1.5 py-0.5 rounded">
                                  Main
                                </span>
                              </div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                      <p className="text-center text-white/60 text-xs mt-2">
                        {activeImageIndex + 1} of {allImages.length} • Swipe to browse
                      </p>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className={`flex-1 p-6 md:p-8 overflow-y-auto ${isRTL ? 'text-right' : ''}`}>
                  {/* Category Badge */}
                  <span className="inline-block bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs uppercase tracking-wider mb-4">
                    {tCategory(item.category)}
                  </span>

                  {/* Title */}
                  <h2
                    className="text-2xl md:text-3xl font-light text-slate-900 mb-2"
                    style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}
                  >
                    {getMenuItemName(item)}
                  </h2>

                  {/* Price */}
                  <p className="text-2xl font-medium text-[#5eb3ce] mb-6">
                    {item.price}
                  </p>

                  <div className="w-12 h-[1px] bg-slate-200 mb-6" />

                  {/* Description */}
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {getMenuItemDesc(item)}
                  </p>

                  {/* Preparation Options */}
                  {item.preparationOptions && (
                    <div className="bg-slate-50 rounded-xl p-5 mb-6">
                      <h3 className="text-sm uppercase tracking-wider text-slate-500 mb-2">
                        {t('menu', 'preparationOptions')}
                      </h3>
                      <p className="text-slate-700">
                        {item.preparationOptions}
                      </p>
                    </div>
                  )}

                  {/* Gallery Info */}
                  {allImages.length > 1 && (
                    <div className="bg-blue-50 rounded-xl p-5 mb-6">
                      <h3 className="text-sm uppercase tracking-wider text-blue-600 mb-2">
                        📸 {allImages.length} {t('menu', 'moreImages')}
                      </h3>
                      <p className="text-blue-700 text-sm">
                        {t('tabletMenu', 'tapToView')}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className={`flex gap-3 mt-auto pt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <button
                      onClick={onClose}
                      className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium rounded-xl transition-colors"
                    >
                      {t('common', 'close')}
                    </button>
                    <a
                      href="tel:+212539318849"
                      className={`flex-1 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                      <FiPhone size={16} />
                      {t('common', 'callNow')}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
