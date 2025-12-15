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
import MyProperties from "../pages/Myproperty";

export default function AppRouter() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({
    name: "John Appleseed",
    email: "j.appleseed@realty.com",
    phone: "+1 (555) 123-4567",
  });

  const handleLogout = () => {
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

      {/* COMPARE */}
      <Route path="/compare" element={<Compare />} />

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* AGENT */}
      <Route path="/agent/:id" element={<AgentProfile />} />
      <Route path="/chat/:id" element={<Chat />} />

      {/* DASHBOARD & PROPERTY */}
      <Route path="/dashboard" element={<AgentDashboard />} />
      <Route path="/my-properties" element={<MyProperties />} /> {/* ✅ INI KUNCI */}
      <Route path="/add-property" element={<AddProperty />} />
      <Route path="/edit-property/:id" element={<EditProperty />} />

      {/* SETTINGS */}
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
    </Routes>
  );
}
