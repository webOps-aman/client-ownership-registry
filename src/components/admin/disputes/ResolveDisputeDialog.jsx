"use client";
/** ResolveDisputeDialog.jsx - Resolve with an outcome and a mandatory reason. "Transfer" also moves ownership to the claimant. */
import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { resolveDispute } from "@/store/thunks";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Select from "@/components/ui/Select";

export default function ResolveDisputeDialog({ dispute, onClose }) {
  const dispatch = useDispatch();
  const [outcome, setOutcome] = useState("keep");

  const resolve = async (reason) => {
    await dispatch(resolveDispute({ id: dispute.id, outcome, reason })).unwrap();
    toast.success("Dispute resolved.");
  };

  return (
    <ConfirmDialog open onClose={onClose} onConfirm={resolve} title="Resolve dispute" confirmLabel="Resolve" reasonRequired
      message={`${dispute.claimedByName} is claiming ${dispute.clientName}.${dispute.note ? ` Note: ${dispute.note}` : ""}`}>
      <Select label="Outcome" value={outcome} onChange={(e) => setOutcome(e.target.value)}
        options={[{ value: "keep", label: "Keep current owner" }, { value: "transfer", label: `Transfer to ${dispute.claimedByName}` }]} />
    </ConfirmDialog>
  );
}
