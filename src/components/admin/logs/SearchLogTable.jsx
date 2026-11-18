"use client";
/** SearchLogTable.jsx - Every phone search: who, which number, found or not. */
import Table from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import { formatPhone } from "@/utils/phone";
import { formatDateTime } from "@/utils/date";

export default function SearchLogTable({ rows }) {
  const columns = [
    { key: "createdAt", header: "When", render: (s) => formatDateTime(s.createdAt) },
    { key: "phone", header: "Phone searched", render: (s) => formatPhone(s.phone) },
    { key: "searchedByName", header: "Searched by", render: (s) => <span className="font-medium">{s.searchedByName}</span> },
    { key: "found", header: "Result", render: (s) => <Badge tone={s.found ? "green" : "orange"}>{s.found ? "Found" : "Not found"}</Badge> },
  ];
  return <Table columns={columns} rows={rows} emptyMessage="No searches match these filters." />;
}
