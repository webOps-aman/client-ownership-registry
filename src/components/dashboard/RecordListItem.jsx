/** RecordListItem.jsx - One registration row: ID badge, name + property pill, 2-line notes, owner and time. Memoized: pass a STABLE onSelect. */
import { memo } from "react";
import { MapPin } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Pill from "@/components/ui/Pill";
import { formatRecordNo } from "@/utils/id";
import { formatPhone } from "@/utils/phone";
import { formatDateTime } from "@/utils/date";

function RecordListItem({ client, onSelect, owner }) {
  return (
    <button type="button" onClick={() => onSelect?.(client)} className="flex w-full gap-4 rounded-item p-3 text-left transition hover:bg-page">
      <Badge variant="id">{formatRecordNo(client.seq)}</Badge>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-item-title">{client.name}</p>
          {client.property && <Pill icon={MapPin}>{client.property}</Pill>}
        </div>
        <p className="mt-1 line-clamp-2 text-item-body text-ink-muted">{client.notes || `Phone ${formatPhone(client.phoneNormalized)}`}</p>
        <p className="mt-1 flex flex-wrap gap-x-4 text-meta text-ink-muted">
          {owner && <span className="font-medium text-ink">{owner}</span>}
          <span>{client.source === "Direct" ? "Company Direct" : "Broker"}</span>
          <span>{formatDateTime(client.createdAt)}</span>
        </p>
      </div>
    </button>
  );
}
export default memo(RecordListItem);
