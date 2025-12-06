"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiMonitor, FiCalendar } from "react-icons/fi";

export default function AfconWatch() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const moroccoMatches = [
    {
      opponent: "vs Mali",
      date: "January 15, 2025",
      time: "21:00",
      venue: "Stade Mohammed V, Casablanca"
    },
    {
      opponent: "vs Zambia",
      date: "January 19, 2025",
      time: "18:00",
      venue: "Stade Prince Moulay Abdellah, Rabat"
    },
    {
      opponent: "vs Tanzania",
      date: "January 23, 2025",
      time: "21:00",
      venue: "Stade de Marrakech, Marrakech"
    },
  ];

  return (
    <section id="afcon-watch" className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-[#C1272D] via-[#a02026] to-[#8b1c21]">
      {/* Zellige Moroccan Pattern Background */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{
          backgroundImage: `url('/zelija moncef.svg')`,
          backgroundSize: '300px 300px',
          backgroundRepeat: 'repeat',
          filter: 'brightness(2.5) saturate(0) contrast(1.2)',
          mixBlendMode: 'overlay',
          animation: 'zelligeAfcon 35s ease-in-out infinite'
        }} 
      />

      {/* Add keyframes for animation */}
      <style jsx>{`
        @keyframes zelligeAfcon {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          25% {
            transform: translate(-20px, 20px) rotate(-2deg) scale(1.05);
          }
          50% {
            transform: translate(0, 30px) rotate(0deg) scale(1);
          }
          75% {
            transform: translate(20px, 15px) rotate(2deg) scale(1.05);
          }
        }
      `}</style>

      {/* Floating AFCON Logo */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-10 right-10 opacity-15 hidden lg:block"
      >
        <img 
          src="/afcon2025_logo_land_color-v1.webp" 
          alt="AFCON 2025" 
          className="w-64 h-auto"
        />
      </motion.div>

      {/* Floating Football Icons */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 text-[#006847] opacity-15 text-6xl hidden md:block"
      >
        ⚽
      </motion.div>

      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-10 text-[#D4AF37] opacity-15 text-6xl hidden md:block"
      >
        🏆
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            {/* AFCON Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-4 md:mb-6"
            >
              <img 
                src="/afcon2025_logo_land_color-v1.webp" 
                alt="AFCON 2025 Morocco" 
                className="h-16 md:h-20 w-auto"
              />
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-4 md:mb-6"
            >
              <span className="bg-[#006847] text-white px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-wide">
                Africa Cup 2025 🇲🇦
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6"
            >
              Watch Africa Cup 2025 Live!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-[#D4AF37] mb-4 font-semibold"
            >
              Support Morocco's Team with Great Food & Atmosphere
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base md:text-lg text-white/95 mb-6 md:mb-8 leading-relaxed"
            >
              Join us at Lubina Blanca to celebrate every goal, every victory, and every moment 
              of Morocco's journey. No reservation needed - just walk in and enjoy the match with 
              delicious Mediterranean cuisine!
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-8 md:mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("#menu")}
                className="bg-[#006847] text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg shadow-xl hover:bg-[#00543a] transition-colors"
              >
                View Our Menu
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("#contact")}
                className="bg-white/10 border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg backdrop-blur-sm hover:bg-white/20 transition-colors"
              >
                Get Directions
              </motion.button>
            </motion.div>

            {/* No Reservation Banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-white/15 border-2 border-[#D4AF37] rounded-xl p-4 md:p-6 backdrop-blur-sm"
            >
              <p className="text-white text-base md:text-lg font-semibold text-center">
                🎉 <span className="text-[#D4AF37] font-bold">No Reservation Needed</span> - Just Come & Watch! 🎉
              </p>
            </motion.div>
          </motion.div>

          {/* Morocco Group Matches Schedule */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-white text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center">
              <FiCalendar className="mr-2 md:mr-3" size={24} />
              Morocco Group Stage
            </h3>
            
            {moroccoMatches.map((match, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="bg-white/15 backdrop-blur-md rounded-xl p-4 md:p-6 border-l-4 border-[#D4AF37] hover:bg-white/20 transition-all"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h4 className="text-white font-bold text-lg md:text-xl mb-1">
                      Morocco {match.opponent}
                    </h4>
                    <p className="text-white/80 text-sm md:text-base flex items-center">
                      <FiCalendar size={16} className="mr-2" />
                      {match.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="bg-[#D4AF37] text-[#8b1c21] px-3 md:px-4 py-1 md:py-2 rounded-lg font-bold text-base md:text-lg mb-1">
                      {match.time}
                    </div>
                    <p className="text-white/70 text-xs md:text-sm">{match.venue}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Watch Here Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="bg-[#006847] rounded-xl p-4 md:p-6 text-center mt-6"
            >
              <div className="flex items-center justify-center space-x-2 mb-2">
                <FiMonitor className="text-white" size={24} />
                <h4 className="text-white font-bold text-lg md:text-xl">Watch All Matches Here!</h4>
              </div>
              <p className="text-white/90 text-sm md:text-base">
                Fresh food & drinks • No reservation needed • Great atmosphere
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 md:mt-16 text-center"
        >
          <div className="bg-white/5 backdrop-blur-md rounded-xl md:rounded-2xl p-6 md:p-8 border border-white/10">
            <p className="text-white text-lg md:text-2xl font-bold mb-2">
              🏟️ Celebrate Every Goal with Us! 🏟️
            </p>
            <p className="text-white/80 text-sm md:text-base">
              Open during all match times • Fresh food & drinks • Great atmosphere
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

