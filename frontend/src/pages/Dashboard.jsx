import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";
import CreateBoardModal from "../components/CreateBoardModal";
import { BoardContext } from "../context/BoardContext";
import { ThemeContext } from "../context/ThemeContext";

export default function Dashboard() {
  const { boards, fetchBoards } = useContext(BoardContext);
  const { dark } = useContext(ThemeContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const createBoard = async (title) => {
    if (!title) return;

    try {
      await API.post("/boards", { title });
      toast.success("Board created");
      fetchBoards();
    } catch {
      toast.error("Failed to create board");
    }
  };

  return (
    <div
      className={`flex flex-col h-full ${
        dark ? "text-white" : "text-black"
      }`}
    >

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Your Boards
        </h1>
        <p className="text-sm opacity-50 mt-1">
          Manage and organize your workspaces
        </p>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-5">

        {/* CREATE CARD */}
        <div
          onClick={() => setIsModalOpen(true)}
          className={`cursor-pointer border rounded-xl p-6 flex items-center justify-center text-sm font-medium transition ${
            dark
              ? "border-white/10 hover:bg-white/5"
              : "border-black/10 hover:bg-black/5"
          }`}
        >
          + Create Board
        </div>

        {/* BOARD CARDS */}
        {boards.map((board) => (
          <div
            key={board._id}
            onClick={() => navigate(`/board/${board._id}`)}
            className={`cursor-pointer border rounded-xl p-6 transition ${
              dark
                ? "border-white/10 hover:bg-white/5"
                : "border-black/10 hover:bg-black/5"
            }`}
          >
            <h2 className="font-medium text-base">
              {board.title}
            </h2>

            <p className="text-xs opacity-50 mt-2">
              Open board →
            </p>
          </div>
        ))}

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