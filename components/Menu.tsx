"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { menuItems, menuCategories, MenuItem } from "@/data/menuData";
import MenuItemModal from "./MenuItemModal";
import PositionedImage from "./PositionedImage";
import { FiChevronDown } from "react-icons/fi";

export default function Menu() {
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

  const filteredItems = selectedCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

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
    <section id="menu" className="py-10 md:py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Menu
          </h2>
          <div className="w-20 h-1 bg-[#5eb3ce] mx-auto mb-8" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully crafted dishes featuring the finest Mediterranean ingredients
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {menuCategories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? "bg-[#5eb3ce] text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow"
              }`}
            >
              {category}
            </motion.button>
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
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative group cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="relative h-64 overflow-hidden group/image"
                    >
                      <PositionedImage
                        src={menuItem.image}
                        alt={menuItem.name}
                        position={menuItem.imagePosition}
                        className="absolute inset-0"
                        priority={isInInitialView}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 right-4 bg-[#5eb3ce] text-white px-4 py-2 rounded-full font-bold z-20">
                        {menuItem.price}
                      </div>
                    </motion.div>

                    <div className="p-6 relative z-20">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {menuItem.name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                        {menuItem.description}
                      </p>
                      {menuItem.preparationOptions && (
                        <p className="text-[#5eb3ce] text-xs mt-2 font-medium">
                          Multiple preparations available
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
                  <span>Show Less</span>
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

