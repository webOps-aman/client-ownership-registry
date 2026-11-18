/** RegistrationProofCard.jsx - Success screen: the timestamped proof of registration. */
import { BadgeCheck } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatRecordNo } from "@/utils/id";
import { formatPhone } from "@/utils/phone";
import { formatDateTime } from "@/utils/date";

export default function RegistrationProofCard({ client, registeredBy, onAnother }) {
  const rows = [
    ["Client", client.name],
    ["Phone", formatPhone(client.phoneNormalized)],
    ["Registered by", `${registeredBy} (${client.source === "Direct" ? "Company Direct" : "Broker"})`],
    ["Registered on", formatDateTime(client.createdAt)],
    ["Visit", formatDateTime(client.visitDateTime)],
  ];
  return (
    <Card accent="green" aria-live="polite">
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-chip-green-bg text-chip-green-icon"><BadgeCheck className="h-6 w-6" aria-hidden /></span>
        <div className="flex-1">
          <h2 className="text-section-title">Registration recorded</h2>
          <p className="text-section-sub text-ink-muted">Keep this as your proof of first registration.</p>
        </div>
        <Badge variant="id">{formatRecordNo(client.seq)}</Badge>
      </div>
      <dl className="mt-5 divide-y divide-card-border">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 py-3 text-[15px]"><dt className="text-ink-muted">{k}</dt><dd className="text-right font-medium">{v}</dd></div>
        ))}
      </dl>
      <p className="mt-3 text-meta text-ink-muted">The registration time is set by the system and can&apos;t be edited.</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button onClick={onAnother}>Register another</Button>
        <Button href="/dashboard/my-registrations" variant="secondary">Go to My Registrations</Button>
      </div>
    </Card>
  );
}
