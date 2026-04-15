import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Layout({ children }) {
  const { dark } = useContext(ThemeContext);

  return (
    <div
      className={`flex h-screen overflow-hidden ${
        dark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex flex-col flex-1">

        <Navbar />

        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>

      </div>
    </div>
  );
}

