"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiTrash2, FiUpload, FiMove } from "react-icons/fi";
import toast from "react-hot-toast";

interface AboutImage {
  id: number;
  url: string;
  alt: string;
  order: number;
}

export default function AboutManagement() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    description: "",
  });
  const [images, setImages] = useState<AboutImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageAlt, setNewImageAlt] = useState("");

  useEffect(() => {
    fetchData();
    fetchImages();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/restaurant");
      const data = await response.json();
      setFormData({
        name: data.name || "",
        tagline: data.tagline || "",
        description: data.description || "",
      });
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/about-images");
      const data = await response.json();
      setImages(data);
    } catch (error) {
      toast.error("Failed to load images");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/restaurant");
      const currentData = await response.json();

      const updatedData = {
        ...currentData,
        ...formData,
      };

      const updateResponse = await fetch("/api/restaurant", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (updateResponse.ok) {
        toast.success("Information updated!");
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("An error occurred");
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
      const response = await fetch("/api/about-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: newImageUrl, alt: newImageAlt }),
      });

      if (response.ok) {
        toast.success("Image added!");
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

  const handleDeleteImage = async (id: number) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const response = await fetch(`/api/about-images?id=${id}`, { method: "DELETE" });
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

  const moveImage = (index: number, direction: "up" | "down") => {
    const newImages = [...images];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= images.length) return;

    [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
    
    // Update order values
    const updatedImages = newImages.map((img, idx) => ({
      ...img,
      order: idx + 1,
    }));

    setImages(updatedImages);
    updateImageOrder(updatedImages);
  };

  const updateImageOrder = async (updatedImages: AboutImage[]) => {
    try {
      const response = await fetch("/api/about-images", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedImages),
      });

      if (!response.ok) {
        toast.error("Failed to update order");
        fetchImages(); // Revert on error
      }
    } catch (error) {
      toast.error("An error occurred");
      fetchImages(); // Revert on error
    }
  };

  if (loading) {
    return (
      <div className="p-8 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#5eb3ce] mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">About Section</h1>
        <p className="text-lg text-gray-700">Edit restaurant information, description, and images</p>
      </div>

      {/* Text Content Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-200"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
          <span className="bg-[#5eb3ce] w-1 h-6 mr-3 rounded"></span>
          Restaurant Information
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
              Restaurant Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5eb3ce] focus:border-[#5eb3ce] transition-all text-gray-900 font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
              Tagline
            </label>
            <input
              type="text"
              required
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5eb3ce] focus:border-[#5eb3ce] transition-all text-gray-900 font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
              Description
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={6}
              className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5eb3ce] focus:border-[#5eb3ce] transition-all text-gray-900 font-medium resize-none"
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-[#5eb3ce] to-[#3a8fa8] hover:from-[#3a8fa8] hover:to-[#5eb3ce] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            Save Changes
          </button>
        </form>
      </motion.div>

      {/* About Section Images */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
          <span className="bg-purple-500 w-1 h-6 mr-3 rounded"></span>
          About Section Images ({images.length})
        </h2>
        <p className="text-gray-600 mb-6">These images will appear in a swipeable card stack on the About Us section</p>

        {/* Add Image Form */}
        <form onSubmit={handleAddImage} className="mb-8 space-y-6 bg-gray-50 p-6 rounded-xl">
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
                className="mt-4 w-full h-48 object-cover rounded-xl shadow-lg border-2 border-gray-200"
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
              placeholder="e.g., Restaurant interior, Owner portrait"
            />
          </div>

          <button
            type="submit"
            disabled={!newImageUrl || !newImageAlt}
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ➕ Add Image to Stack
          </button>
        </form>

        {/* Images Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {images.length === 0 ? (
            <div className="col-span-3 text-center py-16 bg-gray-50 rounded-2xl">
              <div className="text-6xl mb-4">🖼️</div>
              <p className="text-xl font-semibold text-gray-700">No images yet</p>
              <p className="text-gray-500 mt-2">Add your first image using the form above</p>
            </div>
          ) : (
            images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="relative group bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200 hover:border-[#5eb3ce] transition-all"
              >
                <div className="relative">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-[#5eb3ce] text-white px-3 py-1 rounded-full text-sm font-bold">
                    #{index + 1}
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-sm font-semibold text-gray-800 mb-3">{image.alt}</p>
                  
                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => moveImage(index, "up")}
                        disabled={index === 0}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Move up"
                      >
                        <FiMove className="rotate-180" size={16} />
                      </button>
                      <button
                        onClick={() => moveImage(index, "down")}
                        disabled={index === images.length - 1}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Move down"
                      >
                        <FiMove size={16} />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => handleDeleteImage(image.id)}
                      className="p-2 bg-red-100 hover:bg-red-600 text-red-600 hover:text-white rounded-lg transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}
