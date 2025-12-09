import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addProperty } from "../services/api"; // ← IMPORT API

export default function AddProperty() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    type: "Rumah",
    beds: "",
    baths: "",
    area: "",
    description: "",
    image: null,
  });

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  // Submit to backend API
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addProperty(form); // ⬅️ KIRIM DATA KE BACKEND

      alert("Property berhasil ditambahkan!");

      navigate("/dashboard"); // Redirect ke dashboard setelah sukses
    } catch (error) {
      console.error(error);
      alert("Gagal menambahkan property!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Add New Property</h1>
        <Link to="/dashboard" className="text-blue-600 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>

      {/* FORM CARD */}
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* IMAGE UPLOAD */}
          <div>
            <label className="block font-medium mb-2">Upload Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg bg-gray-50"
              required
            />
          </div>

          {/* TITLE */}
          <div>
            <label className="block font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Modern House in South Jakarta"
              className="w-full border p-3 rounded-lg"
              required
            />
          </div>

          {/* LOCATION & PRICE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Jakarta Selatan"
                className="w-full border p-3 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Price (Rp)</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="2500000000"
                className="w-full border p-3 rounded-lg"
                required
              />
            </div>
          </div>

          {/* TYPE & SPECS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block font-medium mb-2">Property Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
              >
                <option>Rumah</option>
                <option>Apartemen</option>
                <option>Villa</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-2">Bedrooms</label>
              <input
                type="number"
                name="beds"
                value={form.beds}
                onChange={handleChange}
                placeholder="3"
                className="w-full border p-3 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Bathrooms</label>
              <input
                type="number"
                name="baths"
                value={form.baths}
                onChange={handleChange}
                placeholder="2"
                className="w-full border p-3 rounded-lg"
                required
              />
            </div>
          </div>

          {/* AREA */}
          <div>
            <label className="block font-medium mb-2">Area (m²)</label>
            <input
              type="number"
              name="area"
              value={form.area}
              onChange={handleChange}
              placeholder="250"
              className="w-full border p-3 rounded-lg"
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Tulis deskripsi lengkap properti di sini..."
              className="w-full border p-3 rounded-lg h-32"
              required
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Submit Property
          </button>
        </form>
      </div>
    </div>
  );
}
