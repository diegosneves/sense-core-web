import React, { createContext, useContext, useMemo, useState } from "react";
import { mockUsers, mockCredentials } from "./mocks"; // crie src/mocks.ts e exporte os arrays acima

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "manager" | "operator" | "viewer";
  username: string;
} | null;

type AuthContextType = {
  user: User;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);

  const login = async (username: string, password: string) => {
    // Simula latência
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

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
