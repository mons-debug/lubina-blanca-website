"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuItem } from "@/data/menuData";
import MenuItemModal from "@/components/MenuItemModal";
import PositionedImage from "@/components/PositionedImage";
import { FiPhone, FiGlobe } from "react-icons/fi";
import { LanguageProvider, useLanguage, useTranslation } from "@/lib/LanguageContext";
import { languages } from "@/lib/translations";
import TabletLanguageSelector from "./TabletLanguageSelector";

function TabletMenuContent() {
  const { language, setLanguage, languageSelected, isRTL } = useLanguage();
  const { t, tCategory, getMenuItemName, getMenuItemDesc } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [menuCategories, setMenuCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLangMenu, setShowLangMenu] = useState(false);

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
      transition: { staggerChildren: 0.03 },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  const currentLang = languages.find(l => l.code === language);

  // Show language selector if not selected
  if (!languageSelected) {
    return <TabletLanguageSelector />;
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-2 border-slate-200 border-t-[#5eb3ce] rounded-full mx-auto mb-4"
          />
          <p className="text-slate-500">{t('tabletMenu', 'loadingMenu')}</p>
        </div>
      </main>
    );
  }

  return (
    <main className={`min-h-screen bg-slate-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Header - Fixed */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto px-4 py-3">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Logo Only */}
            <img
              src="/lubinalogo.png"
              alt="Lubina Blanca"
              className="h-14 w-auto"
            />

            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <FiGlobe size={16} className="text-slate-600" />
                  <span className="text-lg">{currentLang?.flag}</span>
                </button>

                <AnimatePresence>
                  {showLangMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`absolute ${isRTL ? 'left-0' : 'right-0'} top-full mt-2 bg-white rounded-xl shadow-xl overflow-hidden min-w-[160px] z-50`}
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setShowLangMenu(false);
                          }}
                          className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors ${language === lang.code ? 'bg-slate-100' : ''}`}
                        >
                          <span className="text-xl">{lang.flag}</span>
                          <span className="text-slate-700 text-sm font-medium">{lang.nativeName}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Call Button */}
              <a
                href="tel:+212539318849"
                className={`flex items-center gap-2 bg-[#5eb3ce] text-white px-5 py-2.5 rounded-full font-medium hover:bg-[#4da3be] transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <FiPhone size={18} />
                <span className="hidden sm:inline">+212 5393-18849</span>
                <span className="sm:hidden">{t('common', 'call')}</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Category Filter - Sticky below header */}
      <div className="sticky top-[70px] z-30 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto px-4 py-3">
          <div className={`flex gap-2 overflow-x-auto pb-1 scrollbar-hide ${isRTL ? 'flex-row-reverse' : ''}`}>
            {menuCategories.map((category) => (
              <motion.button
                key={category}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full font-medium text-sm transition-all ${selectedCategory === category
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
              >
                {tCategory(category)}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-4 py-4">
        {/* Items Count */}
        <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <p className="text-slate-500 text-sm">
            <span className="font-semibold text-slate-900">{filteredItems.length}</span>
            {" "}{filteredItems.length !== 1 ? t('tabletMenu', 'items') : t('tabletMenu', 'item')}
            {selectedCategory !== "All" && (
              <span className="text-slate-400"> {t('tabletMenu', 'in')} {tCategory(selectedCategory)}</span>
            )}
          </p>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-400">{t('tabletMenu', 'noItems')}</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              variants={container}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
            >
              {filteredItems.map((menuItem) => (
                <motion.div
                  key={menuItem.id}
                  variants={itemVariant}
                  layout
                  onClick={() => openModal(menuItem)}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200 cursor-pointer active:scale-[0.98]"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <PositionedImage
                      src={menuItem.image}
                      alt={menuItem.name}
                      position={menuItem.imagePosition}
                      className="w-full h-full transition-transform duration-300 hover:scale-105"
                    />

                    {/* Price Badge */}
                    <div className={`absolute bottom-2 ${isRTL ? 'left-2' : 'right-2'} bg-white/95 backdrop-blur-sm text-slate-900 px-3 py-1 rounded-lg font-semibold text-sm shadow-sm`}>
                      {menuItem.price}
                    </div>

                    {/* Multiple Images Indicator */}
                    {menuItem.images && menuItem.images.length > 0 && (
                      <div className={`absolute top-2 ${isRTL ? 'left-2' : 'right-2'} bg-black/50 backdrop-blur-sm text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium`}>
                        +{menuItem.images.length}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-3">
                    <h3 className={`font-semibold text-slate-900 text-sm leading-tight mb-1 line-clamp-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {getMenuItemName(menuItem)}
                    </h3>
                    <p className={`text-slate-500 text-xs leading-relaxed line-clamp-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {getMenuItemDesc(menuItem)}
                    </p>
                    {menuItem.preparationOptions && (
                      <div className={`mt-2 flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-[10px] bg-[#5eb3ce]/10 text-[#5eb3ce] px-2 py-0.5 rounded-full font-medium">
                          {t('menu', 'optionsAvailable')}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Footer Hint */}
        <div className="mt-8 pb-6 text-center">
          <p className="text-slate-400 text-xs">
            {t('tabletMenu', 'tapToView')}
          </p>
        </div>
      </div>

      {/* Menu Item Modal */}
      <MenuItemModal item={selectedItem} isOpen={isModalOpen} onClose={closeModal} />
    </main>
  );
}

export default function TabletMenuPage() {
  return (
    <LanguageProvider>
      <TabletMenuContent />
    </LanguageProvider>
  );
}
