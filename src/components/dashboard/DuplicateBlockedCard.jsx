/** DuplicateBlockedCard.jsx - Shown when a registration is blocked because the phone already has an owner. */
import { ShieldAlert } from "lucide-react";
import Card from "@/components/ui/Card";
import { formatDateTime } from "@/utils/date";

export default function DuplicateBlockedCard({ owner }) {
  return (
    <div role="alert" className="mb-6">
      <Card className="border-status-red/40">
        <div className="flex items-start gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-status-red/10 text-status-red"><ShieldAlert className="h-5 w-5" aria-hidden /></span>
          <div>
            <h2 className="text-section-title">This client is already registered</h2>
            <p className="mt-1 text-[15px] text-ink-muted">
              {owner.isMine ? "You registered this client" : `${owner.ownerName} (${owner.ownerType})`} on {formatDateTime(owner.registeredOn)}.
              {!owner.isMine && " Your attempt has been logged."}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
