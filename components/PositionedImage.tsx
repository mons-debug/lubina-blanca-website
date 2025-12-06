"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface PositionedImageProps {
  src: string;
  alt: string;
  position?: { x: number; y: number; zoom: number };
  className?: string;
  onLoad?: () => void;
  priority?: boolean;
}

export default function PositionedImage({ 
  src, 
  alt, 
  position, 
  className = "",
  onLoad,
  priority = false
}: PositionedImageProps) {
  const [isLoaded, setIsLoaded] = useState(priority);
  const [imageSrc, setImageSrc] = useState<string | null>(priority ? src : null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "100px" });

  useEffect(() => {
    if (isInView && !imageSrc) {
      setImageSrc(src);
    }
  }, [isInView, src, imageSrc]);

  useEffect(() => {
    if (imageSrc && !isLoaded) {
      const img = new Image();
      img.onload = () => {
        setIsLoaded(true);
        onLoad?.();
      };
      img.src = imageSrc;
    }
  }, [imageSrc, isLoaded, onLoad]);

  if (!position) {
    return (
      <div 
        ref={ref}
        className={`bg-cover bg-center ${className} ${!isLoaded ? 'bg-gray-200 animate-pulse' : ''}`}
        style={imageSrc && isLoaded ? { backgroundImage: `url('${imageSrc}')` } : {}}
      />
    );
  }

  // Calculate the CSS transform based on position
  const { x, y, zoom } = position;
  
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      {imageSrc && (
        <div
          style={{
            backgroundImage: isLoaded ? `url('${imageSrc}')` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: `${50 + x * 0.5}% ${50 + y * 0.5}%`,
            width: '100%',
            height: '100%',
            transform: `scale(${zoom})`,
            transformOrigin: 'center',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
        />
      )}
    </div>
  );
}

