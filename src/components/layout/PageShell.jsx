"use client";
/** PageShell.jsx - Sidebar + Topbar + padded content area. Wraps every logged-in page (both areas). */
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import MobileDrawer from "./MobileDrawer";
import Topbar from "./Topbar";

export default function PageShell({ children }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]); // close the drawer after navigating

  return (
    <div className="min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-item focus:bg-card focus:px-4 focus:py-2">Skip to content</a>
      <Sidebar />
      <MobileDrawer open={open} onClose={() => setOpen(false)} />
      <div className="lg:pl-sidebar">
        <Topbar onMenu={() => setOpen(true)} />
        <main id="main" className="p-4 sm:p-6 lg:p-page">{children}</main>
      </div>
    </div>
  );
}
