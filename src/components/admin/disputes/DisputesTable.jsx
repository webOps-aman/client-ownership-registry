"use client";
/** DisputesTable.jsx - Commission disputes. Open ones can be resolved. */
import { Gavel } from "lucide-react";
import Table from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatDateTime } from "@/utils/date";

export default function DisputesTable({ rows, onResolve }) {
  const columns = [
    { key: "clientName", header: "Client", render: (d) => <span className="font-medium">{d.clientName}</span> },
    { key: "claimedByName", header: "Claimed by" },
    { key: "status", header: "Status", render: (d) => <Badge tone={d.status === "open" ? "orange" : "green"}>{d.status === "open" ? "Open" : "Resolved"}</Badge> },
    { key: "createdAt", header: "Created", render: (d) => formatDateTime(d.createdAt) },
    {
      key: "decision", header: "Decision", render: (d) => d.status === "open"
        ? <span className="text-ink-muted">{d.note || "-"}</span>
        : <span>{d.outcome === "transfer" ? "Transferred to claimant" : "Kept with current owner"}<span className="block text-meta text-ink-muted">{d.reason}</span></span>,
    },
    { key: "actions", header: "Actions", render: (d) => d.status === "open" ? <Button variant="secondary" size="sm" icon={Gavel} onClick={() => onResolve(d)}>Resolve</Button> : null },
  ];
  return <Table columns={columns} rows={rows} emptyMessage="No disputes yet." />;
}
