import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 1. Cek status login saat aplikasi dimuat
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  // 2. Fungsi Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userRole"); // Tambahan: hapus role juga biar bersih
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      
      {/* --- KIRI: LOGO (Tetap) --- */}
      <Link to="/" className="flex items-center gap-2">
        <div className="text-gray-900">
           <HomeIcon /> 
        </div>
        <span className="text-xl font-bold text-gray-800">PropertiKu</span>
      </Link>

      {/* --- KANAN: MENU --- */}
      <div className="flex items-center gap-6">
        {isLoggedIn ? (
          // === TAMPILAN SESUDAH LOGIN ===
          <>
            {/* Mengarah ke /properties sesuai Router */}
            <Link to="/properties?type=sale" className="text-sm font-medium text-gray-600 hover:text-gray-900">For Sale</Link>
            <Link to="/properties?type=rent" className="text-sm font-medium text-gray-600 hover:text-gray-900">For Rent</Link>

            {/* Mengarah ke /favorites sesuai permintaan */}
            <Link to="/favorites" className="bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition">
              List Your Favorite
            </Link>

            {/* --- ICON PROFIL & LOGOUT MENU --- */}
            <div className="relative group cursor-pointer py-2">
               {/* Icon Profil */}
               <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center border border-orange-100 text-orange-600">
                 <UserIcon />
               </div>
               
               {/* Dropdown Menu */}
               <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 hidden group-hover:block z-50 overflow-hidden">
                 <div className="px-4 py-3 border-b border-gray-100">
                   <p className="text-sm font-semibold text-gray-900">Halo, User!</p>
                   <p className="text-xs text-gray-500">user@example.com</p>
                 </div>
                 <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                   Settings / Profile
                 </Link>
                 {/* TOMBOL LOGOUT */}
                 <button 
                   onClick={handleLogout} 
                   className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
                 >
                   Logout
                 </button>
               </div>
            </div>
          </>
        ) : (
          // === TAMPILAN SEBELUM LOGIN ===
          <>
             <div className="hidden md:flex gap-6 mr-4">
                {/* Mengarah ke /properties juga */}
                <Link to="/properties?type=sale" className="text-sm font-medium text-gray-600 hover:text-gray-900">For Buy</Link>
                <Link to="/properties?type=rent" className="text-sm font-medium text-gray-600 hover:text-gray-900">For Rent</Link>
            </div>
            <div className="h-6 w-px bg-gray-300 mx-2 hidden md:block"></div>
            <Link to="/login" className="text-gray-900 font-semibold text-sm hover:underline px-3">Login</Link>
            <Link to="/register" className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-black transition">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

// --- ICONS (Tidak Berubah) ---
function HomeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
}