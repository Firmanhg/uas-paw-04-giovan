import { Routes, Route } from "react-router-dom";

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

export default function AppRouter() {
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

    </Routes>
  );
}
