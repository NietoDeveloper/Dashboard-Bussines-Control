"use client";

// ---------------------------------------------------------------------------
// AUTH CONTEXT — demo mode.
// ---------------------------------------------------------------------------
// Right now, pressing "Ingresar" on the login screen logs the employee in
// WITHOUT validating credentials against the backend — this is intentional
// for the current stage of the project. The real flow is stubbed below
// (see loginReal) and calls api.login from lib/api.ts; swap `login` to call
// `loginReal` once employee registration/login is live on the backend.
// ---------------------------------------------------------------------------

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Employee } from "./types";
import { api } from "./api";

interface AuthContextValue {
  employee: Employee | null;
  isLoading: boolean;
  login: (correo: string, clave: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "dcsdt.employee";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setEmployee(JSON.parse(stored));
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  async function login(correo: string, _clave: string) {
    // --- DEMO MODE: bypasses real authentication ---
    // Any click on "Ingresar" succeeds, regardless of what was typed.
    const demoEmployee: Employee = {
      nombre: correo ? correo.split("@")[0] : "Empleado",
      correo: correo || "empleado@tunegocio.com",
      rol: "Control Administrativo",
    };
    setEmployee(demoEmployee);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(demoEmployee));

    // --- REAL MODE (disabled): uncomment once /api/user/login is ready ---
    // const result = await api.login(correo, clave);
    // const realEmployee: Employee = { nombre: result.nombre, correo, rol: result.rol };
    // setEmployee(realEmployee);
    // window.localStorage.setItem(STORAGE_KEY, JSON.stringify(realEmployee));
  }

  function logout() {
    setEmployee(null);
    window.localStorage.removeItem(STORAGE_KEY);
    // api.logout().catch(() => {}); // enable once real auth is wired in
  }

  return (
    <AuthContext.Provider value={{ employee, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
