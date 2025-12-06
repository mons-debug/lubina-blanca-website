"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiHome,
  FiImage,
  FiGrid,
  FiBook,
  FiInfo,
  FiMail,
  FiLogOut,
  FiLayers,
} from "react-icons/fi";
import toast from "react-hot-toast";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: FiHome },
  { name: "Hero Slides", href: "/admin/hero", icon: FiImage },
  { name: "Menu Items", href: "/admin/menu", icon: FiGrid },
  { name: "Gallery", href: "/admin/gallery", icon: FiBook },
  { name: "About", href: "/admin/about", icon: FiInfo },
  { name: "Interior", href: "/admin/interior", icon: FiLayers },
  { name: "Contact Info", href: "/admin/contact", icon: FiMail },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      toast.success("Logged out successfully");
      router.push("/admin/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="w-64 bg-gradient-to-br from-[#1a2332] to-[#2c3e50] text-white min-h-screen flex flex-col shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <img 
          src="/lubinalogo.png" 
          alt="Lubina Blanca Logo" 
          className="h-16 w-auto mb-3 drop-shadow-lg"
        />
        <h1 className="text-2xl font-bold text-[#5eb3ce] drop-shadow-md">Lubina Blanca</h1>
        <p className="text-sm text-gray-300 mt-1 font-medium">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-[#5eb3ce] to-[#3a8fa8] text-white shadow-lg font-bold"
                    : "text-gray-300 hover:bg-gray-700/50 hover:text-white font-medium"
                }`}
              >
                <Icon size={22} />
                <span>{item.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 rounded-xl w-full text-gray-300 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 hover:text-white transition-all font-semibold shadow-md"
        >
          <FiLogOut size={22} />
          <span>Logout</span>
        </motion.button>
      </div>
    </div>
  );
}


