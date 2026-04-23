import { appConfig, hasAceConfig, hasDifyConfig, hasX402Config } from "@/lib/config";

export interface SetupStep {
  id: string;
  title: string;
  status: "ready" | "pending";
  detail: string;
  actionLabel: string;
  actionUrl: string;
}

export function getSetupSteps(): SetupStep[] {
  return [
    {
      id: "ace-account",
      title: "Acquire Ace service credentials",
      status: hasAceConfig() ? "ready" : "pending",
      detail:
        "Open the Ace product page, click Acquire, and copy the credential into ACE_API_KEY.",
      actionLabel: "Open Ace platform",
      actionUrl: "https://platform.acedata.cloud"
    },
    {
      id: "dify-workflow",
      title: "Publish Dify workflow",
      status: hasDifyConfig() ? "ready" : "pending",
      detail:
        "Create the workflow, then add DIFY_API_KEY and DIFY_WORKFLOW_ID to your env file.",
      actionLabel: "Open Dify",
      actionUrl: "https://cloud.dify.ai"
    },
    {
      id: "x402",
      title: "Prepare x402 payment config",
      status: hasX402Config() ? "ready" : "pending",
      detail:
        "Create an Ace platform order, generate a platform token, and fund a Base wallet with USDC.",
      actionLabel: "Read x402 guide",
      actionUrl: "https://docs.acedata.cloud/de/guides/x402"
    },
    {
      id: "submission",
      title: "Prepare contest submission assets",
      status: "ready",
      detail:
        "The app now includes a cost-story panel, X post draft, setup docs, and a submission checklist.",
      actionLabel: "Open Ace hub",
      actionUrl: "https://hub.acedata.cloud"
    }
  ];
}

export function getEnvironmentSummary() {
  return {
    mockMode: appConfig.mockMode,
    aceReady: hasAceConfig(),
    difyReady: hasDifyConfig(),
    x402Ready: hasX402Config()
  };
}
