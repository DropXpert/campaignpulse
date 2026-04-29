import { CampaignForm } from "@/components/forms/campaign-form";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";

const generatedOutputs = [
  "Campaign strategy",
  "Poster prompts",
  "Scannable QR",
  "Launch copy",
  "Audio direction",
  "Video storyboard"
];

const userFlow = [
  "Enter the offer",
  "Generate the board",
  "Pay for credits if needed",
  "Publish the campaign"
];

export default function CampaignPage() {
  return (
    <main className="page-shell">
      <SiteHeader />

      <section className="builder-layout">
        <div className="builder-intro">
          <p className="eyebrow">Campaign Builder</p>
          <h1>Create a launch-ready local campaign.</h1>
          <p>
            Add the business context once. CampaignPulse will route it into a structured campaign
            board with QR conversion, creative prompts, launch copy, media slots, and cost context.
          </p>
          <div className="builder-note-grid">
            {userFlow.map((item, index) => (
              <div key={item} className="flow-step">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </div>

        <Card className="builder-form-panel">
          <SectionHeader
            eyebrow="Launch Intake"
            title="Campaign brief"
            description="Fill this once. The result page becomes your final campaign board."
          />
          <CampaignForm />
          <div className="builder-output-strip">
            {generatedOutputs.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="builder-payment-link">
            <span>Need live credits?</span>
            <a href="/billing">Check x402 payment path</a>
          </div>
        </Card>
      </section>

      <SiteFooter />
    </main>
  );
}
