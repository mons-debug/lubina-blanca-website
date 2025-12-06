"use client";

import { motion } from "framer-motion";
import { FiInstagram, FiHeart } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { restaurantInfo } from "@/data/restaurantData";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2c3e50] text-white py-6 sm:py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: Compact 2-column layout, Desktop: 3-column */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
          {/* Brand - Full width on mobile, then normal */}
          <div className="col-span-2 md:col-span-1">
            <img 
              src="/lubinalogo.png" 
              alt="Lubina Blanca Logo" 
              className="h-12 sm:h-16 md:h-20 w-auto mb-2 sm:mb-3 md:mb-4"
            />
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#5eb3ce] mb-2 sm:mb-3 md:mb-4">
              {restaurantInfo.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4">
              {restaurantInfo.tagline}
            </p>
            <div className="flex space-x-2 sm:space-x-4">
              <motion.a
                href={restaurantInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="bg-[#5eb3ce] p-2 sm:p-3 rounded-full hover:bg-[#3a8fa8] transition-colors"
              >
                <FiInstagram size={16} className="sm:w-5 sm:h-5" />
              </motion.a>
              <motion.a
                href={restaurantInfo.social.googleBusiness}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className="bg-[#5eb3ce] p-2 sm:p-3 rounded-full hover:bg-[#3a8fa8] transition-colors"
              >
                <FaGoogle size={16} className="sm:w-5 sm:h-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links - Compact on mobile */}
          <div className="col-span-1">
            <h4 className="text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3 md:mb-4">Quick Links</h4>
            <ul className="space-y-1 sm:space-y-2">
              {["Home", "About", "Menu", "Gallery", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-xs sm:text-sm text-gray-300 hover:text-[#5eb3ce] transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - Compact on mobile */}
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3 md:mb-4">Contact</h4>
            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-300">
              <p className="leading-tight">{restaurantInfo.address.street}</p>
              <p className="leading-tight">{restaurantInfo.address.city} {restaurantInfo.address.zip}</p>
              <p className="leading-tight">{restaurantInfo.address.country}</p>
              <p className="pt-1 sm:pt-2">
                <a href={`tel:${restaurantInfo.phone}`} className="hover:text-[#5eb3ce] transition-colors break-all">
                  {restaurantInfo.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${restaurantInfo.email}`} className="hover:text-[#5eb3ce] transition-colors break-all">
                  {restaurantInfo.email}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Compact on mobile */}
        <div className="border-t border-gray-600 pt-4 sm:pt-6 md:pt-8 text-center">
          <p className="text-xs sm:text-sm text-gray-400 flex flex-wrap items-center justify-center gap-1 sm:gap-2">
            <span>© {currentYear} {restaurantInfo.name}.</span>
            <span className="flex items-center gap-1">
              Made with <FiHeart className="text-[#5eb3ce]" /> for food lovers.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}


