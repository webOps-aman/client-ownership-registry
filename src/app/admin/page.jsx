"use client";
/** admin/page.jsx - Admin overview: hero, 4 stat cards, recent registrations and recent activity. */
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Users, UserCog, CopyX, Scale } from "lucide-react";
import { selectAdminStats } from "@/store/selectors";
import { useAuth } from "@/hooks/useAuth";
import { greeting } from "@/utils/date";
import HeroBanner from "@/components/dashboard/HeroBanner";
import StatCard from "@/components/ui/StatCard";
import Card from "@/components/ui/Card";
import { ListSkeleton } from "@/components/ui/Skeleton";

const RecentRegistrations = dynamic(() => import("@/components/admin/overview/RecentRegistrations"), { loading: () => <ListSkeleton rows={4} /> });
const RecentActivity = dynamic(() => import("@/components/admin/overview/RecentActivity"), { loading: () => <ListSkeleton rows={4} /> });

export default function AdminHome() {
  const { user } = useAuth();
  const stats = useSelector(selectAdminStats);
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="space-y-gridgap">
      <HeroBanner eyebrow={today} title={`${greeting()},`} name={user.name} subtitle="Every registration, search and override in one place." />

      <div className="grid gap-gridgap sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Clients" value={stats.totalClients} caption="Registered so far" icon={Users} tone="blue" />
        <StatCard label="Active Brokers" value={stats.activeBrokers} caption="Can sign in" icon={UserCog} tone="green" />
        <StatCard label="Duplicate Attempts" value={stats.duplicateAttempts} caption="Blocked registrations" icon={CopyX} tone="amber" />
        <StatCard label="Open Disputes" value={stats.openDisputes} caption="Waiting for a decision" icon={Scale} tone="blue" />
      </div>

      <div className="grid gap-gridgap lg:grid-cols-2">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <div><h2 className="text-section-title">Recent registrations</h2><p className="text-section-sub text-ink-muted">Newest first.</p></div>
            <Link href="/admin/clients" className="text-[15px] font-semibold underline">View all</Link>
          </div>
          <RecentRegistrations />
        </Card>
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <div><h2 className="text-section-title">Recent activity</h2><p className="text-section-sub text-ink-muted">From the audit log.</p></div>
            <Link href="/admin/audit" className="text-[15px] font-semibold underline">Audit log</Link>
          </div>
          <RecentActivity />
        </Card>
      </div>
    </div>
  );
}
