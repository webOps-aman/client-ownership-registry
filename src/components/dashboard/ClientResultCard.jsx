/** ClientResultCard.jsx - Check result when the phone IS registered. Shows only owner name, type and date (reveal rule). */
import Link from "next/link";
import { UserCheck } from "lucide-react";
import Card from "@/components/ui/Card";
import Pill from "@/components/ui/Pill";
import { formatPhone } from "@/utils/phone";
import { formatDateTime } from "@/utils/date";

export default function ClientResultCard({ result }) {
  const rows = [
    ["Owner", result.ownerName],
    ["Owner type", result.ownerType],
    ["Registered on", formatDateTime(result.registeredOn)],
  ];
  return (
    <Card accent="amber" className="mt-6" aria-live="polite">
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-chip-amber-bg text-chip-amber-icon"><UserCheck className="h-5 w-5" aria-hidden /></span>
        <div>
          <h2 className="text-section-title">Already registered</h2>
          <p className="text-section-sub text-ink-muted">{formatPhone(result.phone)}</p>
        </div>
      </div>
      <dl className="mt-4 divide-y divide-card-border">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 py-3 text-[15px]"><dt className="text-ink-muted">{k}</dt><dd className="font-medium">{v}</dd></div>
        ))}
      </dl>
      {result.isMine && (
        <p className="mt-3 flex flex-wrap items-center gap-3 text-[15px]">
          <Pill>You registered this client</Pill>
          <Link href="/dashboard/my-registrations" className="font-semibold underline">View in My Registrations</Link>
        </p>
      )}
    </Card>
  );
}
