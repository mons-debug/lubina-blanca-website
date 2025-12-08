"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiPhone, FiMail, FiMapPin, FiClock, FiNavigation } from "react-icons/fi";
import { restaurantInfo } from "@/data/restaurantData";
import { useTranslation } from "@/lib/LanguageContext";

export default function Contact() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* Zellige pattern overlay */}
      <div className="absolute inset-0 zellige-pattern-white pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 mb-4"
            style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}
          >
            {t('contact', 'title')}
          </h2>
          <div className="w-16 h-[2px] bg-[#5eb3ce] mx-auto mb-4" />
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            {t('contact', 'subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Column - Contact Info (2 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Reservation Card */}
            <div className="bg-gradient-to-br from-[#5eb3ce] to-[#3a8fa8] rounded-2xl p-6 md:p-8 text-white">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <FiPhone size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{t('contact', 'callForReservations')}</h3>
                  <p className="text-white/80 text-sm">{t('contact', 'speakWithUs')}</p>
                </div>
              </div>

              <motion.a
                href={`tel:${restaurantInfo.phone}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block w-full bg-white text-[#3a8fa8] py-4 rounded-xl text-center text-xl font-bold shadow-lg hover:shadow-xl transition-all mb-4"
              >
                {restaurantInfo.phone}
              </motion.a>

              <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
                <FiClock size={14} />
                <span>{t('contact', 'open24Hours')}</span>
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-slate-50 rounded-2xl p-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#5eb3ce]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiMapPin className="text-[#5eb3ce]" size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 mb-1">{t('contact', 'address')}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {restaurantInfo.address.street}<br />
                    {restaurantInfo.address.city} {restaurantInfo.address.zip}<br />
                    {restaurantInfo.address.country}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#5eb3ce]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiMail className="text-[#5eb3ce]" size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 mb-1">{t('contact', 'email')}</h4>
                  <a
                    href={`mailto:${restaurantInfo.email}`}
                    className="text-slate-600 text-sm hover:text-[#5eb3ce] transition-colors"
                  >
                    {restaurantInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiClock className="text-green-600" size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 mb-1">{t('contact', 'hours')}</h4>
                  <p className="text-green-600 font-medium">{t('contact', 'openAllDay')}</p>
                  <p className="text-slate-500 text-sm">{t('contact', 'everyDay')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Map (3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-3"
          >
            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <motion.a
                href={`tel:${restaurantInfo.phone}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 bg-slate-900 text-white py-4 px-6 rounded-xl font-medium hover:bg-slate-800 transition-all"
              >
                <FiPhone size={18} />
                <span>{t('common', 'callNow')}</span>
              </motion.a>
              <motion.a
                href={restaurantInfo.social.googleBusiness}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 bg-[#5eb3ce] text-white py-4 px-6 rounded-xl font-medium hover:bg-[#4da3be] transition-all"
              >
                <FiNavigation size={18} />
                <span>{t('common', 'getDirections')}</span>
              </motion.a>
            </div>

            {/* Map Container */}
            <div className="bg-slate-100 rounded-2xl overflow-hidden shadow-lg h-80 md:h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.4!2d-5.834!3d35.7595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQ1JzM0LjIiTiA1wrA1MCcwMi40Ilc!5e0!3m2!1sen!2sma!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
