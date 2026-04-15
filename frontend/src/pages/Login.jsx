import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import toast from "react-hot-toast";
import DotGrid from "../components/DotGrid";
import Logo from "../components/Logo"; // ✅ import

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { dark, toggleTheme } = useContext(ThemeContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      login(res.data.token);
      toast.success("Login successful 🚀");
      navigate("/dashboard");
    } catch {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div
      className={`${
        dark ? "bg-black text-white" : "bg-white text-black"
      } relative min-h-screen overflow-hidden`}
    >
      <DotGrid />

      <div className="relative z-10">

        {/* 🔥 NAVBAR */}
        <div className="flex justify-between items-center px-10 py-5">

          {/* LEFT: LOGO + TEXT */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="scale-75">
              <Logo />
            </div>

            <span className="text-sm font-semibold tracking-wide group-hover:opacity-80 transition">
              Trello Lite
            </span>
          </div>

          {/* RIGHT */}
          <div className="flex gap-3 items-center">

            {/* 🌙 THEME */}
            <button
              onClick={toggleTheme}
              className={`border px-3 py-2 rounded-lg transition ${
                dark
                  ? "border-white/20 hover:bg-white/10"
                  : "border-black/20 hover:bg-black/10"
              }`}
            >
              {dark ? "☀️" : "🌙"}
            </button>

            {/* REGISTER */}
            <button
              onClick={() => navigate("/register")}
              className={`px-4 py-2 rounded-lg transition ${
                dark
                  ? "bg-white text-black hover:opacity-80"
                  : "bg-black text-white hover:opacity-90"
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* HERO */}
        <div className="flex flex-col items-center justify-center text-center mt-24 px-4">

          <h1 className="text-5xl tracking-tight font-[Space_Grotesk] leading-tight">
            Minimal Task <br />
            <span className="opacity-60">
              Management System
            </span>
          </h1>

          <p className="mt-6 opacity-50 max-w-xl text-sm">
            Clean. Focused. Distraction-free productivity.
          </p>

          {/* FORM */}
          <form
            onSubmit={handleLogin}
            className={`mt-10 p-8 rounded-2xl backdrop-blur-xl w-[340px] transition ${
              dark
                ? "bg-white/5 border border-white/10"
                : "bg-black/5 border border-black/10"
            }`}
          >
            <input
              placeholder="Email"
              className={`w-full p-3 mb-3 rounded border outline-none ${
                dark
                  ? "bg-white/10 border-white/10 focus:border-white/40"
                  : "bg-black/5 border-black/10 focus:border-black/40"
              }`}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className={`w-full p-3 mb-4 rounded border outline-none ${
                dark
                  ? "bg-white/10 border-white/10 focus:border-white/40"
                  : "bg-black/5 border-black/10 focus:border-black/40"
              }`}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <button
              className={`w-full py-3 rounded-lg font-semibold transition ${
                dark
                  ? "bg-white text-black hover:opacity-80"
                  : "bg-black text-white hover:opacity-90"
              }`}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

