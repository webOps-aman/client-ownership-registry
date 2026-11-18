"use client";
/** CheckForm.jsx - Phone lookup. Handles validation, the rate-limit warning with countdown, and both result states. */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Search, Timer } from "lucide-react";
import { checkClient } from "@/store/thunks";
import { useRateLimit } from "@/hooks/useRateLimit";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ClientResultCard from "./ClientResultCard";
import NotRegisteredState from "./NotRegisteredState";

export default function CheckForm() {
  const dispatch = useDispatch();
  const { limit, remaining, secondsLeft, isLimited, startCooldown } = useRateLimit();
  const [form, setForm] = useState({ phone: "", name: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const set = (field) => (e) => { setForm((f) => ({ ...f, [field]: e.target.value })); setError(""); setResult(null); };

  const submit = async (e) => {
    e.preventDefault();
    setResult(null);
    if (!form.phone.trim()) return setError("Enter a phone number.");
    setLoading(true);
    try {
      setResult(await dispatch(checkClient(form.phone)).unwrap());
    } catch (err) {
      if (err.code === "RATE_LIMITED") startCooldown(err.retryAfterSec);
      else setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card>
        <form onSubmit={submit} noValidate className="space-y-4">
          <Input label="Phone number" type="tel" inputMode="tel" value={form.phone} onChange={set("phone")} error={error}
            placeholder="98765 43210" hint="Spaces, dashes and +91 are fine." autoFocus />
          <Input label="Client name (optional)" value={form.name} onChange={set("name")} hint="Only used to prefill the Register form." />

          {isLimited && (
            <p role="status" className="flex items-center gap-2 rounded-item border border-status-orange/40 bg-chip-amber-bg px-4 py-3 text-[15px] text-warning">
              <Timer className="h-5 w-5 shrink-0" aria-hidden />
              You&apos;ve used all {limit} searches for this minute. Try again in {secondsLeft}s.
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4">
            <Button type="submit" icon={Search} loading={loading} disabled={isLimited}>Check client</Button>
            <span className="text-meta text-ink-muted">{remaining} of {limit} searches left this minute</span>
          </div>
        </form>
      </Card>

      {result?.found && <ClientResultCard result={result} />}
      {result && !result.found && <NotRegisteredState phone={result.phone} name={form.name.trim()} />}
    </>
  );
}
