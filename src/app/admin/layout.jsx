/** admin/layout.jsx - Admin-only area. Own route segment, so it is code-split from the broker dashboard. */
import AuthGuard from "@/components/guards/AuthGuard";
import RoleGuard from "@/components/guards/RoleGuard";
import PageShell from "@/components/layout/PageShell";

export default function AdminLayout({ children }) {
  return (
    <AuthGuard>
      <RoleGuard allow={["admin"]}><PageShell>{children}</PageShell></RoleGuard>
    </AuthGuard>
  );
}
