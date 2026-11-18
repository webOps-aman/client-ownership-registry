"use client";
/**
 * Sidebar.jsx - Navy sidebar (316px). SidebarContent is shared by the desktop sidebar and the mobile drawer.
 * Menu comes from config/navigation.js, so each role sees only its own sections.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { ENV } from "@/config/env";
import { getNavForRole } from "@/config/navigation";

export function SidebarContent({ onNavigate }) {
  const { user, role, homePath, signOut } = useAuth();
  const pathname = usePathname();
  const isActive = (href) => (href === homePath ? pathname === href : pathname.startsWith(href));

  const handleSignOut = async () => {
    onNavigate?.();
    await signOut();
    toast.success("Signed out.");
  };

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-text">
      <div className="px-7 pb-6 pt-8">
        <p className="font-serif text-logo-title leading-tight text-white">{ENV.appName}</p>
        <p className="mt-1 text-logo-sub text-sidebar-label">{ENV.companyName}</p>
      </div>

      <nav className="sidebar-scroll flex-1 overflow-y-auto overscroll-contain px-4" aria-label="Main">
        {getNavForRole(role).map((section) => (
          <div key={section.section} className="mb-6">
            <p className="mb-2 px-3 text-side-label uppercase text-sidebar-label">{section.section}</p>
            <ul className="space-y-1">
              {section.items.map(({ href, label, icon: Icon }) => {
                const active = isActive(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-3 rounded-item px-3 py-3 text-side-item transition ${
                        active ? "bg-sidebar-active text-sidebar-active-text" : "hover:bg-sidebar-active/60"
                      }`}
                    >
                      <Icon className="h-5 w-5 shrink-0" aria-hidden />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-4">
        <p className="truncate px-3 text-[15px] font-medium text-white">{user?.name}</p>
        <p className="mb-2 px-3 text-meta capitalize text-sidebar-label">{role}</p>
        <button onClick={handleSignOut} className="flex w-full items-center gap-3 rounded-item px-3 py-3 text-side-item transition hover:bg-sidebar-active/60">
          <LogOut className="h-5 w-5" aria-hidden /> Sign out
        </button>
      </div>
    </div>
  );
}

/** Desktop sidebar: fixed, hidden below the lg breakpoint (the drawer takes over). */
export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-sidebar lg:block">
      <SidebarContent />
    </aside>
  );
}
