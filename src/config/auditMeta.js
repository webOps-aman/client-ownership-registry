/** auditMeta.js - Human labels, icons and colors for audit actions, plus a one-line detail for each entry. */
import { LogIn, LogOut, Search, Timer, FilePlus2, CopyX, Pencil, ArrowLeftRight, UserPlus, UserCheck, UserX, KeyRound, Scale, Gavel, RotateCcw } from "lucide-react";
import { formatPhone } from "@/utils/phone";

export const TONE_CHIPS = {
  blue: "bg-chip-blue-bg text-chip-blue-icon",
  green: "bg-chip-green-bg text-chip-green-icon",
  amber: "bg-chip-amber-bg text-chip-amber-icon",
};

export const AUDIT_META = {
  LOGIN: { label: "Signed in", icon: LogIn, tone: "blue" },
  LOGOUT: { label: "Signed out", icon: LogOut, tone: "blue" },
  CLIENT_SEARCHED: { label: "Searched a client", icon: Search, tone: "green" },
  SEARCH_RATE_LIMITED: { label: "Search limit reached", icon: Timer, tone: "amber" },
  CLIENT_REGISTERED: { label: "Registered a client", icon: FilePlus2, tone: "green" },
  DUPLICATE_ATTEMPT: { label: "Duplicate attempt blocked", icon: CopyX, tone: "amber" },
  CLIENT_EDITED: { label: "Edited a client", icon: Pencil, tone: "blue" },
  OWNERSHIP_TRANSFERRED: { label: "Ownership transferred", icon: ArrowLeftRight, tone: "amber" },
  BROKER_ADDED: { label: "Added a broker", icon: UserPlus, tone: "green" },
  BROKER_ENABLED: { label: "Enabled a broker", icon: UserCheck, tone: "green" },
  BROKER_DISABLED: { label: "Disabled a broker", icon: UserX, tone: "amber" },
  BROKER_PASSWORD_RESET: { label: "Reset a password", icon: KeyRound, tone: "blue" },
  DISPUTE_CREATED: { label: "Created a dispute", icon: Scale, tone: "amber" },
  DISPUTE_RESOLVED: { label: "Resolved a dispute", icon: Gavel, tone: "green" },
  DEMO_RESET: { label: "Reset demo data", icon: RotateCcw, tone: "amber" },
};

export function auditDetail(entry) {
  const d = entry.details || {};
  if (d.phone) return formatPhone(d.phone) + (d.found === true ? " (found)" : d.found === false ? " (not found)" : "");
  if (d.reason) return d.reason;
  return d.loginId || "";
}
