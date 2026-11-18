/** NotRegisteredState.jsx - Check result when the phone is NOT registered, with a button that prefills the Register form. */
import { CircleCheck } from "lucide-react";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import { formatPhone } from "@/utils/phone";

export default function NotRegisteredState({ phone, name }) {
  const qs = new URLSearchParams({ phone, ...(name ? { name } : {}) }).toString();
  return (
    <Card accent="green" className="mt-6">
      <EmptyState icon={CircleCheck} message={`${formatPhone(phone)} is not registered yet.`}
        action={<Button href={`/dashboard/register?${qs}`}>Register this client</Button>} />
    </Card>
  );
}
