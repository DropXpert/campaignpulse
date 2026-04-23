import { buildCostBreakdown } from "@/lib/campaign/costs";
import { generateMockAceAssets } from "@/lib/ace/mock";
import type {
  CampaignBrief,
  CampaignInput,
  CampaignPrompts,
  CampaignPublisherDraft,
  CampaignResult
} from "@/types/campaign";

interface DifyWorkflowData {
  id?: string;
  workflow_id?: string;
  status?: string;
  outputs?: Record<string, unknown>;
}

export interface DifyWorkflowResponse {
  workflow_run_id?: string;
  data?: DifyWorkflowData;
}

function stripCodeFence(value: string) {
  const trimmed = value.trim();

  if (!trimmed.startsWith("```")) {
    return trimmed;
  }

  return trimmed.replace(/^```[a-zA-Z]*\s*/, "").replace(/\s*```$/, "");
}

function parseUnknownJson(value: unknown): Record<string, unknown> {
  if (typeof value === "string") {
    const cleaned = stripCodeFence(value);
    return JSON.parse(cleaned) as Record<string, unknown>;
  }

  if (value && typeof value === "object") {
    return value as Record<string, unknown>;
  }

  throw new Error("Dify output is not valid JSON.");
}

function readString(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function readStringArray(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const items = value
    .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    .map((item) => item.trim());

  return items.length > 0 ? items : fallback;
}

function readImagePrompts(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const prompts = value
    .map((item) => {
      if (typeof item === "string" && item.trim()) {
        return item.trim();
      }

      if (item && typeof item === "object") {
        const record = item as Record<string, unknown>;
        const parts = [
          readString(record.subject, ""),
          readString(record.composition, ""),
          readString(record.typography_direction, ""),
          readString(record.lighting_mood, ""),
          readString(record.color_direction, ""),
          readString(record.marketing_intent, "")
        ].filter(Boolean);

        if (parts.length > 0) {
          return parts.join(" | ");
        }
      }

      return "";
    })
    .filter(Boolean);

  return prompts.length > 0 ? prompts : fallback;
}

function normalizeBrief(input: CampaignInput, raw: Record<string, unknown>): CampaignBrief {
  return {
    targetAudience: readString(
      raw.target_audience,
      `Local buyers in ${input.city} looking for a fast, high-conversion offer`
    ),
    campaignTheme: readString(
      raw.campaign_theme,
      `${input.visualStyle} launch campaign for ${input.businessName}`
    ),
    tone: readString(raw.tone, "clear, local, and conversion-focused"),
    keywords: readStringArray(raw.keywords, [
      input.businessName,
      input.city,
      input.visualStyle,
      "local marketing",
      "campaign",
      "offer"
    ]),
    competitorAngles: readStringArray(raw.competitor_angles, [])
  };
}

function normalizePrompts(input: CampaignInput, raw: Record<string, unknown>): CampaignPrompts {
  const imagePrompts = readImagePrompts(raw.image_prompts, [
    `Offer-focused poster for ${input.businessName} highlighting ${input.offerDetails}`,
    `Community-focused poster for ${input.businessName} in ${input.city}`,
    `Minimal branded poster for ${input.businessName} with strong CTA typography`
  ]);

  return {
    imagePrompts,
    qrPrompt: readString(
      raw.qr_prompt,
      `Scannable order QR for ${input.businessName} linking to ${input.link}`
    ),
    musicPrompt: readString(
      raw.music_prompt,
      `Short promo jingle for ${input.businessName} and ${input.offerDetails}`
    ),
    videoPrompt: readString(
      raw.video_prompt,
      `Short vertical ad for ${input.businessName} in ${input.city}`
    )
  };
}

function normalizePublisher(
  input: CampaignInput,
  raw: Record<string, unknown>,
  cta: string
): CampaignPublisherDraft {
  return {
    xPost: readString(
      raw.x_post,
      `${input.businessName} campaign launched for ${input.city}. ${cta}`
    ),
    hashtags: readStringArray(raw.hashtags, [
      "#BuildWithAce",
      "#AceDataCloud",
      "#LocalMarketing"
    ]),
    launchCaption: readString(
      raw.launch_caption,
      `Campaign pack ready for ${input.businessName} using Dify orchestration and Ace-ready assets.`
    )
  };
}

export interface NormalizedDifyWorkflowOutput {
  brief: CampaignBrief;
  prompts: CampaignPrompts;
  captions: string[];
  cta: string;
  publisherDraft: CampaignPublisherDraft;
}

export function normalizeDifyWorkflowOutput(
  input: CampaignInput,
  response: DifyWorkflowResponse
): NormalizedDifyWorkflowOutput {
  const outputs = response.data?.outputs;

  if (!outputs) {
    throw new Error("Dify workflow completed without outputs.");
  }

  const briefJson = parseUnknownJson(outputs.brief);
  const promptsJson = parseUnknownJson(outputs.prompts);
  const publisherJson = parseUnknownJson(outputs.publisher);

  const brief = normalizeBrief(input, briefJson);
  const prompts = normalizePrompts(input, promptsJson);
  const captions = readStringArray(promptsJson.captions, [
    `${input.businessName} is live in ${input.city}.`,
    `${input.offerDetails}`,
    `Order now via ${input.link}`
  ]);
  const cta = readString(
    promptsJson.cta,
    `Order now from ${input.businessName} via ${input.link}`
  );

  return {
    brief,
    prompts,
    captions,
    cta,
    publisherDraft: normalizePublisher(input, publisherJson, cta)
  };
}

export function mapDifyWorkflowToCampaignResult(
  input: CampaignInput,
  response: DifyWorkflowResponse
): CampaignResult {
  const normalized = normalizeDifyWorkflowOutput(input, response);
  const assets = generateMockAceAssets(input, normalized.prompts);

  return {
    campaignId: response.workflow_run_id || `${Date.now()}`,
    mode: "mock-fallback",
    submittedAt: new Date().toISOString(),
    input,
    brief: normalized.brief,
    output: {
      ...assets,
      captions: normalized.captions,
      cta: normalized.cta,
      costBreakdown: buildCostBreakdown(),
      prompts: normalized.prompts,
      publisherDraft: normalized.publisherDraft
    },
    workflow: {
      provider: "dify",
      status: "ready"
    }
  };
}
