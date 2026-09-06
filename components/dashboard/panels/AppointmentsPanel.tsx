"use client";

import { useMemo, useState } from "react";
import type { Appointment, AppointmentStatus } from "@/lib/types";
import SectionHeader from "../ui/SectionHeader";
import StatusBadge from "../ui/StatusBadge";

const FILTERS: { key: AppointmentStatus | "todas"; label: string }[] = [
  { key: "todas", label: "Todas" },
  { key: "pendiente", label: "Pendientes" },
  { key: "cumplida", label: "Cumplidas" },
  { key: "cancelada", label: "Canceladas" },
];

export default function AppointmentsPanel({
  appointments,
  onUpdateStatus,
}: {
  appointments: Appointment[];
  onUpdateStatus: (id: string, status: AppointmentStatus) => void;
}) {
  const [filter, setFilter] = useState<AppointmentStatus | "todas">("todas");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      [...appointments]
        .filter((a) => filter === "todas" || a.status === filter)
        .sort((a, b) => a.fecha.localeCompare(b.fecha)),
    [appointments, filter]
  );

  const selected = appointments.find((a) => a.id === selectedId) ?? filtered[0] ?? null;

  return (
    <div className="flex h-full flex-col gap-4">
      <SectionHeader
        title="Control de Citas"
        subtitle="Agenda en vivo — confirmar, cumplir o cancelar"
        action={
          <div className="flex gap-1 rounded-md border border-surface-line bg-surface-elevated p-0.5">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded px-2.5 py-1 font-mono text-[11px] transition-colors ${
                  filter === f.key
                    ? "bg-accent text-surface-base"
                    : "text-ink/50 hover:text-ink"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        }
      />

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[1.3fr_1fr]">
        <div className="min-h-0 overflow-y-auto rounded-lg border border-surface-line bg-surface-panel">
          {filtered.length === 0 && (
            <p className="p-6 text-center text-sm text-ink/40">
              No hay citas en este filtro.
            </p>
          )}
          {filtered.map((a) => (
            <button
              key={a.id}
              onClick={() => setSelectedId(a.id)}
              className={`flex w-full items-center justify-between gap-3 border-b border-surface-line/60 px-4 py-3 text-left last:border-b-0 hover:bg-surface-elevated ${
                selected?.id === a.id ? "bg-surface-elevated" : ""
              }`}
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">{a.clienteNombre}</p>
                <p className="truncate text-xs text-ink/45">{a.servicio}</p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="font-mono text-xs text-ink/50">
                  {a.fecha} · {a.hora}
                </span>
                <StatusBadge status={a.status} />
              </div>
            </button>
          ))}
        </div>

        <div className="min-h-0 overflow-y-auto rounded-lg border border-surface-line bg-surface-panel p-5">
          {!selected ? (
            <p className="text-sm text-ink/40">Selecciona una cita para ver el detalle.</p>
          ) : (
            <div className="flex h-full flex-col gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40">
                  Cliente
                </p>
                <p className="mt-1 text-base font-medium text-ink">
                  {selected.clienteNombre}
                </p>
                <p className="text-xs text-ink/50">{selected.clienteEmail}</p>
                <p className="text-xs text-ink/50">{selected.clienteTelefono}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 border-t border-surface-line pt-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40">
                    Servicio
                  </p>
                  <p className="mt-1 text-sm text-ink/80">{selected.servicio}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40">
                    Fecha y hora
                  </p>
                  <p className="mt-1 font-mono text-sm text-ink/80">
                    {selected.fecha} · {selected.hora}
                  </p>
                </div>
              </div>

              {selected.notas && (
                <div className="border-t border-surface-line pt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40">
                    Notas
                  </p>
                  <p className="mt-1 text-sm text-ink/70">{selected.notas}</p>
                </div>
              )}

              <div className="mt-auto flex gap-2 border-t border-surface-line pt-4">
                <button
                  onClick={() => onUpdateStatus(selected.id, "cumplida")}
                  disabled={selected.status === "cumplida"}
                  className="flex-1 rounded-md bg-status-ok/15 py-2 text-xs font-semibold text-status-ok transition-colors hover:bg-status-ok/25 disabled:opacity-40"
                >
                  Marcar cumplida
                </button>
                <button
                  onClick={() => onUpdateStatus(selected.id, "cancelada")}
                  disabled={selected.status === "cancelada"}
                  className="flex-1 rounded-md bg-status-bad/15 py-2 text-xs font-semibold text-status-bad transition-colors hover:bg-status-bad/25 disabled:opacity-40"
                >
                  Cancelar cita
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
