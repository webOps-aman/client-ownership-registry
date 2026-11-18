"use client";
/** admin/attempts/page.jsx - Duplicate Attempts log, with "Create dispute". */
import { useState } from "react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { selectAttemptsWithDetails } from "@/store/selectors";
import { usePagination } from "@/hooks/usePagination";
import PageHeader from "@/components/ui/PageHeader";
import Pagination from "@/components/ui/Pagination";
import { TableSkeleton } from "@/components/ui/Skeleton";

const AttemptsTable = dynamic(() => import("@/components/admin/logs/AttemptsTable"), { loading: () => <TableSkeleton /> });
const CreateDisputeDialog = dynamic(() => import("@/components/admin/disputes/CreateDisputeDialog"));

export default function AttemptsPage() {
  const rows = useSelector(selectAttemptsWithDetails);
  const { page, setPage, pageCount, pageItems } = usePagination(rows);
  const [attempt, setAttempt] = useState(null);
  return (
    <div>
      <PageHeader title="Duplicate attempts" subtitle="Registrations that were blocked because the phone already had an owner." />
      <AttemptsTable rows={pageItems} onCreateDispute={setAttempt} />
      <Pagination page={page} pageCount={pageCount} onChange={setPage} />
      {attempt && <CreateDisputeDialog attempt={attempt} onClose={() => setAttempt(null)} />}
    </div>
  );
}
