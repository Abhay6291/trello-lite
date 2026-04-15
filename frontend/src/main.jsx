import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { AuthProvider } from "./context/AuthContext";
import { BoardProvider } from "./context/BoardContext";
import { ThemeProvider } from "./context/ThemeContext";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider> {/* 🌙 Theme wrapper */}
      <DndProvider backend={HTML5Backend}>
        <BoardProvider>
          <AuthProvider>
            <App />
            <Toaster position="top-right" />
          </AuthProvider>
        </BoardProvider>
      </DndProvider>
    </ThemeProvider>
  </StrictMode>
);