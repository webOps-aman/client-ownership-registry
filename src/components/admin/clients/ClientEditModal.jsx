"use client";
/** ClientEditModal.jsx - Admin edit. Ownership and registration time are NOT editable here. A reason is mandatory. */
import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { updateClient } from "@/store/thunks";
import { todayLocal, nowTimeLocal } from "@/utils/date";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

export default function ClientEditModal({ client, onClose }) {
  const dispatch = useDispatch();
  const visit = new Date(client.visitDateTime);
  const [form, setForm] = useState({ name: client.name, property: client.property, notes: client.notes, visitDate: todayLocal(visit), visitTime: nowTimeLocal(visit) });
  const set = (f) => (e) => setForm((x) => ({ ...x, [f]: e.target.value }));

  const save = async (reason) => {
    const changes = { name: form.name.trim(), property: form.property.trim(), notes: form.notes.trim(), visitDateTime: new Date(`${form.visitDate}T${form.visitTime}`).toISOString() };
    await dispatch(updateClient({ id: client.id, changes, reason })).unwrap();
    toast.success("Client updated.");
  };

  return (
    <ConfirmDialog open onClose={onClose} title={`Edit ${client.name}`} size="md" confirmLabel="Save changes" reasonRequired
      canConfirm={!!form.name.trim() && !!form.visitDate && !!form.visitTime} onConfirm={save}>
      <Input label="Client name" value={form.name} onChange={set("name")} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Visit date" type="date" value={form.visitDate} onChange={set("visitDate")} />
        <Input label="Visit time" type="time" value={form.visitTime} onChange={set("visitTime")} />
      </div>
      <Input label="Property / project" value={form.property} onChange={set("property")} />
      <Textarea label="Notes" value={form.notes} onChange={set("notes")} />
    </ConfirmDialog>
  );
}
