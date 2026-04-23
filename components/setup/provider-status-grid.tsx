import { Card } from "@/components/ui/card";
import { StatusPill } from "@/components/ui/status-pill";
import type { SetupStep } from "@/lib/setup/status";

interface ProviderStatusGridProps {
  steps: SetupStep[];
}

export function ProviderStatusGrid({ steps }: ProviderStatusGridProps) {
  return (
    <div className="status-grid">
      {steps.map((step) => (
        <Card key={step.id} className="status-card">
          <div className="status-card-head">
            <h4>{step.title}</h4>
            <StatusPill status={step.status} />
          </div>
          <p>{step.detail}</p>
          <a
            href={step.actionUrl}
            target="_blank"
            rel="noreferrer"
            className="button button-secondary"
          >
            {step.actionLabel}
          </a>
        </Card>
      ))}
    </div>
  );
}
