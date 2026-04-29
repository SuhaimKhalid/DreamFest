import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const user = localStorage.getItem("CurrentUser");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
