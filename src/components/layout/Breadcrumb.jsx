"use client";
/** Breadcrumb.jsx - "Home > Current page". The active (last) crumb is semibold. */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { labelForPath } from "@/config/navigation";

export default function Breadcrumb() {
  const { role, homePath } = useAuth();
  const pathname = usePathname();
  const atHome = pathname === homePath;
  const current = labelForPath(role, pathname);
  const rootLabel = role === "admin" ? "Admin" : "Dashboard";

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-breadcrumb text-ink-muted">
      {atHome ? (
        <span className="font-semibold text-ink" aria-current="page">{current || rootLabel}</span>
      ) : (
        <>
          <Link href={homePath} className="hover:text-ink">{rootLabel}</Link>
          <ChevronRight className="h-4 w-4" aria-hidden />
          <span className="font-semibold text-ink" aria-current="page">{current}</span>
        </>
      )}
    </nav>
  );
}
