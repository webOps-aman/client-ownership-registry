"use client";
/** ResetPasswordModal.jsx - Admin sets a new password for a broker/agent. */
import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { resetBrokerPassword } from "@/store/thunks";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Input from "@/components/ui/Input";

export default function ResetPasswordModal({ user, onClose }) {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const reset = async () => {
    await dispatch(resetBrokerPassword({ userId: user.id, password })).unwrap();
    toast.success("Password reset.");
  };
  return (
    <ConfirmDialog open onClose={onClose} title={`Reset password for ${user.name}`} confirmLabel="Reset password" canConfirm={password.length >= 6} onConfirm={reset}>
      <Input label="New password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" hint="At least 6 characters." />
    </ConfirmDialog>
  );
}
