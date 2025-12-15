import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login({ setUserRole }) {
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

    // ✅ SIMPAN ROLE KE LOCALSTORAGE
    localStorage.setItem("userRole", role);

    // ✅ SIMPAN USER (opsional, tapi rapi)
    localStorage.setItem(
      "user",
      JSON.stringify({ email, role })
    );

    // ✅ SET ROLE KE STATE APP
    setUserRole(role);

    // 🔥 REDIRECT SESUAI ROLE
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
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
          className="w-full h-full object-cover"
        />
      </div>

      {/* FORM */}
      <div className="flex items-center justify-center p-10 bg-white">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6">Login</h1>

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
                />
                <span className="capitalize">{r}</span>
              </label>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full py-3 bg-slate-800 text-white rounded-lg"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center mt-6">
            Belum punya akun?{" "}
            <Link to="/register" className="font-bold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
