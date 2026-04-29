export interface CampaignInput {
  businessName: string;
  offerDetails: string;
  city: string;
  link: string;
  visualStyle: string;
}

export interface CampaignBrief {
  targetAudience: string;
  campaignTheme: string;
  tone: string;
  keywords: string[];
  competitorAngles: string[];
}

export interface CampaignPrompts {
  imagePrompts: string[];
  qrPrompt: string;
  musicPrompt: string;
  videoPrompt: string;
}

export interface CampaignImageAsset {
  id: string;
  title: string;
  prompt: string;
  imageUrl: string;
}

export interface CampaignQrAsset {
  prompt: string;
  imageUrl: string;
}

export interface CampaignAudioAsset {
  title: string;
  prompt: string;
  lyricsIdea: string;
  previewImageUrl: string;
  url?: string;
}

export interface CampaignVideoAsset {
  title: string;
  prompt: string;
  storyboard: string[];
  previewImageUrl: string;
  url?: string;
}

export interface CostBreakdown {
  imageCost: number;
  qrCost: number;
  musicCost: number;
  videoCost: number;
  subtotal: number;
  x402Discount: number;
  aceHolderDiscount: number;
  finalTotal: number;
  traditionalMonthlyEstimate: number;
  savingsVsTraditional: number;
}

export interface CampaignPublisherDraft {
  xPost: string;
  hashtags: string[];
  launchCaption: string;
}

export interface CampaignIntegrationProof {
  planner: string;
  imageModel: string;
  musicModel: string;
  videoModel: string;
  qr: string;
  payment: string;
}

export interface CampaignOutput {
  images: CampaignImageAsset[];
  qrCode: CampaignQrAsset;
  music: CampaignAudioAsset;
  video: CampaignVideoAsset;
  captions: string[];
  cta: string;
  costBreakdown: CostBreakdown;
  prompts: CampaignPrompts;
  publisherDraft: CampaignPublisherDraft;
  integrationProof: CampaignIntegrationProof;
}

export type CampaignMode = "live" | "mock" | "mock-fallback";

export interface CampaignResult {
  campaignId: string;
  mode: CampaignMode;
  submittedAt: string;
  input: CampaignInput;
  brief: CampaignBrief;
  output: CampaignOutput;
  workflow: {
    provider: "dify" | "ace-direct" | "mock";
    status: "ready" | "fallback";
  };
}
