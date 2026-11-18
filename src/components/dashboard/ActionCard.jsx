/** ActionCard.jsx - Large clickable card for the two main actions (Check / Register). */
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CHIPS = {
  blue: "bg-chip-blue-bg text-chip-blue-icon",
  amber: "bg-chip-amber-bg text-chip-amber-icon",
  green: "bg-chip-green-bg text-chip-green-icon",
};

export default function ActionCard({ href, icon: Icon, title, description, tone = "blue" }) {
  return (
    <Link href={href} className="group block rounded-section border border-card-border bg-card p-8 shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover">
      <span className={`flex h-14 w-14 items-center justify-center rounded-full ${CHIPS[tone]}`}><Icon className="h-7 w-7" aria-hidden /></span>
      <h2 className="mt-5 text-section-title">{title}</h2>
      <p className="mt-2 text-section-sub text-ink-muted">{description}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-ink">
        Open <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
      </span>
    </Link>
  );
}
