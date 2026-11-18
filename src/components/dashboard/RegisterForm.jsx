"use client";
/** RegisterForm.jsx - Registers a client. Prefilled from ?phone=&name= (from Check). Handles validation, duplicates and the proof screen. */
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { FilePlus2 } from "lucide-react";
import toast from "react-hot-toast";
import { registerClient } from "@/store/thunks";
import { useAuth } from "@/hooks/useAuth";
import { todayLocal, nowTimeLocal } from "@/utils/date";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import DuplicateBlockedCard from "./DuplicateBlockedCard";
import RegistrationProofCard from "./RegistrationProofCard";

const blank = (params) => ({
  name: params?.get("name") || "", phone: params?.get("phone") || "",
  visitDate: "", visitTime: "", property: "", notes: "",
});

export default function RegisterForm() {
  const params = useSearchParams();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [form, setForm] = useState(() => blank(params));
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [duplicate, setDuplicate] = useState(null);
  const [proof, setProof] = useState(null);

  // Default the visit to "now" after mount (avoids a server/client mismatch on the date).
  useEffect(() => {
    setForm((f) => ({ ...f, visitDate: f.visitDate || todayLocal(), visitTime: f.visitTime || nowTimeLocal() }));
  }, []);

  const set = (field) => (e) => { setForm((f) => ({ ...f, [field]: e.target.value })); setErrors((x) => ({ ...x, [field]: "" })); setDuplicate(null); };

  const reset = () => {
    setProof(null); setDuplicate(null); setErrors({});
    setForm({ ...blank(), visitDate: todayLocal(), visitTime: nowTimeLocal() });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDuplicate(null);
    try {
      setProof(await dispatch(registerClient(form)).unwrap());
    } catch (err) {
      if (err.code === "DUPLICATE") setDuplicate(err.owner);
      else if (err.code === "VALIDATION" && err.fields) setErrors(err.fields);
      else toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (proof) return <RegistrationProofCard client={proof} registeredBy={user.name} onAnother={reset} />;

  return (
    <>
      {duplicate && <DuplicateBlockedCard owner={duplicate} />}
      <Card>
        <form onSubmit={submit} noValidate className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Client name" value={form.name} onChange={set("name")} error={errors.name} autoComplete="off" />
            <Input label="Phone number" type="tel" inputMode="tel" value={form.phone} onChange={set("phone")} error={errors.phone} placeholder="98765 43210" />
            <Input label="Visit date" type="date" value={form.visitDate} onChange={set("visitDate")} error={errors.visitDate} />
            <Input label="Visit time" type="time" value={form.visitTime} onChange={set("visitTime")} error={errors.visitTime} />
          </div>
          <Input label="Property / project (optional)" value={form.property} onChange={set("property")} />
          <Textarea label="Notes (optional)" value={form.notes} onChange={set("notes")} />
          <p className="text-meta text-ink-muted">The registration time is recorded automatically when you submit.</p>
          <Button type="submit" icon={FilePlus2} loading={loading}>Register client</Button>
        </form>
      </Card>
    </>
  );
}
