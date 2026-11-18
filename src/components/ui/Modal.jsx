"use client";
/** Modal.jsx - Accessible dialog: Esc and backdrop close it, focus is kept inside, scroll is locked, focus returns on close. */
import { useEffect, useRef } from "react";
import { X } from "lucide-react";

const SIZES = { sm: "max-w-md", md: "max-w-xl", lg: "max-w-3xl" };
const FOCUSABLE = 'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])';

export default function Modal({ open, onClose, title, size = "md", children }) {
  const panel = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose; // always call the latest handler without re-running the effect

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    document.body.style.overflow = "hidden";
    panel.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") return closeRef.current();
      if (e.key !== "Tab") return;
      const items = [...panel.current.querySelectorAll(FOCUSABLE)];
      if (!items.length) return e.preventDefault();
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus?.();
    };
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/50" onClick={onClose} aria-hidden />
      <div ref={panel} role="dialog" aria-modal="true" aria-labelledby="modal-title" tabIndex={-1}
        className={`relative max-h-[90vh] w-full overflow-y-auto rounded-section bg-card p-6 shadow-hero ${SIZES[size]}`}>
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id="modal-title" className="text-section-title">{title}</h2>
          <button onClick={onClose} aria-label="Close" className="rounded-full p-2 text-ink-muted hover:bg-card-border/60"><X className="h-5 w-5" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}
