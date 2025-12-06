"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";
import { MenuItem } from "@/data/menuData";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import PositionedImage from "./PositionedImage";

interface MenuItemModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuItemModal({ item, isOpen, onClose }: MenuItemModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Get all images (use images array if available, otherwise fallback to single image)
  const allImages = item?.images && item.images.length > 0 ? item.images : item?.image ? [item.image] : [];
  
  // Get positions for images
  const allPositions = item?.images && item.images.length > 0 
    ? item.imagesPositions || []
    : item?.imagePosition 
      ? [item.imagePosition]
      : [];
  
  // Reset active image when item changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [item?.id]);

  // Close on Escape key
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

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Handle swipe/drag gestures
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (allImages.length <= 1) return;
    
    const swipeThreshold = 50;
    const velocityThreshold = 500;
    
    // Check if swipe was strong enough
    if (Math.abs(info.offset.x) > swipeThreshold || Math.abs(info.velocity.x) > velocityThreshold) {
      if (info.offset.x > 0 || info.velocity.x > 0) {
        // Swipe right - previous image
        prevImage();
      } else {
        // Swipe left - next image
        nextImage();
      }
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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all hover:scale-110"
              >
                <FiX size={24} />
              </button>

              {/* Image Gallery */}
              <div className="relative">
                {/* Main Image */}
                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  className="relative h-[300px] md:h-[400px] bg-gray-900 rounded-t-3xl overflow-hidden cursor-grab active:cursor-grabbing"
                >
                  <motion.div
                    key={activeImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
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
                  
                  {/* Navigation Arrows (only show if multiple images) */}
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all hover:scale-110"
                      >
                        <FiChevronLeft size={24} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all hover:scale-110"
                      >
                        <FiChevronRight size={24} />
                      </button>

                      {/* Image Counter */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
                        {activeImageIndex + 1} / {allImages.length}
                      </div>
                    </>
                  )}
                </motion.div>

                {/* Thumbnails (only show if multiple images) */}
                {allImages.length > 1 && (
                  <div className="flex gap-2 p-4 overflow-x-auto">
                    {allImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          index === activeImageIndex
                            ? "border-[#5eb3ce] scale-105 shadow-lg"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${item.name} ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      {item.name}
                    </h2>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <MdOutlineRestaurantMenu size={16} />
                      <span>{item.category}</span>
                    </div>
                  </div>
                  <div className="bg-[#5eb3ce] text-white px-6 py-3 rounded-full font-bold text-xl shadow-lg flex-shrink-0">
                    {item.price}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    {item.description}
                  </p>
                </div>

                {/* Preparation Options */}
                {item.preparationOptions && (
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-2xl">👨‍🍳</span>
                      Preparation Options
                    </h3>
                    <p className="text-gray-700 text-base leading-relaxed">
                      {item.preparationOptions}
                    </p>
                  </div>
                )}

                {/* Action Button */}
                <div className="mt-8 flex gap-4">
                  <button
                    onClick={onClose}
                    className="flex-1 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full font-semibold transition-colors"
                  >
                    Close
                  </button>
                  <a
                    href={`tel:+212539318849`}
                    className="flex-1 px-6 py-4 bg-[#5eb3ce] hover:bg-[#3a8fa8] text-white rounded-full font-semibold transition-colors text-center"
                  >
                    Call to Order
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}





