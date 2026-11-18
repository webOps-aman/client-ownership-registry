"use client";
/** BrokersTable.jsx - Brokers and company agents with enable/disable and reset-password actions. */
import { KeyRound, UserX, UserCheck } from "lucide-react";
import Table from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatDate } from "@/utils/date";

export default function BrokersTable({ users, onToggle, onReset }) {
  const columns = [
    { key: "name", header: "Name", render: (u) => <span className="font-medium">{u.name}</span> },
    { key: "loginId", header: "Login ID" },
    { key: "role", header: "Type", render: (u) => (u.role === "agent" ? "Company agent" : "External broker") },
    { key: "phone", header: "Phone", render: (u) => u.phone || "-" },
    { key: "status", header: "Status", render: (u) => <Badge tone={u.status === "active" ? "green" : "red"}>{u.status === "active" ? "Active" : "Disabled"}</Badge> },
    { key: "createdAt", header: "Added", render: (u) => formatDate(u.createdAt) },
    {
      key: "actions", header: "Actions", render: (u) => (
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" icon={u.status === "active" ? UserX : UserCheck} onClick={() => onToggle(u)}>{u.status === "active" ? "Disable" : "Enable"}</Button>
          <Button variant="secondary" size="sm" icon={KeyRound} onClick={() => onReset(u)}>Reset password</Button>
        </div>
      ),
    },
  ];
  return <Table columns={columns} rows={users} emptyMessage="No brokers yet." />;
}
