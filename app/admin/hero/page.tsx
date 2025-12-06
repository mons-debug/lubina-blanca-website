"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiEdit, FiTrash2, FiPlus, FiUpload, FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import { HeroSlide } from "@/app/api/hero/route";

export default function HeroManagement() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: "",
    mediaType: "image" as "image" | "video",
    active: true,
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await fetch("/api/hero");
      const data = await response.json();
      setSlides(data);
    } catch (error) {
      toast.error("Failed to load hero slides");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formDataObj = new FormData();
    formDataObj.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataObj,
      });

      const data = await response.json();
      setFormData({ ...formData, image: data.url });
      toast.success("Image uploaded!");
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = editingSlide ? "PUT" : "POST";
      const payload = editingSlide
        ? { ...formData, id: editingSlide.id, order: editingSlide.order }
        : formData;

      const response = await fetch("/api/hero", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(editingSlide ? "Slide updated!" : "Slide added!");
        resetForm();
        fetchSlides();
      } else {
        toast.error("Operation failed");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleEdit = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setFormData({
      title: slide.title,
      subtitle: slide.subtitle,
      description: slide.description,
      image: slide.image,
      mediaType: slide.mediaType || "image",
      active: slide.active,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this slide?")) return;

    try {
      const response = await fetch(`/api/hero?id=${id}`, { method: "DELETE" });
      if (response.ok) {
        toast.success("Slide deleted!");
        fetchSlides();
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const toggleActive = async (slide: HeroSlide) => {
    try {
      const response = await fetch("/api/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...slide, active: !slide.active }),
      });

      if (response.ok) {
        toast.success("Slide visibility updated!");
        fetchSlides();
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingSlide(null);
    setFormData({ title: "", subtitle: "", description: "", image: "", mediaType: "image", active: true });
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hero Slides Management</h1>
          <p className="text-gray-600">Manage homepage hero slides</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-[#5eb3ce] text-white px-6 py-3 rounded-lg hover:bg-[#3a8fa8] transition-colors"
        >
          <FiPlus />
          <span>Add Slide</span>
        </motion.button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-bold mb-4">
            {editingSlide ? "Edit Hero Slide" : "Add New Hero Slide"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5eb3ce] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <input
                type="text"
                required
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5eb3ce] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5eb3ce] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Media Type</label>
              <select
                value={formData.mediaType}
                onChange={(e) => setFormData({ ...formData, mediaType: e.target.value as "image" | "video" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5eb3ce] focus:border-transparent"
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {formData.mediaType === "video" ? "Video URL or Path" : "Background Image"}
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5eb3ce] focus:border-transparent"
                  placeholder={formData.mediaType === "video" ? "Video URL or path (e.g., /video.mp4)" : "Image URL or upload below"}
                />
                <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                  <FiUpload />
                  <span>{uploadingImage ? "Uploading..." : "Upload"}</span>
                  <input
                    type="file"
                    accept={formData.mediaType === "video" ? "video/*" : "image/*"}
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                </label>
              </div>
              {formData.image && (
                formData.mediaType === "video" ? (
                  <video
                    src={formData.image}
                    className="mt-2 w-full h-48 object-cover rounded-lg"
                    controls
                  />
                ) : (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="mt-2 w-full h-48 object-cover rounded-lg"
                  />
                )
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="w-4 h-4 text-[#5eb3ce] focus:ring-[#5eb3ce] border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">Active (visible on homepage)</label>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-[#5eb3ce] text-white px-6 py-2 rounded-lg hover:bg-[#3a8fa8] transition-colors"
              >
                {editingSlide ? "Update" : "Add"} Slide
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid gap-6">
        {slides.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center text-gray-500">
            No hero slides yet. Click "Add Slide" to create your first hero slide.
          </div>
        ) : (
          slides.map((slide) => (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="md:flex">
                <div className="md:w-1/3 relative">
                  {slide.mediaType === "video" ? (
                    <video
                      src={slide.image}
                      className="w-full h-48 md:h-full object-cover"
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  )}
                  <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded ${
                    slide.mediaType === "video" ? "bg-purple-500 text-white" : "bg-blue-500 text-white"
                  }`}>
                    {slide.mediaType === "video" ? "VIDEO" : "IMAGE"}
                  </span>
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{slide.title}</h3>
                      <p className="text-lg text-[#5eb3ce] mb-2">{slide.subtitle}</p>
                      <p className="text-gray-600">{slide.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleActive(slide)}
                        className={`p-2 rounded-lg transition-colors ${
                          slide.active
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                        title={slide.active ? "Visible" : "Hidden"}
                      >
                        {slide.active ? <FiEye size={18} /> : <FiEyeOff size={18} />}
                      </button>
                      <button
                        onClick={() => handleEdit(slide)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <FiEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(slide.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}


