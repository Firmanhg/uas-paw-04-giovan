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

/* ============================= */
/* COMPARE LOCAL STORAGE HELPERS */
/* ============================= */
const getCompare = () =>
  JSON.parse(localStorage.getItem("compare-properties")) || [];

const saveCompare = (data) =>
  localStorage.setItem("compare-properties", JSON.stringify(data));

export default function Listing() {
  const [sort, setSort] = useState("newest");

  /* ================= */
  /* COMPARE STATE     */
  /* ================= */
  const [compareList, setCompareList] = useState(getCompare());

  const toggleCompare = (item) => {
    const exists = compareList.find((p) => p.id === item.id);

    let updated;
    if (exists) {
      updated = compareList.filter((p) => p.id !== item.id);
    } else {
      if (compareList.length >= 2) {
        alert("Maksimal 2 properti untuk compare.");
        return;
      }
      updated = [...compareList, item];
    }

    setCompareList(updated);
    saveCompare(updated);
  };

  /* ================= */
  /* DATA DUMMY        */
  /* ================= */
  const properties = [
    {
      id: 1,
      title: "Modern Villa in South Jakarta",
      location: "Kebayoran Baru, Jakarta Selatan",
      price: "Rp 2.500.000.000",
      img: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
      img: "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
      img: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
      img: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
      img: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
      img: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      beds: 3,
      baths: 2,
      area: 150,
      status: "Jual",
    },
  ];

  return (
    <div className="bg-white min-h-screen pb-20 pt-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* SIDEBAR */}
        <aside className="lg:col-span-1 h-fit">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold text-slate-900 mb-1">
              Find Your Dream Property
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Refine your search with the filters below.
            </p>

            <div className="space-y-5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by location..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 text-sm"
                />
              </div>

              <button className="w-full py-3 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-900 transition shadow-lg shadow-slate-800/20">
                Apply Filters
              </button>
            </div>
          </div>
        </aside>

        {/* LISTING */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {properties.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-56">
                  <img
                    src={p.img}
                    className="w-full h-full object-cover"
                    alt={p.title}
                  />
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg text-slate-900 truncate">
                    {p.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 truncate">
                    {p.location}
                  </p>

                  <p className="text-xl font-bold mb-4">{p.price}</p>

                  <div className="flex gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex gap-1 items-center">
                      <BedDouble size={16} /> {p.beds}
                    </div>
                    <div className="flex gap-1 items-center">
                      <Bath size={16} /> {p.baths}
                    </div>
                    <div className="flex gap-1 items-center">
                      <Square size={16} /> {p.area} m²
                    </div>
                  </div>

                  {/* COMPARE CHECKBOX */}
                  <label className="flex items-center gap-2 text-sm mb-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!compareList.find((x) => x.id === p.id)}
                      onChange={() => toggleCompare(p)}
                      className="w-4 h-4"
                    />
                    Compare
                  </label>

                  <Link
                    to={`/property/${p.id}`}
                    className="block w-full py-2 text-center bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FLOATING COMPARE BUTTON */}
      {compareList.length > 0 && (
        <Link
          to="/compare"
          className="fixed bottom-6 right-6 bg-slate-800 text-white px-6 py-3 rounded-full shadow-xl font-semibold hover:bg-slate-900 transition z-50"
        >
          Compare ({compareList.length})
        </Link>
      )}
    </div>
  );
}
