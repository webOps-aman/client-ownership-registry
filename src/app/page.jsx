"use client";
/** page.jsx ("/") - Redirects by session: logged out -> /login, admin -> /admin, agent/broker -> /dashboard. */
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { PageSkeleton } from "@/components/ui/Skeleton";

export default function Home() {
  const { hydrated, homePath } = useAuth();
  const router = useRouter();
  useEffect(() => { if (hydrated) router.replace(homePath); }, [hydrated, homePath, router]);
  return <div className="p-4 sm:p-6 lg:p-page"><PageSkeleton /></div>;
}
