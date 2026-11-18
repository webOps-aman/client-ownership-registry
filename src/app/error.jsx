"use client";
/** error.jsx - Root error boundary (login and redirect pages). */
import ErrorState from "@/components/ui/ErrorState";
export default function Error({ error, reset }) { return <main className="p-6 pt-24"><ErrorState error={error} reset={reset} /></main>; }
