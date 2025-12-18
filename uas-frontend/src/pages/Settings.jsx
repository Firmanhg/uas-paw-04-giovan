import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAgentProfile, updateAgentProfile } from "../services/api";
import { getCurrentUser } from "../services/authService";

export default function Settings({ user, onLogout }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const AGENT_ID = currentUser?.id; // Get from logged in user
  
  // State untuk data form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    company: "",
    license_number: "",
    avatar: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchAgentProfile();
    
    // Listen for user changes
    const handleUserChange = () => {
      setCurrentUser(getCurrentUser());
    };
    
    window.addEventListener('userChanged', handleUserChange);
    window.addEventListener('storage', handleUserChange);
    
    return () => {
      window.removeEventListener('userChanged', handleUserChange);
      window.removeEventListener('storage', handleUserChange);
    };
  }, []);

  const fetchAgentProfile = async () => {
    try {
      setLoading(true);
      const response = await getAgentProfile(AGENT_ID);
      if (response.data.status === "success") {
        const agent = response.data.data;
        setFormData({
          name: agent.name || "",
          email: agent.email || "",
          phone: agent.phone || "",
          bio: agent.bio || "",
          company: agent.company || "",
          license_number: agent.license_number || "",
          avatar: agent.avatar || "",
        });
      }
    } catch (error) {
      console.error("Error fetching agent profile:", error);
      setMessage({ type: "error", text: "Failed to load profile" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage({ type: "", text: "" });

      const response = await updateAgentProfile(AGENT_ID, formData);
      if (response.data.status === "success") {
        // Update localStorage with new user data
        const updatedUser = {
          ...currentUser,
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Trigger event to update sidebar and other components
        window.dispatchEvent(new Event('userChanged'));
        
        setMessage({ type: "success", text: "Profile updated successfully!" });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({ 
        type: "error", 
        text: error.response?.data?.error || "Failed to update profile" 
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* --- SIDEBAR (Sama dengan Dashboard) --- */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex md:flex-col">
        {/* Profile / Brand Header */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center text-orange-600 font-bold">
            {currentUser?.name?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">{currentUser?.name || 'Agent'}</h3>
            <p className="text-xs text-gray-500">{currentUser?.email || ''}</p>
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

        {/* Message Alert */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
          }`}>
            {message.text}
          </div>
        )}

        {/* Card Putih Pembungkus Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          
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
                required
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
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Phone Number & Company */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+62 812-3456-7890"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="PropertiKu Realty"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
            </div>
          </div>

          {/* License Number */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">License Number</label>
            <input
              type="text"
              name="license_number"
              value={formData.license_number}
              onChange={handleChange}
              placeholder="LIC-12345-AGENT"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            />
          </div>

          {/* Bio */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us about yourself and your expertise..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            />
          </div>

          {/* Avatar URL */}
          <div className="mb-10">
            <label className="block text-sm font-medium text-gray-600 mb-2">Avatar URL</label>
            <input
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="https://example.com/avatar.jpg or base64"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            />
            {formData.avatar && (
              <img src={formData.avatar} alt="Avatar preview" className="mt-3 w-20 h-20 rounded-full object-cover" />
            )}
          </div>

          {/* BUTTON ACTIONS */}
          <div className="flex justify-end pt-6 border-t border-gray-100">
            <button 
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-[#2D3748] text-white font-medium rounded-lg hover:bg-gray-800 transition shadow-lg disabled:bg-gray-400"
            >
              {saving ? "Saving..." : "Update Profile"}
            </button>
          </div>
        </form>
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