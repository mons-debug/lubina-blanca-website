"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function ContactManagement() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    instagram: "",
    googleBusiness: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/restaurant");
      const data = await response.json();
      setFormData({
        phone: data.phone || "",
        email: data.email || "",
        street: data.address?.street || "",
        city: data.address?.city || "",
        state: data.address?.state || "",
        zip: data.address?.zip || "",
        instagram: data.social?.instagram || "",
        googleBusiness: data.social?.googleBusiness || "",
        monday: data.hours?.monday || "",
        tuesday: data.hours?.tuesday || "",
        wednesday: data.hours?.wednesday || "",
        thursday: data.hours?.thursday || "",
        friday: data.hours?.friday || "",
        saturday: data.hours?.saturday || "",
        sunday: data.hours?.sunday || "",
      });
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/restaurant");
      const currentData = await response.json();

      const updatedData = {
        ...currentData,
        phone: formData.phone,
        email: formData.email,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: currentData.address?.country || "USA",
        },
        social: {
          instagram: formData.instagram,
          googleBusiness: formData.googleBusiness,
        },
        hours: {
          monday: formData.monday,
          tuesday: formData.tuesday,
          wednesday: formData.wednesday,
          thursday: formData.thursday,
          friday: formData.friday,
          saturday: formData.saturday,
          sunday: formData.sunday,
        },
      };

      const updateResponse = await fetch("/api/restaurant", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (updateResponse.ok) {
        toast.success("Contact information updated!");
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Information</h1>
        <p className="text-gray-600">Edit contact details, address, hours, and social links</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information */}
          <div>
            <h2 className="text-xl font-bold mb-4">Contact Details</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5eb3ce] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5eb3ce] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <h2 className="text-xl font-bold mb-4">Address</h2>
            <div className="space-y-4">
              <input
                type="text"
                required
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                placeholder="Street Address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5eb3ce] focus:border-transparent"
              />
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="City"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5eb3ce] focus:border-transparent"
                />
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="State"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5eb3ce] focus:border-transparent"
                />
                <input
                  type="text"
                  required
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  placeholder="ZIP Code"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5eb3ce] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h2 className="text-xl font-bold mb-4">Business Hours</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                <div key={day}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {day}
                  </label>
                  <input
                    type="text"
                    value={formData[day as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [day]: e.target.value })}
                    placeholder="e.g., 5:00 PM - 10:00 PM or Closed"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5eb3ce] focus:border-transparent"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="text-xl font-bold mb-4">Social Media</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instagram URL</label>
                <input
                  type="text"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5eb3ce] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Google Business URL</label>
                <input
                  type="text"
                  value={formData.googleBusiness}
                  onChange={(e) => setFormData({ ...formData, googleBusiness: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5eb3ce] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#5eb3ce] text-white px-6 py-3 rounded-lg hover:bg-[#3a8fa8] transition-colors"
          >
            Save Changes
          </button>
        </form>
      </motion.div>
    </div>
  );
}


