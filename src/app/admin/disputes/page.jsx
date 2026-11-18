"use client";
/** admin/disputes/page.jsx - Commission disputes: list and resolve. Disputes are created from the Duplicate Attempts page. */
import { useState } from "react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { selectDisputesWithDetails } from "@/store/selectors";
import { usePagination } from "@/hooks/usePagination";
import PageHeader from "@/components/ui/PageHeader";
import Pagination from "@/components/ui/Pagination";
import { TableSkeleton } from "@/components/ui/Skeleton";

const DisputesTable = dynamic(() => import("@/components/admin/disputes/DisputesTable"), { loading: () => <TableSkeleton /> });
const ResolveDisputeDialog = dynamic(() => import("@/components/admin/disputes/ResolveDisputeDialog"));

export default function DisputesPage() {
  const rows = useSelector(selectDisputesWithDetails);
  const { page, setPage, pageCount, pageItems } = usePagination(rows);
  const [resolving, setResolving] = useState(null);
  return (
    <div>
      <PageHeader title="Disputes" subtitle="Claims on clients that already have an owner." />
      <DisputesTable rows={pageItems} onResolve={setResolving} />
      <Pagination page={page} pageCount={pageCount} onChange={setPage} />
      {resolving && <ResolveDisputeDialog dispute={resolving} onClose={() => setResolving(null)} />}
    </div>
  );
}
