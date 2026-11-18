/** date.js - Small date helpers used by selectors and screens. */
export const isToday = (iso) => new Date(iso).toDateString() === new Date().toDateString();

export const formatDateTime = (iso) =>
  iso ? new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" }) : "-";

export const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "-";

export function greeting(date = new Date()) {
  const h = date.getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}

const pad = (n) => String(n).padStart(2, "0");
/** Local "YYYY-MM-DD" and "HH:MM" for date/time inputs (toISOString would give UTC). */
export const todayLocal = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const nowTimeLocal = (d = new Date()) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

export function timeAgo(iso) {
  const m = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  if (m < 1440) return `${Math.floor(m / 60)}h ago`;
  return `${Math.floor(m / 1440)}d ago`;
}

/** "Today" / "Yesterday" / "12 Oct 2026" for activity lists. */
export function dayLabel(iso) {
  if (isToday(iso)) return "Today";
  const y = new Date(); y.setDate(y.getDate() - 1);
  return new Date(iso).toDateString() === y.toDateString() ? "Yesterday" : formatDate(iso);
}

/** true if iso falls between from/to ("YYYY-MM-DD", both optional, inclusive). */
export function inRange(iso, from, to) {
  const t = new Date(iso).getTime();
  if (from && t < new Date(from).getTime()) return false;
  if (to && t >= new Date(to).getTime() + 86_400_000) return false;
  return true;
}
