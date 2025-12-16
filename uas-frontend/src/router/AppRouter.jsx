import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

/* ================= COMPONENTS ================= */
import ProtectedRoute from "../components/ProtectedRoute";

/* ================= PUBLIC ================= */
import Home from "../pages/Home";
import Listing from "../pages/Listing";
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

export default function AppRouter() {
  const navigate = useNavigate();

  /* ================= AUTH STATE ================= */
  const [userRole, setUserRole] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  
  const [currentUser, setCurrentUser] = useState({
    name: "John Appleseed",
    email: "j.appleseed@realty.com",
    phone: "+1 (555) 123-4567",
    role: "admin"
  });

  /* ================= LOAD SESSION ================= */
  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) {
      setUserRole(savedRole);
    }
    setAuthChecked(true);
  }, []);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("user");
    setUserRole(null);
    alert("You have logged out!");
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
      <Route path="/listing" element={<Listing />} />
      <Route path="/property/:id" element={<Detail />} />
      <Route path="/favorite" element={<Favorite />} />
      <Route path="/compare" element={<Compare />} />

      {/* ================= AUTH ================= */}
      <Route path="/login" element={<Login setUserRole={setUserRole} />} />
      <Route path="/register" element={<Register />} />

      {/* ================= BUYER CHAT ================= */}
      <Route path="/chat/:agentId" element={
        <ProtectedRoute>
          <Chat />
        </ProtectedRoute>
      } />

      {/* ================= AGENT CHAT ================= */}
      <Route path="/agent/chat/:buyerId" element={
        <ProtectedRoute requireAgent={true}>
          <ChatAgent />
        </ProtectedRoute>
      } />

      {/* ================= AGENT AREA (PROTECTED) ================= */}
      <Route path="/agent/dashboard" element={
        <ProtectedRoute requireAgent={true}>
          <AgentDashboard />
        </ProtectedRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute requireAgent={true}>
          <AgentDashboard />
        </ProtectedRoute>
      } />
      <Route path="/my-properties" element={
        <ProtectedRoute requireAgent={true}>
          <MyProperties />
        </ProtectedRoute>
      } />
      <Route path="/add-property" element={
        <ProtectedRoute requireAgent={true}>
          <AddProperty />
        </ProtectedRoute>
      } />
      <Route path="/edit-property/:id" element={
        <ProtectedRoute requireAgent={true}>
          <EditProperty />
        </ProtectedRoute>
      } />
      <Route path="/agent/:id" element={<AgentProfile />} />

      {/* ================= SETTINGS (PROTECTED) ================= */}
      <Route
        path="/settings"
        element={
          <ProtectedRoute requireAgent={true}>
            <Settings
              user={currentUser}
              setUser={setCurrentUser}
              onLogout={handleLogout}
            />
          </ProtectedRoute>
        }
      />

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
