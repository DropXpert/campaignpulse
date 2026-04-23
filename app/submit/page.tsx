import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";

const checklist = [
  "Deploy the Nexior app build",
  "Publish the Dify workflow",
  "Generate real Ace image, QR, music, and video outputs",
  "Capture the cost story with x402 and $ACE discounts",
  "Post on X tagging @acedatacloud with #BuildWithAce #AceDataCloud",
  "Drop the X post link in Discord campaign submissions"
];

export default function SubmitPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <section className="results-panel">
        <SectionHeader
          eyebrow="Submission"
          title="Contest entry checklist"
          description="Use this page as the final runbook before you publish your entry."
        />
        <div className="status-grid">
          {checklist.map((item, index) => (
            <Card key={item} className="status-card">
              <div className="status-card-head">
                <h4>Step {index + 1}</h4>
              </div>
              <p>{item}</p>
            </Card>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
