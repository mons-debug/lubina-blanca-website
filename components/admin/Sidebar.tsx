"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiImage,
  FiGrid,
  FiBook,
  FiInfo,
  FiMail,
  FiLogOut,
  FiLayers,
  FiMenu,
  FiX,
} from "react-icons/fi";
import toast from "react-hot-toast";

const menuItems = [
  { name: "Dashboard", href: "/lubina-gestion-2025", icon: FiHome },
  { name: "Hero Slides", href: "/lubina-gestion-2025/hero", icon: FiImage },
  { name: "Menu Items", href: "/lubina-gestion-2025/menu", icon: FiGrid },
  { name: "Gallery", href: "/lubina-gestion-2025/gallery", icon: FiBook },
  { name: "About", href: "/lubina-gestion-2025/about", icon: FiInfo },
  { name: "Interior", href: "/lubina-gestion-2025/interior", icon: FiLayers },
  { name: "Contact Info", href: "/lubina-gestion-2025/contact", icon: FiMail },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      toast.success("Logged out successfully");
      router.push("/lubina-gestion-2025/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const SidebarContent = () => (
    <>
      {/* Header */}
      <div className="p-4 lg:p-6 border-b border-gray-700">
        <img
          src="/lubinalogo.png"
          alt="Lubina Blanca Logo"
          className="h-12 lg:h-16 w-auto mb-2 lg:mb-3 drop-shadow-lg"
        />
        <h1 className="text-xl lg:text-2xl font-bold text-[#5eb3ce] drop-shadow-md">Lubina Blanca</h1>
        <p className="text-xs lg:text-sm text-gray-300 mt-1 font-medium">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 lg:p-4 space-y-1 lg:space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
              <motion.div
                whileHover={{ x: 4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl transition-all ${isActive
                    ? "bg-gradient-to-r from-[#5eb3ce] to-[#3a8fa8] text-white shadow-lg font-bold"
                    : "text-gray-300 hover:bg-gray-700/50 hover:text-white font-medium"
                  }`}
              >
                <Icon size={20} />
                <span className="text-sm lg:text-base">{item.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 lg:p-4 border-t border-gray-700">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleLogout}
          className="flex items-center space-x-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl w-full text-gray-300 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 hover:text-white transition-all font-semibold"
        >
          <FiLogOut size={20} />
          <span className="text-sm lg:text-base">Logout</span>
        </motion.button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-[#1a2332] text-white rounded-xl shadow-lg"
        aria-label="Open menu"
      >
        <FiMenu size={24} />
      </button>

      {/* Mobile Sidebar with Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
            />
            {/* Mobile Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="lg:hidden fixed left-0 top-0 h-full w-64 bg-gradient-to-br from-[#1a2332] to-[#2c3e50] text-white flex flex-col shadow-2xl z-50"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white"
                aria-label="Close menu"
              >
                <FiX size={24} />
              </button>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-gradient-to-br from-[#1a2332] to-[#2c3e50] text-white min-h-screen flex-col shadow-2xl">
        <SidebarContent />
      </div>
    </>
  );
}


