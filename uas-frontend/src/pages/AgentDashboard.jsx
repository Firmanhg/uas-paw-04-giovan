import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllProperties } from "../services/api";

export default function AgentDashboard() {
  const navigate = useNavigate();
  // TODO: Get actual agent_id from session/auth
  const AGENT_ID = 1;
  
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProperties: 0,
    recentProperties: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch all properties for this agent
      const response = await getAllProperties({ agent_id: AGENT_ID });
      
      // Backend returns {status: "success", data: [...]}
      const agentProperties = response.data.data || response.data || [];
      
      setProperties(agentProperties);
      
      // Calculate stats
      setStats({
        totalProperties: agentProperties.length,
        // Get 4 most recent properties (sorted by ID descending)
        recentProperties: agentProperties
          .sort((a, b) => b.id - a.id)
          .slice(0, 4)
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
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

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex md:flex-col">
        {/* Profile / Brand Header */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center text-orange-600 font-bold">
            J
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">John Appleseed</h3>
            <p className="text-xs text-gray-500">Realty Inc.</p>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem to="/dashboard" icon={<DashboardIcon />} label="Dashboard" active />
          
          <NavItem to="/my-properties" icon={<BuildingIcon />} label="My Properties" />
          
          {/* 👇 INI YANG MENGHUBUNGKAN KE HALAMAN SETTINGS 👇 */}
          <NavItem to="/settings" icon={<SettingsIcon />} label="Settings" />
        </nav>

        {/* --- TOMBOL ADD PROPERTY --- */}
        <div className="px-4 mb-4">
           <Link 
             to="/add-property" 
             className="flex items-center justify-center w-full py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-900 transition shadow-md"
           >
             Add New Property
           </Link>
        </div>

        {/* Bottom Menu */}
        <div className="p-4 space-y-2 border-t border-gray-100">
          <button 
            onClick={() => navigate('/help')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-600 hover:bg-gray-50 transition text-left cursor-pointer"
          >
            <HelpIcon />
            <span>Help</span>
          </button>
          {/* Logout diarahkan ke Login */}
          <NavItem to="/login" icon={<LogoutIcon />} label="Logout" />
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Welcome back, Agent!
            </h1>
            <p className="text-gray-500 mt-1">
              Here's a summary of your properties.
            </p>
          </div>
          <Link 
            to="/my-properties"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg text-sm transition"
          >
            View All Properties
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <StatCard
                title="Total Properties Listed"
                value={stats.totalProperties.toString()}
                trend={stats.totalProperties > 0 ? "Properties active" : "No properties yet"}
                trendColor="text-blue-500"
                icon={<BuildingIconFilled />}
                iconColor="text-blue-500 bg-blue-50"
              />
              <StatCard
                title="Recent Properties"
                value={stats.recentProperties.length.toString()}
                trend="Latest uploads"
                trendColor="text-green-500"
                icon={<PhoneIcon />}
                iconColor="text-green-500 bg-green-50"
              />
              <StatCard
                title="Active Listings"
                value={stats.totalProperties.toString()}
                trend="Available for sale"
                trendColor="text-purple-500"
                icon={<EyeIcon />}
                iconColor="text-purple-500 bg-purple-50"
              />
            </div>

            {/* RECENT INQUIRIES SECTION */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-10">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">Recent Inquiries</h2>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg transition">
                  View All Inquiries
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                    <tr>
                      <th className="px-6 py-4">Inquirer</th>
                      <th className="px-6 py-4">Property</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {/* Inquiry 1 */}
                    <tr className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            JD
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Jane Doe</p>
                            <p className="text-xs text-gray-500">jane.doe@example.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-800 font-medium">
                        Modern Villa on Hilltop
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        Today, 11:34 AM
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition">
                          Chat
                        </button>
                      </td>
                    </tr>

                    {/* Inquiry 2 */}
                    <tr className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            JS
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">John Smith</p>
                            <p className="text-xs text-gray-500">j.smith@email.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-800 font-medium">
                        Downtown Loft Apartment
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        Yesterday, 8:15 PM
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition">
                          Chat
                        </button>
                      </td>
                    </tr>

                    {/* Inquiry 3 */}
                    <tr className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            EW
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Emily White</p>
                            <p className="text-xs text-gray-500">emily.w@mail.net</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-800 font-medium">
                        Cozy Suburban Home
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        May 28, 2024
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition">
                          Chat
                        </button>
                      </td>
                    </tr>

                    {/* Inquiry 4 */}
                    <tr className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            MB
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Michael Brown</p>
                            <p className="text-xs text-gray-500">mbrown@web.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-800 font-medium">
                        Seaside Cottage with View
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        May 27, 2024
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition">
                          Chat
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* RECENT PROPERTIES TABLE */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">Recent Properties</h2>
                    <Link
                      to="/my-properties"
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg transition"
                    >
                        View All Properties
                    </Link>
                </div>
                
              {stats.recentProperties.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-gray-500 mb-4">No properties yet</p>
                  <Link
                    to="/add-property"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
                  >
                    Add Your First Property
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                      <tr>
                        <th className="px-6 py-4">Property</th>
                        <th className="px-6 py-4">Type</th>
                        <th className="px-6 py-4">Location</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {stats.recentProperties.map((property) => (
                        <tr key={property.id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-bold text-gray-900">{property.title}</p>
                              <p className="text-xs text-gray-400">
                                {property.bedrooms} BR • {property.bathrooms} BA • {property.area} m²
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                              {property.property_type}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-700">
                            {property.location}
                          </td>
                          <td className="px-6 py-4 text-gray-900 font-bold">
                            {formatCurrency(property.price)}
                          </td>
                          
                          <td className="px-6 py-4 text-right">
                            <Link
                              to={`/edit-property/${property.id}`} 
                              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm hover:shadow-md text-sm font-bold text-gray-700 hover:text-blue-600 hover:border-blue-300 transition"
                            >
                              Edit
                            </Link>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

/* --- COMPONENTS KECIL --- */

function NavItem({ icon, label, active = false, to = "#" }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
        active
          ? "bg-blue-50 text-blue-700"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      <span className={active ? "text-blue-600" : "text-gray-400"}>{icon}</span>
      {label}
    </Link>
  );
}

function StatCard({ title, value, trend, trendColor, icon, iconColor }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-40">
      <div className="flex justify-between items-start">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <div className={`p-2 rounded-lg ${iconColor}`}>{icon}</div>
      </div>
      <div>
        <p className="text-4xl font-extrabold text-gray-900">{value}</p>
        <p className={`text-xs font-bold mt-2 ${trendColor}`}>{trend}</p>
      </div>
    </div>
  );
}

/* --- ICONS (SVG) --- */
const DashboardIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const BuildingIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M3 21h18M5 21V7l8-4 8 4v14M8 21v-4h4v4" />
  </svg>
);

const BuildingIconFilled = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M6 21v-8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8"></path>
    <path d="M6 10V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5"></path>
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const HelpIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const LogoutIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
    <line x1="12" y1="18" x2="12.01" y2="18"></line>
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);