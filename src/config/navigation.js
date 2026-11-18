/** navigation.js - Sidebar menu per area (MAIN / MANAGEMENT / SYSTEM). */
import {
  LayoutDashboard, Search, FilePlus2, FolderOpen, Users, UserCog,
  CopyX, ScanSearch, Scale, ScrollText, Settings,
} from "lucide-react";

const dashboardNav = [
  {
    section: "MAIN",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/dashboard/check", label: "Check Client", icon: Search },
      { href: "/dashboard/register", label: "Register Client", icon: FilePlus2 },
      { href: "/dashboard/my-registrations", label: "My Registrations", icon: FolderOpen },
    ],
  },
];

const adminNav = [
  {
    section: "MAIN",
    items: [
      { href: "/admin", label: "Overview", icon: LayoutDashboard },
      { href: "/admin/clients", label: "Clients", icon: Users },
    ],
  },
  {
    section: "MANAGEMENT",
    items: [
      { href: "/admin/brokers", label: "Brokers", icon: UserCog },
      { href: "/admin/disputes", label: "Disputes", icon: Scale },
      { href: "/admin/attempts", label: "Duplicate Attempts", icon: CopyX },
      { href: "/admin/searches", label: "Search Log", icon: ScanSearch },
    ],
  },
  {
    section: "SYSTEM",
    items: [
      { href: "/admin/audit", label: "Audit Log", icon: ScrollText },
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

export const getNavForRole = (role) => (role === "admin" ? adminNav : dashboardNav);

/** Where each role lands after login. */
export const homeForRole = (role) => (role === "admin" ? "/admin" : "/dashboard");
/** Page title for a path (used by the breadcrumb). */
export const labelForPath = (role, path) =>
  getNavForRole(role).flatMap((s) => s.items).find((i) => i.href === path)?.label ?? "";
