import type {
  CampaignBrief,
  CampaignInput,
  CampaignPrompts,
  CampaignPublisherDraft
} from "@/types/campaign";

export interface MockWorkflowOutput {
  brief: CampaignBrief;
  prompts: CampaignPrompts;
  captions: string[];
  cta: string;
  publisherDraft: CampaignPublisherDraft;
}

export function buildMockWorkflowOutput(input: CampaignInput): MockWorkflowOutput {
  const keywords = [
    input.businessName,
    input.city,
    "local buzz",
    "walk-in offer",
    input.visualStyle
  ];

  return {
    brief: {
      targetAudience: `Local buyers in ${input.city} looking for quick, high-trust offers`,
      campaignTheme: `${input.visualStyle} neighborhood launch push`,
      tone: "confident, polished, and conversion-focused",
      keywords,
      competitorAngles: [
        "generic discount-first flyer",
        "overcrowded social feed creatives",
        "low-personality local listings"
      ]
    },
    prompts: {
      imagePrompts: [
        `Poster 1 for ${input.businessName}, highlight ${input.offerDetails}, premium ${input.visualStyle} direction, city emphasis on ${input.city}`,
        `Poster 2 for ${input.businessName}, emotionally warm community appeal, showcase ${input.offerDetails}, ${input.visualStyle} visual cues`,
        `Poster 3 for ${input.businessName}, minimal branded composition, crisp typography, QR-ready offer panel, ${input.visualStyle} aesthetic`
      ],
      qrPrompt: `Artistic QR for ${input.businessName} with ${input.visualStyle} styling and a clear scan target for ${input.link}`,
      musicPrompt: `15-second promo jingle for ${input.businessName}, upbeat local-business energy, reference ${input.offerDetails}`,
      videoPrompt: `20-second vertical ad for ${input.businessName} in ${input.city}, featuring ${input.offerDetails}, fast cuts, social CTA ending`
    },
    captions: [
      `${input.city}, your next favorite offer just landed. ${input.offerDetails}`,
      `Fresh campaign drop for ${input.businessName}. Scan, tap, and convert in one flow.`,
      `${input.visualStyle} visuals, local-first message, and a CTA that pushes walk-ins fast.`
    ],
    cta: `Scan the QR, claim the offer, and message ${input.businessName} today.`,
    publisherDraft: {
      xPost: `${input.businessName} just launched a sharper local campaign in ${input.city}. ${input.offerDetails}`,
      hashtags: ["#BuildWithAce", "#AceDataCloud", "#LocalMarketing"],
      launchCaption: `Campaign pack ready for ${input.businessName}. Posters, QR, music, and promo video built around ${input.offerDetails}.`
    }
  };
}
