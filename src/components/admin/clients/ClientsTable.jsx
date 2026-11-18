"use client";
/** ClientsTable.jsx - All clients (admin only) with View / Edit / Transfer actions. Lazy loaded. */
import { Eye, Pencil, ArrowLeftRight } from "lucide-react";
import Table from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatRecordNo } from "@/utils/id";
import { formatPhone } from "@/utils/phone";
import { formatDateTime } from "@/utils/date";

export default function ClientsTable({ rows, onView, onEdit, onTransfer }) {
  const columns = [
    { key: "seq", header: "Record", render: (c) => <Badge variant="id">{formatRecordNo(c.seq)}</Badge> },
    { key: "name", header: "Client", render: (c) => <span className="font-medium">{c.name}</span> },
    { key: "phone", header: "Phone", render: (c) => formatPhone(c.phoneNormalized) },
    { key: "owner", header: "Owner", render: (c) => c.ownerName },
    { key: "source", header: "Source", render: (c) => (c.source === "Direct" ? "Company Direct" : "Broker") },
    { key: "createdAt", header: "Registered on", render: (c) => formatDateTime(c.createdAt) },
    {
      key: "actions", header: "Actions", render: (c) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" icon={Eye} aria-label={`View ${c.name}`} onClick={() => onView(c.id)} />
          <Button variant="ghost" size="sm" icon={Pencil} aria-label={`Edit ${c.name}`} onClick={() => onEdit(c.id)} />
          <Button variant="ghost" size="sm" icon={ArrowLeftRight} aria-label={`Transfer ${c.name}`} onClick={() => onTransfer(c.id)} />
        </div>
      ),
    },
  ];
  return <Table columns={columns} rows={rows} emptyMessage="No clients match these filters." />;
}
