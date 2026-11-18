"use client";
/** MobileDrawer.jsx - Sidebar as a slide-in drawer on tablet/mobile. Esc, the backdrop, or choosing a link closes it. */
import { useEffect } from "react";
import { X } from "lucide-react";
import { SidebarContent } from "./Sidebar";

export default function MobileDrawer({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      <div className="absolute inset-0 bg-ink/50" onClick={onClose} aria-hidden />
      <aside role="dialog" aria-modal="true" aria-label="Navigation" className="absolute inset-y-0 left-0 w-[85%] max-w-sidebar shadow-hero">
        <button onClick={onClose} aria-label="Close menu" className="absolute right-3 top-3 z-10 rounded-full p-2 text-sidebar-text hover:bg-sidebar-active">
          <X className="h-5 w-5" />
        </button>
        <SidebarContent onNavigate={onClose} />
      </aside>
    </div>
  );
}
