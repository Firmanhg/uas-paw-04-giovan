import { Link } from "react-router-dom";
import { useState } from "react";

export default function AgentDashboard() {
  // Data dummy untuk Inquiries
  const [inquiries] = useState([
    {
      id: 1,
      name: "Jane Doe",
      email: "jane.doe@example.com",
      property: "Modern Villa on Hilltop",
      date: "Today, 11:34 AM",
    },
    {
      id: 2,
      name: "John Smith",
      email: "j.smith@email.com",
      property: "Downtown Loft Apartment",
      date: "Yesterday, 8:15 PM",
    },
    {
      id: 3,
      name: "Emily White",
      email: "emily.w@mail.net",
      property: "Cozy Suburban Home",
      date: "May 28, 2024",
    },
    {
      id: 4,
      name: "Michael Brown",
      email: "mbrown@web.com",
      property: "Seaside Cottage with View",
      date: "May 27, 2024",
    },
  ]);

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
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
          <NavItem icon={<LogoutIcon />} label="Logout" />
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Welcome back, Olivia!
            </h1>
            <p className="text-gray-500 mt-1">
              Here's a summary of your activity.
            </p>
          </div>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg text-sm transition">
            View All Properties
          </button>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard
            title="Total Properties Listed"
            value="128"
            trend="+5 this month"
            trendColor="text-green-500"
            icon={<BuildingIconFilled />}
            iconColor="text-blue-500 bg-blue-50"
          />
          <StatCard
            title="Total Inquiries Received"
            value="542"
            trend="+12% this month"
            trendColor="text-green-500"
            icon={<PhoneIcon />}
            iconColor="text-blue-500 bg-blue-50"
          />
          <StatCard
            title="Active Listings"
            value="96"
            trend="-2 from last week"
            trendColor="text-red-500"
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
                  {/* --- PERUBAHAN 1: Header diganti Interaction --- */}
                  <th className="px-6 py-4 text-right">Interaction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inquiries.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-700">
                      {item.property}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{item.date}</td>
                    
                    {/* --- PERUBAHAN 2 & 3: Tombol Chat dengan Border Timbul --- */}
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/chat/${item.id}`} // Link ke halaman chat (sesuaikan routenya nanti)
                        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm hover:shadow-md text-sm font-bold text-gray-700 hover:text-blue-600 hover:border-blue-300 transition"
                      >
                        {/* Ikon Chat Kecil */}
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                        Chat
                      </Link>
                    </td>

                  </tr>
                ))}
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