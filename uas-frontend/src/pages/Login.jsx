import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("buyer");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email dan password wajib diisi");
      return;
    }

    // 🔥 Redirect sesuai role
    if (role === "agent") {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 font-sans text-gray-800">
      {/* LEFT IMAGE */}
      <div className="hidden md:block relative">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
          alt="Luxury Home Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex flex-col items-center justify-center p-8 md:p-16 bg-white">
        <div className="w-full max-w-md">

          {/* LOGO */}
          <div className="flex flex-col items-center mb-8">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round" className="text-gray-800 mb-2">
              <path d="M3 21h18" />
              <path d="M5 21V7l8-4 8 4v14" />
              <path d="M9 10a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />
            </svg>
            <h1 className="text-2xl font-bold text-gray-900">PropertiKu</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2 text-gray-900">
              Selamat Datang Kembali
            </h2>
            <p className="text-gray-500">Silakan masuk ke akun Anda</p>
          </div>

          {/* ROLE SELECT */}
          <div className="mb-6">
            <p className="mb-2 font-medium text-gray-700">I am a:</p>
            <div className="grid grid-cols-2 gap-4">
              {["buyer", "agent"].map((r) => (
                <label
                  key={r}
                  className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                    role === r
                      ? "border-gray-800 bg-gray-50 ring-1 ring-gray-800"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="radio"
                    checked={role === r}
                    onChange={() => setRole(r)}
                    className="accent-gray-800"
                  />
                  <span className="font-medium capitalize">{r}</span>
                </label>
              ))}
            </div>
          </div>

          {/* FORM */}
          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block mb-1.5 font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block mb-1.5 font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  👁
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-900"
            >
              Login
            </button>
          </form>

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
