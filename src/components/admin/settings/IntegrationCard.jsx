/** IntegrationCard.jsx - Placeholder card for a future integration (nothing is built yet). */
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function IntegrationCard({ name, description }) {
  return (
    <Card accent="blue">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-section-title">{name}</h2>
        <Badge tone="orange">Coming soon</Badge>
      </div>
      <p className="mb-5 mt-2 text-section-sub text-ink-muted">{description}</p>
      <Button variant="secondary" disabled>Connect</Button>
    </Card>
  );
}
