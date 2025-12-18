import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Home, User, LogOut } from "lucide-react"; 
import { getCurrentUser, logout as logoutAPI } from "../services/authService";

export default function Navbar() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const location = useLocation();

  // Load user data on mount and when location changes
  useEffect(() => {
    const loadUser = () => {
      const user = getCurrentUser();
      setUserData(user);
    };

    // Load initially
    loadUser();

    // Listen for storage changes (when user logs in from another tab or Login component)
    window.addEventListener('storage', loadUser);
    
    // Custom event for same-window updates
    window.addEventListener('userChanged', loadUser);

    return () => {
      window.removeEventListener('storage', loadUser);
      window.removeEventListener('userChanged', loadUser);
    };
  }, [location.pathname]);

  // Hide navbar for agents (they have sidebar in dashboard)
  if (userData && userData.role === "agent") {
    return null; 
  }

  // Logout handler
  const handleLogout = async () => {
    try {
      await logoutAPI();
    } catch (error) {
      console.error("Logout error:", error);
    }
    setUserData(null);
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      
      {/* BAGIAN KIRI: LOGO */}
      <Link to="/" className="flex items-center gap-2">
        <Home className="text-slate-900" />
        <span className="text-xl font-bold text-slate-900">PropertiKu</span>
      </Link>

      {/* BAGIAN KANAN: MENU */}
      <div className="flex items-center gap-6">
        {userData ? (
          // === TAMPILAN SESUDAH LOGIN (KHUSUS BUYER) ===
          <>
            <Link to="/properties?type=sale" className="text-sm font-medium text-gray-600 hover:text-slate-900">For Sale</Link>
            <Link to="/properties?type=rent" className="text-sm font-medium text-gray-600 hover:text-slate-900">For Rent</Link>
            
            <Link to="/favorites" className="bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition">
              Your Favorites
            </Link>

            {/* Profil Dropdown Buyer */}
            <div className="relative group cursor-pointer py-2">
               <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 border border-orange-200">
                 <User size={20} />
               </div>
               
               <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 hidden group-hover:block overflow-hidden">
                 <div className="px-4 py-3 border-b border-gray-100">
                   <p className="text-sm font-semibold text-slate-900">Halo, Buyer!</p>
                 </div>
                 <button 
                   onClick={handleLogout} 
                   className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                 >
                   <LogOut size={16} /> Logout
                 </button>
               </div>
            </div>
          </>
        ) : (
          // === TAMPILAN SEBELUM LOGIN (TAMU) ===
          <>
             <div className="hidden md:flex gap-6 mr-4">
                <Link to="/properties?type=sale" className="text-sm font-medium text-gray-600 hover:text-slate-900">For Buy</Link>
                <Link to="/properties?type=rent" className="text-sm font-medium text-gray-600 hover:text-slate-900">For Rent</Link>
            </div>
            <div className="h-6 w-px bg-gray-300 mx-2 hidden md:block"></div>
            <Link to="/login" className="text-slate-900 font-semibold text-sm hover:underline px-3">Login</Link>
            <Link to="/register" className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-black transition">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}