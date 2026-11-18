"use client";
/** usePagination.js - Client-side paging over an array. The page number is clamped if the list shrinks. */
import { useMemo, useState } from "react";
import { PAGE_SIZE } from "@/config/constants";

export function usePagination(items, pageSize = PAGE_SIZE) {
  const [requested, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const page = Math.min(requested, pageCount);
  const pageItems = useMemo(() => items.slice((page - 1) * pageSize, page * pageSize), [items, page, pageSize]);
  return { page, setPage, pageCount, pageItems, total: items.length };
}
