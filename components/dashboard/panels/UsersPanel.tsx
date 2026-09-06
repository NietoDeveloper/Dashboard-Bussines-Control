"use client";

import { useMemo, useState } from "react";
import type { AppUser } from "@/lib/types";
import SectionHeader from "../ui/SectionHeader";
import StatusBadge from "../ui/StatusBadge";

type Tab = "info" | "citas" | "compras" | "mensajes";

export default function UsersPanel({ users }: { users: AppUser[] }) {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("info");

  const filtered = useMemo(
    () =>
      users.filter(
        (u) =>
          u.nombre.toLowerCase().includes(query.toLowerCase()) ||
          u.email.toLowerCase().includes(query.toLowerCase())
      ),
    [users, query]
  );

  const selected = users.find((u) => u.id === selectedId) ?? filtered[0] ?? null;

  return (
    <div className="flex h-full flex-col gap-4">
      <SectionHeader
        title="Usuarios Registrados"
        subtitle="Historial completo de cada cliente de la plataforma"
        action={
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar usuario..."
            className="w-56 rounded-md border border-surface-line bg-surface-elevated px-3 py-1.5 text-xs text-ink outline-none placeholder:text-ink/30 focus:border-accent/50"
          />
        }
      />

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[1fr_1.4fr]">
        <div className="min-h-0 overflow-y-auto rounded-lg border border-surface-line bg-surface-panel">
          {filtered.map((u) => (
            <button
              key={u.id}
              onClick={() => {
                setSelectedId(u.id);
                setTab("info");
              }}
              className={`flex w-full items-center justify-between gap-3 border-b border-surface-line/60 px-4 py-3 text-left last:border-b-0 hover:bg-surface-elevated ${
                selected?.id === u.id ? "bg-surface-elevated" : ""
              }`}
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">{u.nombre}</p>
                <p className="truncate text-xs text-ink/45">{u.email}</p>
              </div>
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                  u.activo ? "bg-status-ok" : "bg-status-idle"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-surface-line bg-surface-panel">
          {!selected ? (
            <p className="p-6 text-sm text-ink/40">Selecciona un usuario.</p>
          ) : (
            <>
              <div className="border-b border-surface-line px-4 py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-ink">{selected.nombre}</p>
                    <p className="font-mono text-xs text-ink/40">{selected.email}</p>
                  </div>
                  <StatusBadge status={selected.activo ? "cumplida" : "cancelada"} />
                </div>
                <div className="mt-3 flex gap-1">
                  {(["info", "citas", "compras", "mensajes"] as Tab[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`rounded px-2.5 py-1 font-mono text-[11px] capitalize transition-colors ${
                        tab === t
                          ? "bg-accent text-surface-base"
                          : "bg-surface-elevated text-ink/50 hover:text-ink"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {tab === "info" && (
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40">
                        Teléfono
                      </p>
                      <p className="mt-1 text-ink/80">{selected.telefono}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40">
                        Registrado
                      </p>
                      <p className="mt-1 font-mono text-ink/80">{selected.registradoEn}</p>
                    </div>
                    <div className="col-span-2 flex gap-2 pt-2">
                      <button className="rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-surface-base hover:bg-accent/90">
                        Enviar mensaje
                      </button>
                      <button className="rounded-md border border-surface-line px-3 py-1.5 text-xs text-ink/70 hover:border-accent/40 hover:text-accent">
                        Ver perfil completo
                      </button>
                    </div>
                  </div>
                )}

                {tab === "citas" && (
                  <div className="flex flex-col gap-2">
                    {selected.citas.map((c) => (
                      <div
                        key={c.id}
                        className="flex items-center justify-between rounded-md border border-surface-line px-3 py-2"
                      >
                        <div>
                          <p className="text-sm text-ink/80">{c.servicio}</p>
                          <p className="font-mono text-xs text-ink/40">
                            {c.fecha} · {c.hora}
                          </p>
                        </div>
                        <StatusBadge status={c.status} />
                      </div>
                    ))}
                    {selected.citas.length === 0 && (
                      <p className="text-sm text-ink/40">Sin citas registradas.</p>
                    )}
                  </div>
                )}

                {tab === "compras" && (
                  <div className="flex flex-col gap-2">
                    {selected.compras.map((c) => (
                      <div
                        key={c.id}
                        className="flex items-center justify-between rounded-md border border-surface-line px-3 py-2"
                      >
                        <div>
                          <p className="text-sm text-ink/80">{c.producto}</p>
                          <p className="font-mono text-xs text-ink/40">
                            ${c.monto.toLocaleString("es-CO")}
                          </p>
                        </div>
                        <StatusBadge status={c.status} />
                      </div>
                    ))}
                    {selected.compras.length === 0 && (
                      <p className="text-sm text-ink/40">Sin compras registradas.</p>
                    )}
                  </div>
                )}

                {tab === "mensajes" && (
                  <div className="flex flex-col gap-2">
                    {selected.mensajes.map((m) => (
                      <div key={m.id} className="rounded-md border border-surface-line px-3 py-2">
                        <p className="font-mono text-[10px] uppercase text-accent/70">{m.canal}</p>
                        <p className="mt-1 text-sm text-ink/80">{m.contenido}</p>
                      </div>
                    ))}
                    {selected.mensajes.length === 0 && (
                      <p className="text-sm text-ink/40">Sin mensajes registrados.</p>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
