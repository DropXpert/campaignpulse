import Link from "next/link";
import { Card } from "@/components/ui/card";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const workflow = [
  {
    step: "01",
    title: "Brief",
    text: "Business, offer, city, link, and style."
  },
  {
    step: "02",
    title: "Plan",
    text: "Strategy, copy, prompts, and CTA."
  },
  {
    step: "03",
    title: "Create",
    text: "Posters, QR, audio, video, and cost card."
  },
  {
    step: "04",
    title: "Launch",
    text: "One clean board for sharing and submission."
  }
];

const useCases = [
  "Restaurant weekend offers",
  "Salon launch promos",
  "Gym membership pushes",
  "Clinic awareness campaigns",
  "Retail store openings",
  "Local event promotions"
];

const stack = [
  "Ace GPT planning",
  "Dify workflow",
  "Ace media adapters",
  "x402 credit path"
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <SiteHeader />

      <section className="landing-hero">
        <div className="landing-hero-copy">
          <p className="eyebrow">Local Business Campaign OS</p>
          <h1>Build a complete local campaign in minutes.</h1>
          <p className="hero-text">
            CampaignPulse turns one offer into a launch board with posters, QR conversion, captions,
            audio direction, video direction, and cost context.
          </p>
          <div className="hero-actions">
            <Link href="/campaign" className="button button-primary">
              Create Campaign
            </Link>
            <Link href="/billing" className="button button-secondary">
              x402 Flow
            </Link>
          </div>
        </div>

        <Card className="hero-board">
          <div className="campaign-device">
            <div className="device-bar">
              <span />
              <span />
              <span />
            </div>
            <div className="campaign-card-mini">
              <div>
                <p>Campaign Preview</p>
                <h2>Local Launch</h2>
              </div>
              <span>Ready</span>
            </div>
            <div className="asset-strip">
              <span />
              <span />
              <span />
            </div>
            <div className="qr-preview">
              <div className="qr-grid" aria-hidden="true">
                {Array.from({ length: 25 }).map((_, index) => (
                  <span key={index} />
                ))}
              </div>
              <p>Scan to order</p>
            </div>
          </div>
        </Card>
      </section>

      <section id="product" className="landing-section">
        <div className="section-kicker">
          <p className="eyebrow">Product</p>
          <h2>One brief. One board.</h2>
        </div>
        <div className="product-grid">
          <div className="product-card product-card-large">
            <span className="card-index">01</span>
            <h3>Structured intake</h3>
            <p>Offer, location, link, and style become a clean launch package.</p>
          </div>
          <div className="product-card">
            <span className="card-index">02</span>
            <h3>Conversion path</h3>
            <p>Each campaign includes a scannable QR destination.</p>
          </div>
          <div className="product-card">
            <span className="card-index">03</span>
            <h3>Media-ready</h3>
            <p>Prepared for image, audio, video, and search outputs.</p>
          </div>
        </div>
      </section>

      <section className="landing-section stack-strip" aria-label="CampaignPulse stack">
        {stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </section>

      <section id="workflow" className="landing-section">
        <div className="section-kicker">
          <p className="eyebrow">Workflow</p>
          <h2>From brief to board.</h2>
        </div>
        <div className="workflow-grid">
          {workflow.map((item) => (
            <div key={item.step} className="workflow-card">
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-section split-section">
        <div className="use-case-panel">
          <p className="eyebrow">Use Cases</p>
          <h2>Built for fast local demand.</h2>
          <div className="use-case-list">
            {useCases.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <div className="cta-panel">
          <p className="eyebrow">Start</p>
          <h2>Create a campaign pack.</h2>
          <p>Open the builder and generate a clean board for your final recording.</p>
          <Link href="/campaign" className="button button-primary">
            Open Campaign Builder
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
