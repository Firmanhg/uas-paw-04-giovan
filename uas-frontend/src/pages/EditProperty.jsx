import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getPropertyById, updateProperty } from "../services/api"; // ⬅️ IMPORT API

export default function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load data from API
  useEffect(() => {
    const load = async () => {
      try {
        const res = await getPropertyById(id); // GET API
        setForm(res.data);                    // isi form
        setLoading(false);
      } catch (error) {
        console.error(error);
        alert("Gagal mengambil data properti");
      }
    };

    load();
  }, [id]);

  if (loading || !form) {
    return (
      <p className="p-6 text-center text-gray-600 text-lg">
        Loading property...
      </p>
    );
  }

  // Update form state
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  // Submit update to API
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProperty(id, form); // PUT /properties/:id API
      alert("Property berhasil diperbarui!");
      navigate("/dashboard"); // redirect ke dashboard
    } catch (error) {
      console.error(error);
      alert("Gagal update property!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Edit Property</h1>
        <Link to="/dashboard" className="text-blue-600 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>

      {/* Form Card */}
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* IMAGE UPLOAD */}
          <div>
            <label className="block font-medium mb-2">Change Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg bg-gray-50"
            />

            {/* If existing image exists */}
            {form.image && typeof form.image === "string" && (
              <img
                src={form.image}
                alt="Current Property"
                className="mt-3 w-40 h-28 object-cover rounded-lg border"
              />
            )}
          </div>

          {/* TITLE */}
          <div>
            <label className="block font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
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
              className="w-full border p-3 rounded-lg h-32"
              required
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Update Property
            </button>

            <Link
              to="/dashboard"
              className="px-6 py-3 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
