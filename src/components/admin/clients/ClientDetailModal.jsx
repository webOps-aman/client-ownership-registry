"use client";
/** admin ClientDetailModal.jsx - Every field, the ownership/edit history, and related duplicate attempts. Lazy loaded. */
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectUsersById } from "@/store/selectors";
import Modal from "@/components/ui/Modal";
import { formatRecordNo } from "@/utils/id";
import { formatPhone } from "@/utils/phone";
import { formatDateTime } from "@/utils/date";

export default function ClientDetailModal({ client, onClose }) {
  const byId = useSelector(selectUsersById);
  const allAttempts = useSelector((s) => s.logs.attempts);
  const attempts = useMemo(() => allAttempts.filter((a) => a.existingClientId === client.id), [allAttempts, client.id]);
  const name = (id) => byId[id]?.name ?? "Unknown";

  const rows = [
    ["Record", formatRecordNo(client.seq)],
    ["Phone", formatPhone(client.phoneNormalized)],
    ["Owner", `${name(client.registeredBy)} (${client.source === "Direct" ? "Company Direct" : "Broker"})`],
    ["Registered on", formatDateTime(client.createdAt)],
    ["Visit", formatDateTime(client.visitDateTime)],
    ["Property / project", client.property || "-"],
    ["Notes", client.notes || "-"],
  ];
  const describe = (h) => h.type === "transfer"
    ? `Transferred from ${name(h.fromUser)} to ${name(h.toUser)}`
    : `Edited ${Object.keys(h.after || {}).join(", ")}`;

  return (
    <Modal open onClose={onClose} title={client.name} size="lg">
      <dl className="divide-y divide-card-border">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-3 gap-4 py-3 text-[15px]"><dt className="text-ink-muted">{k}</dt><dd className="col-span-2 break-words">{v}</dd></div>
        ))}
      </dl>

      <h3 className="mt-6 text-item-title font-serif">History</h3>
      {client.history.length ? (
        <ul className="mt-2 space-y-3">
          {[...client.history].reverse().map((h, i) => (
            <li key={i} className="rounded-item border border-card-border p-3 text-[15px]">
              <p className="font-medium">{describe(h)}</p>
              <p className="text-meta text-ink-muted">By {name(h.by)} on {formatDateTime(h.at)}</p>
              <p className="mt-1 text-meta">Reason: {h.reason}</p>
            </li>
          ))}
        </ul>
      ) : <p className="mt-2 text-[15px] text-ink-muted">No edits or transfers.</p>}

      <h3 className="mt-6 text-item-title font-serif">Duplicate attempts on this client</h3>
      {attempts.length ? (
        <ul className="mt-2 space-y-1 text-[15px]">
          {attempts.map((a) => <li key={a.id}>{name(a.attemptedBy)} on {formatDateTime(a.createdAt)}</li>)}
        </ul>
      ) : <p className="mt-2 text-[15px] text-ink-muted">None.</p>}
    </Modal>
  );
}
