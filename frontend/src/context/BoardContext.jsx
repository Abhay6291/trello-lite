import { createContext, useState, useEffect } from "react";
import API from "../api/axios";

export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState([]);

  const fetchBoards = async () => {
    try {
      const res = await API.get("/boards");
      setBoards(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <BoardContext.Provider value={{ boards, setBoards, fetchBoards }}>
      {children}
    </BoardContext.Provider>
  );
};