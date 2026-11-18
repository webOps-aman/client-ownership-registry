/** not-found.jsx - 404 page. */
import Link from "next/link";
import EmptyState from "@/components/ui/EmptyState";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-lg p-6 pt-24">
      <div className="rounded-section border border-card-border bg-card p-cardpad shadow-card">
        <EmptyState icon={SearchX} message="We couldn't find that page." action={
          <Link href="/" className="rounded-pill bg-btn px-5 py-2.5 text-[15px] font-semibold text-btn-text shadow-btn">Go to home</Link>
        } />
      </div>
    </main>
  );
}
