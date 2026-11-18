"use client";
/** ClientDetailModal.jsx - Read-only details of one of the user's own registrations. Lazy loaded. */
import Modal from "@/components/ui/Modal";
import { formatRecordNo } from "@/utils/id";
import { formatPhone } from "@/utils/phone";
import { formatDateTime } from "@/utils/date";

export default function ClientDetailModal({ client, onClose }) {
  const rows = [
    ["Record", formatRecordNo(client.seq)],
    ["Phone", formatPhone(client.phoneNormalized)],
    ["Registered as", client.source === "Direct" ? "Company Direct" : "Broker"],
    ["Registered on", formatDateTime(client.createdAt)],
    ["Visit", formatDateTime(client.visitDateTime)],
    ["Property / project", client.property || "-"],
    ["Notes", client.notes || "-"],
  ];
  return (
    <Modal open onClose={onClose} title={client.name}>
      <dl className="divide-y divide-card-border">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-3 gap-4 py-3 text-[15px]">
            <dt className="text-ink-muted">{k}</dt>
            <dd className="col-span-2 break-words">{v}</dd>
          </div>
        ))}
      </dl>
    </Modal>
  );
}
