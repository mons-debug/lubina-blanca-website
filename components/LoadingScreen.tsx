"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [videoLoaded, setVideoLoaded] = useState(false);

    useEffect(() => {
        // Preload the mobile video
        const video = document.createElement("video");
        video.preload = "auto";
        video.src = "/hero-mobile.webm";

        video.oncanplaythrough = () => {
            setVideoLoaded(true);
        };

        video.onerror = () => {
            // If video fails to load, still show the site
            setVideoLoaded(true);
        };

        // Fallback timeout - show site after 3 seconds max
        const timeout = setTimeout(() => {
            setVideoLoaded(true);
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (videoLoaded) {
            // Small delay for smooth transition
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [videoLoaded]);

    return (
        <>
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-[200] bg-[#0a1628] flex items-center justify-center"
                    >
                        <div className="text-center">
                            {/* Logo */}
                            <motion.img
                                src="/lubinalogo-white.png"
                                alt="Lubina Blanca"
                                className="h-20 md:h-28 w-auto mx-auto mb-6"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            />

                            {/* Loading spinner */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                className="w-10 h-10 border-2 border-white/20 border-t-[#5eb3ce] rounded-full mx-auto"
                            />

                            {/* Loading text */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-white/60 text-sm mt-4 tracking-wider"
                            >
                                Loading...
                            </motion.p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main content - always render but hidden during loading */}
            <div className={isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-300"}>
                {children}
            </div>
        </>
    );
}
