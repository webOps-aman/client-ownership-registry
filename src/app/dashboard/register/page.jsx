/** register/page.jsx - Register Client. Suspense is required because the form reads the URL (?phone=). */
import { Suspense } from "react";
import PageHeader from "@/components/ui/PageHeader";
import RegisterForm from "@/components/dashboard/RegisterForm";
import { CardSkeleton } from "@/components/ui/Skeleton";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Register client" subtitle="The first valid registration owns the client." />
      <Suspense fallback={<CardSkeleton lines={5} />}><RegisterForm /></Suspense>
    </div>
  );
}
