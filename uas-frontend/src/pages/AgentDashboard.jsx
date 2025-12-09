import { Link } from "react-router-dom";
import { useState } from "react";

export default function AgentDashboard() {
  // Dummy stats
  const stats = {
    listings: 12,
    inquiries: 34,
    views: 5021,
  };

  // Dummy property data
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Modern House in South Jakarta",
      price: 2500000000,
      location: "Jakarta Selatan",
      status: "Published",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80",
    },
    {
      id: 2,
      title: "Luxury Apartment at SCBD",
      price: 3500000000,
      location: "SCBD Jakarta",
      status: "Published",
      img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80",
    },
    {
      id: 3,
      title: "Family House with Garden",
      price: 1800000000,
      location: "Depok",
      status: "Draft",
      img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80",
    },
  ]);

  // Delete property
  const deleteProperty = (id) => {
    setProperties(properties.filter((p) => p.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Agent Dashboard</h1>
        <Link
          to="/add-property"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add Property
        </Link>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-3xl font-bold">{stats.listings}</p>
          <p className="text-gray-600 mt-2">Total Listings</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-3xl font-bold">{stats.inquiries}</p>
          <p className="text-gray-600 mt-2">Total Inquiries</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-3xl font-bold">{stats.views}</p>
          <p className="text-gray-600 mt-2">Total Views</p>
        </div>
      </div>

      {/* PROPERTY LIST TABLE */}
      <h2 className="text-2xl font-bold mb-4">Your Properties</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-100">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Title</th>
              <th className="p-4">Location</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {properties.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                {/* Image */}
                <td className="p-4">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-20 h-14 rounded object-cover"
                  />
                </td>

                {/* Title */}
                <td className="p-4 font-medium">{p.title}</td>

                {/* Location */}
                <td className="p-4">{p.location}</td>

                {/* Price */}
                <td className="p-4 text-blue-600 font-semibold">
                  Rp {p.price.toLocaleString("id-ID")}
                </td>

                {/* Status */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      p.status === "Published"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="p-4 flex gap-3 justify-center">
                  <Link
                    to={`/edit-property/${p.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteProperty(p.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
