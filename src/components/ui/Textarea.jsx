"use client";
/** Textarea.jsx - Labelled multi-line input. Same look as Input. */
import { useId } from "react";
import { fieldClass } from "./Input";

export default function Textarea({ label, error, rows = 3, className = "", ...props }) {
  const id = useId();
  return (
    <div className={className}>
      {label && <label htmlFor={id} className="mb-1.5 block text-stat-label text-ink">{label}</label>}
      <textarea id={id} rows={rows} aria-invalid={!!error} className={`${fieldClass} ${error ? "border-status-red" : ""}`} {...props} />
      {error && <p className="mt-1.5 text-meta text-status-red">{error}</p>}
    </div>
  );
}
