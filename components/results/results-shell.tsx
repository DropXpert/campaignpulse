"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CostCard } from "@/components/results/cost-card";
import { ResultMediaCard } from "@/components/results/result-media-card";
import { SectionHeader } from "@/components/ui/section-header";
import type { CampaignInput, CampaignResult } from "@/types/campaign";

type LoadState =
  | { status: "idle" | "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; data: CampaignResult };

function readInput(params: URLSearchParams): CampaignInput | null {
  const businessName = params.get("businessName");
  const offerDetails = params.get("offerDetails");
  const city = params.get("city");
  const link = params.get("link");
  const visualStyle = params.get("visualStyle");

  if (!businessName || !offerDetails || !city || !link || !visualStyle) {
    return null;
  }

  return {
    businessName,
    offerDetails,
    city,
    link,
    visualStyle
  };
}

export function ResultsShell() {
  const searchParams = useSearchParams();
  const [state, setState] = useState<LoadState>({ status: "idle" });

  useEffect(() => {
    const input = readInput(searchParams);

    if (!input) {
      return;
    }

    let isActive = true;

    async function runCampaign() {
      setState({ status: "loading" });

      try {
        const response = await fetch("/api/campaign", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(input)
        });

        if (!response.ok) {
          const error = (await response.json()) as { message?: string };
          throw new Error(error.message || "Campaign request failed.");
        }

        const result = (await response.json()) as CampaignResult;

        if (isActive) {
          setState({ status: "ready", data: result });
        }
      } catch (error) {
        if (isActive) {
          setState({
            status: "error",
            message: error instanceof Error ? error.message : "Campaign request failed."
          });
        }
      }
    }

    void runCampaign();

    return () => {
      isActive = false;
    };
  }, [searchParams]);

  const input = readInput(searchParams);

  if (!input) {
    return (
      <section className="empty-state minimal-state">
        <SectionHeader
          eyebrow="No campaign"
          title="Create a campaign first"
          description="Add a business, offer, city, link, and visual direction."
        />
        <Link href="/campaign" className="button button-primary">
          New Campaign
        </Link>
      </section>
    );
  }

  if (state.status === "idle" || state.status === "loading") {
    return (
      <section className="results-panel loading-state minimal-state">
        <div>
          <div className="spinner" aria-hidden="true" />
          <h2>Building campaign board</h2>
          <p>Preparing copy, QR, media, and launch economics.</p>
        </div>
      </section>
    );
  }

  if (state.status === "error") {
    return (
      <section className="empty-state minimal-state">
        <SectionHeader
          eyebrow="Error"
          title="Campaign failed"
          description={state.message}
        />
        <Link href="/campaign" className="button button-primary">
          Try Again
        </Link>
      </section>
    );
  }

  if (state.status !== "ready") {
    return null;
  }

  const data = state.data;

  return (
    <section className="results-panel campaign-report">
      <header className="report-hero">
        <p className="eyebrow">Campaign Board</p>
        <h1>{data.input.businessName}</h1>
        <p>{data.input.offerDetails}</p>
        <div className="report-actions">
          <Link href="/campaign" className="button button-primary">
            New Campaign
          </Link>
          <Link
            href={data.input.link}
            className="button button-secondary"
            target="_blank"
            rel="noreferrer"
          >
            Open Link
          </Link>
        </div>
      </header>

      <div className="report-meta">
        <span>{data.input.city}</span>
        <span>{data.input.visualStyle}</span>
        <span>{data.output.cta}</span>
      </div>

      <section className="report-section">
        <div className="report-section-head">
          <p className="eyebrow">Creative</p>
          <h2>Launch posters</h2>
        </div>
        <div className="poster-grid report-poster-grid">
          {data.output.images.map((image) => (
            <figure key={image.id} className="poster-card report-poster">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.imageUrl} alt={image.title} className="media-preview poster-preview" />
              <figcaption>
                <strong>{image.title}</strong>
                <p>{image.prompt}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="report-section">
        <div className="report-section-head">
          <p className="eyebrow">Media</p>
          <h2>QR, audio, and reel</h2>
        </div>
        <div className="report-media-grid">
          <ResultMediaCard
            title="QR"
            description="Scan path"
            imageUrl={data.output.qrCode.imageUrl}
            prompt={data.output.qrCode.prompt}
          />
          <ResultMediaCard
            title={data.output.music.title}
            description="Audio direction"
            imageUrl={data.output.music.previewImageUrl}
            prompt={data.output.music.prompt}
            mediaUrl={data.output.music.url}
            mediaType="audio"
          />
          <ResultMediaCard
            title={data.output.video.title}
            description={data.output.video.storyboard.join(" / ")}
            imageUrl={data.output.video.previewImageUrl}
            prompt={data.output.video.prompt}
            mediaUrl={data.output.video.url}
            mediaType="video"
          />
        </div>
      </section>

      <section className="report-section report-copy-section">
        <div>
          <p className="eyebrow">Copy</p>
          <h2>Offer messaging</h2>
          <div className="report-copy-list">
            {data.output.captions.map((caption) => (
              <p key={caption}>{caption}</p>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow">Publish</p>
          <h2>Launch post</h2>
          <div className="report-copy-list">
            <p>{data.output.publisherDraft.xPost}</p>
            <p>{data.output.publisherDraft.hashtags.join(" ")}</p>
          </div>
        </div>
      </section>

      <section className="report-section proof-section">
        <div className="report-section-head">
          <p className="eyebrow">Build Proof</p>
          <h2>Ace + Dify stack</h2>
        </div>
        <div className="proof-grid">
          {Object.entries(data.output.integrationProof).map(([key, value]) => (
            <div key={key} className="proof-item">
              <span>{key.replace(/([A-Z])/g, " $1")}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </section>

      <CostCard costs={data.output.costBreakdown} />
    </section>
  );
}
