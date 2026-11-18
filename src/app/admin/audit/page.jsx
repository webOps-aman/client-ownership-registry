"use client";
/** admin/audit/page.jsx - Filterable audit log of every action in the system. */
import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { makeSelectFilteredAudit } from "@/store/selectors";
import { usePagination } from "@/hooks/usePagination";
import { AUDIT_META } from "@/config/auditMeta";
import PageHeader from "@/components/ui/PageHeader";
import Pagination from "@/components/ui/Pagination";
import { TableSkeleton } from "@/components/ui/Skeleton";
import LogFilters from "@/components/admin/logs/LogFilters";

const AuditTable = dynamic(() => import("@/components/admin/logs/AuditTable"), { loading: () => <TableSkeleton /> });
const EMPTY = { user: "", action: "", from: "", to: "" };
const ACTION = {
  key: "action", label: "Action",
  options: [{ value: "", label: "All actions" }, ...Object.entries(AUDIT_META).map(([value, m]) => ({ value, label: m.label }))],
};

export default function AuditPage() {
  const [filters, setFilters] = useState(EMPTY);
  const setFilter = useCallback((k, v) => setFilters((f) => ({ ...f, [k]: v })), []);
  const select = useMemo(makeSelectFilteredAudit, []);
  const rows = useSelector((s) => select(s, filters));
  const users = useSelector((s) => s.users.items);
  const { page, setPage, pageCount, pageItems } = usePagination(rows);
  useEffect(() => setPage(1), [filters, setPage]);

  return (
    <div>
      <PageHeader title="Audit log" subtitle={`${rows.length} entr${rows.length === 1 ? "y" : "ies"}.`} />
      <LogFilters filters={filters} setFilter={setFilter} onReset={() => setFilters(EMPTY)} extra={ACTION}
        userOptions={users.map((u) => ({ value: u.id, label: u.name }))} />
      <AuditTable rows={pageItems} />
      <Pagination page={page} pageCount={pageCount} onChange={setPage} />
    </div>
  );
}
