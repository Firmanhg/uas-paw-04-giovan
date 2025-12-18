import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCurrentUser, logout as logoutAPI } from "../services/authService";

/* ================= PUBLIC ================= */
import Home from "../pages/Home";
import Listing from "../pages/Listing"; // Kita pakai ini untuk halaman Properties
import Detail from "../pages/Detail";
import Favorite from "../pages/Favorite";

/* ================= AUTH ================= */
import Login from "../pages/Login";
import Register from "../pages/Register";

/* ================= CHAT ================= */
import Chat from "../pages/Chat";
import ChatAgent from "../pages/ChatAgent";

/* ================= AGENT ================= */
import AgentProfile from "../pages/AgentProfile";
import AgentDashboard from "../pages/AgentDashboard";
import AddProperty from "../pages/AddProperty";
import EditProperty from "../pages/EditProperty";
import MyProperties from "../pages/MyProperties";

/* ================= FEATURES ================= */
import Compare from "../pages/Compare";
import Settings from "../pages/Settings";
import Help from "../pages/Help";

export default function AppRouter() {
  const navigate = useNavigate();

  /* ================= AUTH STATE ================= */
  const [userRole, setUserRole] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  /* ================= LOAD SESSION ================= */
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUserRole(user.role);
      setCurrentUser(user);
    }
    setAuthChecked(true);
  }, []);

  /* ================= LOGOUT ================= */
  const handleLogout = async () => {
    try {
      await logoutAPI();
    } catch (error) {
      console.error("Logout error:", error);
    }
    setUserRole(null);
    setCurrentUser(null);
    navigate("/login");
  };

  /* ================= LOADING ================= */
  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Checking session...
      </div>
    );
  }

  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route path="/" element={<Home />} />
      
      {/* --- PERUBAHAN DI SINI --- */}
      {/* Ubah path="/listing" menjadi "/properties" agar sesuai Navbar */}
      <Route path="/properties" element={<Listing />} /> 
      
      <Route path="/property/:id" element={<Detail />} />
      
      {/* Ubah path="/favorite" menjadi "/favorites" agar sesuai Navbar */}
      <Route path="/favorites" element={<Favorite />} />
      
      <Route path="/compare" element={<Compare />} />

      {/* ================= AUTH ================= */}
      <Route path="/login" element={<Login setUserRole={setUserRole} />} />
      <Route path="/register" element={<Register />} />

      {/* ================= BUYER CHAT ================= */}
      <Route path="/chat/:agentId" element={<Chat />} />

      {/* ================= AGENT CHAT ================= */}
      <Route path="/agent/chat/:buyerId" element={<ChatAgent />} />

      {/* ================= AGENT AREA ================= */}
      <Route path="/dashboard" element={<AgentDashboard />} />
      <Route path="/my-properties" element={<MyProperties />} />
      <Route path="/add-property" element={<AddProperty />} />
      <Route path="/edit-property/:id" element={<EditProperty />} />
      <Route path="/agent/:id" element={<AgentProfile />} />

      {/* ================= SETTINGS ================= */}
      <Route
        path="/settings"
        element={
          <Settings
            user={currentUser}
            setUser={setCurrentUser}
            onLogout={handleLogout}
          />
        }
      />

      {/* ================= HELP ================= */}
      <Route path="/help" element={<Help />} />

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}