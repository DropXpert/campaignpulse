import { buildCostBreakdown } from "@/lib/campaign/costs";
import { buildLiveAceAssets, hasRemoteAceAsset } from "@/lib/ace/live";
import { generateMockAceAssets } from "@/lib/ace/mock";
import { appConfig, hasAceConfig, hasDifyConfig } from "@/lib/config";
import { createMockCampaignResult } from "@/lib/campaign/mock-results";
import { buildMockWorkflowOutput } from "@/lib/dify/mock";
import { runDifyWorkflow } from "@/lib/dify/client";
import { normalizeDifyWorkflowOutput } from "@/lib/dify/normalize";
import { parseCampaignInput } from "@/lib/validation/campaign";
import type { CampaignResult } from "@/types/campaign";

export async function createCampaign(input: unknown): Promise<CampaignResult> {
  const parsed = parseCampaignInput(input);

  if (appConfig.mockMode) {
    return createMockCampaignResult(parsed, "mock");
  }

  let workflow = buildMockWorkflowOutput(parsed);
  let workflowProvider: CampaignResult["workflow"]["provider"] = "mock";
  let workflowStatus: CampaignResult["workflow"]["status"] = "fallback";

  if (hasDifyConfig()) {
    try {
      const liveResponse = await runDifyWorkflow(parsed);
      workflow = normalizeDifyWorkflowOutput(parsed, liveResponse);
      workflowProvider = "dify";
      workflowStatus = "ready";
    } catch (error) {
      if (!appConfig.allowMockFallback) {
        throw error;
      }
    }
  }

  const baseOutput = {
    captions: workflow.captions,
    cta: workflow.cta,
    costBreakdown: buildCostBreakdown(),
    prompts: workflow.prompts,
    publisherDraft: workflow.publisherDraft
  };

  if (hasAceConfig()) {
    try {
      const assets = await buildLiveAceAssets(parsed, workflow.prompts);

      return {
        campaignId: `${Date.now()}`,
        mode: hasRemoteAceAsset(assets) ? "live" : "mock-fallback",
        submittedAt: new Date().toISOString(),
        input: parsed,
        brief: workflow.brief,
        output: {
          ...assets,
          ...baseOutput
        },
        workflow: {
          provider: workflowProvider === "mock" ? "ace-direct" : workflowProvider,
          status:
            workflowStatus === "ready" && hasRemoteAceAsset(assets) ? "ready" : "fallback"
        }
      };
    } catch (error) {
      if (!appConfig.allowMockFallback) {
        throw error;
      }
    }
  }

  if (appConfig.allowMockFallback) {
    const assets = generateMockAceAssets(parsed, workflow.prompts);

    return {
      campaignId: `${Date.now()}`,
      mode: "mock-fallback",
      submittedAt: new Date().toISOString(),
      input: parsed,
      brief: workflow.brief,
      output: {
        ...assets,
        ...baseOutput
      },
      workflow: {
        provider: workflowProvider,
        status: workflowProvider === "mock" ? "fallback" : workflowStatus
      }
    };
  }

  throw new Error("Live mode is enabled but provider configuration is incomplete.");
}
