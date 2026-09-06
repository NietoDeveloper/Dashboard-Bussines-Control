"use client";

import { useLiveClock } from "@/hooks/useLiveClock";
import type { ClusterStatus } from "@/lib/types";
import { labels } from "@/config/business";
import StatusDot from "./ui/StatusDot";

const SECTION_TITLES: Record<string, string> = {
  overview: labels.nav.overview,
  citas: labels.nav.bookings,
  ventas: labels.nav.sales,
  mensajeria: labels.nav.messaging,
  usuarios: labels.nav.customers,
  conexiones: labels.nav.connections,
};

export default function TopBar({
  section,
  clusters,
}: {
  section: string;
  clusters: ClusterStatus[];
}) {
  const now = useLiveClock();

  return (
    <header className="flex h-14 items-center justify-between border-b border-surface-line bg-surface-panel px-5">
      <div>
        <h1 className="font-mono text-sm font-semibold tracking-wide text-ink">
          {SECTION_TITLES[section] ?? section}
        </h1>
      </div>

      <div className="flex items-center gap-5">
        <div className="hidden items-center gap-4 md:flex">
          {clusters.map((c) => (
            <StatusDot
              key={c.name}
              tone={c.state === "connected" ? "ok" : c.state === "connecting" ? "warn" : "bad"}
              label={c.name}
            />
          ))}
        </div>
        <div className="h-4 w-px bg-surface-line" />
        <span className="font-mono text-xs tabular-nums text-ink/60">
          {now
            ? now.toLocaleTimeString("es-CO", { hour12: false }) +
              " · " +
              now.toLocaleDateString("es-CO", { day: "2-digit", month: "short" })
            : "--:--:--"}
        </span>
      </div>
    </header>
  );
}
