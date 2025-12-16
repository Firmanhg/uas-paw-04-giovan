import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/authService";
import { Eye, EyeOff, Home } from "lucide-react";

export default function Login({ setUserRole }) {
  const navigate = useNavigate();

  const [role, setRole] = useState("buyer");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan password wajib diisi");
      return;
    }

    setLoading(true);

    try {
      const response = await login({ email, password });

      if (response.success) {
        // Set role ke state App
        setUserRole(response.user.role);

        // Redirect sesuai role
        if (response.user.role === "agent") {
          navigate("/agent/dashboard");
        } else {
          navigate("/");
        }
      } else {
        setError(response.message || "Login gagal");
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex font-sans text-slate-800">
      
      {/* --- LEFT IMAGE SECTION --- */}
      <div className="hidden md:block w-1/2 relative bg-gray-100">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop"
          alt="Interior Rumah"
          className="w-full h-full object-cover"
        />
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

          {/* ERROR MESSAGE */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* 2. Role Selector */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">I am a:</label>
            <div className="grid grid-cols-2 gap-4">
              {["buyer", "agent"].map((r) => (
                <label
                  key={r}
                  className={`
                    border rounded-lg p-3 flex items-center gap-3 cursor-pointer transition-all
                    ${role === r ? "border-slate-800 bg-slate-50 ring-1 ring-slate-800" : "border-gray-200 hover:border-slate-400"}
                  `}
                >
                  <input
                    type="radio"
                    name="role"
                    className="accent-slate-800 w-4 h-4"
                    checked={role === r}
                    onChange={() => setRole(r)}
                    disabled={loading}
                  />
                  <span className="capitalize font-medium text-slate-700">{r}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 3. Form Inputs */}
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
                disabled={loading}
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
                  disabled={loading}
                />
                {/* Toggle Eye Icon */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-600 transition-colors"
                  disabled={loading}
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
              className="w-full py-3.5 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-slate-800/20 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
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
