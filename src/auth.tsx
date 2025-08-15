import React, { createContext, useContext, useMemo, useState } from "react";

type User = { id: string; name: string } | null;

type AuthContextType = {
  user: User;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);

  // Simulação de login
  const login = async (username: string, password: string) => {
    // Chamar API aqui e validar credenciais
    // await api.post('/login', { username, password });
    // Supondo sucesso:
    await new Promise((r) => setTimeout(r, 500));
    setUser({ id: "1", name: username });
    // Em produção, armazenar token/refresh token de forma segura (ex.: httpOnly cookie).
  };

  const logout = () => {
    setUser(null);
    // Limpa tokens/sessão conforme sua estratégia.
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
