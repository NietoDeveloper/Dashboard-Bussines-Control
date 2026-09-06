"use client";

import type { ClusterStatus } from "@/lib/types";
import SectionHeader from "../ui/SectionHeader";
import StatusDot from "../ui/StatusDot";

export default function ConnectionsPanel({ clusters }: { clusters: ClusterStatus[] }) {
  return (
    <div className="flex h-full flex-col gap-5 overflow-y-auto">
      <SectionHeader
        title="Conexiones e Infraestructura"
        subtitle="Estado del backend y las bases de datos — agnóstico a proveedor"
      />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {clusters.map((c) => (
          <div
            key={c.name}
            className="flex items-center justify-between rounded-lg border border-surface-line bg-surface-panel p-4"
          >
            <div>
              <p className="font-mono text-sm text-ink">{c.label}</p>
              <p className="font-mono text-[11px] text-ink/40">{c.name}</p>
            </div>
            <StatusDot
              tone={c.state === "connected" ? "ok" : c.state === "connecting" ? "warn" : "bad"}
              label={c.state}
            />
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-surface-line bg-surface-panel p-5">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink/50">
          Variables de entorno (.env.local / Docker)
        </p>
        <div className="mt-3 flex flex-col gap-2 font-mono text-xs">
          <div className="flex items-center justify-between rounded-md border border-surface-line bg-surface-elevated px-3 py-2">
            <span className="text-ink/60">NEXT_PUBLIC_API_URL</span>
            <span className="text-ink/30">no configurada</span>
          </div>
          <div className="flex items-center justify-between rounded-md border border-surface-line bg-surface-elevated px-3 py-2">
            <span className="text-ink/60">NEXT_PUBLIC_SOCKET_URL</span>
            <span className="text-ink/30">no configurada</span>
          </div>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-ink/40">
          Apunta estas variables a tu backend (cualquier stack, cualquier base
          de datos: MongoDB, PostgreSQL, MySQL, Firebase, Supabase...) para
          activar <span className="text-accent/70">lib/api.ts</span> y{" "}
          <span className="text-accent/70">lib/socket.ts</span>. El dashboard
          solo habla HTTP/WebSocket con tu API — nunca toca la base de datos
          directamente, así que puedes cambiarla sin tocar el frontend. Un
          endpoint <span className="text-accent/70">/api/health</span> que
          devuelva el estado de cada fuente de datos alimenta los indicadores
          de esta página y de la barra superior.
        </p>
      </div>

      <div className="rounded-lg border border-surface-line bg-surface-panel p-5">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink/50">
          Arquitectura
        </p>
        <pre className="mt-3 overflow-x-auto rounded-md bg-surface-elevated p-3 font-mono text-[11px] leading-relaxed text-ink/60">
{`Dashboard (este template — Next.js, Docker)
        │  HTTPS + WebSocket
        ▼
Tu Backend  (cualquier stack: Node, Django, Laravel...)
        │
   ┌────┴────┐
   ▼         ▼
 DB #1     DB #2   (o una sola — ajústalo a tu caso)`}
        </pre>
      </div>
    </div>
  );
}
