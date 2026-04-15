/// src/app/router/ProtectedRoute.tsx

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { ReactNode } from "react";
import { ROUTES } from "./routes";

interface Props {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth.token) {
    return <Navigate to={ROUTES.login} replace state={{ from: location }} />;
  }

  return children;
};