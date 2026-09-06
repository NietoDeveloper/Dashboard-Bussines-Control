"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import LoginScreen from "@/components/LoginScreen";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { useAuth } from "@/lib/auth-context";

const SPLASH_DURATION_MS = 1800;

export default function HomePage() {
  const { employee, isLoading } = useAuth();
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setSplashDone(true), SPLASH_DURATION_MS);
    return () => clearTimeout(t);
  }, []);

  if (!splashDone || isLoading) {
    return <LoadingScreen />;
  }

  if (!employee) {
    return <LoginScreen />;
  }

  return <DashboardShell />;
}
