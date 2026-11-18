"use client";
/** SearchInput.jsx - Search box that calls onSearch(text) only after the user pauses typing (debounced). */
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { fieldClass } from "./Input";

export default function SearchInput({ onSearch, placeholder = "Search", delay = 300, className = "" }) {
  const [value, setValue] = useState("");
  const debounced = useDebounce(value, delay);
  useEffect(() => { onSearch(debounced); }, [debounced, onSearch]);
  return (
    <div className={`relative ${className}`}>
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted" aria-hidden />
      <input type="search" value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} aria-label={placeholder} className={`${fieldClass} pl-12`} />
    </div>
  );
}
