import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";

// Pages
import Home from "../pages/Home";
import Listing from "../pages/Listing";
import Detail from "../pages/Detail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Favorite from "../pages/Favorite";
import AgentProfile from "../pages/AgentProfile";
import Chat from "../pages/Chat";
import AgentDashboard from "../pages/AgentDashboard";
import AddProperty from "../pages/AddProperty";
import EditProperty from "../pages/EditProperty";
import Compare from "../pages/Compare";
import Settings from "../pages/Settings";

export default function AppRouter() {
  const navigate = useNavigate();

  // --- 1. DATA DUMMY USER (Agar halaman Settings tidak error) ---
  const [currentUser, setCurrentUser] = useState({
    name: "John Appleseed",
    email: "j.appleseed@realty.com",
    phone: "+1 (555) 123-4567",
  });

  // --- 2. FUNGSI LOGOUT ---
  const handleLogout = () => {
    // Di sini nanti logika hapus token/session
    alert("You have logged out!");
    navigate("/login");
  };

  return (
    <Routes>

      {/* PUBLIC PAGES */}
      <Route path="/" element={<Home />} />
      <Route path="/listing" element={<Listing />} />
      <Route path="/property/:id" element={<Detail />} />
      <Route path="/favorite" element={<Favorite />} />

      {/* NEW FEATURE → COMPARE PAGE */}
      <Route path="/compare" element={<Compare />} />

      {/* AUTH PAGES */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* AGENT PAGES */}
      <Route path="/agent/:id" element={<AgentProfile />} />
      <Route path="/chat/:id" element={<Chat />} />

      {/* DASHBOARD & PROPERTY MANAGEMENT */}
      <Route path="/dashboard" element={<AgentDashboard />} />
      <Route path="/add-property" element={<AddProperty />} />
      <Route path="/edit-property/:id" element={<EditProperty />} />

      {/* 👇 3. ROUTE SETTINGS (Diupdate dengan Props) */}
      <Route 
        path="/settings" 
        element={
          <Settings 
            user={currentUser} 
            setUser={setCurrentUser} // Supaya bisa update nama/email
            onLogout={handleLogout} 
          />
        } 
      />

    </Routes>
  );
}