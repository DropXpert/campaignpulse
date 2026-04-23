"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { CampaignInput } from "@/types/campaign";

const demoPreset: CampaignInput = {
  businessName: "Biryani Box",
  offerDetails: "Weekend combo: biryani + drink for 20% off, valid Friday to Sunday.",
  city: "Bengaluru",
  link: "https://wa.me/919999999999",
  visualStyle: "bold neon street-food premium"
};

const emptyPreset: CampaignInput = {
  businessName: "",
  offerDetails: "",
  city: "",
  link: "",
  visualStyle: ""
};

export function CampaignForm() {
  const router = useRouter();
  const [values, setValues] = useState<CampaignInput>(emptyPreset);
  const [isRouting, setIsRouting] = useState(false);

  function updateField<K extends keyof CampaignInput>(key: K, value: CampaignInput[K]) {
    setValues((current) => ({
      ...current,
      [key]: value
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsRouting(true);

    const params = new URLSearchParams({
      businessName: values.businessName,
      offerDetails: values.offerDetails,
      city: values.city,
      link: values.link,
      visualStyle: values.visualStyle
    });

    router.push(`/results?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="campaign-form">
      <div className="form-grid">
        <div className="field">
          <label htmlFor="businessName">Business name</label>
          <Input
            id="businessName"
            value={values.businessName}
            onChange={(event) => updateField("businessName", event.target.value)}
            placeholder="Business name"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="city">City</label>
          <Input
            id="city"
            value={values.city}
            onChange={(event) => updateField("city", event.target.value)}
            placeholder="City"
            required
          />
        </div>
        <div className="field full-width">
          <label htmlFor="offerDetails">Offer or event details</label>
          <Textarea
            id="offerDetails"
            value={values.offerDetails}
            onChange={(event) => updateField("offerDetails", event.target.value)}
            placeholder="Describe the launch offer, event, or seasonal push"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="link">Website or WhatsApp link</label>
          <Input
            id="link"
            type="url"
            value={values.link}
            onChange={(event) => updateField("link", event.target.value)}
            placeholder="https://wa.me/..."
            required
          />
        </div>
        <div className="field">
          <label htmlFor="visualStyle">Visual style</label>
          <Input
            id="visualStyle"
            value={values.visualStyle}
            onChange={(event) => updateField("visualStyle", event.target.value)}
            placeholder="premium street-food, modern clinic, bold salon"
            required
          />
        </div>
      </div>
      <div className="button-row">
        <Button type="submit" disabled={isRouting}>
          {isRouting ? "Generating..." : "Generate Campaign"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setValues(demoPreset)}
        >
          Use Demo Brief
        </Button>
      </div>
    </form>
  );
}
