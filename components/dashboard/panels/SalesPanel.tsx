"use client";

import { useMemo } from "react";
import type { SaleTransaction } from "@/lib/types";
import MetricCard from "../ui/MetricCard";
import SectionHeader from "../ui/SectionHeader";
import StatusBadge from "../ui/StatusBadge";

export default function SalesPanel({ sales }: { sales: SaleTransaction[] }) {
  const sorted = useMemo(
    () => [...sales].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()),
    [sales]
  );

  const aprobadas = sales.filter((s) => s.status === "aprobado");
  const totalHoy = aprobadas
    .filter((s) => new Date(s.fecha).toDateString() === new Date().toDateString())
    .reduce((sum, s) => sum + s.monto, 0);
  const totalMes = aprobadas.reduce((sum, s) => sum + s.monto, 0);
  const tasaAprobacion = sales.length
    ? Math.round((aprobadas.length / sales.length) * 100)
    : 0;

  return (
    <div className="flex h-full flex-col gap-4">
      <SectionHeader
        title="Control de Ventas"
        subtitle="Pasarela de pagos — flujo de transacciones en vivo"
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="Ventas hoy" value={`$${totalHoy.toLocaleString("es-CO")}`} tone="accent" />
        <MetricCard label="Acumulado (mock 6d)" value={`$${totalMes.toLocaleString("es-CO")}`} />
        <MetricCard label="Tasa de aprobación" value={`${tasaAprobacion}%`} />
        <MetricCard label="Transacciones" value={String(sales.length)} />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto rounded-lg border border-surface-line bg-surface-panel">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-surface-elevated">
            <tr className="text-left font-mono text-[10px] uppercase tracking-wide text-ink/45">
              <th className="px-4 py-2.5 font-medium">Cliente</th>
              <th className="px-4 py-2.5 font-medium">Producto</th>
              <th className="px-4 py-2.5 font-medium">Método</th>
              <th className="px-4 py-2.5 font-medium">Monto</th>
              <th className="px-4 py-2.5 font-medium">Estado</th>
              <th className="px-4 py-2.5 font-medium">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((s) => (
              <tr key={s.id} className="border-t border-surface-line/60 hover:bg-surface-elevated/60">
                <td className="px-4 py-2.5 text-ink/80">{s.cliente}</td>
                <td className="px-4 py-2.5 text-ink/60">{s.producto}</td>
                <td className="px-4 py-2.5 text-ink/60">{s.metodo}</td>
                <td className="px-4 py-2.5 font-mono text-ink/80">
                  ${s.monto.toLocaleString("es-CO")}
                </td>
                <td className="px-4 py-2.5">
                  <StatusBadge status={s.status} />
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-ink/40">
                  {new Date(s.fecha).toLocaleString("es-CO", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
