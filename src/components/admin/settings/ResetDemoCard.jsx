"use client";
/** ResetDemoCard.jsx - Wipes all demo data and reseeds it (useful before each client presentation). */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { RotateCcw } from "lucide-react";
import toast from "react-hot-toast";
import { resetDemoData } from "@/store/thunks";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

export default function ResetDemoCard() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const reset = async () => {
    await dispatch(resetDemoData()).unwrap();
    toast.success("Demo data reset.");
  };
  return (
    <Card accent="amber">
      <h2 className="text-section-title">Demo data</h2>
      <p className="mb-5 mt-2 text-section-sub text-ink-muted">Everything lives in this browser. Reset restores the sample clients, brokers and logs.</p>
      <Button variant="danger" icon={RotateCcw} onClick={() => setOpen(true)}>Reset demo data</Button>
      {open && (
        <ConfirmDialog open onClose={() => setOpen(false)} onConfirm={reset} tone="danger" confirmLabel="Reset everything" title="Reset demo data?"
          message="All clients, brokers you added, logs and disputes will be replaced with the sample data. This can't be undone." />
      )}
    </Card>
  );
}
