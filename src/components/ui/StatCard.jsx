/** StatCard.jsx - Number card: gradient line on top, icon chip top-right, big serif number, muted caption. */
const TONES = {
  blue: { line: "bg-line-blue", chip: "bg-chip-blue-bg text-chip-blue-icon" },
  green: { line: "bg-line-green", chip: "bg-chip-green-bg text-chip-green-icon" },
  amber: { line: "bg-line-amber", chip: "bg-chip-amber-bg text-chip-amber-icon" },
};

export default function StatCard({ label, value, caption, icon: Icon, tone = "blue" }) {
  const t = TONES[tone];
  return (
    <div className="relative overflow-hidden rounded-stat border border-card-border bg-card p-cardpad shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover">
      <span className={`absolute inset-x-0 top-0 h-[3px] ${t.line}`} aria-hidden />
      <div className="flex items-start justify-between">
        <p className="text-stat-label text-ink-muted">{label}</p>
        <span className={`flex h-10 w-10 items-center justify-center rounded-full ${t.chip}`}>
          {Icon && <Icon className="h-5 w-5" aria-hidden />}
        </span>
      </div>
      <p className="mt-3 font-serif text-stat-number text-ink">{value}</p>
      {caption && <p className="mt-1 text-stat-caption text-ink-muted">{caption}</p>}
    </div>
  );
}
