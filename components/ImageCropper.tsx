"use client";

import { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiZoomIn, FiZoomOut, FiCheck } from "react-icons/fi";

interface ImageCropperProps {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (position: { x: number; y: number; zoom: number }) => void;
  aspectRatio?: number;
  initialPosition?: { x: number; y: number; zoom: number };
}

export default function ImageCropper({
  imageUrl,
  isOpen,
  onClose,
  onSave,
  aspectRatio = 4 / 3,
  initialPosition,
}: ImageCropperProps) {
  const [crop, setCrop] = useState(initialPosition || { x: 0, y: 0 });
  const [zoom, setZoom] = useState(initialPosition?.zoom || 1);

  // Reset position when modal opens or initial position changes
  useEffect(() => {
    if (isOpen && initialPosition) {
      setCrop({ x: initialPosition.x, y: initialPosition.y });
      setZoom(initialPosition.zoom);
    } else if (isOpen) {
      setCrop({ x: 0, y: 0 });
      setZoom(1);
    }
  }, [isOpen, initialPosition]);

  const handleSave = () => {
    onSave({ x: crop.x, y: crop.y, zoom });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Cropper Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Adjust Image</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Drag to reposition, use slider to zoom
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* Cropper Area */}
              <div className="relative h-[500px] bg-gray-900">
                <Cropper
                  image={imageUrl}
                  crop={crop}
                  zoom={zoom}
                  aspect={aspectRatio}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={() => {}}
                  showGrid={false}
                />
              </div>

              {/* Controls */}
              <div className="p-6 space-y-4">
                {/* Zoom Slider */}
                <div className="flex items-center gap-4">
                  <FiZoomOut className="text-gray-600" size={20} />
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#5eb3ce]"
                  />
                  <FiZoomIn className="text-gray-600" size={20} />
                  <span className="text-sm font-medium text-gray-700 w-16">
                    {Math.round(zoom * 100)}%
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 px-6 py-3 bg-[#5eb3ce] hover:bg-[#3a8fa8] text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <FiCheck size={20} />
                    Apply Crop
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}







