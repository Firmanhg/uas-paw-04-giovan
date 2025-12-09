import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Bath, BedDouble, Square, Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function Listing() {
  const [sort, setSort] = useState("newest");

  // DATA DUMMY (Gambar Pexels agar aman & muncul)
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
        
        {/* --- SIDEBAR FILTER (KIRI) --- */}
        <aside className="lg:col-span-1 h-fit">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold text-slate-900 mb-1">
              Find Your Dream Property
            </h2>
            <p className="text-sm text-gray-500 mb-6">Refine your search with the filters below.</p>

            <div className="space-y-5">
              {/* Search Location */}
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by location..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 focus:bg-white transition"
                />
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Minimum Price</label>
                <input type="text" placeholder="Rp 0" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Maximum Price</label>
                <input type="text" placeholder="Rp 10B" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800" />
              </div>

              {/* Dropdowns */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Property Type</label>
                <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800">
                  <option>House</option>
                  <option>Apartment</option>
                  <option>Villa</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Bedrooms</label>
                <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800">
                  <option>Any</option>
                  <option>1+</option>
                  <option>2+</option>
                  <option>3+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Bathrooms</label>
                <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800">
                  <option>Any</option>
                  <option>1+</option>
                  <option>2+</option>
                </select>
              </div>

              {/* Button */}
              <button className="w-full py-3 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-900 transition shadow-lg shadow-slate-800/20">
                Apply Filters
              </button>
            </div>
          </div>
        </aside>


        {/* --- MAIN CONTENT (KANAN) --- */}
        <div className="lg:col-span-3">
          
          {/* Header & Sort */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <p className="text-gray-500 text-sm">
              Showing <span className="font-bold text-slate-900">1-12</span> of <span className="font-bold text-slate-900">150</span> properties
            </p>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select 
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-800 cursor-pointer"
              >
                <option value="newest">Newest</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {properties.map((p) => (
              <div key={p.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden bg-gray-200">
                  <img 
                    src={p.img} 
                    alt={p.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Badge Status (Pojok Kiri Bawah Gambar) */}
                  <span className={`absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm
                    ${p.status === 'Jual' ? 'bg-green-500' : 'bg-orange-500'}
                  `}>
                    {p.status}
                  </span>

                  {/* Favorite Button (Pojok Kanan Atas Gambar) */}
                  <button className="absolute top-3 right-3 p-2 bg-white/30 backdrop-blur-sm rounded-full text-white hover:bg-white hover:text-red-500 transition-colors">
                    <Heart size={18} />
                  </button>
                </div>

                {/* Content Section */}
                <div className="p-5">
                  <h3 className="font-bold text-lg text-slate-900 truncate mb-1">{p.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 truncate">{p.location}</p>
                  
                  <p className="text-xl font-bold text-slate-900 mb-4">{p.price}</p>

                  {/* Specs (Kamar, Mandi, Luas) */}
                  <div className="flex items-center gap-4 pb-5 mb-5 border-b border-gray-100">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <BedDouble size={18} /> <span className="font-medium">{p.beds}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Bath size={18} /> <span className="font-medium">{p.baths}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Square size={18} /> <span className="font-medium">{p.area} m²</span>
                    </div>
                  </div>

                  {/* Button View Details (Style Abu-abu seperti gambar) */}
                  <Link 
                    to={`/property/${p.id}`} 
                    className="block w-full py-2.5 text-center bg-gray-100 hover:bg-gray-200 text-slate-900 font-semibold rounded-lg transition-colors text-sm"
                  >
                    View Details
                  </Link>
                </div>

              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-12">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-slate-900 transition">
                <ChevronLeft size={18} />
            </button>
            
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800 text-white font-medium shadow-md">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition">3</button>
            <span className="text-gray-400">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition">10</button>

            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-900 hover:bg-gray-100 transition">
                <ChevronRight size={18} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}