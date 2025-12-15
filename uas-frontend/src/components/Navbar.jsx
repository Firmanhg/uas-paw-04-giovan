import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Home } from "lucide-react"; // ✅ Tambahkan import 'Home'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="text-slate-800 group-hover:text-slate-600 transition">
            {/* ✅ ICON DIGANTI MENGGUNAKAN LUCIDE (Sama seperti Login) */}
            <Home size={28} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold text-slate-900 group-hover:text-slate-700 transition">
            PropertiKu
          </span>
        </Link>

        {/* DESKTOP MENU (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link to="/listing?type=sale" className="hover:text-slate-900 transition">
              For Buy
            </Link>
            <Link to="/listing?type=rent" className="hover:text-slate-900 transition">
              For Rent
            </Link>
          </div>

          <div className="w-px h-6 bg-gray-200 mx-2"></div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-semibold text-slate-800 hover:bg-gray-50 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-5 py-2.5 rounded-lg bg-slate-800 text-sm font-semibold text-white hover:bg-slate-900 transition shadow-lg shadow-slate-800/20"
            >
              Register
            </Link>
          </div>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button 
            className="md:hidden text-gray-600 hover:text-slate-900"
            onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="flex flex-col p-4 space-y-4">
            <Link to="/listing?type=sale" className="text-gray-600 font-medium hover:text-slate-900" onClick={() => setIsOpen(false)}>
              For Buy
            </Link>
            <Link to="/listing?type=rent" className="text-gray-600 font-medium hover:text-slate-900" onClick={() => setIsOpen(false)}>
              For Rent
            </Link>
            <hr />
            <Link to="/login" className="text-center py-2 border border-gray-300 rounded-lg text-slate-800 font-semibold" onClick={() => setIsOpen(false)}>
              Login
            </Link>
            <Link to="/register" className="text-center py-2 bg-slate-800 rounded-lg text-white font-semibold" onClick={() => setIsOpen(false)}>
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}