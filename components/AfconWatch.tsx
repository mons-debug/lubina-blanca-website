"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiMonitor, FiCalendar, FiMapPin } from "react-icons/fi";

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
    <section id="afcon-watch" className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#0f2440] to-[#0a1628]">
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url('/zelija moncef.svg')`,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Decorative elements */}
      <div className="absolute top-40 left-20 w-64 h-64 bg-[#C1272D]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#006847]/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          {/* AFCON Logo */}
          <motion.img
            src="/afcon2025_logo_land_color-v1.webp"
            alt="AFCON 2025 Morocco"
            className="h-20 md:h-24 w-auto mx-auto mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
          />

          <span className="inline-block bg-gradient-to-r from-[#C1272D] to-[#a02026] text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
            Africa Cup 2025 🇲🇦
          </span>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4"
            style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}
          >
            Watch Live at Lubina Blanca
          </h2>

          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Support Morocco's journey with great food, drinks & atmosphere
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Left Column - Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* No Reservation Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#006847] rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🎉</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">No Reservation Needed</h3>
                  <p className="text-white/60">Just walk in and enjoy the match!</p>
                </div>
              </div>
              <p className="text-white/70 leading-relaxed">
                Join us at Lubina Blanca to celebrate every goal, every victory! Enjoy the game with
                delicious Mediterranean cuisine and an amazing atmosphere.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection("#menu")}
                className="flex-1 bg-gradient-to-r from-[#006847] to-[#00543a] text-white px-6 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
              >
                View Our Menu
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection("#contact")}
                className="flex-1 bg-white/10 border border-white/20 text-white px-6 py-4 rounded-xl font-medium backdrop-blur-sm hover:bg-white/15 transition-all"
              >
                Get Directions
              </motion.button>
            </div>

            {/* Watch Here Banner */}
            <div className="bg-gradient-to-r from-[#C1272D] to-[#a02026] rounded-2xl p-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <FiMonitor className="text-white" size={24} />
                <h4 className="text-white font-semibold text-lg">Watch All Matches Here!</h4>
              </div>
              <p className="text-white/90 text-sm">
                Fresh food • Cold drinks • Great atmosphere
              </p>
            </div>
          </motion.div>

          {/* Right Column - Match Schedule */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <FiCalendar className="text-[#D4AF37]" size={22} />
                Morocco Group Stage
              </h3>

              <div className="space-y-4">
                {moroccoMatches.map((match, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-white/15 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-semibold text-lg mb-1">
                          Morocco {match.opponent}
                        </h4>
                        <p className="text-white/60 text-sm flex items-center gap-2">
                          <FiCalendar size={14} />
                          {match.date}
                        </p>
                        <p className="text-white/50 text-xs flex items-center gap-2 mt-1">
                          <FiMapPin size={12} />
                          {match.venue}
                        </p>
                      </div>
                      <div className="bg-[#D4AF37] text-[#0a1628] px-4 py-2 rounded-lg font-bold text-lg">
                        {match.time}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-white/50 text-sm">
            🏟️ Celebrate every goal with us • Open during all match times 🏟️
          </p>
        </motion.div>
      </div>
    </section>
  );
}
