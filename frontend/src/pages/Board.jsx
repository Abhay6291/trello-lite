import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import Column from "../components/Column";
import CreateBoardModal from "../components/CreateBoardModal";
import { ThemeContext } from "../context/ThemeContext";

export default function Board() {
  const { id } = useParams();
  const { dark } = useContext(ThemeContext);

  const [tasks, setTasks] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await API.get(`/tasks/${id}`);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      setTasks([]);
    }
  };

  const createTask = async (title) => {
    if (!title) return;

    await API.post("/tasks", { title, boardId: id });
    fetchTasks();
  };

  useEffect(() => {
    setTasks([]);
    fetchTasks();
  }, [id]);

  return (
    <div
      className={`flex flex-col h-full ${
        dark ? "text-white" : "text-black"
      }`}
    >

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold tracking-tight">
          Board
        </h1>

        <button
          onClick={() => setOpenModal(true)}
          className={`px-4 py-2 rounded-lg text-sm transition ${
            dark
              ? "bg-white text-black hover:opacity-90"
              : "bg-black text-white hover:opacity-90"
          }`}
        >
          + Add Task
        </button>
      </div>

      {/* COLUMNS */}
      <div className="flex gap-5 overflow-x-auto pb-2">

        <Column
          title="Todo"
          status="todo"
          tasks={tasks.filter((t) => t.status === "todo")}
          refresh={fetchTasks}
        />

        <Column
          title="Doing"
          status="doing"
          tasks={tasks.filter((t) => t.status === "doing")}
          refresh={fetchTasks}
        />

        <Column
          title="Done"
          status="done"
          tasks={tasks.filter((t) => t.status === "done")}
          refresh={fetchTasks}
        />

      </div>

      {/* MODAL */}
      <CreateBoardModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onCreate={createTask}
        label="Create Task"
        placeholder="Task title..."
      />
    </div>
  );
}