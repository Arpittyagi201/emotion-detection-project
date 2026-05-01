import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="page-container">
        <div className="page-inner flex items-center justify-center">
          <div className="glass-card rounded-2xl px-6 py-4 text-sm text-slate-300">
            Checking your session...
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

