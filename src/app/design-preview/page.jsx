/** page.jsx - Design-system preview (Module 1). Open /design-preview to check tokens and base components. */
import { Users, Search, CopyX, Clock, Building2, Plus } from "lucide-react";
import { ENV } from "@/config/env";
import HeroBanner from "@/components/dashboard/HeroBanner";
import StatCard from "@/components/ui/StatCard";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Pill from "@/components/ui/Pill";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import { ListSkeleton } from "@/components/ui/Skeleton";

export default function Preview() {
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });
  return (
    <main className="mx-auto max-w-6xl space-y-gridgap p-4 sm:p-6 lg:p-page">
      <HeroBanner eyebrow={today} title="Good morning," name="Priya" subtitle={`${ENV.appName} design system preview.`}>
        <Pill className="!border-hero-pill-border !bg-hero-pill !text-white" icon={Building2}>{ENV.companyName}</Pill>
      </HeroBanner>

      <div className="grid gap-gridgap sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="My Registrations" value="12" caption="All time" icon={Users} tone="blue" />
        <StatCard label="Searches Today" value="4" caption="6 left this minute" icon={Search} tone="green" />
        <StatCard label="Duplicates Blocked" value="1" caption="Your attempts" icon={CopyX} tone="amber" />
        <StatCard label="Last Registered" value="2h" caption="ago" icon={Clock} tone="blue" />
      </div>

      <div className="grid gap-gridgap lg:grid-cols-2">
        <Card accent="amber">
          <h2 className="text-section-title">Form controls</h2>
          <p className="mb-4 text-section-sub text-ink-muted">Inputs, buttons, pills and badges.</p>
          <div className="space-y-4">
            <Input label="Phone number" placeholder="+91 98765 43210" hint="We match on the last 10 digits." />
            <Input label="Password" type="password" defaultValue="secret" />
            <Select label="Source" options={[{ value: "Broker", label: "Broker" }, { value: "Direct", label: "Direct" }]} />
            <Textarea label="Notes" error="Notes are too long." />
            <div className="flex flex-wrap items-center gap-3">
              <Button icon={Plus}>Register client</Button>
              <Button variant="secondary">Cancel</Button>
              <Button variant="danger" size="sm">Disable</Button>
              <Badge variant="id">#001</Badge>
              <Badge tone="green">Active</Badge>
              <Badge tone="red">Disabled</Badge>
            </div>
          </div>
        </Card>

        <Card accent="blue">
          <h2 className="text-section-title">Loading and empty states</h2>
          <p className="mb-4 text-section-sub text-ink-muted">Skeletons match the real list shape.</p>
          <ListSkeleton rows={3} />
          <EmptyState message="You haven't registered any clients yet." action={<Button size="sm">Register a client</Button>} />
        </Card>
      </div>
    </main>
  );
}
