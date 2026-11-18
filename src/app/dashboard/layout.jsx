/** dashboard/layout.jsx - Agent + Broker area. Own route segment, so admin code is never downloaded here. */
import AuthGuard from "@/components/guards/AuthGuard";
import RoleGuard from "@/components/guards/RoleGuard";
import PageShell from "@/components/layout/PageShell";

export default function DashboardLayout({ children }) {
  return (
    <AuthGuard>
      <RoleGuard allow={["agent", "broker"]}><PageShell>{children}</PageShell></RoleGuard>
    </AuthGuard>
  );
}
