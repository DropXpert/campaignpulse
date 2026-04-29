import { appConfig } from "@/lib/config";
import type { CampaignIntegrationProof, CampaignResult } from "@/types/campaign";

export function buildIntegrationProof(
  provider: CampaignResult["workflow"]["provider"]
): CampaignIntegrationProof {
  const planner =
    provider === "dify"
      ? `Dify workflow orchestration (${appConfig.ace.difyModelLabel})`
      : "Fallback campaign planner";

  return {
    planner,
    imageModel: `Ace image: ${appConfig.ace.models.image}`,
    musicModel: `Ace Suno/music: ${appConfig.ace.models.music}`,
    videoModel: `Ace video: ${appConfig.ace.models.video}`,
    qr: "Local scannable QR with Ace QR Art adapter ready",
    payment: "x402 5% discount model + $ACE holder discount"
  };
}
