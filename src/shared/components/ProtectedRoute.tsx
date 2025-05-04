import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type ProtectedRouteProps = {
  children: ReactNode;
  redirectPath?: string;
};

export const ProtectedRoute = ({
  children,
  redirectPath = "/login",
}: ProtectedRouteProps) => {
  const { isAuth, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuth) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export const GuestRoute = ({
  children,
  redirectPath = "/",
}: ProtectedRouteProps) => {
  const { isAuth, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuth) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};
