import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import Logo from "../components/Logo"; // ✅ import

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  const { dark, toggleTheme } = useContext(ThemeContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/");
  };

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
  ];

  return (
    <div
      className={`h-16 flex items-center justify-between px-6 border-b ${
        dark
          ? "border-white/10 bg-black"
          : "border-black/10 bg-white"
      }`}
    >
      {/* LEFT: LOGO + TEXT */}
      <div
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 cursor-pointer group"
      >
        {/* 🔥 Logo (scaled for navbar) */}
        <div className="scale-75">
          <Logo />
        </div>

        {/* Text */}
        <span className="text-sm font-semibold tracking-wide group-hover:opacity-80 transition">
          Trello Lite
        </span>
      </div>

      {/* CENTER: PILL NAV */}
      <div
        className={`hidden md:flex items-center gap-1 px-1 py-1 rounded-full ${
          dark ? "bg-white/10" : "bg-black/5"
        }`}
      >
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`px-4 py-1.5 text-sm rounded-full transition ${
                isActive
                  ? dark
                    ? "bg-white text-black"
                    : "bg-black text-white"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* RIGHT: ACTIONS */}
      <div className="flex items-center gap-3">

        {/* THEME */}
        <button
          onClick={toggleTheme}
          className={`px-3 py-1 rounded-lg border text-sm transition ${
            dark
              ? "border-white/10 hover:bg-white/10"
              : "border-black/10 hover:bg-black/5"
          }`}
        >
          {dark ? "☀️" : "🌙"}
        </button>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="px-4 py-1.5 rounded-lg text-sm bg-red-500 text-white hover:opacity-90 transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
}