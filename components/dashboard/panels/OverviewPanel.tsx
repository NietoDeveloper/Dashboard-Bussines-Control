"use client";

import type { Appointment, Message, SaleTransaction } from "@/lib/types";
import MetricCard from "../ui/MetricCard";
import SectionHeader from "../ui/SectionHeader";
import StatusBadge from "../ui/StatusBadge";

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "ahora";
  if (mins < 60) return `hace ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `hace ${hours} h`;
  return `hace ${Math.floor(hours / 24)} d`;
}

export default function OverviewPanel({
  appointments,
  sales,
  messages,
  activeUsers,
}: {
  appointments: Appointment[];
  sales: SaleTransaction[];
  messages: Message[];
  activeUsers: number;
}) {
  const pendientes = appointments.filter((a) => a.status === "pendiente").length;
  const ventasHoy = sales.filter(
    (s) => new Date(s.fecha).toDateString() === new Date().toDateString()
  );
  const totalHoy = ventasHoy.reduce((sum, s) => sum + (s.status === "aprobado" ? s.monto : 0), 0);
  const sinLeer = messages.filter((m) => !m.leido).length;

  const feed = [
    ...appointments.slice(0, 4).map((a) => ({
      kind: "Cita" as const,
      title: `${a.clienteNombre} — ${a.servicio}`,
      status: a.status,
      fecha: a.creadoEn,
    })),
    ...sales.slice(0, 4).map((s) => ({
      kind: "Venta" as const,
      title: `${s.cliente} — ${s.producto}`,
      status: s.status,
      fecha: s.fecha,
    })),
    ...messages.slice(0, 4).map((m) => ({
      kind: "Mensaje" as const,
      title: `${m.remitente} vía ${m.canal}`,
      status: m.leido ? "leído" : "pendiente",
      fecha: m.fecha,
    })),
  ]
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    .slice(0, 10);

  return (
    <div className="flex h-full flex-col gap-5">
      <SectionHeader
        title="Visión General"
        subtitle="Estado del negocio en tiempo real"
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="Citas pendientes" value={String(pendientes)} tone="accent" />
        <MetricCard
          label="Ventas hoy"
          value={`$${totalHoy.toLocaleString("es-CO")}`}
          sublabel={`${ventasHoy.length} transacciones`}
        />
        <MetricCard label="Mensajes sin leer" value={String(sinLeer)} />
        <MetricCard label="Usuarios activos" value={String(activeUsers)} />
      </div>

      <div className="flex min-h-0 flex-1 flex-col rounded-lg border border-surface-line bg-surface-panel">
        <div className="border-b border-surface-line px-4 py-3">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink/50">
            Actividad en vivo
          </p>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          {feed.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-3 border-b border-surface-line/60 px-4 py-2.5 last:border-b-0"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="w-16 shrink-0 font-mono text-[10px] uppercase tracking-wide text-accent/70">
                  {item.kind}
                </span>
                <span className="truncate text-sm text-ink/80">{item.title}</span>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <StatusBadge status={item.status} />
                <span className="font-mono text-[11px] text-ink/35">
                  {timeAgo(item.fecha)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
