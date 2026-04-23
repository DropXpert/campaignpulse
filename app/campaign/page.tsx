import { CampaignForm } from "@/components/forms/campaign-form";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";

const builderNotes = [
  {
    title: "Use a real offer",
    text: "Specific offers produce stronger posters, captions, and video direction."
  },
  {
    title: "Use a real destination",
    text: "The QR output points to this link, so use WhatsApp, booking, checkout, or a landing page."
  },
  {
    title: "Keep the style sharp",
    text: "Use words like premium, neon, editorial, clinical, luxury, playful, or street-style."
  }
];

const generatedOutputs = [
  "Campaign strategy",
  "Poster prompts",
  "Scannable QR",
  "Launch copy",
  "Audio direction",
  "Video storyboard"
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
            {builderNotes.map((item) => (
              <Card key={item.title} className="builder-note-card">
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </Card>
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
        </Card>
      </section>

      <SiteFooter />
    </main>
  );
}
