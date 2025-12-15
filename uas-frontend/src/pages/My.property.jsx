import { useState } from "react";
import { Link } from "react-router-dom";

export default function MyProperties() {
  // Dummy Data Properti
  const [properties] = useState([
    {
      id: 1,
      title: "Modern House in Suburbia",
      price: "$450,000",
      location: "Los Angeles, CA",
      type: "House",
      status: "For Sale",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?q=80&w=400",
      badgeColor: "bg-green-100 text-green-700",
    },
    {
      id: 2,
      title: "Luxury Downtown Apartment",
      price: "$2,500/mo",
      location: "New York, NY",
      type: "Apartment",
      status: "For Rent",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400",
      badgeColor: "bg-blue-100 text-blue-700",
    },
    {
      id: 3,
      title: "Cozy Studio Loft",
      price: "$1,800/mo",
      location: "San Francisco, CA",
      type: "Apartment",
      status: "For Rent",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=400",
      badgeColor: "bg-blue-100 text-blue-700",
    },
    {
      id: 4,
      title: "Beachfront Villa",
      price: "$1,200,000",
      location: "Miami, FL",
      type: "Villa",
      status: "For Sale",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=400",
      badgeColor: "bg-green-100 text-green-700",
    },
    {
      id: 5,
      title: "Modern Minimalist Home",
      price: "$850,000",
      location: "Austin, TX",
      type: "House",
      status: "For Sale",
      image: "https://images.unsplash.com/photo-1600596542815-2495db98dada?q=80&w=400",
      badgeColor: "bg-green-100 text-green-700",
    },
    {
      id: 6,
      title: "City Penthouse",
      price: "$5,000/mo",
      location: "Chicago, IL",
      type: "Apartment",
      status: "For Rent",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=400",
      badgeColor: "bg-blue-100 text-blue-700",
    },
  ]);

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* --- SIDEBAR (Sama seperti Dashboard) --- */}
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
            <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              Dashboard
            </Link>
            {/* Active State */}
            <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 font-medium rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 21h18M5 21V7l8-4 8 4v14M8 21v-4h4v4"/></svg>
              My Properties
            </div>
            <Link to="/settings" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              Settings
            </Link>
          </nav>
          <div className="mt-auto pt-8 absolute bottom-8 w-52">
            <Link to="/add-property" className="block w-full bg-slate-800 text-white font-bold py-3 px-4 rounded-lg mb-6 shadow-md hover:bg-slate-900 transition text-center">
              Add New Property
            </Link>
            <div className="space-y-2 text-sm font-medium text-gray-500">
              <div className="flex items-center gap-3 px-4 py-2 hover:text-gray-900 cursor-pointer">Help</div>
              <div className="flex items-center gap-3 px-4 py-2 hover:text-red-600 cursor-pointer text-red-500">Logout</div>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-8 md:p-10 overflow-y-auto">
        {/* Top Bar: Search & Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
           {/* Search Input */}
          <div className="relative w-full md:w-96">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </span>
            <input 
              type="text" 
              placeholder="Search by title or address..." 
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          
          {/* Filters Button */}
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-lg font-bold text-gray-700 hover:bg-gray-50 transition shadow-sm">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
             Filters
          </button>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">My Properties</h1>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition">
              {/* Image */}
              <div className="h-48 w-full relative">
                <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
              </div>
              
              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">{property.title}</h3>
                <p className="text-xl font-extrabold text-gray-900 mb-3">{property.price}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-500 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    {property.location}
                  </div>
                   <div className="flex items-center text-gray-500 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                    {property.type}
                  </div>
                </div>

                {/* Badge */}
                <div className="mb-4">
                   <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${property.badgeColor}`}>
                     {property.status}
                   </span>
                </div>

                {/* Actions Footer */}
                <div className="pt-4 border-t border-gray-100 flex justify-end gap-3 text-gray-400">
                  <Link to={`/edit-property/${property.id}`} className="hover:text-blue-600 transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                  </Link>
                  <button className="hover:text-gray-900 transition">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  </button>
                  <button className="hover:text-red-600 transition">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100">3</button>
            <span className="text-gray-400">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100">10</button>
             <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
        </div>
      </main>
    </div>
  );
}