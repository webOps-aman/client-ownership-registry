"use client";
/** admin/clients/page.jsx - Full client table: search, filters, paging, view / edit / transfer, CSV export. */
import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { makeSelectFilteredClients, selectBrokerOptions } from "@/store/selectors";
import { usePagination } from "@/hooks/usePagination";
import PageHeader from "@/components/ui/PageHeader";
import Pagination from "@/components/ui/Pagination";
import { TableSkeleton } from "@/components/ui/Skeleton";
import ClientFilters from "@/components/admin/clients/ClientFilters";
import ExportCsvButton from "@/components/admin/clients/ExportCsvButton";

// Heavy / rarely used pieces are downloaded only when needed.
const ClientsTable = dynamic(() => import("@/components/admin/clients/ClientsTable"), { loading: () => <TableSkeleton /> });
const ClientDetailModal = dynamic(() => import("@/components/admin/clients/ClientDetailModal"));
const ClientEditModal = dynamic(() => import("@/components/admin/clients/ClientEditModal"));
const OwnershipTransferModal = dynamic(() => import("@/components/admin/clients/OwnershipTransferModal"));

const EMPTY = { search: "", broker: "", source: "", from: "", to: "" };

export default function AdminClientsPage() {
  const [filters, setFilters] = useState(EMPTY);
  const [resetCount, setResetCount] = useState(0);
  const [modal, setModal] = useState(null); // { type: "view" | "edit" | "transfer", id }

  const setFilter = useCallback((k, v) => setFilters((f) => (f[k] === v ? f : { ...f, [k]: v })), []);
  const onSearch = useCallback((v) => setFilter("search", v), [setFilter]);
  const reset = () => { setFilters(EMPTY); setResetCount((n) => n + 1); };

  const select = useMemo(makeSelectFilteredClients, []);
  const rows = useSelector((s) => select(s, filters));
  const allClients = useSelector((s) => s.clients.items);
  const brokerOptions = useSelector(selectBrokerOptions);
  const { page, setPage, pageCount, pageItems } = usePagination(rows);
  useEffect(() => setPage(1), [filters, setPage]);

  const selected = modal && allClients.find((c) => c.id === modal.id);
  const close = () => setModal(null);
  const open = (type) => (id) => setModal({ type, id });

  return (
    <div>
      <PageHeader title="Clients" subtitle={`${rows.length} matching record${rows.length === 1 ? "" : "s"}.`}>
        <ExportCsvButton rows={rows} />
      </PageHeader>
      <ClientFilters key={resetCount} filters={filters} setFilter={setFilter} onSearch={onSearch} onReset={reset} brokerOptions={brokerOptions} />
      <ClientsTable rows={pageItems} onView={open("view")} onEdit={open("edit")} onTransfer={open("transfer")} />
      <Pagination page={page} pageCount={pageCount} onChange={setPage} />

      {selected && modal.type === "view" && <ClientDetailModal client={selected} onClose={close} />}
      {selected && modal.type === "edit" && <ClientEditModal client={selected} onClose={close} />}
      {selected && modal.type === "transfer" && <OwnershipTransferModal client={selected} onClose={close} />}
    </div>
  );
}
