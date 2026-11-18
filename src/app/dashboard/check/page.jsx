/** check/page.jsx - Check Client: search a phone number to see whether it already has an owner. */
import PageHeader from "@/components/ui/PageHeader";
import CheckForm from "@/components/dashboard/CheckForm";

export default function CheckPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Check client" subtitle="Search by phone number before you register someone." />
      <CheckForm />
    </div>
  );
}
