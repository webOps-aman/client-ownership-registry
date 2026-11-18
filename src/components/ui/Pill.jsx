/** Pill.jsx - Small rounded label (e.g. property or project). */
export default function Pill({ icon: Icon, className = "", children }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-pill border border-pill-border bg-pill px-3 py-1 text-meta text-ink shadow-pill ${className}`}>
      {Icon && <Icon className="h-3.5 w-3.5 text-ink-muted" aria-hidden />}
      {children}
    </span>
  );
}
