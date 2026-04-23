import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand-lockup">
        <Image
          src="/campaignpulse-wordmark.png"
          alt="CampaignPulse"
          className="brand-logo brand-logo-image"
          width={820}
          height={220}
          priority
        />
        <span className="brand-text-lockup">
          <strong>CampaignPulse</strong>
          <small>Local Business Campaign OS</small>
        </span>
      </Link>
      <nav className="nav-links" aria-label="Primary">
        <Link href="/#product">Platform</Link>
        <Link href="/#workflow">Process</Link>
        <Link href="/campaign" className="nav-cta">
          New Campaign
        </Link>
      </nav>
    </header>
  );
}
