import { appConfig, hasDifyConfig } from "@/lib/config";
import type { DifyWorkflowResponse } from "@/lib/dify/normalize";
import type { CampaignInput } from "@/types/campaign";

export async function runDifyWorkflow(input: CampaignInput) {
  if (!hasDifyConfig()) {
    throw new Error(
      "Dify config is incomplete. Add DIFY_API_BASE_URL and DIFY_API_KEY."
    );
  }

  const workflowPath = appConfig.dify.workflowId
    ? `/workflows/${appConfig.dify.workflowId}/run`
    : "/workflows/run";

  const response = await fetch(`${appConfig.dify.baseUrl}${workflowPath}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${appConfig.dify.apiKey}`
    },
    body: JSON.stringify({
      inputs: {
        business_name: input.businessName,
        offer_details: input.offerDetails,
        city: input.city,
        link: input.link,
        visual_style: input.visualStyle
      },
      response_mode: "blocking",
      user: "campaignpulse"
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Dify workflow request failed with status ${response.status}.`);
  }

  return (await response.json()) as DifyWorkflowResponse;
}
