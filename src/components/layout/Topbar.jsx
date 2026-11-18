"use client";
/** Topbar.jsx - Cream top bar: menu button (mobile), breadcrumb, and the signed-in user. */
import { Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Breadcrumb from "./Breadcrumb";

export default function Topbar({ onMenu }) {
  const { user, role } = useAuth();
  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-card-border bg-topbar px-4 py-3 sm:px-6 lg:px-page">
      <button onClick={onMenu} aria-label="Open menu" className="rounded-item p-2 text-ink hover:bg-card-border/60 lg:hidden">
        <Menu className="h-6 w-6" />
      </button>
      <Breadcrumb />
      <div className="ml-auto flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-[15px] font-medium leading-tight">{user?.name}</p>
          <p className="text-meta capitalize text-ink-muted">{role}</p>
        </div>
        <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar font-semibold text-white">
          {user?.name?.[0]?.toUpperCase()}
        </span>
      </div>
    </header>
  );
}
