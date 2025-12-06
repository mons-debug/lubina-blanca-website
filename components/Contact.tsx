"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";
import { restaurantInfo } from "@/data/restaurantData";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-10 md:py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Visit Us
          </h2>
          <div className="w-20 h-1 bg-[#5eb3ce] mx-auto mb-3" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find us in Tangier and experience exceptional Mediterranean cuisine
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Reservations Call-to-Action */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Call for Reservations Card */}
            <div className="bg-gradient-to-br from-[#5eb3ce] to-[#3a8fa8] rounded-2xl shadow-2xl p-8 text-white text-center">
              <div className="mb-6">
                <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiPhone size={40} />
                </div>
                <h3 className="text-3xl font-bold mb-2">Call for Reservations</h3>
                <p className="text-lg text-white/90">
                  Speak with us directly to book your table
                </p>
              </div>
              <motion.a
                href={`tel:${restaurantInfo.phone}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-white text-[#5eb3ce] px-8 py-4 rounded-full text-2xl font-bold shadow-xl hover:bg-gray-100 transition-all"
              >
                {restaurantInfo.phone}
              </motion.a>
              <p className="mt-6 text-white/80 text-sm">
                Open 24 hours - Call anytime!
              </p>
            </div>

            {/* Contact Details Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-[#5eb3ce] p-3 rounded-lg flex-shrink-0">
                  <FiMapPin className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-600">
                    {restaurantInfo.address.street}<br />
                    {restaurantInfo.address.city} {restaurantInfo.address.zip}<br />
                    {restaurantInfo.address.country}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#5eb3ce] p-3 rounded-lg flex-shrink-0">
                  <FiMail className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <a 
                    href={`mailto:${restaurantInfo.email}`}
                    className="text-gray-600 hover:text-[#5eb3ce] transition-colors"
                  >
                    {restaurantInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#5eb3ce] p-3 rounded-lg flex-shrink-0">
                  <FiClock className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Hours</h3>
                  <div className="text-gray-600 space-y-1 text-sm">
                    <p className="font-semibold text-green-600 text-base">Open 24 Hours</p>
                    <p className="text-gray-500">Every day of the week</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map & Directions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Call & Directions Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <motion.a
                href={`tel:${restaurantInfo.phone}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl font-bold text-center shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
              >
                <FiPhone size={20} />
                <span>Call Us</span>
              </motion.a>
              <motion.a
                href={restaurantInfo.social.googleBusiness}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#5eb3ce] to-[#3a8fa8] text-white py-4 px-6 rounded-xl font-bold text-center shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
              >
                <FiMapPin size={20} />
                <span>Directions</span>
              </motion.a>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-96">
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


