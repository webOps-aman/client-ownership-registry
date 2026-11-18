"use client";
/**
 * ConfirmDialog.jsx - Confirmation dialog. With reasonRequired the Confirm button stays disabled until a reason is typed.
 * `children` holds extra fields (kept in the parent's state); `canConfirm` gates the button.
 * onConfirm(reason) may be async; if it throws, the error message is shown in the dialog.
 */
import { useState } from "react";
import Modal from "./Modal";
import Textarea from "./Textarea";
import Button from "./Button";

export default function ConfirmDialog({ open, title, message, confirmLabel = "Confirm", tone = "primary", reasonRequired = false, canConfirm = true, size = "sm", onConfirm, onClose, children }) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setBusy(true); setError("");
    try {
      await onConfirm(reason.trim());
      onClose();
    } catch (e) {
      setError(e.message || "Something went wrong.");
      setBusy(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={title} size={size}>
      {message && <p className="mb-4 text-[15px] text-ink-muted">{message}</p>}
      <div className="space-y-4">
        {children}
        {reasonRequired && <Textarea label="Reason (required)" value={reason} onChange={(e) => setReason(e.target.value)} hint="Saved in the audit log." />}
      </div>
      {error && <p role="alert" className="mt-3 text-meta text-status-red">{error}</p>}
      <div className="mt-5 flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant={tone === "danger" ? "danger" : "primary"} loading={busy} disabled={!canConfirm || (reasonRequired && !reason.trim())} onClick={submit}>{confirmLabel}</Button>
      </div>
    </Modal>
  );
}
