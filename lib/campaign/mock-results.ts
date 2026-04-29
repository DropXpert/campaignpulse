import { buildCostBreakdown } from "@/lib/campaign/costs";
import { buildIntegrationProof } from "@/lib/campaign/integration-proof";
import { generateMockAceAssets } from "@/lib/ace/mock";
import { buildMockWorkflowOutput } from "@/lib/dify/mock";
import type { CampaignInput, CampaignMode, CampaignResult } from "@/types/campaign";

export function createMockCampaignResult(
  input: CampaignInput,
  mode: CampaignMode = "mock"
): CampaignResult {
  const workflowOutput = buildMockWorkflowOutput(input);
  const aceAssets = generateMockAceAssets(input, workflowOutput.prompts);

  return {
    campaignId: `${Date.now()}`,
    mode,
    submittedAt: new Date().toISOString(),
    input,
    brief: workflowOutput.brief,
    output: {
      ...aceAssets,
      captions: workflowOutput.captions,
      cta: workflowOutput.cta,
      costBreakdown: buildCostBreakdown(),
      prompts: workflowOutput.prompts,
      publisherDraft: {
        xPost: `${input.businessName} just launched a faster way to convert local demand in ${input.city}. ${workflowOutput.cta}`,
        hashtags: ["#BuildWithAce", "#AceDataCloud", "#LocalMarketing"],
        launchCaption: `Campaign pack ready for ${input.businessName}. Posters, QR, jingle, and promo reel aligned around ${input.offerDetails}.`
      },
      integrationProof: buildIntegrationProof("mock")
    },
    workflow: {
      provider: "mock",
      status: mode === "mock" ? "ready" : "fallback"
    }
  };
}
