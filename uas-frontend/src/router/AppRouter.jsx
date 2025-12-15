import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

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
import EditProperty from "../pages/admin/EditProperty";
import MyProperties from "../pages/My.property.jsx";

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
      <Route path="/login" element={<Login />} />
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

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function AppRouter() {
  const navigate = useNavigate();

  /* ================= AUTH STATE ================= */
  const [userRole, setUserRole] = useState(null); // buyer | agent | null
  const [authChecked, setAuthChecked] = useState(false);
  
  // Data dummy user untuk Settings
  const [currentUser, setCurrentUser] = useState({
    name: "John Appleseed",
    email: "j.appleseed@realty.com",
    phone: "+1 (555) 123-4567",
    role: "admin" // untuk testing user management
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
      <Route
        path="/login"
        element={<Login setUserRole={setUserRole} />}
      />
      <Route path="/register" element={<Register />} />

<<<<<<< HEAD
      {/* AGENT PAGES */}
      <Route path="/agent/:id" element={<AgentProfile />} />
      <Route path="/chat/:id" element={<Chat />} />

      {/* DASHBOARD & PROPERTY MANAGEMENT */}
      <Route path="/dashboard" element={<AgentDashboard />} />
      
      {/* 👇 2. ROUTE BARU UNTUK MY PROPERTIES */}
      <Route path="/my-properties" element={<MyProperties />} />
      
      <Route path="/add-property" element={<AddProperty />} />
      <Route path="/edit-property/:id" element={<EditProperty />} />

      {/* ROUTE SETTINGS */}
      <Route 
        path="/settings" 
        element={
          <Settings 
            user={currentUser} 
            setUser={setCurrentUser} 
            onLogout={handleLogout} 
          />
        } 
=======
      {/* ================= BUYER CHAT ================= */}
      <Route
        path="/chat/:agentId"
        element={
          userRole === "buyer"
            ? <Chat />
            : <Navigate to="/login" />
        }
>>>>>>> 8ee7da3ea1890a3533cbff0ca25f309ff03ce4f9
      />

      {/* ================= AGENT CHAT ================= */}
      <Route
        path="/agent/chat/:buyerId"
        element={
          userRole === "agent"
            ? <ChatAgent />
            : <Navigate to="/login" />
        }
      />

      {/* ================= AGENT AREA ================= */}
      <Route
        path="/dashboard"
        element={
          userRole === "agent"
            ? <AgentDashboard />
            : <Navigate to="/login" />
        }
      />

      <Route
        path="/my-properties"
        element={
          userRole === "agent"
            ? <Myproperty />
            : <Navigate to="/login" />
        }
      />

      <Route
        path="/add-property"
        element={
          userRole === "agent"
            ? <AddProperty />
            : <Navigate to="/login" />
        }
      />

      <Route
        path="/edit-property/:id"
        element={
          userRole === "agent"
            ? <EditProperty />
            : <Navigate to="/login" />
        }
      />

      <Route path="/agent/:id" element={<AgentProfile />} />

      {/* ================= SETTINGS ================= */}
      <Route
        path="/settings"
        element={
          userRole
            ? (
              <Settings
                userRole={userRole}
                onLogout={handleLogout}
              />
            )
            : <Navigate to="/login" />
        }
      />

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}
