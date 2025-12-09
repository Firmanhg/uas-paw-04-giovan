import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [role, setRole] = useState("buyer");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 font-sans text-gray-800">
      {/* LEFT SIDE - BIG IMAGE */}
      <div className="hidden md:block relative">
        <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop" 
            alt="Luxury Home Interior"
            className="w-full h-full object-cover"
        />
        {/* Opsional: Overlay gelap tipis supaya teks lebih kontras jika mau ada teks di atas gambar */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="flex flex-col items-center justify-center p-8 md:p-16 bg-white">
        <div className="w-full max-w-md">
          
          {/* LOGO AREA */}
          <div className="flex flex-col items-center mb-8">
            <div className="mb-2">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
                    <path d="M3 21h18"/>
                    <path d="M5 21V7l8-4 8 4v14"/>
                    <path d="M9 10a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2"/>
                </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">PropertiKu</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2 text-gray-900">Selamat Datang Kembali</h2>
            <p className="text-gray-500">Silakan masuk ke akun Anda</p>
          </div>

          {/* ROLE SELECTOR */}
          <div className="mb-6">
            <p className="mb-2 font-medium text-gray-700">I am a:</p>
            <div className="grid grid-cols-2 gap-4">
              <label 
                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                  role === "buyer" 
                  ? "border-gray-800 bg-gray-50 ring-1 ring-gray-800" 
                  : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="buyer"
                  checked={role === "buyer"}
                  onChange={() => setRole("buyer")}
                  className="w-4 h-4 text-gray-800 focus:ring-gray-800 accent-gray-800"
                />
                <span className="font-medium">Buyer</span>
              </label>

              <label 
                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                  role === "agent" 
                  ? "border-gray-800 bg-gray-50 ring-1 ring-gray-800" 
                  : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="agent"
                  checked={role === "agent"}
                  onChange={() => setRole("agent")}
                  className="w-4 h-4 text-gray-800 focus:ring-gray-800 accent-gray-800"
                />
                <span className="font-medium">Agent</span>
              </label>
            </div>
          </div>

          {/* FORM */}
          <form className="space-y-5">
            <div>
              <label className="block mb-1.5 font-semibold text-gray-700">Email</label>
              <input
                type="email"
                className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block mb-1.5 font-semibold text-gray-700">Password</label>
              <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors pr-10"
                    placeholder="Enter your password"
                />
                <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                    {showPassword ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                </button>
              </div>
            </div>

            <div className="text-right text-sm">
              <button type="button" className="text-gray-600 hover:text-gray-900 font-medium">
                Lupa password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition font-semibold"
            >
              Login
            </button>
          </form>

          {/* REGISTER LINK */}
          <p className="text-center mt-8 text-sm text-gray-500">
            Belum punya akun?{" "}
            <Link to="/register" className="text-slate-800 font-bold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}