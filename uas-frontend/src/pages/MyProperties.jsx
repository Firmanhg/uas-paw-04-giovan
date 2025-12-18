import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllProperties, deleteProperty } from "../services/api";

export default function MyProperties() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("all");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  
  // TODO: Get agent_id from auth context/session
  const AGENT_ID = 1; // Hardcoded untuk sementara

  // Fetch properties from backend
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Filter by agent_id untuk hanya menampilkan property milik agent ini
      const response = await getAllProperties({ agent_id: AGENT_ID });
      
      if (response.data.status === "success") {
        setProperties(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError("Failed to load properties. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await deleteProperty(id, AGENT_ID);
        // Refresh list setelah delete
        fetchProperties();
        alert("Property deleted successfully!");
      } catch (err) {
        console.error("Error deleting property:", err);
        alert("Failed to delete property. Please try again.");
      }
    }
  };

  // Filter properties based on search and filter
  const filteredProperties = properties.filter((property) => {
    // Search filter (title or location)
    const matchesSearch = 
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Property type filter
    const matchesType = 
      propertyTypeFilter === "all" || 
      property.property_type === propertyTypeFilter;
    
    return matchesSearch && matchesType;
  });

  // Get unique property types for filter dropdown
  const propertyTypes = [...new Set(properties.map(p => p.property_type))];

  const handleClearFilters = () => {
    setSearchQuery("");
    setPropertyTypeFilter("all");
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* --- SIDEBAR --- */}
      <aside className="hidden md:block w-64 bg-white border-r border-gray-200">
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center text-orange-600 font-bold">A</div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Agent</h3>
              <p className="text-xs text-gray-500">Realty Inc.</p>
            </div>
          </div>

          <nav className="flex-1 px-4 space-y-2 mt-4">
            <NavItem to="/dashboard" icon={<DashboardIcon />} label="Dashboard" />
            {/* Active State di sini */}
            <NavItem to="/my-properties" icon={<BuildingIcon />} label="My Properties" active />
            <NavItem to="/settings" icon={<SettingsIcon />} label="Settings" />
          </nav>

          <div className="px-4 mb-4">
            <Link 
              to="/add-property" 
              className="flex items-center justify-center w-full py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-900 transition shadow-md"
            >
              + Add New
            </Link>
          </div>

          <div className="p-4 space-y-2 border-t border-gray-100">
            <button 
              onClick={() => navigate('/help')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-600 hover:bg-gray-50 transition text-left cursor-pointer"
            >
              <HelpIcon />
              <span>Help</span>
            </button>
            <NavItem to="/login" icon={<LogoutIcon />} label="Logout" />
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Search and Filter Bar */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Search by title or address..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="M21 21l-4.35-4.35"></path>
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-10 top-3.5 text-gray-400 hover:text-gray-600"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
          <div className="relative">
            <button 
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              Filters
              {propertyTypeFilter !== "all" && (
                <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">1</span>
              )}
            </button>

            {/* Filter Dropdown Menu */}
            {showFilterMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-900">Filter Properties</h3>
                    <button
                      onClick={() => setShowFilterMenu(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                    <select
                      value={propertyTypeFilter}
                      onChange={(e) => setPropertyTypeFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Types</option>
                      {propertyTypes.map(type => (
                        <option key={type} value={type} className="capitalize">
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleClearFilters}
                      className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={() => setShowFilterMenu(false)}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">My Properties</h1>
            {(searchQuery || propertyTypeFilter !== "all") && (
              <p className="text-sm text-gray-600 mt-1">
                Showing {filteredProperties.length} of {properties.length} properties
              </p>
            )}
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading properties...</p>
          </div>
        )}

        {/* ERROR STATE */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
            {error}
          </div>
        )}

        {/* PROPERTY GRID */}
        {!loading && !error && properties.length > 0 && (
          <>
            {filteredProperties.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-gray-400">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="M21 21l-4.35-4.35"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No properties found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
                <button
                  onClick={handleClearFilters}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((p) => (
              <div key={p.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition group">
                {/* Property Image */}
                <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300">
                  {p.images && p.images.length > 0 ? (
                    <img 
                      src={p.images[0]} 
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  ) : p.img ? (
                    <img 
                      src={p.img} 
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-400 text-sm">No Image</span>
                    </div>
                  )}
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      For Sale
                    </span>
                  </div>
                  {/* Multiple Images Indicator */}
                  {p.images && p.images.length > 1 && (
                    <div className="absolute bottom-3 right-3 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {p.images.length}
                    </div>
                  )}
                </div>

                {/* Property Details */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                    {p.title}
                  </h3>
                  
                  <p className="text-xl font-bold text-gray-900 mb-3">
                    Rp {p.price.toLocaleString("id-ID")}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>{p.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    <span className="capitalize">{p.property_type}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <Link 
                      to={`/edit-property/${p.id}`}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="Edit"
                    >
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </Link>
                    
                    <Link 
                      to={`/property/${p.id}`}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="View as buyer"
                    >
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </Link>
                    
                    <button 
                      onClick={() => handleDelete(p.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete"
                    >
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && properties.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-gray-400">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No properties yet</h3>
            <p className="text-gray-500 mb-6">Start by adding your first property listing</p>
            <Link 
              to="/add-property"
              className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-black transition"
            >
              + Add Your First Property
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

// --- Icons & Helper ---
function NavItem({ icon, label, active = false, to = "#" }) {
  return (
    <Link to={to} className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${active ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}>
      <span className={active ? "text-blue-600" : "text-gray-400"}>{icon}</span>
      {label}
    </Link>
  );
}
const DashboardIcon = () => (<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>);
const BuildingIcon = () => (<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 21h18M5 21V7l8-4 8 4v14M8 21v-4h4v4" /></svg>);
const SettingsIcon = () => (<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>);
const HelpIcon = () => (<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>);
const LogoutIcon = () => (<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>);