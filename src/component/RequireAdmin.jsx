// src/components/RequireAdmin.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function RequireAdmin({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Checking authentication...</div>;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user.is_verified) {
    return <div className="min-h-screen flex items-center justify-center p-6">Your email is not verified. Please check your inbox.</div>;
  }
  if (!user.is_approved) {
    return <div className="min-h-screen flex items-center justify-center p-6">Your account is awaiting admin approval.</div>;
  }
  // if (!user.is_admin && !user.role?.includes?.("admin")) {
  //   return <div className="min-h-screen flex items-center justify-center p-6">You are not authorized to view this page.</div>;
  // }

  return children;
}
