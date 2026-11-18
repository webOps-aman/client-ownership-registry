/** admin/settings/page.jsx - Placeholder integrations and the demo-data reset. */
import PageHeader from "@/components/ui/PageHeader";
import IntegrationCard from "@/components/admin/settings/IntegrationCard";
import ResetDemoCard from "@/components/admin/settings/ResetDemoCard";

export default function SettingsPage() {
  return (
    <div>
      <PageHeader title="Settings" subtitle="Integrations and demo tools." />
      <div className="grid gap-gridgap md:grid-cols-2">
        <IntegrationCard name="GoHighLevel" description="Sync registered clients with your GoHighLevel CRM. Planned for after the backend is added." />
        <ResetDemoCard />
      </div>
    </div>
  );
}
