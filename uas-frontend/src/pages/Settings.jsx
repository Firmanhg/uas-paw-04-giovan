import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Settings({ user, onLogout }) {
  const navigate = useNavigate();
  
  // State untuk data form (Default value diambil dari props user atau dummy)
  const [formData, setFormData] = useState({
    name: user?.name || "John Doe",
    email: user?.email || "j.doe@realestate.com",
    phone: user?.phone || "+1 (555) 123-4567",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* --- SIDEBAR (Sama dengan Dashboard) --- */}
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
          <NavItem to="/dashboard" icon={<DashboardIcon />} label="Dashboard" />
          
          <NavItem to="/my-properties" icon={<BuildingIcon />} label="My Properties" />
          
          {/* Menu Settings Aktif */}
          <NavItem to="/settings" icon={<SettingsIcon />} label="Settings" active />
        </nav>

        {/* --- TOMBOL ADD PROPERTY (Sama dengan Dashboard) --- */}
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
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-600 hover:bg-gray-50 transition text-left cursor-pointer"
          >
            <LogoutIcon />
            Logout
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT (Formulir) --- */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">My Profile</h1>

        {/* Card Putih Pembungkus Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-4xl">
          
          {/* SECTION 1: Personal Information */}
          <h2 className="text-lg font-bold text-gray-900 mb-6">Personal Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Phone Number (Full Width) */}
          <div className="mb-10">
            <label className="block text-sm font-medium text-gray-600 mb-2">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full md:w-1/2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            />
          </div>

          <hr className="border-gray-100 mb-10" />

          {/* SECTION 2: Change Password */}
          <h2 className="text-lg font-bold text-gray-900 mb-6">Change Password</h2>

          <div className="mb-6">
             <label className="block text-sm font-medium text-gray-600 mb-2">Current Password</label>
             <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="w-full md:w-1/2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
            </div>
          </div>

          <hr className="border-gray-100 mb-8" />

          {/* BUTTON ACTIONS */}
          <div className="flex justify-end gap-4">
            <button 
                onClick={onLogout}
                className="px-6 py-2.5 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition"
            >
              Logout
            </button>
            <button className="px-6 py-2.5 bg-[#2D3748] text-white font-medium rounded-lg hover:bg-gray-800 transition shadow-lg shadow-gray-200">
              Update Profile
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}

/* --- COMPONENTS KECIL (SIDEBAR ITEM) --- */
function NavItem({ to, icon, label, active = false }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
        active
          ? "bg-blue-50 text-blue-500" // Style saat Aktif (Biru Muda)
          : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      <span className={active ? "text-blue-500" : "text-gray-400"}>{icon}</span>
      {label}
    </Link>
  );
}

/* --- ICONS (SVG) --- */
const DashboardIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
);
const BuildingIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 21h18M5 21V7l8-4 8 4v14M8 21v-4h4v4" /></svg>
);
const SettingsIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
);
const HelpIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
);
const LogoutIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
);