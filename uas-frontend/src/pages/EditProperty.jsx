import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditProperty() {
  const navigate = useNavigate();
  const { id } = useParams(); // Ambil ID dari URL (dummy use)

  // Dummy Initial Data
  const [form, setForm] = useState({
    title: "Modern Downtown Loft",
    description: "Discover urban living at its finest in this stylish downtown loft. Featuring an open-concept layout, high ceilings, and floor-to-ceiling windows that flood the space with natural light. The gourmet kitchen is equipped with stainless steel appliances and granite countertops. Enjoy...",
    price: "450,000",
    type: "For Sale",
    location: "123 Main Street, Metropolis, USA",
    bedrooms: "2",
    bathrooms: "2",
    area: "1200",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", form);
    navigate("/my-properties");
  };

  // Helper styles
  const labelClass = "block text-sm font-bold text-gray-900 mb-2";
  const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:bg-white transition";

  return (
    <div className="flex min-h-screen bg-white font-sans text-gray-800">
      
      {/* --- SIDEBAR (Sama seperti halaman lain) --- */}
      <aside className="w-64 bg-white border-r border-gray-200 flex-col hidden md:flex sticky top-0 h-screen">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
             <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center text-orange-600 font-bold text-lg">J</div>
             <div>
              <h3 className="text-sm font-bold text-gray-900">John Appleseed</h3>
              <p className="text-xs text-gray-500">Realty Inc.</p>
            </div>
          </div>
          <nav className="space-y-1">
             <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition">Dashboard</Link>
             <Link to="/my-properties" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 font-medium rounded-lg">My Properties</Link>
             <Link to="/settings" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition">Settings</Link>
          </nav>
          <div className="mt-auto pt-8 absolute bottom-8 w-52">
             <Link to="/add-property" className="block w-full bg-slate-800 text-white font-bold py-3 px-4 rounded-lg mb-6 shadow-md text-center">Add New Property</Link>
             <div className="space-y-2 text-sm font-medium text-gray-500 pl-4">
               <p>Help</p>
               <p>Logout</p>
             </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto bg-gray-50/50">
        <div className="mb-8">
           <h1 className="text-3xl font-extrabold text-gray-900">Edit Property</h1>
           <p className="text-gray-500 mt-1">Update the details for the property listing "{form.title}".</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: FORM */}
          <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-gray-200 shadow-sm h-fit">
            <h2 className="text-lg font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Property Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className={labelClass}>Property Title</label>
                <input type="text" name="title" value={form.title} onChange={handleChange} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <textarea name="description" rows="5" value={form.description} onChange={handleChange} className={inputClass}></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className={labelClass}>Price ($)</label>
                    <input type="text" name="price" value={form.price} onChange={handleChange} className={inputClass} />
                 </div>
                 <div>
                    <label className={labelClass}>Type</label>
                    <div className="relative">
                       <select name="type" value={form.type} onChange={handleChange} className={`${inputClass} appearance-none`}>
                         <option>For Sale</option>
                         <option>For Rent</option>
                       </select>
                       <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                       </div>
                    </div>
                 </div>
              </div>

              <div>
                <label className={labelClass}>Location</label>
                <input type="text" name="location" value={form.location} onChange={handleChange} className={inputClass} />
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className={labelClass}>Bedrooms</label>
                  <input type="number" name="bedrooms" value={form.bedrooms} onChange={handleChange} className={inputClass} />
                </div>
                 <div>
                  <label className={labelClass}>Bathrooms</label>
                  <input type="number" name="bathrooms" value={form.bathrooms} onChange={handleChange} className={inputClass} />
                </div>
                 <div>
                  <label className={labelClass}>Area (sq ft)</label>
                  <input type="number" name="area" value={form.area} onChange={handleChange} className={inputClass} />
                </div>
              </div>
            </form>
          </div>

          {/* RIGHT COLUMN: PHOTOS & ACTIONS */}
          <div className="space-y-6">
             {/* Photo Grid */}
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Property Photos</h2>
                <div className="grid grid-cols-2 gap-3 mb-4">
                   <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=200" className="rounded-lg w-full h-24 object-cover" alt="1"/>
                   <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=200" className="rounded-lg w-full h-24 object-cover" alt="2"/>
                   <img src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=200" className="rounded-lg w-full h-24 object-cover" alt="3"/>
                   <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=200" className="rounded-lg w-full h-24 object-cover" alt="4"/>
                </div>

                {/* Upload Area */}
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 cursor-pointer transition">
                   <svg className="w-6 h-6 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                   <p className="text-sm font-bold text-gray-700">Click to upload or drag & drop</p>
                   <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
                </div>
             </div>

             {/* Action Buttons */}
             <div className="flex gap-3">
               <button onClick={handleSubmit} className="flex-1 bg-slate-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-900 transition">
                 Update Property
               </button>
               <button onClick={() => navigate('/my-properties')} className="flex-1 bg-white border border-gray-200 text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-50 transition">
                 Cancel
               </button>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}