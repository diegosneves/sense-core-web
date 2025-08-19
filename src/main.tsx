import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import { SensorsProvider } from "./sensors/SensorProvider";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./index.css";
import UsersSettings from "./pages/UsersSettings";
import SensorsSettings from "./pages/SensorsSettings";
import ProtectedByRole from "./ProtectedRoute";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <SensorsProvider>
        {" "}
        <BrowserRouter>
          <Routes>
            {/* Rota de login em "/" */}
            <Route path="/" element={<Login />} />

            {/* Home (se quiser, proteja por login) */}
            <Route path="/home" element={<Home />} />

            {/* Rotas protegidas por role */}
            <Route element={<ProtectedByRole allow={["admin", "manager"]} />}>
              <Route path="/settings/users" element={<UsersSettings />} />
              <Route path="/settings/sensors" element={<SensorsSettings />} />
            </Route>

            {/* fallback opcional */}
            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
          </Routes>
        </BrowserRouter>
      </SensorsProvider>
    </AuthProvider>
  </React.StrictMode>
);
