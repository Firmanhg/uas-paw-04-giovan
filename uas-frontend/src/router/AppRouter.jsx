import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Listing from "../pages/Listing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Detail from "../pages/Detail";
import Favorite from "../pages/Favorite";
import AgentProfile from "../pages/AgentProfile";
import Chat from "../pages/Chat";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/listing" element={<Listing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/property/:id" element={<Detail />} />
      <Route path="/favorite" element={<Favorite />} />
      <Route path="/agent/:id" element={<AgentProfile />} />
      <Route path="/chat/:id" element={<Chat />} />
    </Routes>
  );
}
