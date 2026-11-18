"use client";
/** error.jsx - Error boundary for this area. It renders inside the layout, so the sidebar stays usable. */
import ErrorState from "@/components/ui/ErrorState";
export default function Error({ error, reset }) { return <ErrorState error={error} reset={reset} />; }
