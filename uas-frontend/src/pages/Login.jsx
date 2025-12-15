import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/authService";

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
    <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 font-sans text-gray-800">
      {/* LEFT IMAGE */}
      <div className="hidden md:block relative">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
          className="w-full h-full object-cover"
          alt="Property"
        />
      </div>

      {/* FORM */}
      <div className="flex items-center justify-center p-10 bg-white">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6">Login</h1>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* ROLE */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {["buyer", "agent"].map((r) => (
              <label
                key={r}
                className={`border rounded-lg p-3 flex gap-2 cursor-pointer ${
                  role === r ? "border-slate-800 bg-gray-50" : ""
                }`}
              >
                <input
                  type="radio"
                  checked={role === r}
                  onChange={() => setRole(r)}
                  disabled={loading}
                />
                <span className="capitalize">{r}</span>
              </label>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={loading}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-center mt-6">
            Belum punya akun?{" "}
            <Link to="/register" className="font-bold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
