import { BrowserRouter, useLocation } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import Navbar from "./components/Navbar";

function Layout() {
  const location = useLocation();

  // Daftar halaman yang tidak menampilkan navbar
  const hideNavbarPages = ["/login", "/register"];

  // Cek apakah halaman sekarang adalah halaman yang harus menyembunyikan navbar
  const hideNavbar = hideNavbarPages.includes(location.pathname);

  return (
    <div className="font-sans min-h-screen bg-gray-50">
      {/* Tampilkan navbar hanya jika bukan halaman login/register */}
      {!hideNavbar && <Navbar />}

      {/* Semua halaman dari AppRouter */}
      <AppRouter />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
