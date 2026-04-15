import { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function CreateBoardModal({
  isOpen,
  onClose,
  onCreate,
  label = "Create Board",
  placeholder = "Enter name...",
}) {
  const [title, setTitle] = useState("");
  const { dark } = useContext(ThemeContext);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!title.trim()) return;
    onCreate(title);
    setTitle("");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">

      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* MODAL */}
      <div
        className={`relative w-[320px] p-6 rounded-2xl border shadow-xl transition ${
          dark
            ? "bg-black border-white/10 text-white"
            : "bg-white border-black/10 text-black"
        }`}
      >
        <h2 className="text-lg font-semibold mb-4">
          {label}
        </h2>

        <input
          type="text"
          placeholder={placeholder}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full p-2.5 rounded-lg border text-sm outline-none mb-4 transition ${
            dark
              ? "bg-white/5 border-white/10 focus:border-white/30"
              : "bg-black/5 border-black/10 focus:border-black/30"
          }`}
        />

        <div className="flex justify-end gap-2">

          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg opacity-70 hover:opacity-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className={`px-4 py-2 text-sm rounded-lg transition ${
              dark
                ? "bg-white text-black hover:opacity-90"
                : "bg-black text-white hover:opacity-90"
            }`}
          >
            Create
          </button>

        </div>
      </div>
    </div>
  );
}