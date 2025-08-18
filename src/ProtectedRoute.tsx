import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth";

type ProtectedByRoleProps = {
  allow: Array<"admin" | "manager" | "operator" | "viewer">;
  redirectTo?: string;
};

export default function ProtectedByRole({
  allow,
  redirectTo = "/home",
}: ProtectedByRoleProps) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;

  if (!allow.includes(user.role as any)) {
    return <Navigate to={redirectTo} replace />;
  }
  return <Outlet />;
}
