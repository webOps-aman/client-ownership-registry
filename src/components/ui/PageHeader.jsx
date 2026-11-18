/** PageHeader.jsx - Serif page title with a muted subtitle. */
export default function PageHeader({ title, subtitle, children }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-section-title">{title}</h1>
        {subtitle && <p className="mt-1 text-section-sub text-ink-muted">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
