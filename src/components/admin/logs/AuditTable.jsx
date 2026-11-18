"use client";
/** AuditTable.jsx - Full audit trail with an icon chip per action. */
import Table from "@/components/ui/Table";
import { AUDIT_META, TONE_CHIPS, auditDetail } from "@/config/auditMeta";
import { formatDateTime } from "@/utils/date";

export default function AuditTable({ rows }) {
  const columns = [
    { key: "createdAt", header: "When", render: (e) => formatDateTime(e.createdAt) },
    { key: "userName", header: "User", render: (e) => <span className="font-medium">{e.userName}</span> },
    {
      key: "action", header: "Action", render: (e) => {
        const m = AUDIT_META[e.action];
        if (!m) return e.action;
        const Icon = m.icon;
        return (
          <span className="inline-flex items-center gap-2">
            <span className={`flex h-7 w-7 items-center justify-center rounded-full ${TONE_CHIPS[m.tone]}`}><Icon className="h-4 w-4" aria-hidden /></span>
            {m.label}
          </span>
        );
      },
    },
    { key: "details", header: "Details", render: (e) => <span className="text-ink-muted">{auditDetail(e) || "-"}</span> },
  ];
  return <Table columns={columns} rows={rows} emptyMessage="No audit entries match these filters." />;
}
