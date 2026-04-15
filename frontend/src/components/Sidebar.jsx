import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import CreateBoardModal from "./CreateBoardModal";
import { BoardContext } from "../context/BoardContext";
import { ThemeContext } from "../context/ThemeContext";
import API from "../api/axios";
import {
  LayoutDashboard,
  Plus,
  Trash2,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

export default function Sidebar() {
  const { boards, fetchBoards } = useContext(BoardContext);
  const { dark } = useContext(ThemeContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const createBoard = async (title) => {
    if (!title.trim()) return;

    try {
      await API.post("/boards", { title });
      toast.success("Board created");
      fetchBoards();
    } catch {
      toast.error("Failed to create board");
    }
  };

  const deleteBoard = async (id) => {
    if (!window.confirm("Delete this board?")) return;
    await API.delete(`/boards/${id}`);
    fetchBoards();
  };

  return (
    <div
      className={`h-full transition-all duration-300 flex flex-col border-r
      ${collapsed ? "w-20" : "w-64"}
      ${
        dark
          ? "bg-black/70 backdrop-blur-xl border-white/10 text-white"
          : "bg-white/70 backdrop-blur-xl border-black/10 text-black"
      }`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6 px-2">

        {!collapsed && (
          <h2 className="text-sm font-semibold opacity-60">
            BOARDS
          </h2>
        )}

        {/* COLLAPSE BUTTON */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-white/10"
        >
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      {/* CREATE BUTTON */}
      <button
        onClick={() => setIsModalOpen(true)}
        className={`flex items-center gap-2 mb-4 px-3 py-2 rounded-lg text-sm transition ${
          dark
            ? "hover:bg-white/10"
            : "hover:bg-black/5"
        }`}
      >
        <Plus size={16} />
        {!collapsed && "New Board"}
      </button>

      {/* BOARD LIST */}
      <div className="flex flex-col gap-1 overflow-y-auto flex-1">

        {/* DASHBOARD */}
        <SidebarItem
          icon={<LayoutDashboard size={16} />}
          label="Dashboard"
          collapsed={collapsed}
          active={location.pathname === "/dashboard"}
          onClick={() => navigate("/dashboard")}
        />

        {boards.map((board) => {
          const isActive =
            location.pathname === `/board/${board._id}`;

          return (
            <SidebarItem
              key={board._id}
              icon={<span className="text-xs">📋</span>}
              label={board.title}
              collapsed={collapsed}
              active={isActive}
              onClick={() => navigate(`/board/${board._id}`)}
              rightAction={
                !collapsed && (
                  <Trash2
                    size={14}
                    className="opacity-40 hover:text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteBoard(board._id);
                    }}
                  />
                )
              }
            />
          );
        })}
      </div>

      {/* MODAL */}
      <CreateBoardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={createBoard}
      />
    </div>
  );
}

/* 🔥 PREMIUM SIDEBAR ITEM */
function SidebarItem({
  icon,
  label,
  collapsed,
  active,
  onClick,
  rightAction,
}) {
  return (
    <div
      onClick={onClick}
      className={`group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-sm transition relative
      ${
        active
          ? "bg-white text-black dark:bg-white dark:text-black"
          : "opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10"
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        {!collapsed && <span className="truncate">{label}</span>}
      </div>

      {rightAction}

      {/* TOOLTIP */}
      {collapsed && (
        <div className="absolute left-16 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </div>
  );
}