import { X402Checkout } from "@/components/billing/x402-checkout";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const steps = [
  "Generate a campaign board.",
  "Review estimated image, music, video, and search usage.",
  "Use x402 to buy Ace credits with the platform discount.",
  "Run live generation again with the same campaign brief."
];

export default function BillingPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <section className="billing-layout">
        <div className="billing-copy">
          <p className="eyebrow">Payments</p>
          <h1>x402 credit flow</h1>
          <p>
            CampaignPulse keeps generation usage transparent: users can start with
            fallback mode, then move to paid Ace credits only when the campaign is ready.
          </p>
          <ol className="billing-steps">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
        <X402Checkout />
      </section>
      <SiteFooter />
    </main>
  );
}
