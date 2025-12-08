"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiEdit, FiTrash2, FiPlus, FiUpload, FiEye, FiEyeOff, FiCrop, FiArrowUp, FiArrowDown } from "react-icons/fi";
import toast from "react-hot-toast";
import { MenuItem } from "@/data/menuData";
import MenuItemModal from "@/components/MenuItemModal";
import ImageCropper from "@/components/ImageCropper";

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    images: [] as string[],
    preparationOptions: "",
    imagePosition: undefined as { x: number; y: number; zoom: number } | undefined,
    imagesPositions: [] as Array<{ x: number; y: number; zoom: number }>,
    hidden: false,
    sortOrder: 0,
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingGalleryImage, setUploadingGalleryImage] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [previewItem, setPreviewItem] = useState<MenuItem | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [cropperImage, setCropperImage] = useState<string>("");
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [cropperTarget, setCropperTarget] = useState<"main" | number>("main");

  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      const response = await fetch("/api/menu");
      const data = await response.json();
      // Sort items by sortOrder when loading
      const sortedItems = (data.menuItems || []).sort((a: MenuItem, b: MenuItem) =>
        (a.sortOrder ?? 999) - (b.sortOrder ?? 999)
      );
      setMenuItems(sortedItems);
      setCategories(data.menuCategories || []);
    } catch (error) {
      toast.error("Failed to load menu data");
    } finally {
      setLoading(false);
    }
  };

  const moveItem = async (itemId: string, direction: 'up' | 'down') => {
    const currentIndex = menuItems.findIndex(item => item.id === itemId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= menuItems.length) return;

    // Create new array with swapped items
    const newItems = [...menuItems];
    [newItems[currentIndex], newItems[newIndex]] = [newItems[newIndex], newItems[currentIndex]];

    // Update sortOrder for all items
    const updatedItems = newItems.map((item, index) => ({
      ...item,
      sortOrder: index + 1
    }));

    setMenuItems(updatedItems);

    // Save to API
    try {
      await fetch("/api/menu?action=reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: updatedItems.map(item => ({ id: item.id, sortOrder: item.sortOrder })) }),
      });
      toast.success("Order updated!");
    } catch (error) {
      toast.error("Failed to save order");
      fetchMenuData(); // Revert on error
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

  const handleGalleryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (formData.images.length >= 5) {
      toast.error("Maximum 5 gallery images allowed");
      return;
    }

    setUploadingGalleryImage(true);
    const formDataObj = new FormData();
    formDataObj.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataObj,
      });

      const data = await response.json();
      setFormData({
        ...formData,
        images: [...formData.images, data.url],
        imagesPositions: [...formData.imagesPositions, { x: 0, y: 0, zoom: 1 }]
      });
      toast.success("Gallery image uploaded!");
    } catch (error) {
      toast.error("Failed to upload gallery image");
    } finally {
      setUploadingGalleryImage(false);
    }
  };

  const removeGalleryImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPositions = formData.imagesPositions.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages, imagesPositions: newPositions });
  };

  const handlePreview = (item: MenuItem) => {
    setPreviewItem(item);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setTimeout(() => setPreviewItem(null), 300);
  };

  const openCropper = (imageUrl: string, target: "main" | number) => {
    setCropperImage(imageUrl);
    setCropperTarget(target);
    setIsCropperOpen(true);
  };

  const closeCropper = () => {
    setIsCropperOpen(false);
    setTimeout(() => {
      setCropperImage("");
      setCropperTarget("main");
    }, 300);
  };

  const handleCroppedImage = (position: { x: number; y: number; zoom: number }) => {
    if (cropperTarget === "main") {
      setFormData({ ...formData, imagePosition: position });
      toast.success("Main image position adjusted!");
    } else {
      const newPositions = [...formData.imagesPositions];
      newPositions[cropperTarget as number] = position;
      setFormData({ ...formData, imagesPositions: newPositions });
      toast.success("Gallery image position adjusted!");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = editingItem ? "PUT" : "POST";
      const payload = editingItem
        ? { ...formData, id: editingItem.id }
        : formData;

      const response = await fetch("/api/menu", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(editingItem ? "Item updated!" : "Item added!");
        setShowForm(false);
        setEditingItem(null);
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          image: "",
          images: [],
          preparationOptions: "",
          imagePosition: undefined,
          imagesPositions: [],
          hidden: false,
          sortOrder: 0,
        });
        fetchMenuData();
      } else {
        toast.error("Operation failed");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleEdit = (item: MenuItem) => {
    console.log('Edit clicked for item:', item);
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
      images: item.images || [],
      preparationOptions: item.preparationOptions || "",
      imagePosition: item.imagePosition,
      imagesPositions: item.imagesPositions || [],
      hidden: item.hidden || false,
      sortOrder: item.sortOrder || 0,
    });
    setShowForm(true);
    // Scroll to form
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const response = await fetch(`/api/menu?id=${id}`, { method: "DELETE" });
      if (response.ok) {
        toast.success("Item deleted!");
        fetchMenuData();
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingItem(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
      images: [],
      preparationOptions: "",
      imagePosition: undefined,
      imagesPositions: [],
      hidden: false,
      sortOrder: 0
    });
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newCategory.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    try {
      const response = await fetch("/api/menu?action=add-category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: newCategory.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Category added!");
        setCategories(data.menuCategories);
        setNewCategory("");
        setShowCategoryForm(false);
      } else {
        toast.error(data.error || "Failed to add category");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleDeleteCategory = async (category: string) => {
    if (!confirm(`Are you sure you want to delete the "${category}" category?`)) return;

    try {
      const response = await fetch(`/api/menu?action=delete-category&category=${encodeURIComponent(category)}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Category deleted!");
        setCategories(data.menuCategories);
      } else {
        toast.error(data.error || "Failed to delete category");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Menu Management</h1>
          <p className="text-gray-600 text-sm md:text-base">Manage your restaurant menu items</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-[#5eb3ce] text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-[#3a8fa8] transition-colors w-full sm:w-auto justify-center"
        >
          <FiPlus />
          <span>Add Item</span>
        </motion.button>
      </div>

      {/* Category Management Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Menu Categories</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCategoryForm(!showCategoryForm)}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            <FiPlus />
            <span>Add Category</span>
          </motion.button>
        </div>

        {showCategoryForm && (
          <form onSubmit={handleAddCategory} className="mb-4 flex gap-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter new category name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5eb3ce] focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-[#5eb3ce] text-white px-6 py-2 rounded-lg hover:bg-[#3a8fa8] transition-colors"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => {
                setShowCategoryForm(false);
                setNewCategory("");
              }}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </form>
        )}

        <div className="flex flex-wrap gap-2">
          {categories.filter(c => c !== "All").map((category) => (
            <div
              key={category}
              className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg"
            >
              <span className="font-medium text-gray-700">{category}</span>
              <button
                onClick={() => handleDeleteCategory(category)}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-bold mb-4">
            {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5eb3ce] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <input
                  type="text"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5eb3ce] focus:border-transparent"
                  placeholder="$25"
                />
              </div>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5eb3ce] focus:border-transparent"
              >
                <option value="">Select category</option>
                {categories.filter(c => c !== "All").map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Main Image</label>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5eb3ce] focus:border-transparent"
                  placeholder="Image URL or upload below"
                />
                <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                  <FiUpload />
                  <span>{uploadingImage ? "Uploading..." : "Upload"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                </label>
              </div>
              {formData.image && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Main Image Preview:</p>
                  <div className="relative inline-block group">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-48 h-48 object-cover rounded-xl shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => openCropper(formData.image, "main")}
                        className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-lg"
                      >
                        <FiCrop size={18} />
                        Adjust
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Gallery Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gallery Images (Max 5) - For detail popup
              </label>
              <div className="flex items-center space-x-4 mb-3">
                <label className="cursor-pointer bg-[#5eb3ce] hover:bg-[#3a8fa8] text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                  <FiUpload />
                  <span>{uploadingGalleryImage ? "Uploading..." : "Add Image"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleGalleryImageUpload}
                    className="hidden"
                    disabled={uploadingGalleryImage || formData.images.length >= 5}
                  />
                </label>
                <span className="text-sm text-gray-500">
                  {formData.images.length} / 5 images
                </span>
              </div>
              {formData.images.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-3">Gallery Images Preview:</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {formData.images.map((imgUrl, index) => (
                      <motion.div
                        key={index}
                        className="relative group"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <img
                          src={imgUrl}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-32 object-cover rounded-xl shadow-md"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => openCropper(imgUrl, index)}
                            className="bg-white text-gray-900 rounded-lg p-2 hover:bg-gray-100 transition-colors shadow-lg"
                            title="Adjust image"
                          >
                            <FiCrop size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(index)}
                            className="bg-red-600 text-white rounded-lg p-2 hover:bg-red-700 transition-colors shadow-lg"
                            title="Delete image"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                        <div className="absolute top-2 left-2 bg-[#5eb3ce] text-white text-xs px-2 py-1 rounded-full font-semibold shadow-md">
                          {index + 1}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Preparation Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preparation Options (Optional)
              </label>
              <textarea
                value={formData.preparationOptions}
                onChange={(e) => setFormData({ ...formData, preparationOptions: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5eb3ce] focus:border-transparent"
                placeholder="e.g., Available: Grilled, Tagine, Plancha, Fried"
              />
              <p className="text-xs text-gray-500 mt-1">
                Describe how this dish can be prepared (e.g., grilling methods, cooking styles)
              </p>
            </div>

            {/* Visibility Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700">Visibility</label>
                <p className="text-xs text-gray-500 mt-1">
                  {formData.hidden ? "This item is hidden from the public menu" : "This item is visible on the public menu"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, hidden: !formData.hidden })}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${formData.hidden ? 'bg-red-500' : 'bg-green-500'}`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${formData.hidden ? 'translate-x-5' : 'translate-x-0'}`}
                />
              </button>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-[#5eb3ce] text-white px-6 py-2 rounded-lg hover:bg-[#3a8fa8] transition-colors"
              >
                {editingItem ? "Update" : "Add"} Item
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

      {/* Desktop Table - Hidden on mobile */}
      <div className="hidden lg:block bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {menuItems.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  No menu items yet. Click "Add Item" to create your first menu item.
                </td>
              </tr>
            ) : (
              menuItems.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => moveItem(item.id, 'up')}
                        disabled={index === 0}
                        className={`p-1.5 rounded ${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
                        title="Move up"
                      >
                        <FiArrowUp size={16} />
                      </button>
                      <button
                        onClick={() => moveItem(item.id, 'down')}
                        disabled={index === menuItems.length - 1}
                        className={`p-1.5 rounded ${index === menuItems.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
                        title="Move down"
                      >
                        <FiArrowDown size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative group">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg shadow-sm"
                      />
                      {item.images && item.images.length > 0 && (
                        <div className="absolute -top-1 -right-1 bg-[#5eb3ce] text-white text-xs px-2 py-1 rounded-full font-semibold shadow-lg">
                          +{item.images.length}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 mb-1">{item.name}</div>
                    <div className="text-sm text-gray-500 line-clamp-2">{item.description}</div>
                    {item.preparationOptions && (
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-xs">👨‍🍳</span>
                        <span className="text-xs text-[#5eb3ce] font-medium">Multiple prep options</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{item.price}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePreview(item);
                        }}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors cursor-pointer"
                        title="Preview item"
                      >
                        <FiEye size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(item);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        title="Edit item"
                      >
                        <FiEdit size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id);
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete item"
                      >
                        <FiTrash2 size={18} />
                      </motion.button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout - Shown on mobile/tablet */}
      <div className="lg:hidden">
        {menuItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center text-gray-500">
            No menu items yet. Click "Add Item" to create your first menu item.
          </div>
        ) : (
          <div className="space-y-4">
            {menuItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="flex">
                  {/* Image */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 sm:w-32 sm:h-32 object-cover"
                    />
                    {item.images && item.images.length > 0 && (
                      <div className="absolute top-1 right-1 bg-[#5eb3ce] text-white text-xs px-1.5 py-0.5 rounded-full font-semibold">
                        +{item.images.length}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-1">{item.name}</h3>
                        <span className="text-sm font-bold text-[#5eb3ce] flex-shrink-0">{item.price}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 mt-1">{item.description}</p>
                      <span className="inline-block mt-2 px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                        {item.category}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handlePreview(item)}
                        className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-green-50 text-green-600 rounded-lg text-xs font-medium hover:bg-green-100"
                      >
                        <FiEye size={14} /> View
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100"
                      >
                        <FiEdit size={14} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100"
                      >
                        <FiTrash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <MenuItemModal
        item={previewItem}
        isOpen={isPreviewOpen}
        onClose={closePreview}
      />

      {/* Image Cropper Modal */}
      <ImageCropper
        imageUrl={cropperImage}
        isOpen={isCropperOpen}
        onClose={closeCropper}
        onSave={handleCroppedImage}
        aspectRatio={4 / 3}
        initialPosition={
          cropperTarget === "main"
            ? formData.imagePosition
            : formData.imagesPositions[cropperTarget as number]
        }
      />
    </div>
  );
}


