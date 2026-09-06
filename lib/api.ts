// ---------------------------------------------------------------------------
// API CLIENT — this template is backend- and database-agnostic. It only
// talks to your API over HTTP, so it works the same way whether your
// backend runs on Node/Express, Django, Laravel, etc., and whether it's
// backed by MongoDB, PostgreSQL, MySQL, Firebase, or anything else — the
// dashboard never talks to a database directly.
//
// Expected REST-ish routes (adjust the paths below to match your API):
//   POST   /api/auth/login          POST /api/auth/logout
//   GET    /api/health              (used for the connection-status panel)
//   GET    /api/bookings            PATCH /api/bookings/:id
//   GET    /api/sales
//   GET    /api/messages            PATCH /api/messages/:id
//   GET    /api/customers
//
// Set NEXT_PUBLIC_API_URL in .env.local (or as a Docker environment
// variable) to your backend's base URL to activate real calls. Every
// function below is written and typed, but the dashboard currently reads
// from lib/mockData.ts — swap a panel's data source by calling the
// matching function here instead. Response shapes should match
// lib/types.ts (rename fields there to match your own schema if needed).
// ---------------------------------------------------------------------------

import type { Appointment, ClusterStatus, Message, SaleTransaction } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  if (!API_URL) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is not set — point it at your backend in .env.local before calling the API."
    );
  }
  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status} on ${path}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  // --- Auth (currently bypassed by the "Ingresar" demo button — see
  // lib/auth-context.tsx. Wire this up once real login exists) ---
  login: (email: string, password: string) =>
    request<{ token: string; name: string; role: string }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  logout: () => request<void>("/api/auth/logout", { method: "POST" }),

  // --- Health / data source status ---
  // If your setup only has a single database, just report one entry here.
  health: () => request<Record<string, string>>("/api/health"),

  clusterStatus: async (): Promise<ClusterStatus[]> => {
    const health = await api.health();
    return Object.entries(health).map(([name, state]) => ({
      name,
      label: name,
      state: state === "CONNECTED" || state === "connected" ? "connected" : "connecting",
      latencyMs: 0,
    }));
  },

  // --- Bookings / appointments / reservations ---
  getBookings: () => request<Appointment[]>("/api/bookings"),
  updateBookingStatus: (bookingId: string, status: Appointment["status"]) =>
    request<Appointment>(`/api/bookings/${bookingId}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  // --- Sales / orders / payment gateway feed ---
  getSales: () => request<SaleTransaction[]>("/api/sales"),

  // --- Messaging (web form / WhatsApp / chatbot inbox — adapt channels
  // in config/business.ts and lib/types.ts to whatever you actually use) ---
  getMessages: () => request<Message[]>("/api/messages"),
  markMessageRead: (messageId: string) =>
    request<Message>(`/api/messages/${messageId}`, {
      method: "PATCH",
      body: JSON.stringify({ read: true }),
    }),

  // --- Customers / users ---
  getCustomers: () => request<unknown[]>("/api/customers"),
};
