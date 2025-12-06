"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiInstagram } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { restaurantInfo } from "@/data/restaurantData";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Menu", href: "#menu" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection("#home")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <img 
              src="/lubinalogo.png" 
              alt="Lubina Blanca Logo" 
              className="h-12 md:h-16 w-auto"
            />
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`font-medium transition-colors ${
                  scrolled
                    ? "text-gray-700 hover:text-[#5eb3ce]"
                    : "text-white hover:text-[#e8d5b5]"
                }`}
              >
                {link.name}
              </motion.button>
            ))}
            
            {/* Social Icons */}
            <div className="flex items-center space-x-4 ml-4 border-l pl-4">
              <motion.a
                href={restaurantInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className={scrolled ? "text-gray-700" : "text-white"}
              >
                <FiInstagram size={20} />
              </motion.a>
              <motion.a
                href={restaurantInfo.social.googleBusiness}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className={scrolled ? "text-gray-700" : "text-white"}
              >
                <FaGoogle size={20} />
              </motion.a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden z-50 ${scrolled ? "text-gray-700" : "text-white"}`}
          >
            {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-full bg-white md:hidden shadow-2xl z-50"
          >
            {/* Close Button - Top Right */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.1 }}
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-50"
              aria-label="Close menu"
            >
              <FiX size={24} className="text-gray-800" />
            </motion.button>

            <div className="flex flex-col items-center justify-center h-full space-y-8 px-4">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(link.href)}
                  className="text-2xl font-medium text-gray-800 hover:text-[#5eb3ce] transition-colors"
                >
                  {link.name}
                </motion.button>
              ))}
              
              {/* Mobile Social Icons */}
              <div className="flex items-center space-x-6 pt-8">
                <motion.a
                  href={restaurantInfo.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-800"
                >
                  <FiInstagram size={32} />
                </motion.a>
                <motion.a
                  href={restaurantInfo.social.googleBusiness}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-800"
                >
                  <FaGoogle size={32} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}


