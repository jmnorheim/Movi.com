import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import React from "react";

/**
 * Props RequireAuth component.
 */
interface RequireAuthProps {
  children: React.ReactNode;
}

/**
 * Component used to redirects to the login page if the user is not authenticated.
 */
export function RequireAuth({ children }: RequireAuthProps) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
