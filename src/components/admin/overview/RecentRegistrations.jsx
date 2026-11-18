"use client";
/** RecentRegistrations.jsx - Latest registrations across all owners (admin overview). */
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { makeSelectRecentRegistrations } from "@/store/selectors";
import RecordListItem from "@/components/dashboard/RecordListItem";
import EmptyState from "@/components/ui/EmptyState";

export default function RecentRegistrations({ count = 5 }) {
  const router = useRouter();
  const goToClients = useCallback(() => router.push("/admin/clients"), [router]);
  const select = useMemo(makeSelectRecentRegistrations, []);
  const rows = useSelector((s) => select(s, count));
  if (!rows.length) return <EmptyState message="No registrations yet." />;
  return (
    <ul className="divide-y divide-card-border">
      {rows.map((c) => <li key={c.id}><RecordListItem client={c} owner={c.ownerName} onSelect={goToClients} /></li>)}
    </ul>
  );
}
