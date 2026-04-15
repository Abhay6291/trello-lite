// import { useDrop } from "react-dnd";
// import API from "../api/axios";
// import TaskCard from "./TaskCard";

// export default function Column({ title, status, tasks, refresh }) {
//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: "TASK",

//     drop: async (item) => {
//       if (item.status === status) return;

//       await API.put(`/tasks/${item._id}`, { status });
//       refresh();
//     },

//     collect: (monitor) => ({
//       isOver: monitor.isOver(),
//     }),
//   }));

//   return (
//     <div
//       ref={drop}
//       className={`min-w-[300px] rounded-2xl p-4 border transition ${
//         isOver
//           ? "bg-purple-500/20 border-purple-400"
//           : "bg-white/5 border-white/10"
//       }`}
//     >
//       <h2 className="text-lg font-semibold mb-4">{title}</h2>

//       <div className="flex flex-col gap-3 min-h-[200px]">
//         {tasks.map((task) => (
//           <TaskCard key={task._id} task={task} refresh={refresh} />
//         ))}
//       </div>
//     </div>
//   );
// }

// import { useDrop } from "react-dnd";
// import API from "../api/axios";
// import TaskCard from "./TaskCard";

// export default function Column({ title, status, tasks, refresh }) {
//   const [{ isOver, canDrop }, drop] = useDrop(() => ({
//     accept: "TASK",

//     drop: async (item) => {
//       // ❌ prevent unnecessary API call
//       if (item.status === status) return;

//       try {
//         await API.put(`/tasks/${item._id}`, { status });
//         refresh();
//       } catch (err) {
//         console.error("Error updating task:", err);
//       }
//     },

//     collect: (monitor) => ({
//       isOver: monitor.isOver(),
//       canDrop: monitor.canDrop(),
//     }),
//   }));

//   return (
//     <div
//       ref={drop}
//       className={`
//         min-w-[300px]
//         rounded-2xl
//         p-4
//         border
//         transition-all
//         duration-200
//         ${
//           isOver && canDrop
//             ? "bg-purple-500/20 border-purple-400 scale-[1.02]"
//             : "bg-white/5 border-white/10"
//         }
//       `}
//     >
//       {/* COLUMN TITLE */}
//       <h2 className="text-lg font-semibold mb-4 text-white/90">
//         {title}
//       </h2>

//       {/* TASK LIST */}
//       <div className="flex flex-col gap-3 min-h-[200px]">
//         {tasks.length === 0 ? (
//           <p className="text-sm text-white/40 text-center mt-10">
//             No tasks
//           </p>
//         ) : (
//           tasks.map((task) => (
//             <TaskCard
//               key={task._id}
//               task={task}
//               refresh={refresh}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

import { useDrop } from "react-dnd";
import { useState, useContext } from "react";
import API from "../api/axios";
import TaskCard from "./TaskCard";
import { ThemeContext } from "../context/ThemeContext";

export default function Column({
  title,
  status,
  tasks,
  refresh,
  onAdd,
}) {
  const { dark } = useContext(ThemeContext);
  const [adding, setAdding] = useState(false);
  const [text, setText] = useState("");

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

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd(text, status);
    setText("");
    setAdding(false);
  };

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
      <div className="flex justify-between items-center mb-4 sticky top-0 z-10">
        <h2 className="text-sm font-semibold tracking-wide">
          {title}
        </h2>

        <span className="text-xs opacity-50">
          {tasks.length}
        </span>
      </div>

      {/* TASK LIST */}
      <div className="flex flex-col gap-3 flex-1 min-h-[100px]">

        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} refresh={refresh} />
        ))}

        {/* ➕ ADD INLINE */}
        {adding ? (
          <div className="flex flex-col gap-2">
            <input
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Task title..."
              className={`p-2 rounded border text-sm ${
                dark
                  ? "bg-black border-white/10"
                  : "bg-white border-black/10"
              }`}
            />

            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                className="text-xs px-3 py-1 bg-green-500 text-white rounded"
              >
                Add
              </button>
              <button
                onClick={() => setAdding(false)}
                className="text-xs opacity-60"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setAdding(true)}
            className="text-xs opacity-50 hover:opacity-100 text-left"
          >
            + Add Task
          </button>
        )}

      </div>
    </div>
  );
}