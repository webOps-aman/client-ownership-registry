"use client";
/** MyRegistrationsList.jsx - The user's OWN registrations. compact = 4 latest (dashboard); full = search + pagination. */
import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { selectMyClients } from "@/store/selectors";
import { usePagination } from "@/hooks/usePagination";
import SearchInput from "@/components/ui/SearchInput";
import Pagination from "@/components/ui/Pagination";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import RecordListItem from "./RecordListItem";

// The detail dialog is only downloaded when a row is opened.
const ClientDetailModal = dynamic(() => import("./ClientDetailModal"));

export default function MyRegistrationsList({ compact = false }) {
  const clients = useSelector(selectMyClients);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const digits = q.replace(/\D/g, "");
    if (!q) return clients;
    return clients.filter((c) => c.name.toLowerCase().includes(q) || (digits && c.phoneNormalized.includes(digits)));
  }, [clients, query]);

  const { page, setPage, pageCount, pageItems } = usePagination(filtered);
  useEffect(() => setPage(1), [query, setPage]);

  if (!clients.length) {
    return <EmptyState message="You haven't registered any clients yet." action={<Button href="/dashboard/register" size="sm">Register a client</Button>} />;
  }
  const rows = compact ? clients.slice(0, 4) : pageItems;

  return (
    <div>
      {!compact && <SearchInput onSearch={setQuery} placeholder="Search by name or phone" className="mb-4" />}
      {rows.length ? (
        <ul className="divide-y divide-card-border">
          {rows.map((c) => <li key={c.id}><RecordListItem client={c} onSelect={setSelected} /></li>)}
        </ul>
      ) : (
        <EmptyState message="No registrations match your search." />
      )}
      {!compact && <Pagination page={page} pageCount={pageCount} onChange={setPage} />}
      {selected && <ClientDetailModal client={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
