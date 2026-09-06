export default function MetricCard({
  label,
  value,
  sublabel,
  tone = "default",
}: {
  label: string;
  value: string;
  sublabel?: string;
  tone?: "default" | "accent";
}) {
  return (
    <div className="flex flex-col justify-between rounded-lg border border-surface-line bg-surface-panel p-4">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
        {label}
      </span>
      <span
        className={`mt-2 font-mono text-2xl font-semibold tabular-nums ${
          tone === "accent" ? "text-accent" : "text-ink"
        }`}
      >
        {value}
      </span>
      {sublabel && <span className="mt-1 text-xs text-ink/40">{sublabel}</span>}
    </div>
  );
}
