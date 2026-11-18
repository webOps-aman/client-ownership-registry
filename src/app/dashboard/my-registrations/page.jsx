"use client";
/** my-registrations/page.jsx - The user's own registrations (search + pagination). Never shows other users' records. */
import dynamic from "next/dynamic";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ListSkeleton } from "@/components/ui/Skeleton";

const MyRegistrationsList = dynamic(() => import("@/components/dashboard/MyRegistrationsList"), { loading: () => <ListSkeleton /> });

export default function MyRegistrationsPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader title="My registrations" subtitle="Clients you have registered.">
        <Button href="/dashboard/register" size="sm">Register client</Button>
      </PageHeader>
      <Card><MyRegistrationsList /></Card>
    </div>
  );
}
