import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./index.css";
import UsersSettings from "./pages/UsersSettings";
import ProtectedByRole from "./ProtectedRoute";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rota de login em "/" */}
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          {/* Rotas protegidas */}
          <Route element={<ProtectedByRole allow={["admin", "manager"]} />}>
            <Route path="/settings/users" element={<UsersSettings />} />
          </Route>

          {/* fallback opcional */}
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
