/** Badge.jsx - "id" = record-number square (#001); other variants = status pills with a colored dot. */
const DOTS = { orange: "bg-status-orange", red: "bg-status-red", green: "bg-status-green" };

export default function Badge({ variant = "status", tone = "green", children }) {
  if (variant === "id") {
    return (
      <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-item border border-pill-border bg-card px-2 text-meta font-semibold text-ink-muted">
        {children}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 rounded-pill border border-pill-border bg-pill px-3 py-1 text-meta font-medium text-ink">
      <span className={`h-2 w-2 rounded-full ${DOTS[tone]}`} aria-hidden />
      {children}
    </span>
  );
}
