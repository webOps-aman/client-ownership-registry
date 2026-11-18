"use client";
/** ErrorState.jsx - Friendly fallback shown by error.jsx when a page crashes. `reset` re-renders the failed part. */
import { useEffect } from "react";
import { TriangleAlert } from "lucide-react";
import Card from "./Card";
import EmptyState from "./EmptyState";
import Button from "./Button";

export default function ErrorState({ error, reset }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <Card className="mx-auto max-w-lg">
      <EmptyState icon={TriangleAlert} message="Something went wrong on this page. Your data is safe in this browser."
        action={<div className="flex gap-3"><Button onClick={reset}>Try again</Button><Button href="/" variant="secondary">Go home</Button></div>} />
    </Card>
  );
}
