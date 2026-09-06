export default function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-surface-line pb-3">
      <div>
        <h2 className="font-mono text-sm font-semibold uppercase tracking-[0.14em] text-ink">
          {title}
        </h2>
        {subtitle && <p className="mt-1 text-xs text-ink/45">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
