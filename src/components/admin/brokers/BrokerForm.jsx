"use client";
/** BrokerForm.jsx - Add a broker or company agent. Login ID must be unique (checked by the service). */
import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addBroker } from "@/store/thunks";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

export default function BrokerForm({ onClose }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: "", loginId: "", phone: "", password: "", role: "broker" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (f) => (e) => { setForm((x) => ({ ...x, [f]: e.target.value })); setError(""); };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(addBroker(form)).unwrap();
      toast.success(`${form.name} added.`);
      onClose();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <Modal open onClose={onClose} title="Add broker">
      <form onSubmit={submit} noValidate className="space-y-4">
        {error && <p role="alert" className="rounded-item border border-status-red/30 bg-status-red/10 px-4 py-3 text-[15px] text-status-red">{error}</p>}
        <Input label="Full name" value={form.name} onChange={set("name")} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Login ID" value={form.loginId} onChange={set("loginId")} autoComplete="off" />
          <Input label="Password" type="password" value={form.password} onChange={set("password")} autoComplete="new-password" hint="At least 6 characters." />
          <Input label="Phone (optional)" type="tel" value={form.phone} onChange={set("phone")} />
          <Select label="Type" value={form.role} onChange={set("role")} options={[{ value: "broker", label: "External broker" }, { value: "agent", label: "Company agent" }]} />
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={loading} disabled={!form.name.trim() || !form.loginId.trim() || form.password.length < 6}>Add broker</Button>
        </div>
      </form>
    </Modal>
  );
}
