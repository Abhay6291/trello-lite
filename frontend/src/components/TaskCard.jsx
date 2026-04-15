import { useDrag } from "react-dnd";
import { useState } from "react";
import API from "../api/axios";
import TaskModal from "./TaskModal";

export default function TaskCard({ task, refresh }) {
  const [open, setOpen] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: task,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleSave = async (id, data) => {
    await API.put(`/tasks/${id}`, data);
    setOpen(false);
    refresh();
  };

  const handleDelete = async (id) => {
    await API.delete(`/tasks/${id}`);
    setOpen(false);
    refresh();
  };

  return (
    <>
      <div
        ref={drag}
        onClick={() => setOpen(true)}
        className={`bg-white/10 border border-white/10 p-3 rounded-xl shadow-md cursor-grab transition-all duration-200 hover:scale-[1.03] ${
          isDragging
            ? "opacity-100 rotate-2 scale-105 shadow-xl z-50"
            : "opacity-90"
        }`}
      >
        <h3 className="font-semibold">{task.title}</h3>

        {task.dueDate && (
          <p className="text-xs text-white/50 mt-2">
            📅 {new Date(task.dueDate).toLocaleDateString()}
          </p>
        )}
      </div>

      <TaskModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        onDelete={handleDelete}
        task={task}
      />
    </>
  );
}

