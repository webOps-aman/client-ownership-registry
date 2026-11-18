"use client";
/** Input.jsx - Labelled text input with error/hint text and a show/hide toggle for passwords. */
import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const fieldClass =
  "w-full rounded-item border border-card-border bg-card px-4 py-2.5 text-[15px] text-ink placeholder:text-ink-muted/70 transition disabled:opacity-60";

export default function Input({ label, error, hint, type = "text", className = "", ...props }) {
  const id = useId();
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const note = error || hint;

  return (
    <div className={className}>
      {label && <label htmlFor={id} className="mb-1.5 block text-stat-label text-ink">{label}</label>}
      <div className="relative">
        <input
          id={id}
          type={isPassword && show ? "text" : type}
          aria-invalid={!!error}
          aria-describedby={note ? `${id}-note` : undefined}
          className={`${fieldClass} ${error ? "border-status-red" : ""} ${isPassword ? "pr-11" : ""}`}
          {...props}
        />
        {isPassword && (
          <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink">
            {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>
      {note && <p id={`${id}-note`} className={`mt-1.5 text-meta ${error ? "text-status-red" : "text-ink-muted"}`}>{note}</p>}
    </div>
  );
}
