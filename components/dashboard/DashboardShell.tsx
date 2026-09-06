"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  seedAppointments,
  seedClusters,
  seedMessages,
  seedSales,
  seedUsers,
} from "@/lib/mockData";
import type { Appointment, AppointmentStatus, Message, SaleTransaction } from "@/lib/types";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import OverviewPanel from "./panels/OverviewPanel";
import AppointmentsPanel from "./panels/AppointmentsPanel";
import SalesPanel from "./panels/SalesPanel";
import MessagingPanel from "./panels/MessagingPanel";
import UsersPanel from "./panels/UsersPanel";
import ConnectionsPanel from "./panels/ConnectionsPanel";

export type SectionKey = "overview" | "citas" | "ventas" | "mensajeria" | "usuarios" | "conexiones";

// ---------------------------------------------------------------------------
// This shell currently simulates real-time activity locally (mock data +
// a periodic tick) so the panels feel alive out of the box. Once the
// backend connections in lib/api.ts and lib/socket.ts are enabled, replace
// the initial useState() seeds with data fetched from the API, and replace
// the setInterval below with socket event listeners (see lib/socket.ts).
// ---------------------------------------------------------------------------

export default function DashboardShell() {
  const { employee, logout } = useAuth();
  const [section, setSection] = useState<SectionKey>("overview");

  const [appointments, setAppointments] = useState<Appointment[]>(() => seedAppointments());
  const [sales, setSales] = useState<SaleTransaction[]>(() => seedSales());
  const [messages, setMessages] = useState<Message[]>(() => seedMessages());
  const [users] = useState(() => seedUsers());
  const [clusters] = useState(() => seedClusters());

  // Simulated live telemetry — a new sale or message occasionally arrives.
  useEffect(() => {
    const interval = setInterval(() => {
      const roll = Math.random();
      if (roll < 0.4) {
        setSales((prev) => [seedSales(1)[0], ...prev].slice(0, 40));
      } else if (roll < 0.75) {
        setMessages((prev) => [seedMessages(1)[0], ...prev].slice(0, 40));
      }
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  function updateAppointmentStatus(id: string, status: AppointmentStatus) {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    // api.updateBookingStatus(id, status).catch(() => {}); // enable once backend route exists
  }

  function markMessageRead(id: string) {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, leido: true } : m)));
  }

  const pendingCount = appointments.filter((a) => a.status === "pendiente").length;
  const unreadCount = messages.filter((m) => !m.leido).length;

  return (
    <div className="flex h-full w-full bg-surface-base">
      <Sidebar
        active={section}
        onSelect={setSection}
        pendingCount={pendingCount}
        unreadCount={unreadCount}
        employeeName={employee?.nombre ?? "Empleado"}
        onLogout={logout}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar section={section} clusters={clusters} />

        <main className="min-h-0 flex-1 overflow-hidden p-5">
          {section === "overview" && (
            <OverviewPanel
              appointments={appointments}
              sales={sales}
              messages={messages}
              activeUsers={users.filter((u) => u.activo).length}
            />
          )}
          {section === "citas" && (
            <AppointmentsPanel
              appointments={appointments}
              onUpdateStatus={updateAppointmentStatus}
            />
          )}
          {section === "ventas" && <SalesPanel sales={sales} />}
          {section === "mensajeria" && (
            <MessagingPanel messages={messages} onMarkRead={markMessageRead} />
          )}
          {section === "usuarios" && <UsersPanel users={users} />}
          {section === "conexiones" && <ConnectionsPanel clusters={clusters} />}
        </main>
      </div>
    </div>
  );
}
