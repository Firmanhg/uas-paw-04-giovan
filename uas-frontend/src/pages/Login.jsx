import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Home } from "lucide-react";
import { login as loginAPI } from "../services/authService";

export default function Login({ setUserRole }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      if (location.state?.email) {
        setEmail(location.state.email);
      }
    }
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Email dan password wajib diisi");
      setLoading(false);
      return;
    }

    try {
      const response = await loginAPI({ email, password });

      if (response.success) {
        setUserRole(response.user.role);

        if (response.user.role === "agent") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } else {
        setError(response.message || "Login gagal");
      }
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex font-sans text-slate-800">
      
      {/* --- LEFT IMAGE SECTION --- */}
      {/* Menggunakan width 50% (w-1/2) pada layar besar agar seimbang */}
      <div className="hidden md:block w-1/2 relative bg-gray-100">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop"
          alt="Interior Rumah"
          className="w-full h-full object-cover"
        />
        {/* Overlay tipis agar gambar tidak terlalu kontras (opsional) */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* --- RIGHT FORM SECTION --- */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <div className="w-full max-w-md space-y-6">
          
          {/* 1. Header & Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-2 mb-2 text-slate-800">
              <Home size={28} strokeWidth={2.5} />
              <span className="text-xl font-bold tracking-tight">PropertiKu</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Selamat Datang Kembali</h1>
            <p className="text-slate-500 mt-2 text-sm">Silakan masuk ke akun Anda</p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              {successMessage}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* 2. Form Inputs */}
          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 focus:bg-white transition-all text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 focus:bg-white transition-all text-sm pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* Toggle Eye Icon */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-xs font-semibold text-slate-600 hover:text-slate-900">
                Lupa password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-slate-800/20 disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>

          {/* 4. Footer Link */}
          <p className="text-sm text-center text-slate-500">
            Belum punya akun?{" "}
            <Link to="/register" className="font-bold text-slate-800 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}