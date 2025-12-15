import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddProperty() {
  const navigate = useNavigate();

  // State form
  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    type: "Jual (For Sale)",
    beds: "",
    baths: "",
    area: "",
    description: "",
    image: null,
  });

  // Handle change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form:", form);
    // Simulasi sukses, kembali ke dashboard atau my properties
    alert("Property Added Successfully!");
    navigate("/my-properties");
  };

  // Style helper
  const inputClass =
    "w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-gray-400 text-gray-700 bg-white transition";
  const labelClass = "block font-bold text-gray-700 mb-2 text-sm";

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center text-orange-600 font-bold">
            J
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">John Appleseed</h3>
            <p className="text-xs text-gray-500">Realty Inc.</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem to="/dashboard" icon={<DashboardIcon />} label="Dashboard" />
          <NavItem to="/my-properties" icon={<BuildingIcon />} label="My Properties" />
          <NavItem to="/settings" icon={<SettingsIcon />} label="Settings" />
        </nav>

        <div className="p-4 space-y-2 border-t border-gray-100">
          <NavItem icon={<HelpIcon />} label="Help" />
          <NavItem to="/login" icon={<LogoutIcon />} label="Logout" />
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Add New Property</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          
          {/* SECTION 1: BASIC INFO */}
          <div className="mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">
              Basic Information
            </h2>
            <div className="space-y-6">
              <div>
                <label className={labelClass}>Property Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Modern Villa with Ocean View"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Enter a detailed description..."
                  className={`${inputClass} h-32 resize-none`}
                  required
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: DETAILS */}
          <div className="mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">
              Property Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={labelClass}>Type</label>
                <div className="relative">
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none`}
                  >
                    <option>Jual (For Sale)</option>
                    <option>Sewa (For Rent)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                    <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>

              <div>
                <label className={labelClass}>Price (IDR)</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="e.g. 2000000000"
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={labelClass}>Location</label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Jakarta, Indonesia"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Bedrooms</label>
                <input
                  type="number"
                  name="beds"
                  value={form.beds}
                  onChange={handleChange}
                  placeholder="3"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Bathrooms</label>
                <input
                  type="number"
                  name="baths"
                  value={form.baths}
                  onChange={handleChange}
                  placeholder="2"
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: PHOTOS */}
          <div className="mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">
              Photos
            </h2>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition relative cursor-pointer">
               <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
               <div className="text-gray-400 mb-3">
                 <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
               </div>
               <p className="text-sm font-medium text-gray-700">Click to upload or drag and drop</p>
               <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG (max 5MB)</p>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-black transition shadow-lg"
            >
              Save Property
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

// --- Component NavItem & Icon sama persis dengan Dashboard ---
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

// --- ICONS ---
const DashboardIcon = () => (<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>);
const BuildingIcon = () => (<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 21h18M5 21V7l8-4 8 4v14M8 21v-4h4v4" /></svg>);
const SettingsIcon = () => (<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>);
const HelpIcon = () => (<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>);
const LogoutIcon = () => (<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>);