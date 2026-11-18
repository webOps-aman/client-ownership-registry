"use client";
/** RoleGuard.jsx - Renders children only for allowed roles; others go to their own home with a toast. Use inside AuthGuard. */
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";

export default function RoleGuard({ allow, children }) {
  const { role, homePath } = useAuth();
  const router = useRouter();
  const allowed = allow.includes(role);

  useEffect(() => {
    if (role && !allowed) {
      toast.error("You don't have access to that page.", { id: "no-access" });
      router.replace(homePath);
    }
  }, [role, allowed, homePath, router]);

  return allowed ? children : null;
}
