"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { menuItems, menuCategories, MenuItem } from "@/data/menuData";
import MenuItemModal from "./MenuItemModal";
import PositionedImage from "./PositionedImage";
import { FiChevronDown } from "react-icons/fi";
import { useTranslation, useLanguage } from "@/lib/LanguageContext";

export default function Menu() {
  const { t, tCategory, getMenuItemName, getMenuItemDesc } = useTranslation();
  const { isRTL } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);
  const expandButtonRef = useRef<HTMLButtonElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const openModal = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  // Filter out hidden items first, then apply category filter
  const visibleMenuItems = menuItems.filter(item => !item.hidden);
  const filteredItems = selectedCategory === "All"
    ? visibleMenuItems
    : visibleMenuItems.filter(item => item.category === selectedCategory);

  // Calculate items to show: 2 rows initially, then expand by 3 rows at a time
  const itemsPerRow = isMobile ? 2 : 3;
  const initialItemsCount = itemsPerRow * 2; // 2 rows initially
  const itemsPerExpansion = itemsPerRow * 3; // 3 rows per expansion

  // Calculate how many items to show based on expansion count
  const [expansionCount, setExpansionCount] = useState(0);
  const [previouslyVisibleCount, setPreviouslyVisibleCount] = useState(initialItemsCount);
  const maxVisibleItems = initialItemsCount + (expansionCount * itemsPerExpansion);
  const visibleItems = filteredItems.slice(0, maxVisibleItems);
  const hasMoreItems = filteredItems.length > maxVisibleItems;
  const remainingItems = filteredItems.length - maxVisibleItems;

  // Reset expansion when category changes
  useEffect(() => {
    setExpansionCount(0);
    setIsExpanded(false);
    setPreviouslyVisibleCount(initialItemsCount);
  }, [selectedCategory, initialItemsCount]);

  const handleExpand = () => {
    // Store the expand button's position before expansion
    const buttonElement = expandButtonRef.current;
    const buttonPositionBefore = buttonElement?.getBoundingClientRect().top || 0;

    // Update previously visible count before expansion for animation tracking
    setPreviouslyVisibleCount(maxVisibleItems);

    setExpansionCount(prev => prev + 1);
    setIsExpanded(true);

    // After items are added, smoothly adjust scroll to keep button in similar position
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (buttonElement) {
          const buttonPositionAfter = buttonElement.getBoundingClientRect().top;
          const positionDifference = buttonPositionBefore - buttonPositionAfter;

          // Only scroll if button moved up significantly (more than 20px)
          if (positionDifference > 20) {
            window.scrollBy({
              top: positionDifference,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  };

  const handleCollapse = () => {
    setExpansionCount(0);
    setIsExpanded(false);
    setTimeout(() => {
      document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <section id="menu" className="relative py-16 md:py-20 bg-white overflow-hidden">
      {/* Zellige pattern overlay for event feel */}
      <div className="absolute inset-0 zellige-pattern-white pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-slate-400 text-sm uppercase tracking-[0.3em] mb-4">{t('menu', 'subtitle')}</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-slate-900 mb-6" style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}>
            {t('menu', 'title')}
          </h2>
          <div className="w-16 h-[1px] bg-slate-300 mx-auto mb-6" />
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto font-light">
            {t('menu', 'subtitle')}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-16"
        >
          {menuCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 text-sm tracking-wide transition-all duration-300 ${selectedCategory === category
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
            >
              {tCategory(category)}
            </button>
          ))}
        </motion.div>

        {/* Items Count */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            Showing <span className="font-bold text-[#5eb3ce]">{filteredItems.length}</span> item{filteredItems.length !== 1 ? 's' : ''}
            {selectedCategory !== "All" && <span> in <span className="font-bold">{selectedCategory}</span></span>}
          </p>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">No items found in this category.</p>
          </div>
        ) : (
          <div className="relative">
            <div
              ref={gridRef}
              className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
            >
              <AnimatePresence mode="popLayout">
                {visibleItems.map((menuItem, index) => {
                  const isInInitialView = index < initialItemsCount;
                  const isNewlyAdded = index >= previouslyVisibleCount;

                  return (
                    <motion.div
                      key={menuItem.id}
                      initial={isNewlyAdded ? { opacity: 0, y: 10, scale: 0.95 } : false}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      layout
                      transition={{
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                        delay: isNewlyAdded ? (index - previouslyVisibleCount) * 0.05 : 0
                      }}
                      onClick={() => openModal(menuItem)}
                      className="group bg-white overflow-hidden cursor-pointer"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <PositionedImage
                          src={menuItem.image}
                          alt={menuItem.name}
                          position={menuItem.imagePosition}
                          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                          priority={isInInitialView}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                        {/* Price Badge */}
                        <div className="absolute top-4 right-4 bg-white/95 text-slate-900 px-3 py-1 text-sm font-medium">
                          {menuItem.price}
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="text-lg font-medium text-slate-900 mb-2 group-hover:text-slate-600 transition-colors">
                          {getMenuItemName(menuItem)}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 font-light">
                          {getMenuItemDesc(menuItem)}
                        </p>
                        {menuItem.preparationOptions && (
                          <p className="text-slate-500 text-xs mt-3">
                            {t('menu', 'optionsAvailable')}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Fade Overlay and Expand Button */}
            {hasMoreItems && (
              <div className="relative -mt-32 pt-32">
                {/* White Fade Gradient - only show when not fully expanded */}
                {expansionCount === 0 && (
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent pointer-events-none" />
                )}

                {/* Expand Button */}
                <div className="relative flex justify-center pt-8">
                  <motion.button
                    ref={expandButtonRef}
                    onClick={handleExpand}
                    whileHover={{ scale: 1.05, y: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all border border-gray-200 group"
                  >
                    <span className="text-sm font-semibold text-gray-700">
                      {remainingItems > itemsPerExpansion
                        ? `Show ${itemsPerExpansion} More Items`
                        : `Show ${remainingItems} More Items`}
                    </span>
                    <motion.div
                      animate={{ y: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <FiChevronDown className="text-[#5eb3ce] text-xl" />
                    </motion.div>
                  </motion.button>
                </div>
              </div>
            )}

            {/* Collapse Button (when expanded) */}
            {isExpanded && expansionCount > 0 && (
              <div className="flex justify-center mt-8">
                <motion.button
                  onClick={handleCollapse}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all border border-gray-200 text-sm font-semibold text-gray-700"
                >
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <FiChevronDown className="text-[#5eb3ce] text-xl rotate-180" />
                  </motion.div>
                  <span>{t('menu', 'showLess')}</span>
                </motion.button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Menu Item Modal */}
      <MenuItemModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
}

