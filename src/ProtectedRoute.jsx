// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // Check if user is logged in

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
