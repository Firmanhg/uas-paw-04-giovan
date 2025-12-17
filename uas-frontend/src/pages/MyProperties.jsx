import { Link } from "react-router-dom";
import { useState } from "react";

export default function MyProperties() {
  // Dummy Data Properti
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Modern Villa in South Jakarta",
      price: 2500000000,
      location: "Jakarta Selatan",
      type: "Sale",
      status: "Published",
      image: "https://images.unsplash.com/photo-1600596542815-2a4d9f0152ba?q=80&w=200&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Luxury Apartment SCBD",
      price: 3500000000,
      location: "SCBD Jakarta",
      type: "Rent",
      status: "Draft",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=200&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Cozy Family House",
      price: 1200000000,
      location: "Depok",
      type: "Sale",
      status: "Published",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?q=80&w=200&auto=format&fit=crop",
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      setProperties(properties.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* --- SIDEBAR --- */}
      <aside className="hidden md:block w-64 bg-white border-r border-gray-200">
        <div className="flex flex-col h-full">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center text-orange-600 font-bold">{user?.name?.[0]?.toUpperCase() || 'A'}</div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">{user?.name || 'Agent'}</h3>
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
          <NavItem icon={<HelpIcon />} label="Help" />
          <NavItem to="/login" icon={<LogoutIcon />} label="Logout" />
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">My Properties</h1>
            <Link to="/add-property" className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-black transition">
                + Add Property
            </Link>
        </div>

        {/* PROPERTY TABLE */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Property</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {properties.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 flex items-center gap-4">
                    <img src={p.image} alt={p.title} className="w-16 h-12 rounded object-cover" />
                    <span className="font-bold text-gray-900">{p.title}</span>
                  </td>
                  <td className="px-6 py-4">{p.location}</td>
                  <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${p.type === 'Sale' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                          {p.type}
                      </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">Rp {p.price.toLocaleString("id-ID")}</td>
                  <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${p.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                          {p.status}
                      </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <Link to={`/edit-property/${p.id}`} className="text-blue-600 hover:underline font-medium">Edit</Link>
                    <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:underline font-medium">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {properties.length === 0 && (
              <div className="p-10 text-center text-gray-500">
                  No properties found. Click "Add Property" to start.
              </div>
          )}
        </div>
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