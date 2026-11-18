"use client";
/** admin/searches/page.jsx - Search log with user / result / date filters. */
import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { selectSearchesWithDetails } from "@/store/selectors";
import { usePagination } from "@/hooks/usePagination";
import { inRange } from "@/utils/date";
import PageHeader from "@/components/ui/PageHeader";
import Pagination from "@/components/ui/Pagination";
import { TableSkeleton } from "@/components/ui/Skeleton";
import LogFilters from "@/components/admin/logs/LogFilters";

const SearchLogTable = dynamic(() => import("@/components/admin/logs/SearchLogTable"), { loading: () => <TableSkeleton /> });
const EMPTY = { user: "", found: "", from: "", to: "" };
const FOUND = { key: "found", label: "Result", options: [{ value: "", label: "All results" }, { value: "yes", label: "Found" }, { value: "no", label: "Not found" }] };

export default function SearchesPage() {
  const all = useSelector(selectSearchesWithDetails);
  const users = useSelector((s) => s.users.items);
  const [filters, setFilters] = useState(EMPTY);
  const setFilter = useCallback((k, v) => setFilters((f) => ({ ...f, [k]: v })), []);

  const rows = useMemo(() => all.filter((s) =>
    (!filters.user || s.searchedBy === filters.user) &&
    (!filters.found || s.found === (filters.found === "yes")) &&
    inRange(s.createdAt, filters.from, filters.to)), [all, filters]);

  const { page, setPage, pageCount, pageItems } = usePagination(rows);
  useEffect(() => setPage(1), [filters, setPage]);

  return (
    <div>
      <PageHeader title="Search log" subtitle="Every phone number checked, and by whom." />
      <LogFilters filters={filters} setFilter={setFilter} onReset={() => setFilters(EMPTY)} extra={FOUND}
        userOptions={users.map((u) => ({ value: u.id, label: u.name }))} />
      <SearchLogTable rows={pageItems} />
      <Pagination page={page} pageCount={pageCount} onChange={setPage} />
    </div>
  );
}
