import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();
  
  const [role, setRole] = useState("buyer");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("Name, email, dan password wajib diisi");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    setLoading(true);

    try {
      const response = await register({
        ...formData,
        role
      });

      if (response.success) {
        setSuccess("Registrasi berhasil! Mengarahkan ke login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(response.message || "Registrasi gagal");
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 font-sans text-gray-800">
      
      {/* LEFT SIDE - IMAGE */}
      <div className="hidden md:block h-screen sticky top-0">
        <img 
            // GAMBAR  Modern Architecture House 
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop" 
            alt="Modern House Architecture"
            className="w-full h-full object-cover"
        />
        {/* Overlay*/}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="flex flex-col justify-center p-8 md:p-16 bg-white min-h-screen overflow-y-auto">
        <div className="w-full max-w-md mx-auto">
          
          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">Create an Account</h1>
            <p className="text-gray-500">Carilah dan temukan rumah impianmu</p>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* SUCCESS MESSAGE */}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
              {success}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* NAME INPUT */}
            <div>
              <label className="block mb-1.5 font-semibold text-gray-700 text-sm">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 transition-colors placeholder-gray-400"
                placeholder="Enter your full name"
                disabled={loading}
              />
            </div>

            {/* EMAIL INPUT */}
            <div>
              <label className="block mb-1.5 font-semibold text-gray-700 text-sm">Email</label>
              <div className="relative">
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 transition-colors placeholder-gray-400 pr-10"
                    placeholder="Enter your email address"
                    disabled={loading}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
              </div>
            </div>

            {/* PASSWORD INPUT */}
            <div>
              <label className="block mb-1.5 font-semibold text-gray-700 text-sm">Password</label>
              <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 transition-colors placeholder-gray-400 pr-10"
                    placeholder="Enter your password"
                    disabled={loading}
                />
                <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    disabled={loading}
                >
                    {showPassword ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                </button>
              </div>
            </div>

            {/* PHONE INPUT */}
            <div>
              <label className="block mb-1.5 font-semibold text-gray-700 text-sm">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 transition-colors placeholder-gray-400"
                placeholder="Enter your phone number"
                disabled={loading}
              />
            </div>

            {/* ROLE SELECTOR */}
            <div>
                <label className="block mb-2 font-semibold text-gray-700 text-sm">I am a:</label>
                <div className="grid grid-cols-2 gap-4">
                <label 
                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                    role === "buyer" 
                    ? "border-slate-800 bg-gray-50 ring-1 ring-slate-800" 
                    : "border-gray-200 hover:border-gray-400"
                    }`}
                >
                    <input
                    type="radio"
                    name="role"
                    value="buyer"
                    checked={role === "buyer"}
                    onChange={() => setRole("buyer")}
                    className="w-4 h-4 text-slate-800 focus:ring-slate-800 accent-slate-800"
                    disabled={loading}
                    />
                    <span className="font-medium text-sm">Buyer</span>
                </label>

                <label 
                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                    role === "agent" 
                    ? "border-slate-800 bg-gray-50 ring-1 ring-slate-800" 
                    : "border-gray-200 hover:border-gray-400"
                    }`}
                >
                    <input
                    type="radio"
                    name="role"
                    value="agent"
                    checked={role === "agent"}
                    onChange={() => setRole("agent")}
                    className="w-4 h-4 text-slate-800 focus:ring-slate-800 accent-slate-800"
                    disabled={loading}
                    />
                    <span className="font-medium text-sm">Agent</span>
                </label>
                </div>
            </div>

            {/* REGISTER BUTTON */}
            <button
              type="submit"
              className="w-full py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition font-semibold mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Loading..." : "Register"}
            </button>
          </form>

          {/* LOGIN LINK */}
          <p className="text-center mt-6 text-sm text-gray-500">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-slate-800 font-bold hover:underline">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}