"use client";
/** RecentActivity.jsx - Latest audit events: icon chip, title, and a colored day label (Today is highlighted). */
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { makeSelectRecentActivity } from "@/store/selectors";
import { AUDIT_META, TONE_CHIPS, auditDetail } from "@/config/auditMeta";
import { dayLabel, isToday } from "@/utils/date";
import EmptyState from "@/components/ui/EmptyState";

export default function RecentActivity({ count = 6 }) {
  const select = useMemo(makeSelectRecentActivity, []);
  const rows = useSelector((s) => select(s, count));
  if (!rows.length) return <EmptyState message="No activity yet." />;
  return (
    <ul className="divide-y divide-card-border">
      {rows.map((e) => {
        const meta = AUDIT_META[e.action] || { label: e.action, icon: AUDIT_META.LOGIN.icon, tone: "blue" };
        const Icon = meta.icon;
        const detail = auditDetail(e);
        return (
          <li key={e.id} className="flex gap-4 py-3">
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${TONE_CHIPS[meta.tone]}`}><Icon className="h-5 w-5" aria-hidden /></span>
            <div className="min-w-0">
              <p className="text-item-title">{meta.label}</p>
              <p className="flex flex-wrap gap-x-3 text-meta">
                <span className={isToday(e.createdAt) ? "font-semibold text-today" : "text-ink-muted"}>{dayLabel(e.createdAt)}</span>
                <span className="text-ink-muted">{e.userName}</span>
                {detail && <span className="truncate text-ink-muted">{detail}</span>}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
