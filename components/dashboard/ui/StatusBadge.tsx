const STYLES: Record<string, string> = {
  pendiente: "text-status-warn border-status-warn/30 bg-status-warn/10",
  cumplida: "text-status-ok border-status-ok/30 bg-status-ok/10",
  aprobado: "text-status-ok border-status-ok/30 bg-status-ok/10",
  cancelada: "text-status-bad border-status-bad/30 bg-status-bad/10",
  rechazado: "text-status-bad border-status-bad/30 bg-status-bad/10",
};

export default function StatusBadge({ status }: { status: string }) {
  const style = STYLES[status] ?? "text-ink/60 border-surface-line bg-surface-elevated";
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${style}`}
    >
      {status}
    </span>
  );
}
