import React, { useMemo, useState } from "react";
import { mockUsers, mockCredentials } from "../mocks";
import { AuthContext } from "./AuthContext";
import type { User } from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);

  const login = async (username: string, password: string) => {
    await new Promise((r) => setTimeout(r, 300));

    const cred = mockCredentials.find(
      (c) => c.username === username && c.password === password
    );
    if (!cred) {
      throw new Error("invalid_credentials");
    }

    const found = mockUsers.find((u) => u.id === cred.userId);
    if (!found) {
      throw new Error("user_not_found");
    }

    setUser(found);
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
