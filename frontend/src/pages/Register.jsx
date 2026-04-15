import { useState, useContext } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DotGrid from "../components/DotGrid";
import { ThemeContext } from "../context/ThemeContext";
import Logo from "../components/Logo";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { dark, toggleTheme } = useContext(ThemeContext);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);
      toast.success("Registered successfully 🎉");
      navigate("/");
    } catch {
      toast.error("Registration failed");
    }
  };

  return (
    <div
      className={`relative min-h-screen overflow-hidden ${
        dark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* 🌊 BACKGROUND */}
      <DotGrid />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* NAVBAR */}
        <div className="flex justify-between items-center px-10 py-5">
          <h1
            onClick={() => navigate("/")}
            className="text-lg font-semibold cursor-pointer hover:opacity-70 transition"
          >
            Trello Lite
          </h1>

          <div className="flex items-center gap-3">
            {/* THEME */}
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

            {/* LOGIN */}
            <button
              onClick={() => navigate("/")}
              className={`px-4 py-2 rounded-lg transition ${
                dark
                  ? "bg-white text-black hover:opacity-80"
                  : "bg-black text-white hover:opacity-90"
              }`}
            >
              Login
            </button>
          </div>
        </div>

        {/* FORM SECTION */}
        <div className="flex flex-1 items-center justify-center px-4">

          <form
            onSubmit={handleRegister}
            className={`p-8 rounded-2xl w-[360px] flex flex-col gap-4 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:scale-[1.02] ${
              dark
                ? "bg-white/5 border border-white/10"
                : "bg-black/5 border border-black/10"
            }`}
          >
            {/* 🔥 LOGO */}
            <div className="flex flex-col items-center mb-2">
              <Logo />

              {/* BRAND TEXT (moved from logo component) */}
              <h2 className="mt-4 text-lg font-semibold tracking-tight">
                Trello Lite
              </h2>

              <p className="text-xs opacity-50 mt-1 text-center max-w-[240px]">
                Minimal task management, reimagined for speed.
              </p>
            </div>

            {/* NAME */}
            <input
              placeholder="Name"
              className={`p-3 rounded border outline-none transition ${
                dark
                  ? "bg-white/10 border-white/10 focus:border-white/40"
                  : "bg-black/5 border-black/10 focus:border-black/40"
              }`}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            {/* EMAIL */}
            <input
              placeholder="Email"
              className={`p-3 rounded border outline-none transition ${
                dark
                  ? "bg-white/10 border-white/10 focus:border-white/40"
                  : "bg-black/5 border-black/10 focus:border-black/40"
              }`}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            {/* PASSWORD */}
            {/* PASSWORD WRAPPER */}
            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                placeholder="Password"
                className={`w-full p-3 pr-12 rounded border outline-none transition ${
                  dark
                    ? "bg-white/10 border-white/10 focus:border-white/40"
                    : "bg-black/5 border-black/10 focus:border-black/40"
                }`}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              {/* 👁 TOGGLE BUTTON */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm opacity-60 hover:opacity-100 transition"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>

            </div>

            {/* BUTTON */}
            <button
              className={`py-3 rounded-lg font-semibold transition hover:scale-[1.02] ${
                dark
                  ? "bg-white text-black hover:opacity-80"
                  : "bg-black text-white hover:opacity-90"
              }`}
            >
              Create Account
            </button>

            {/* FOOTER */}
            <p className="text-center text-sm opacity-60 mt-2">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/")}
                className="cursor-pointer underline hover:opacity-80"
              >
                Login
              </span>
            </p>
          </form>

        </div>
      </div>
    </div>
  );
}