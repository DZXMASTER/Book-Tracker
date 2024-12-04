import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const user = auth.currentUser;

  return user ? <>{children}</> : <Navigate to="/login" />;
};

export default AuthRoute;
