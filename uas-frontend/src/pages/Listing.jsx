import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Bath,
  BedDouble,
  Square,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Listing() {
  const [sort, setSort] = useState("newest");

  // >>> COMPARE ADDED
  const [compareList, setCompareList] = useState([]);

  const toggleCompare = (item) => {
    const exists = compareList.find((p) => p.id === item.id);

    if (exists) {
      setCompareList(compareList.filter((p) => p.id !== item.id));
    } else {
      if (compareList.length >= 3) {
        alert("Anda hanya bisa membandingkan maksimal 3 properti.");
        return;
      }
      setCompareList([...compareList, item]);
    }
  };
  // <<< COMPARE ADDED

  // DATA DUMMY
  const properties = [
    {
      id: 1,
      title: "Modern Villa in South Jakarta",
      location: "Kebayoran Baru, Jakarta Selatan",
      price: "Rp 2.500.000.000",
      img: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
      beds: 4,
      baths: 3,
      area: 250,
      status: "Jual",
    },
    {
      id: 2,
      title: "Spacious Apartment with City View",
      location: "Sudirman, Jakarta Pusat",
      price: "Rp 25.000.000 / bln",
      img: "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg",
      beds: 2,
      baths: 2,
      area: 120,
      status: "Sewa",
    },
    {
      id: 3,
      title: "Family Home in Green Area",
      location: "Cilandak, Jakarta Selatan",
      price: "Rp 4.800.000.000",
      img: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
      beds: 5,
      baths: 4,
      area: 400,
      status: "Jual",
    },
    {
      id: 4,
      title: "Luxury House with Pool",
      location: "Pondok Indah, Jakarta Selatan",
      price: "Rp 12.000.000.000",
      img: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
      beds: 6,
      baths: 5,
      area: 600,
      status: "Jual",
    },
    {
      id: 5,
      title: "Cozy Studio Apartment",
      location: "Kemang, Jakarta Selatan",
      price: "Rp 8.000.000 / bln",
      img: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
      beds: 1,
      baths: 1,
      area: 45,
      status: "Sewa",
    },
    {
      id: 6,
      title: "Minimalist House in Cluster",
      location: "Bintaro, Tangerang Selatan",
      price: "Rp 1.800.000.000",
      img: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
      beds: 3,
      baths: 2,
      area: 150,
      status: "Jual",
    },
  ];

  return (
    <div className="bg-white min-h-screen pb-20 pt-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* --- SIDEBAR --- */}
        <aside className="lg:col-span-1 h-fit">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold text-slate-900 mb-1">
              Find Your Dream Property
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Refine your search with the filters below.
            </p>

            {/* (FILTER UI tetap sama) */}
            <div className="space-y-5">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by location..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5">
                  Minimum Price
                </label>
                <input type="text" placeholder="Rp 0" className="w-full border rounded-lg px-4 py-2.5" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5">
                  Maximum Price
                </label>
                <input type="text" placeholder="Rp 10B" className="w-full border rounded-lg px-4 py-2.5" />
              </div>

              <button className="w-full py-3 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-900">
                Apply Filters
              </button>
            </div>
          </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <div className="lg:col-span-3">

          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <p className="text-gray-500 text-sm">
              Showing <span className="font-bold">1-12</span> of{" "}
              <span className="font-bold">150</span> properties
            </p>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
              >
                <option value="newest">Newest</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Property Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {properties.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition group"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />

                  {/* Status badge */}
                  <span
                    className={`absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white ${
                      p.status === "Jual" ? "bg-green-500" : "bg-orange-500"
                    }`}
                  >
                    {p.status}
                  </span>

                  {/* Favorite button */}
                  <button className="absolute top-3 right-3 p-2 bg-white/30 rounded-full text-white hover:bg-white hover:text-red-500">
                    <Heart size={18} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-lg truncate">{p.title}</h3>
                  <p className="text-gray-500 text-sm truncate">{p.location}</p>

                  <p className="text-xl font-bold text-slate-900 mt-3 mb-4">
                    {p.price}
                  </p>

                  {/* Specs */}
                  <div className="flex items-center gap-4 pb-5 mb-5 border-b">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <BedDouble size={18} /> {p.beds}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Bath size={18} /> {p.baths}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Square size={18} /> {p.area} m²
                    </div>
                  </div>

                  {/* >>> COMPARE CHECKBOX ADDED */}
                  <label className="flex items-center gap-2 text-sm mb-4 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={!!compareList.find((x) => x.id === p.id)}
                      onChange={() => toggleCompare(p)}
                    />
                    Compare
                  </label>
                  {/* <<< COMPARE CHECKBOX ADDED */}

                  <Link
                    to={`/property/${p.id}`}
                    className="block w-full py-2.5 text-center bg-gray-100 hover:bg-gray-200 text-slate-900 font-semibold rounded-lg"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-12">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100">
              <ChevronLeft size={18} />
            </button>

            <button className="w-8 h-8 rounded-lg bg-slate-800 text-white">
              1
            </button>
            <button className="w-8 h-8 rounded-lg hover:bg-gray-100">2</button>
            <button className="w-8 h-8 rounded-lg hover:bg-gray-100">3</button>

            <span className="text-gray-400">...</span>

            <button className="w-8 h-8 rounded-lg hover:bg-gray-100">10</button>

            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* >>> FLOATING COMPARE BUTTON */}
      {compareList.length > 0 && (
        <Link
          to="/compare"
          state={{ compareList }}
          className="fixed bottom-6 right-6 bg-slate-800 text-white px-5 py-3 rounded-full shadow-xl font-semibold hover:bg-slate-900 transition"
        >
          Compare ({compareList.length})
        </Link>
      )}
      {/* <<< FLOATING COMPARE BUTTON */}

    </div>
  );
}
