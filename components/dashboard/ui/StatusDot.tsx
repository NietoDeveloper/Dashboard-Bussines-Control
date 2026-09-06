const COLORS: Record<string, string> = {
  ok: "bg-status-ok",
  warn: "bg-status-warn",
  bad: "bg-status-bad",
  idle: "bg-status-idle",
};

export default function StatusDot({
  tone = "ok",
  pulse = true,
  label,
}: {
  tone?: "ok" | "warn" | "bad" | "idle";
  pulse?: boolean;
  label?: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={`h-1.5 w-1.5 rounded-full ${COLORS[tone]} ${pulse ? "animate-pulseDot" : ""}`}
      />
      {label && <span className="font-mono text-[11px] text-ink/60">{label}</span>}
    </span>
  );
}
