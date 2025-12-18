import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllProperties } from "../services/api";
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
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("newest");
  
  // Filter states
  const [filters, setFilters] = useState({
    property_type: "",
    location: "",
    min_price: "",
    max_price: "",
    min_bedrooms: "",
    min_bathrooms: ""
  });

  /* ================= */
  /* COMPARE STATE     */
  /* ================= */
  const [compareList, setCompareList] = useState(getCompare());

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      
      // Build clean filters - remove empty values
      const cleanFilters = {};
      if (filters.property_type) cleanFilters.property_type = filters.property_type;
      if (filters.location) cleanFilters.location = filters.location;
      if (filters.min_price) cleanFilters.min_price = filters.min_price;
      if (filters.max_price) cleanFilters.max_price = filters.max_price;
      if (filters.min_bedrooms) cleanFilters.min_bedrooms = filters.min_bedrooms;
      if (filters.min_bathrooms) cleanFilters.min_bathrooms = filters.min_bathrooms;
      
      console.log('=== Fetching Properties ===');
      console.log('Clean Filters:', cleanFilters);
      
      const response = await getAllProperties(cleanFilters);
      console.log('Full Response:', response);
      
      // Backend returns {status: "success", data: [...properties...]}
      // Axios wraps it in response.data
      const properties = response.data?.data || [];
      
      console.log('Extracted properties:', properties);
      console.log('Number of properties:', properties.length);
      
      setProperties(properties);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = () => {
    fetchProperties();
  };

  const handleResetFilter = async () => {
    const emptyFilters = {
      property_type: "",
      location: "",
      min_price: "",
      max_price: "",
      min_bedrooms: "",
      min_bathrooms: ""
    };
    setFilters(emptyFilters);
    
    // Fetch with empty filters
    try {
      setLoading(true);
      const response = await getAllProperties({});
      const properties = response.data?.data || [];
      console.log('Reset - fetched properties:', properties);
      setProperties(properties);
      setLoading(false);
    } catch (error) {
      console.error('Error resetting filters:', error);
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

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

  // Sort properties based on selected sort option
  const sortedProperties = [...properties].sort((a, b) => {
    if (sort === "newest") {
      // Sort by ID descending (assuming higher ID = newer)
      return b.id - a.id;
    } else if (sort === "price_low") {
      // Price: Low to High (termurah ke termahal)
      return a.price - b.price;
    } else if (sort === "price_high") {
      // Price: High to Low (termahal ke termurah)
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <div className="bg-white min-h-screen pb-20 pt-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* ==================== */}
        {/* SIDEBAR FILTER       */}
        {/* ==================== */}
        <aside className="lg:col-span-1 h-fit">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold text-slate-900 mb-1">
              Find Your Dream Property
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Refine your search with the filters below.
            </p>

            <div className="space-y-4">
              {/* Search Location */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  placeholder="Search by location..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 text-sm"
                />
              </div>

              {/* Min Price */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Minimum Price</label>
                <input
                  type="number"
                  name="min_price"
                  value={filters.min_price}
                  onChange={handleFilterChange}
                  placeholder="0"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 text-sm"
                />
              </div>

              {/* Max Price */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Maximum Price</label>
                <input
                  type="number"
                  name="max_price"
                  value={filters.max_price}
                  onChange={handleFilterChange}
                  placeholder="10000000000"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 text-sm"
                />
              </div>

              {/* Property Type */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Property Type</label>
                <select 
                  name="property_type"
                  value={filters.property_type}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 text-sm text-gray-600"
                >
                  <option value="">All Types</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="land">Land</option>
                </select>
              </div>

               {/* Bedrooms */}
               <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Bedrooms</label>
                <select 
                  name="min_bedrooms"
                  value={filters.min_bedrooms}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 text-sm text-gray-600"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>

              {/* Bathrooms */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Bathrooms</label>
                <select 
                  name="min_bathrooms"
                  value={filters.min_bathrooms}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 text-sm text-gray-600"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>

              <div className="space-y-2">
                <button 
                  onClick={handleSearch}
                  className="w-full py-3 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-900 transition shadow-lg shadow-slate-800/20"
                >
                  Apply Filters
                </button>
                <button 
                  onClick={handleResetFilter}
                  className="w-full py-2.5 bg-white text-slate-800 font-medium rounded-lg border border-slate-300 hover:bg-gray-50 transition"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* ==================== */}
        {/* LISTING CONTENT      */}
        {/* ==================== */}
        <div className="lg:col-span-3">
          
          {/* Header Listing */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
             <p className="text-gray-500 text-sm">
                {loading ? (
                  'Loading properties...'
                ) : (
                  <>
                    Showing <span className="font-bold text-slate-900">1-{Math.min(12, sortedProperties.length)}</span> of <span className="font-bold text-slate-900">{sortedProperties.length}</span> properties
                  </>
                )}
             </p>
             <div className="flex items-center gap-2 mt-4 sm:mt-0">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select 
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-slate-800"
                >
                    <option value="newest">Newest</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                </select>
             </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading properties...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && sortedProperties.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg mb-2">No properties found</p>
              <p className="text-gray-400 text-sm">Try adjusting your filters</p>
            </div>
          )}

          {/* Grid Card */}
          {!loading && sortedProperties.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedProperties.map((p) => (
                <div
                  key={p.id}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Image & Badge */}
                  <div className="relative h-56">
                    <img
                      src={p.img || "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={p.title}
                    />
                    {/* Badge Property Type */}
                    <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold text-white rounded uppercase tracking-wide bg-slate-800">
                      {p.property_type}
                    </span>
                    
                    {/* Favorite Button */}
                    <button className="absolute top-4 right-4 p-2 bg-white/30 backdrop-blur-sm rounded-full text-white hover:bg-white hover:text-red-500 transition-all">
                      <Heart size={18} />
                    </button>
                  </div>

                  {/* Card Body */}
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

                    {/* Icons */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 border-b border-gray-100 pb-4">
                      <div className="flex gap-1.5 items-center">
                        <BedDouble size={18} strokeWidth={1.5} /> <span className="font-medium">{p.bedrooms}</span>
                      </div>
                      <div className="flex gap-1.5 items-center">
                        <Bath size={18} strokeWidth={1.5} /> <span className="font-medium">{p.bathrooms}</span>
                      </div>
                      <div className="flex gap-1.5 items-center">
                        <Square size={18} strokeWidth={1.5} /> <span className="font-medium">{p.area} m²</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3">
                       {/* Compare Checkbox (Slightly Styled) */}
                      <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer w-fit hover:text-slate-800">
                          <input
                          type="checkbox"
                          checked={!!compareList.find((x) => x.id === p.id)}
                          onChange={() => toggleCompare(p)}
                          className="w-3.5 h-3.5 accent-slate-800"
                          />
                          Add to Compare
                      </label>

                      <Link
                          to={`/property/${p.id}`}
                          className="block w-full py-2.5 text-center bg-gray-100 hover:bg-gray-200 text-slate-900 rounded-lg font-bold text-sm transition-colors"
                      >
                          View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-12">
            <button className="p-2 text-gray-400 hover:text-slate-800 transition"><ChevronLeft size={20}/></button>
            <button className="w-10 h-10 bg-slate-800 text-white rounded-lg font-bold text-sm">1</button>
            <button className="w-10 h-10 text-gray-500 hover:bg-gray-100 rounded-lg font-medium text-sm transition">2</button>
            <button className="w-10 h-10 text-gray-500 hover:bg-gray-100 rounded-lg font-medium text-sm transition">3</button>
            <span className="text-gray-400">...</span>
            <button className="w-10 h-10 text-gray-500 hover:bg-gray-100 rounded-lg font-medium text-sm transition">10</button>
            <button className="p-2 text-gray-400 hover:text-slate-800 transition"><ChevronRight size={20}/></button>
          </div>

        </div>
      </div>

      {/* FLOATING COMPARE BUTTON */}
      {compareList.length > 0 && (
        <Link
          to="/compare"
          className="fixed bottom-6 right-6 bg-slate-800 text-white px-6 py-3 rounded-full shadow-xl font-semibold hover:bg-slate-900 transition z-50 flex items-center gap-2"
        >
          <span>Compare Properties</span>
          <span className="bg-white text-slate-800 text-xs font-bold px-2 py-0.5 rounded-full">{compareList.length}</span>
        </Link>
      )}
    </div>
  );
}