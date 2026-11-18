/** Card.jsx - White section card. accent = optional 3px gradient line on top; hoverable lifts on hover. Extra props (aria-*) are forwarded. */
const LINES = { blue: "bg-line-blue", green: "bg-line-green", amber: "bg-line-amber" };

export default function Card({ accent, hoverable = false, className = "", children, ...props }) {
  return (
    <div className={`relative overflow-hidden rounded-section border border-card-border bg-card p-cardpad shadow-card transition ${hoverable ? "hover:-translate-y-0.5 hover:shadow-card-hover" : ""} ${className}`} {...props}>
      {accent && <span className={`absolute inset-x-0 top-0 h-[3px] ${LINES[accent]}`} aria-hidden />}
      {children}
    </div>
  );
}
