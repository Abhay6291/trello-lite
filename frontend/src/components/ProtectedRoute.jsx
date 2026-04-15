import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);

  // ❌ Not logged in → redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // ✅ Logged in → allow access
  return children;
}