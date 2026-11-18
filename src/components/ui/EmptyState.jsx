/** EmptyState.jsx - Centered circle-check icon with muted text and an optional action. */
import { CheckCircle2 } from "lucide-react";

export default function EmptyState({ icon: Icon = CheckCircle2, message, action }) {
  return (
    <div className="flex flex-col items-center gap-3 py-10 text-center">
      <Icon className="h-10 w-10 text-ink-muted/60" aria-hidden />
      <p className="text-section-sub text-ink-muted">{message}</p>
      {action}
    </div>
  );
}
