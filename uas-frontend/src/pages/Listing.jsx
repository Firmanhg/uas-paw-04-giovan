import { useState } from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import { Heart, Bath, BedDouble, Square, Search, ChevronLeft, ChevronRight } from "lucide-react";
=======
import { Heart, Bath, BedDouble, Square } from "lucide-react";
>>>>>>> e307693a71e6524113810a7f3d0b8c9d550b9e34

export default function Listing() {
  const [sort, setSort] = useState("newest");

<<<<<<< HEAD
  // Dummy Property Data (Disesuaikan dengan gambar)
=======
>>>>>>> e307693a71e6524113810a7f3d0b8c9d550b9e34
  const properties = [
    {
      id: 1,
      title: "Modern Villa in South Jakarta",
      price: "Rp 2.500.000.000",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80",
      location: "Kebayoran Baru, Jakarta Selatan",
      beds: 4,
      baths: 3,
      area: 250,
      status: "Jual", // Status Bahasa Indonesia
    },
    {
      id: 2,
<<<<<<< HEAD
      title: "Spacious Apartment with City View",
      price: "Rp 25.000.000 / bln",
      img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80",
=======
      title: "Spacious Apartment with City",
      price: 25000000,
      img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80",
>>>>>>> e307693a71e6524113810a7f3d0b8c9d550b9e34
      location: "Sudirman, Jakarta Pusat",
      beds: 2,
      baths: 2,
      area: 120,
      status: "Sewa",
    },
    {
      id: 3,
      title: "Family Home in Green Area",
      price: "Rp 4.800.000.000",
      img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80",
      location: "Cilandak, Jakarta Selatan",
      beds: 5,
      baths: 4,
      area: 400,
      status: "Jual",
    },
    {
      id: 4,
      title: "Luxury House with Pool",
      price: "Rp 12.000.000.000",
      img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80",
      location: "Pondok Indah, Jakarta Selatan",
      beds: 6,
      baths: 5,
      area: 600,
      status: "Jual",
    },
    {
      id: 5,
      title: "Cozy Studio Apartment",
      price: "Rp 8.000.000 / bln",
      img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80",
      location: "Kemang, Jakarta Selatan",
      beds: 1,
      baths: 1,
      area: 45,
      status: "Sewa",
    },
    {
      id: 6,
      title: "Minimalist House in Cluster",
      price: "Rp 1.800.000.000",
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80",
      location: "Bintaro, Tangerang Selatan",
      beds: 3,
      baths: 2,
      area: 150,
      status: "Jual",
    },
  ];

  return (
<<<<<<< HEAD
    <div className="bg-white pb-20 pt-8 font-sans text-slate-800">

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-10">
=======
    <div className="bg-white pb-20 pt-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
>>>>>>> e307693a71e6524113810a7f3d0b8c9d550b9e34

        {/* SIDEBAR FILTER */}
        <aside className="lg:col-span-1 bg-white border border-gray-200 rounded-xl p-6 h-fit shadow-sm sticky top-24">
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Find Your Dream Property
          </h2>
          <p className="text-sm text-gray-500 mb-6">Refine your search with the filters below.</p>

          <div className="space-y-5">

<<<<<<< HEAD
            {/* LOCATION SEARCH */}
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
=======
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Location
              </label>
>>>>>>> e307693a71e6524113810a7f3d0b8c9d550b9e34
              <input
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-200 focus:border-slate-400 outline-none transition"
                placeholder="Search by location..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Minimum Price</label>
              <input type="text" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-200 outline-none" placeholder="Rp 0" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Maximum Price</label>
              <input type="text" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-200 outline-none" placeholder="Rp 10B" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Property Type</label>
              <select className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-200 outline-none bg-white">
                <option>House</option>
                <option>Apartment</option>
                <option>Villa</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Bedrooms</label>
              <select className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-200 outline-none bg-white">
                <option>Any</option>
                <option>1+</option>
                <option>2+</option>
                <option>3+</option>
                <option>4+</option>
              </select>
            </div>
            
             {/* BATHROOMS */}
             <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Bathrooms</label>
              <select className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-200 outline-none bg-white">
                <option>Any</option>
                <option>1+</option>
                <option>2+</option>
                <option>3+</option>
              </select>
            </div>

            <button className="w-full py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition font-semibold">
              Apply Filters
            </button>
          </div>
        </aside>

        {/* LISTING CONTENT */}
        <div className="lg:col-span-3">

          {/* HEADER & SORTING */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <p className="text-gray-600">
              Showing <span className="font-semibold">1-12</span> of <span className="font-semibold">150</span> properties
            </p>

            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-lg bg-white outline-none focus:ring-2 focus:ring-slate-200"
                >
                <option value="newest">Newest</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
                </select>
            </div>
          </div>

          {/* GRID PROPERTIES */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {properties.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group"
              >
                {/* IMAGE & BADGE */}
                <div className="relative h-48 overflow-hidden">
                  <img src={p.img} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt={p.title} />

                  {/* BADGE STATUS (Warna sesuai gambar) */}
                  <span
                    className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded-full text-white
                      ${p.status === "Jual" ? "bg-green-500" :
                        p.status === "Sewa" ? "bg-orange-500" :
                        "bg-blue-500"}`}
                  >
                    {p.status}
                  </span>

                  {/* FAVORITE ICON */}
                  <button className="absolute top-3 right-3 bg-white/80 p-2 rounded-full shadow-sm hover:bg-white transition">
                    <Heart size={18} className="text-slate-700" />
                  </button>
                </div>

<<<<<<< HEAD
                {/* CARD DETAILS */}
                <div className="p-5">
                  <h3 className="font-bold text-lg text-slate-900 mb-1 truncate">{p.title}</h3>
                  <p className="text-gray-500 text-sm mb-3 truncate">{p.location}</p>
=======
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-slate-900">
                    {p.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{p.location}</p>
>>>>>>> e307693a71e6524113810a7f3d0b8c9d550b9e34

                  <p className="text-slate-900 font-bold text-xl mb-4">
                    {p.price}
                  </p>

<<<<<<< HEAD
                  {/* Detail Kamar, Mandi, Luas */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-5 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-1.5"><BedDouble size={18} className="text-slate-400" /> <span className="font-medium text-slate-700">{p.beds}</span></div>
                    <div className="flex items-center gap-1.5"><Bath size={18} className="text-slate-400" /> <span className="font-medium text-slate-700">{p.baths}</span></div>
                    <div className="flex items-center gap-1.5"><Square size={18} className="text-slate-400" /> <span className="font-medium text-slate-700">{p.area} m²</span></div>
=======
                  {/* SPECS (Fully aligned & clean) */}
                  <div className="flex justify-between items-center mt-4 text-sm text-gray-600">

                    <div className="flex items-center gap-2 min-w-[55px]">
                      <BedDouble size={16} className="text-slate-700" />
                      <span>{p.beds}</span>
                    </div>

                    <div className="flex items-center gap-2 min-w-[55px]">
                      <Bath size={16} className="text-slate-700" />
                      <span>{p.baths}</span>
                    </div>

                    <div className="flex items-center gap-2 min-w-[70px]">
                      <Square size={16} className="text-slate-700" />
                      <span>{p.area} m²</span>
                    </div>

>>>>>>> e307693a71e6524113810a7f3d0b8c9d550b9e34
                  </div>

                  {/* VIEW DETAILS BUTTON */}
                  <Link
                    to={`/property/${p.id}`}
<<<<<<< HEAD
                    className="w-full block text-center py-2.5 border border-gray-300 rounded-lg text-slate-800 font-semibold hover:bg-gray-50 transition"
=======
                    className="w-full mt-4 block text-center py-2 border border-gray-300 rounded-lg text-slate-800 hover:bg-gray-50 transition"
>>>>>>> e307693a71e6524113810a7f3d0b8c9d550b9e34
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center items-center gap-2 mt-12">
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-500 disabled:opacity-50"><ChevronLeft size={20}/></button>
            <button className="px-4 py-2 border border-slate-800 bg-slate-800 text-white rounded-lg font-medium">1</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-slate-800 font-medium">2</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-slate-800 font-medium">3</button>
            <span className="text-gray-500 px-2">...</span>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-slate-800 font-medium">10</button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-slate-800"><ChevronRight size={20}/></button>
          </div>

        </div>
      </div>
    </div>
  );
}