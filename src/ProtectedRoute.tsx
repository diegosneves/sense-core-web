import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth/useAuth";

type Role = "admin" | "manager" | "operator" | "viewer";

type User = {
  role: Role;
};

type ProtectedByRoleProps = {
  allow: Role[];
  redirectTo?: string;
};

export default function ProtectedByRole({
  allow,
  redirectTo = "/home",
}: ProtectedByRoleProps) {
  const { user } = useAuth() as { user: User | null };

  if (!user) return <Navigate to="/" replace />;

  if (!allow.includes(user.role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
