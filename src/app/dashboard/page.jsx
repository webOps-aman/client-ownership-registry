"use client";
/** dashboard/page.jsx - Agent/Broker home: hero, own stats, the two main actions, and a preview of own registrations. */
import Link from "next/link";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { Search, FilePlus2, Users, ScanSearch, CopyX, Clock } from "lucide-react";
import { selectMyStats } from "@/store/selectors";
import { useAuth } from "@/hooks/useAuth";
import { ENV } from "@/config/env";
import { greeting, formatDate, timeAgo } from "@/utils/date";
import HeroBanner from "@/components/dashboard/HeroBanner";
import ActionCard from "@/components/dashboard/ActionCard";
import StatCard from "@/components/ui/StatCard";
import Card from "@/components/ui/Card";
import { ListSkeleton } from "@/components/ui/Skeleton";

const MyRegistrationsList = dynamic(() => import("@/components/dashboard/MyRegistrationsList"), { loading: () => <ListSkeleton rows={3} /> });

export default function DashboardHome() {
  const { user } = useAuth();
  const stats = useSelector(selectMyStats);
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="space-y-gridgap">
      <HeroBanner eyebrow={today} title={`${greeting()},`} name={user.name}
        subtitle="Check a client before you register. The first valid registration owns the client." />

      <div className="grid gap-gridgap sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="My Registrations" value={stats.registrations} caption="All time" icon={Users} tone="blue" />
        <StatCard label="Searches Today" value={stats.searchesToday} caption={`Limit ${ENV.searchLimitPerMin} per minute`} icon={ScanSearch} tone="green" />
        <StatCard label="Duplicates Blocked" value={stats.duplicatesBlocked} caption="Your attempts" icon={CopyX} tone="amber" />
        <StatCard label="Last Registered" value={stats.lastRegistered ? timeAgo(stats.lastRegistered) : "-"}
          caption={stats.lastRegistered ? formatDate(stats.lastRegistered) : "No registrations yet"} icon={Clock} tone="blue" />
      </div>

      <div className="grid gap-gridgap md:grid-cols-2">
        <ActionCard href="/dashboard/check" icon={Search} tone="blue" title="Check client" description="See whether a phone number already has an owner." />
        <ActionCard href="/dashboard/register" icon={FilePlus2} tone="amber" title="Register client" description="Record a new client and get a timestamped proof." />
      </div>

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-section-title">My registrations</h2>
            <p className="text-section-sub text-ink-muted">Your latest clients.</p>
          </div>
          <Link href="/dashboard/my-registrations" className="text-[15px] font-semibold underline">View all</Link>
        </div>
        <MyRegistrationsList compact />
      </Card>
    </div>
  );
}
