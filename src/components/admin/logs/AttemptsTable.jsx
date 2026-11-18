"use client";
/** AttemptsTable.jsx - Blocked duplicate registrations. "Create dispute" turns one into a dispute. */
import { Scale } from "lucide-react";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";
import { formatPhone } from "@/utils/phone";
import { formatDateTime } from "@/utils/date";

export default function AttemptsTable({ rows, onCreateDispute }) {
  const columns = [
    { key: "createdAt", header: "When", render: (a) => formatDateTime(a.createdAt) },
    { key: "phone", header: "Phone", render: (a) => formatPhone(a.phone) },
    { key: "attemptedByName", header: "Attempted by", render: (a) => <span className="font-medium">{a.attemptedByName}</span> },
    { key: "ownerName", header: "Current owner" },
    { key: "actions", header: "Actions", render: (a) => <Button variant="secondary" size="sm" icon={Scale} onClick={() => onCreateDispute(a)}>Create dispute</Button> },
  ];
  return <Table columns={columns} rows={rows} emptyMessage="No duplicate attempts yet." />;
}
