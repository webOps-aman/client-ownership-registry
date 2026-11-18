"use client";
/** AuthGuard.jsx - Shows a skeleton until the session is restored, then sends logged-out users to /login. */
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { PageSkeleton } from "@/components/ui/Skeleton";

export default function AuthGuard({ children }) {
  const { hydrated, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !isAuthenticated) router.replace("/login");
  }, [hydrated, isAuthenticated, router]);

  if (!hydrated || !isAuthenticated) {
    return <div className="p-4 sm:p-6 lg:p-page"><PageSkeleton /></div>;
  }
  return children;
}
