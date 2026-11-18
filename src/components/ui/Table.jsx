/**
 * Table.jsx - Rounded table with a cream sticky header. It scrolls inside its own box (also sideways on small screens).
 * columns = [{ key, header, render?: (row) => node, className? }]
 */
import { TableSkeleton } from "./Skeleton";
import EmptyState from "./EmptyState";

export default function Table({ columns, rows, rowKey = "id", loading = false, emptyMessage = "Nothing to show yet." }) {
  if (loading) return <TableSkeleton />;
  return (
    <div className="overflow-hidden rounded-section border border-card-border bg-card shadow-card">
      <div className="max-h-[70vh] overflow-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-[15px]">
          <thead className="sticky top-0 z-10 bg-topbar">
            <tr>
              {columns.map((c) => (
                <th key={c.key} scope="col" className={`border-b border-card-border px-4 py-3 text-meta font-semibold text-ink-muted ${c.className || ""}`}>{c.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[rowKey]} className="border-b border-card-border last:border-0 hover:bg-page/60">
                {columns.map((c) => <td key={c.key} className={`px-4 py-3 align-middle ${c.className || ""}`}>{c.render ? c.render(r) : r[c.key]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!rows.length && <EmptyState message={emptyMessage} />}
    </div>
  );
}
