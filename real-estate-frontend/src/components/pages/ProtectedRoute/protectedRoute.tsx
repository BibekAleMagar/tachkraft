import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const [showRedirect, setShowRedirect] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error("Please login first");
      setShowRedirect(true);
    }
  }, [token]);

  if (!token && showRedirect) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
