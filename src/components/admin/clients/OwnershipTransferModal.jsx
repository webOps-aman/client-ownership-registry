"use client";
/** OwnershipTransferModal.jsx - Admin override: move a client to another owner. Reason + confirmation are mandatory. */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { transferOwnership } from "@/store/thunks";
import { selectBrokerOptions, selectUsersById } from "@/store/selectors";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Select from "@/components/ui/Select";

export default function OwnershipTransferModal({ client, onClose }) {
  const dispatch = useDispatch();
  const options = useSelector(selectBrokerOptions).filter((o) => o.value !== client.registeredBy);
  const byId = useSelector(selectUsersById);
  const [newOwner, setNewOwner] = useState("");
  const [ack, setAck] = useState(false);

  const transfer = async (reason) => {
    await dispatch(transferOwnership({ id: client.id, newOwnerId: newOwner, reason })).unwrap();
    toast.success("Ownership transferred.");
  };

  return (
    <ConfirmDialog open onClose={onClose} title="Transfer ownership" confirmLabel="Transfer" tone="danger" reasonRequired
      message={`${client.name} is currently owned by ${byId[client.registeredBy]?.name ?? "Unknown"}. The previous owner stays in the record history.`}
      canConfirm={!!newOwner && ack} onConfirm={transfer}>
      <Select label="New owner" value={newOwner} onChange={(e) => setNewOwner(e.target.value)} options={[{ value: "", label: "Choose an owner" }, ...options]} />
      <label className="flex items-start gap-3 text-[15px]">
        <input type="checkbox" checked={ack} onChange={(e) => setAck(e.target.checked)} className="mt-1 h-4 w-4" />
        I understand this changes who earns the commission.
      </label>
    </ConfirmDialog>
  );
}
