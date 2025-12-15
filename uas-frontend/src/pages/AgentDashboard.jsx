import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAgentStats, getAgentInquiries } from "../services/agentService";
import { getCurrentUser, logout } from "../services/authService";

export default function AgentDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total_properties: 0,
    active_listings: 0,
    total_inquiries: 0,
    properties_trend: '+0 this month',
    inquiries_trend: '+0% this month',
    listings_trend: '0 from last week'
  });
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Get current user info
      const userResponse = await getCurrentUser();
      if (userResponse.success) {
        setUser(userResponse.user);
      }

      // Fetch stats
      const statsResponse = await getAgentStats();
      if (statsResponse.success) {
        setStats(statsResponse.stats);
      }

      // Fetch inquiries
      const inquiriesResponse = await getAgentInquiries();
      if (inquiriesResponse.success) {
        setInquiries(inquiriesResponse.inquiries);
      }
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return `Today, ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
      return `Yesterday, ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
      // Force logout even if API fails
      localStorage.removeItem('userRole');
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">{error && (
        <div className="fixed top-4 right-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex md:flex-col">
        {/* Profile / Brand Header */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center text-orange-600 font-bold">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">{user?.name || 'Agent'}</h3>
            <p className="text-xs text-gray-500">Real Estate Agent</p>
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
          <NavItem icon={<HelpIcon />} label="Help" />
          {/* Logout button */}
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left text-gray-600 hover:bg-gray-100 transition"
          >
            <LogoutIcon />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Welcome back, {user?.name || 'Agent'}!
            </h1>
            <p className="text-gray-500 mt-1">
              Here's a summary of your activity.
            </p>
          </div>
          <Link 
            to="/my-properties"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg text-sm transition"
          >
            View All Properties
          </Link>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard
            title="Total Properties Listed"
            value={stats.total_properties}
            trend={stats.properties_trend}
            trendColor="text-green-500"
            icon={<BuildingIconFilled />}
            iconColor="text-blue-500 bg-blue-50"
          />
          <StatCard
            title="Total Inquiries Received"
            value={stats.total_inquiries}
            trend={stats.inquiries_trend}
            trendColor="text-green-500"
            icon={<PhoneIcon />}
            iconColor="text-blue-500 bg-blue-50"
          />
          <StatCard
            title="Active Listings"
            value={stats.active_listings}
            trend={stats.listings_trend}
            trendColor={stats.active_listings >= stats.total_properties ? "text-green-500" : "text-gray-500"}
            icon={<EyeIcon />}
            iconColor="text-blue-500 bg-blue-50"
          />
        </div>

        {/* RECENT INQUIRIES TABLE */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
                  <th className="px-6 py-4 text-right">Interaction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inquiries.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                      No inquiries yet. Share your properties to get inquiries!
                    </td>
                  </tr>
                ) : (
                  inquiries.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-bold text-gray-900">{item.buyer_name}</p>
                          <p className="text-xs text-gray-400">{item.buyer_email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-700">
                        {item.property_title}
                      </td>
                      <td className="px-6 py-4 text-gray-500">{formatDate(item.inquiry_date)}</td>
                      
                      <td className="px-6 py-4 text-right">
                        <Link
                          to={`/chat/${item.id}`} 
                          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm hover:shadow-md text-sm font-bold text-gray-700 hover:text-blue-600 hover:border-blue-300 transition"
                        >
                          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                          Chat
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
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