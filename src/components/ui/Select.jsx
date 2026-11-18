"use client";
/** Select.jsx - Labelled dropdown. Same look as Input. options = [{ value, label }] */
import { useId } from "react";
import { fieldClass } from "./Input";

export default function Select({ label, error, options = [], className = "", ...props }) {
  const id = useId();
  return (
    <div className={className}>
      {label && <label htmlFor={id} className="mb-1.5 block text-stat-label text-ink">{label}</label>}
      <select id={id} aria-invalid={!!error} className={`${fieldClass} ${error ? "border-status-red" : ""}`} {...props}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {error && <p className="mt-1.5 text-meta text-status-red">{error}</p>}
    </div>
  );
}
