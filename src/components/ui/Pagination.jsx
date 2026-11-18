"use client";
/** Pagination.jsx - Previous / Next with "Page x of y". Hidden when there is only one page. */
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";

export default function Pagination({ page, pageCount, onChange }) {
  if (pageCount <= 1) return null;
  return (
    <nav aria-label="Pagination" className="mt-4 flex items-center justify-between">
      <span className="text-meta text-ink-muted">Page {page} of {pageCount}</span>
      <div className="flex gap-2">
        <Button variant="secondary" size="sm" icon={ChevronLeft} disabled={page <= 1} onClick={() => onChange(page - 1)}>Previous</Button>
        <Button variant="secondary" size="sm" icon={ChevronRight} disabled={page >= pageCount} onClick={() => onChange(page + 1)}>Next</Button>
      </div>
    </nav>
  );
}
