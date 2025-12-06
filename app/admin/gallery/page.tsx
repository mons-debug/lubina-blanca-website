"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiTrash2, FiUpload } from "react-icons/fi";
import toast from "react-hot-toast";

interface GalleryImage {
  id: number;
  url: string;
  alt: string;
}

export default function GalleryManagement() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageAlt, setNewImageAlt] = useState("");

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/gallery");
      const data = await response.json();
      setImages(data);
    } catch (error) {
      toast.error("Failed to load gallery images");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formDataObj = new FormData();
    formDataObj.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataObj,
      });

      const data = await response.json();
      setNewImageUrl(data.url);
      toast.success("Image uploaded!");
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: newImageUrl, alt: newImageAlt }),
      });

      if (response.ok) {
        toast.success("Image added to gallery!");
        setNewImageUrl("");
        setNewImageAlt("");
        fetchImages();
      } else {
        toast.error("Failed to add image");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const response = await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
      if (response.ok) {
        toast.success("Image deleted!");
        fetchImages();
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  if (loading) {
    return (
      <div className="p-8 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#5eb3ce] mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading Gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Gallery Management</h1>
        <p className="text-lg text-gray-700">Manage restaurant gallery images</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-200"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
          <span className="bg-purple-500 w-1 h-6 mr-3 rounded"></span>
          Add New Image
        </h2>
        <form onSubmit={handleAddImage} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">Image URL</label>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                required
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="flex-1 px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5eb3ce] focus:border-[#5eb3ce] transition-all text-gray-900 font-medium"
                placeholder="Paste image URL or upload below"
              />
              <label className="cursor-pointer bg-gradient-to-r from-[#5eb3ce] to-[#3a8fa8] hover:from-[#3a8fa8] hover:to-[#5eb3ce] px-6 py-3 rounded-xl transition-all flex items-center space-x-2 text-white font-semibold shadow-md hover:shadow-lg">
                <FiUpload size={20} />
                <span>{uploading ? "Uploading..." : "Upload"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>
            {newImageUrl && (
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={newImageUrl}
                alt="Preview"
                className="mt-4 w-full h-64 object-cover rounded-xl shadow-lg border-2 border-gray-200"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">Alt Text</label>
            <input
              type="text"
              required
              value={newImageAlt}
              onChange={(e) => setNewImageAlt(e.target.value)}
              className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5eb3ce] focus:border-[#5eb3ce] transition-all text-gray-900 font-medium"
              placeholder="Describe the image for accessibility"
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl w-full"
          >
            ➕ Add to Gallery
          </button>
        </form>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {images.length === 0 ? (
          <div className="col-span-3 text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">📸</div>
            <p className="text-xl font-semibold text-gray-700">No images in gallery yet</p>
            <p className="text-gray-500 mt-2">Add your first image using the form above</p>
          </div>
        ) : (
          images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                <button
                  onClick={() => handleDelete(image.id)}
                  className="transform translate-y-4 group-hover:translate-y-0 transition-transform bg-red-600 text-white p-4 rounded-full hover:bg-red-700 shadow-xl"
                >
                  <FiTrash2 size={24} />
                </button>
              </div>
              <div className="p-5 bg-gradient-to-br from-white to-gray-50">
                <p className="text-sm font-semibold text-gray-800">{image.alt}</p>
                <p className="text-xs text-gray-500 mt-1">ID: {image.id}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}


