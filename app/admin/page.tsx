"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiGrid, FiImage, FiBook, FiUsers } from "react-icons/fi";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    menuItems: 0,
    heroSlides: 0,
    galleryImages: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [menuRes, heroRes, galleryRes] = await Promise.all([
          fetch("/api/menu"),
          fetch("/api/hero"),
          fetch("/api/gallery"),
        ]);

        const menuData = await menuRes.json();
        const heroData = await heroRes.json();
        const galleryData = await galleryRes.json();

        setStats({
          menuItems: menuData.menuItems?.length || 0,
          heroSlides: heroData.length || 0,
          galleryImages: galleryData.length || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: "Menu Items",
      value: stats.menuItems,
      icon: FiGrid,
      color: "bg-blue-500",
      href: "/admin/menu",
    },
    {
      title: "Hero Slides",
      value: stats.heroSlides,
      icon: FiImage,
      color: "bg-green-500",
      href: "/admin/hero",
    },
    {
      title: "Gallery Images",
      value: stats.galleryImages,
      icon: FiBook,
      color: "bg-purple-500",
      href: "/admin/gallery",
    },
  ];

  return (
    <div className="p-6 md:p-8 bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
              Welcome back! 👋
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              Lubina Blanca Admin Dashboard
            </p>
          </div>
          <div className="bg-white rounded-xl px-4 py-3 shadow-md border border-gray-200">
            <p className="text-sm text-gray-500">Today&apos;s Date</p>
            <p className="text-lg font-semibold text-gray-800">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Link key={card.title} href={card.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-6 cursor-pointer border border-gray-200 hover:shadow-2xl transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">{card.title}</p>
                    <p className="text-4xl font-bold text-gray-900">{card.value}</p>
                  </div>
                  <div className={`${card.color} p-5 rounded-2xl shadow-lg`}>
                    <Icon className="text-white" size={28} />
                  </div>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="bg-[#5eb3ce] w-1 h-6 mr-3 rounded"></span>
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link href="/admin/menu">
              <button className="w-full text-left px-5 py-4 bg-gradient-to-r from-[#5eb3ce] to-[#3a8fa8] hover:from-[#3a8fa8] hover:to-[#5eb3ce] text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg">
                ➕ Add New Menu Item
              </button>
            </Link>
            <Link href="/admin/hero">
              <button className="w-full text-left px-5 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-500 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg">
                🖼️ Manage Hero Slides
              </button>
            </Link>
            <Link href="/admin/gallery">
              <button className="w-full text-left px-5 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-500 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg">
                📸 Upload Gallery Images
              </button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="bg-green-500 w-1 h-6 mr-3 rounded"></span>
            System Info
          </h2>
          <div className="space-y-4 text-base">
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-700 font-medium">Version</span>
              <span className="font-bold text-gray-900">1.0.0</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-700 font-medium">Last Updated</span>
              <span className="font-bold text-gray-900">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-gray-700 font-medium">Status</span>
              <span className="font-bold text-green-600 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Active
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}




