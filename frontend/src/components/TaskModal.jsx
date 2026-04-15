// import { useState, useEffect, useContext } from "react";
// import { ThemeContext } from "../context/ThemeContext";

// export default function TaskModal({
//   isOpen,
//   onClose,
//   onSave,
//   onDelete,
//   task,
// }) {
//   const { dark } = useContext(ThemeContext);

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     dueDate: "",
//   });

//   useEffect(() => {
//     if (task) {
//       setForm({
//         title: task.title || "",
//         description: task.description || "",
//         dueDate: task.dueDate
//           ? task.dueDate.substring(0, 10)
//           : "",
//       });
//     }
//   }, [task]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">

//       {/* BACKDROP */}
//       <div
//         onClick={onClose}
//         className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//       />

//       {/* MODAL */}
//       <div
//         className={`relative w-[360px] p-6 rounded-2xl border shadow-xl ${
//           dark
//             ? "bg-black border-white/10 text-white"
//             : "bg-white border-black/10 text-black"
//         }`}
//       >
//         <h2 className="text-lg font-semibold mb-4">
//           Edit Task
//         </h2>

//         {/* TITLE */}
//         <input
//           value={form.title}
//           onChange={(e) =>
//             setForm({ ...form, title: e.target.value })
//           }
//           placeholder="Title"
//           className={`w-full p-2.5 mb-3 rounded-lg border text-sm outline-none ${
//             dark
//               ? "bg-white/5 border-white/10 focus:border-white/30"
//               : "bg-black/5 border-black/10 focus:border-black/30"
//           }`}
//         />

//         {/* DESCRIPTION */}
//         <textarea
//           value={form.description}
//           onChange={(e) =>
//             setForm({ ...form, description: e.target.value })
//           }
//           placeholder="Description"
//           className={`w-full p-2.5 mb-3 rounded-lg border text-sm outline-none resize-none ${
//             dark
//               ? "bg-white/5 border-white/10 focus:border-white/30"
//               : "bg-black/5 border-black/10 focus:border-black/30"
//           }`}
//         />

//         {/* DATE */}
//         <input
//           type="date"
//           value={form.dueDate}
//           onChange={(e) =>
//             setForm({ ...form, dueDate: e.target.value })
//           }
//           className={`w-full p-2.5 mb-4 rounded-lg border text-sm outline-none ${
//             dark
//               ? "bg-white/5 border-white/10 focus:border-white/30"
//               : "bg-black/5 border-black/10 focus:border-black/30"
//           }`}
//         />

//         {/* ACTIONS */}
//         <div className="flex justify-between items-center">

//           {/* DELETE */}
//           <button
//             onClick={() => onDelete(task._id)}
//             className="text-sm text-red-500 hover:underline"
//           >
//             Delete
//           </button>

//           {/* RIGHT */}
//           <div className="flex gap-2">

//             <button
//               onClick={onClose}
//               className="text-sm opacity-70 hover:opacity-100 transition"
//             >
//               Cancel
//             </button>

//             <button
//               onClick={() => onSave(task._id, form)}
//               className={`px-4 py-1.5 rounded-lg text-sm transition ${
//                 dark
//                   ? "bg-white text-black hover:opacity-90"
//                   : "bg-black text-white hover:opacity-90"
//               }`}
//             >
//               Save
//             </button>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function TaskModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  task,
}) {
  const { dark } = useContext(ThemeContext);

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
      });
    }
  }, [task]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">

      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* MODAL */}
      <div
        className={`relative w-[360px] p-6 rounded-2xl border shadow-xl ${
          dark
            ? "bg-black border-white/10 text-white"
            : "bg-white border-black/10 text-black"
        }`}
      >
        <h2 className="text-lg font-semibold mb-4">
          Edit Task
        </h2>

        {/* TITLE */}
        <input
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          placeholder="Title"
          className={`w-full p-2.5 mb-3 rounded-lg border text-sm outline-none ${
            dark
              ? "bg-white/5 border-white/10 focus:border-white/30"
              : "bg-black/5 border-black/10 focus:border-black/30"
          }`}
        />

        {/* DESCRIPTION */}
        <textarea
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          placeholder="Description"
          className={`w-full p-2.5 mb-4 rounded-lg border text-sm outline-none resize-none ${
            dark
              ? "bg-white/5 border-white/10 focus:border-white/30"
              : "bg-black/5 border-black/10 focus:border-black/30"
          }`}
        />

        {/* ACTIONS */}
        <div className="flex justify-between items-center">

          {/* DELETE */}
          <button
            onClick={() => onDelete(task._id)}
            className="text-sm text-red-500 hover:underline"
          >
            Delete
          </button>

          {/* RIGHT */}
          <div className="flex gap-2">

            <button
              onClick={onClose}
              className="text-sm opacity-70 hover:opacity-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={() => onSave(task._id, form)}
              className={`px-4 py-1.5 rounded-lg text-sm transition ${
                dark
                  ? "bg-white text-black hover:opacity-90"
                  : "bg-black text-white hover:opacity-90"
              }`}
            >
              Save
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}