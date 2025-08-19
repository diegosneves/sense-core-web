import { createContext } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "manager" | "operator" | "viewer";
  username: string;
} | null;

export type AuthContextType = {
  user: User;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
