import { useDrop } from "react-dnd";
import { useContext } from "react";
import API from "../api/axios";
import TaskCard from "./TaskCard";
import { ThemeContext } from "../context/ThemeContext";

export default function Column({
  title,
  status,
  tasks,
  refresh,
}) {
  const { dark } = useContext(ThemeContext);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: async (item) => {
      if (item.status === status) return;

      await API.put(`/tasks/${item._id}`, { status });
      refresh();
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`min-w-[300px] rounded-2xl p-4 border transition flex flex-col ${
        dark
          ? "bg-white/5 border-white/10"
          : "bg-black/5 border-black/10"
      } ${isOver ? "ring-2 ring-purple-400" : ""}`}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold">{title}</h2>
        <span className="text-xs opacity-50">{tasks.length}</span>
      </div>

      {/* TASKS */}
      <div className="flex flex-col gap-3 flex-1 min-h-[100px]">
        {tasks.length === 0 ? (
          <p className="text-xs opacity-40 text-center mt-6">
            No tasks
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              refresh={refresh}
            />
          ))
        )}
      </div>
    </div>
  );
}