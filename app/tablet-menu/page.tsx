"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuItem } from "@/data/menuData";
import MenuItemModal from "@/components/MenuItemModal";
import PositionedImage from "@/components/PositionedImage";

export default function TabletMenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [menuCategories, setMenuCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const openModal = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/menu");
      if (!response.ok) {
        throw new Error("Failed to fetch menu data");
      }
      const data = await response.json();
      setMenuItems(data.menuItems || []);
      setMenuCategories(data.menuCategories || []);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 },
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#5eb3ce] mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading menu...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <img
              src="/lubinalogo.png"
              alt="Lubina Blanca"
              className="h-20 w-auto"
            />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Lubina Blanca</h1>
              <p className="text-gray-600 text-lg">Mediterranean Seafood Restaurant</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-right">
            <p className="text-gray-600 text-lg">Call for Orders</p>
            <a
              href="tel:+212539318849"
              className="text-2xl font-bold text-[#5eb3ce] hover:text-[#3a8fa8] transition-colors"
            >
              +212 5393-18849
            </a>
          </div>
        </div>

        {/* Category Filter */}
        {menuCategories.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-8">
            {menuCategories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all ${
                selectedCategory === category
                  ? "bg-[#5eb3ce] text-white shadow-xl scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-lg"
              }`}
            >
              {category}
            </motion.button>
            ))}
          </div>
        )}

        {/* Items Count */}
        <div className="mb-6">
          <p className="text-gray-700 text-xl">
            <span className="font-bold text-[#5eb3ce] text-2xl">
              {filteredItems.length}
            </span>{" "}
            item{filteredItems.length !== 1 ? "s" : ""}
            {selectedCategory !== "All" && (
              <span>
                {" "}
                in <span className="font-bold">{selectedCategory}</span>
              </span>
            )}
          </p>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-2xl text-gray-500">No items found in this category.</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              variants={container}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredItems.map((menuItem) => (
                <motion.div
                  key={menuItem.id}
                  variants={item}
                  layout
                  onClick={() => openModal(menuItem)}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <PositionedImage
                        src={menuItem.image}
                        alt={menuItem.name}
                        position={menuItem.imagePosition}
                        className="w-full h-full"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Price Badge */}
                    <div className="absolute bottom-3 right-3 bg-[#5eb3ce] text-white px-5 py-2 rounded-full font-bold text-lg shadow-lg">
                      {menuItem.price}
                    </div>

                    {/* Multiple Images Indicator */}
                    {menuItem.images && menuItem.images.length > 1 && (
                      <div className="absolute top-3 right-3 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <span>📸</span>
                        <span>{menuItem.images.length}</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                      {menuItem.name}
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed line-clamp-2 mb-2">
                      {menuItem.description}
                    </p>
                    {menuItem.preparationOptions && (
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-lg">👨‍🍳</span>
                        <p className="text-[#5eb3ce] text-sm font-semibold">
                          Multiple preparations
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-base">
          <p>Tap any item to see details and preparation options</p>
        </div>
      </div>

      {/* Menu Item Modal */}
      <MenuItemModal item={selectedItem} isOpen={isModalOpen} onClose={closeModal} />
    </main>
  );
}





