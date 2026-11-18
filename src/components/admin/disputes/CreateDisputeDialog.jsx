"use client";
/** CreateDisputeDialog.jsx - Opens a dispute from a duplicate attempt; the claimant defaults to the person who attempted. */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createDispute } from "@/store/thunks";
import { selectBrokerOptions } from "@/store/selectors";
import { formatPhone } from "@/utils/phone";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";

export default function CreateDisputeDialog({ attempt, onClose }) {
  const dispatch = useDispatch();
  const options = useSelector(selectBrokerOptions);
  const [claimedBy, setClaimedBy] = useState(attempt.attemptedBy);
  const [note, setNote] = useState("");

  const create = async () => {
    await dispatch(createDispute({ clientId: attempt.existingClientId, claimedBy, note })).unwrap();
    toast.success("Dispute created. Find it under Disputes.");
  };

  return (
    <ConfirmDialog open onClose={onClose} onConfirm={create} title="Create dispute" confirmLabel="Create dispute" canConfirm={!!claimedBy}
      message={`${formatPhone(attempt.phone)} is owned by ${attempt.ownerName}. Choose who is claiming the client.`}>
      <Select label="Claimed by" value={claimedBy} onChange={(e) => setClaimedBy(e.target.value)} options={options} />
      <Textarea label="Note (optional)" value={note} onChange={(e) => setNote(e.target.value)} />
    </ConfirmDialog>
  );
}
