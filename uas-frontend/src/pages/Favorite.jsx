import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Heart, BedDouble, Bath, Square } from "lucide-react";

// Helper functions for localStorage
const getFavorites = () =>
  JSON.parse(localStorage.getItem("favorite-properties")) || [];

const saveFavorites = (data) =>
  localStorage.setItem("favorite-properties", JSON.stringify(data));

export default function Favorite() {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  // Remove from favorite
  const removeFavorite = (id) => {
    const updated = favorites.filter((p) => p.id !== id);
    setFavorites(updated);
    saveFavorites(updated);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Favorite Properties</h1>

      {/* IF FAVORITE EMPTY */}
      {favorites.length === 0 && (
        <div className="text-center text-gray-600 mt-20">
          <p className="text-xl mb-4">No favorites yet 😢</p>
          <Link
            to="/listing"
            className="text-blue-600 hover:underline text-lg"
          >
            Browse properties →
          </Link>
        </div>
      )}

      {/* FAVORITE LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((p) => (
          <div
            key={p.id}
            className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
          >
            <div className="relative h-56">
              <img
                src={p.img || "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold text-white rounded uppercase tracking-wide bg-slate-800">
                {p.property_type}
              </span>
              
              {/* Remove Button */}
              <button
                onClick={() => removeFavorite(p.id)}
                className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                title="Remove from favorites"
              >
                <Heart size={18} fill="currentColor" />
              </button>
            </div>

            <div className="p-5">
              <h3 className="font-bold text-lg text-slate-900 truncate mb-1">
                {p.title}
              </h3>
              <p className="text-gray-500 text-sm mb-4 truncate">
                {p.location}
              </p>

              <p className="text-xl font-bold text-slate-900 mb-5">
                {formatCurrency(p.price)}
              </p>

              {/* Property Details */}
              <div className="flex items-center gap-4 text-sm text-gray-600 border-t border-gray-100 pt-4">
                <div className="flex items-center gap-1">
                  <BedDouble size={16} />
                  <span>{p.bedrooms || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath size={16} />
                  <span>{p.bathrooms || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Square size={16} />
                  <span>{p.area || 0} m²</span>
                </div>
              </div>

              {/* View Details Button */}
              <Link
                to={`/detail/${p.id}`}
                className="block mt-4 w-full text-center py-2.5 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-900 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
