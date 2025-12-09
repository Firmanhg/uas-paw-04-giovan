import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="font-sans min-h-screen bg-gray-50">
        {/* Navbar tampil di semua halaman */}
        <Navbar />

        {/* Semua halaman dari router */}
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}

export default App;