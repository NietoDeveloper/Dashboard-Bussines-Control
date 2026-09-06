"use client";

import { useState } from "react";
import type { SectionKey } from "./DashboardShell";
import { business, labels } from "@/config/business";

interface NavItem {
  key: SectionKey;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <path d={d} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ICONS = {
  overview: "M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z",
  citas: "M8 3v3M16 3v3M4 8h16M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z",
  ventas: "M3 12l4-4 4 4 5-6 5 4M3 20h18",
  mensajeria: "M4 5h16v11H8l-4 4z",
  usuarios: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 11a3 3 0 1 0 0-6M17 14c2.8 0 5 2.7 5 6",
  conexiones: "M12 2v6M12 16v6M4.9 4.9l4.2 4.2M14.9 14.9l4.2 4.2M2 12h6M16 12h6M4.9 19.1l4.2-4.2M14.9 9.1l4.2-4.2",
};

export default function Sidebar({
  active,
  onSelect,
  pendingCount,
  unreadCount,
  employeeName,
  onLogout,
}: {
  active: SectionKey;
  onSelect: (key: SectionKey) => void;
  pendingCount: number;
  unreadCount: number;
  employeeName: string;
  onLogout: () => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const items: NavItem[] = [
    { key: "overview", label: labels.nav.overview, icon: <Icon d={ICONS.overview} /> },
    { key: "citas", label: labels.nav.bookings, icon: <Icon d={ICONS.citas} />, badge: pendingCount },
    { key: "ventas", label: labels.nav.sales, icon: <Icon d={ICONS.ventas} /> },
    { key: "mensajeria", label: labels.nav.messaging, icon: <Icon d={ICONS.mensajeria} />, badge: unreadCount },
    { key: "usuarios", label: labels.nav.customers, icon: <Icon d={ICONS.usuarios} /> },
    { key: "conexiones", label: labels.nav.connections, icon: <Icon d={ICONS.conexiones} /> },
  ];

  return (
    <aside
      className={`flex h-full flex-col justify-between border-r border-surface-line bg-surface-panel transition-all duration-200 ${
        collapsed ? "w-[64px]" : "w-[220px]"
      }`}
    >
      <div>
        <div className="flex h-14 items-center justify-between border-b border-surface-line px-3">
          {!collapsed && (
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              {business.name}
            </span>
          )}
          <button
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
            className="flex h-7 w-7 items-center justify-center rounded text-ink/50 hover:bg-surface-elevated hover:text-accent"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" transform={collapsed ? "" : "rotate(180 12 12)"} />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-2">
          {items.map((item) => {
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onSelect(item.key)}
                title={collapsed ? item.label : undefined}
                className={`group relative flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors ${
                  isActive
                    ? "bg-accent/10 text-accent"
                    : "text-ink/60 hover:bg-surface-elevated hover:text-ink"
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-r bg-accent" />
                )}
                <span className={isActive ? "text-accent" : ""}>{item.icon}</span>
                {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                {!collapsed && !!item.badge && (
                  <span className="rounded-full bg-accent px-1.5 py-0.5 font-mono text-[10px] font-bold text-surface-base">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-surface-line p-3">
        <div className={`flex items-center gap-2 ${collapsed ? "justify-center" : ""}`}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/30 font-mono text-[11px] font-semibold text-accent">
            {employeeName.slice(0, 2).toUpperCase()}
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-ink">{employeeName}</p>
              <button
                onClick={onLogout}
                className="text-[11px] text-ink/40 hover:text-accent"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
