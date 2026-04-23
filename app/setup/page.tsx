import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ProviderStatusGrid } from "@/components/setup/provider-status-grid";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { getEnvironmentSummary, getSetupSteps } from "@/lib/setup/status";

export default function SetupPage() {
  const summary = getEnvironmentSummary();
  const steps = getSetupSteps();

  return (
    <main className="page-shell">
      <SiteHeader />
      <section className="results-panel">
        <SectionHeader
          eyebrow="Contest Setup"
          title="What you still need from Ace, Dify, and x402"
          description="This page turns the integration checklist into something explicit so you can move from mock demo to a real contest submission."
        />

        <div className="results-meta">
          <div>
            <strong>Mock Mode</strong>
            <p>{summary.mockMode ? "Enabled" : "Disabled"}</p>
          </div>
          <div>
            <strong>Ace API</strong>
            <p>{summary.aceReady ? "Configured" : "Missing"}</p>
          </div>
          <div>
            <strong>Dify</strong>
            <p>{summary.difyReady ? "Configured" : "Missing"}</p>
          </div>
          <div>
            <strong>x402</strong>
            <p>{summary.x402Ready ? "Configured" : "Missing"}</p>
          </div>
        </div>

        <ProviderStatusGrid steps={steps} />

        <div className="results-grid">
          <Card className="media-card">
            <h4>Where to get Ace API access</h4>
            <p>
              Go to the relevant Ace product page in the platform, click <strong>Acquire</strong>,
              then put the returned credential into `.env.local`.
            </p>
            <div className="prompt-list">
              <div className="prompt-item">
                <strong>Platform</strong>
                <p>https://platform.acedata.cloud</p>
              </div>
              <div className="prompt-item">
                <strong>Docs</strong>
                <p>https://docs.acedata.cloud/en</p>
              </div>
              <div className="prompt-item">
                <strong>Hub</strong>
                <p>https://hub.acedata.cloud</p>
              </div>
            </div>
          </Card>

          <Card className="media-card">
            <h4>Dify workflow handoff</h4>
            <p>
              The repo already expects the Dify workflow to receive five inputs and return a
              normalized campaign payload. The conversion point lives in `lib/campaign/service.ts`.
            </p>
            <div className="prompt-list">
              <div className="prompt-item">
                <strong>Workflow inputs</strong>
                <p>business_name, offer_details, city, link, visual_style</p>
              </div>
              <div className="prompt-item">
                <strong>Workflow spec</strong>
                <p>docs/dify-workflow.md</p>
              </div>
            </div>
          </Card>

          <Card className="media-card full-width">
            <h4>x402 payment path</h4>
            <p>
              Ace&apos;s x402 docs show a 402 bootstrap request followed by a signed retry using
              `X-PAYMENT`. This repo now includes `lib/x402/client.ts` as the starting point for
              the official `x402-js` flow.
            </p>
          </Card>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
