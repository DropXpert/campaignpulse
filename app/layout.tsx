import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope, Space_Grotesk } from "next/font/google";
import "@/app/globals.css";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body"
});

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display"
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "CampaignPulse",
  description:
    "CampaignPulse is a Local Business Campaign OS for turning a short brief into posters, scannable CTAs, promo media, and launch copy.",
  icons: {
    icon: "/campaignpulse-logo.png",
    shortcut: "/campaignpulse-logo.png",
    apple: "/campaignpulse-logo.png"
  },
  openGraph: {
    title: "CampaignPulse",
    description:
      "Local Business Campaign OS for posters, QR CTAs, promo media, and launch copy.",
    images: [
      {
        url: "/campaignpulse-logo.png",
        width: 1600,
        height: 1600,
        alt: "CampaignPulse"
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>{children}</body>
    </html>
  );
}
