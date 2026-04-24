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
      <Link href="/campaign" className="nav-cta">
        New Campaign
      </Link>
    </header>
  );
}
