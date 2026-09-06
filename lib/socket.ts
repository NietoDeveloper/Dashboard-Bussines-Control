// ---------------------------------------------------------------------------
// SOCKET.IO CLIENT — ready to connect to any backend's real-time layer
// (Socket.io, or swap this file for your own WebSocket/SSE client).
// ---------------------------------------------------------------------------
// Not connected by default. Once NEXT_PUBLIC_SOCKET_URL is set, call
// getSocket() and subscribe to events such as "booking:new", "sale:new",
// "message:new" to replace the setInterval-based simulation currently used
// in components/dashboard/DashboardShell.tsx.
// ---------------------------------------------------------------------------

import { io, type Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket(): Socket | null {
  const url = process.env.NEXT_PUBLIC_SOCKET_URL;
  if (!url) return null;

  if (!socket) {
    socket = io(url, {
      autoConnect: true,
      withCredentials: true,
      transports: ["websocket"],
    });
  }
  return socket;
}

export function disconnectSocket() {
  socket?.disconnect();
  socket = null;
}
