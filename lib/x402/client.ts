import { appConfig, hasX402BootstrapConfig } from "@/lib/config";

export interface X402PaymentRequirement {
  scheme: string;
  network: string;
  asset: string;
  maxAmountRequired: string;
  payTo: string;
  extra?: Record<string, unknown>;
}

export interface X402PaymentBootstrapResponse {
  error?: string;
  detail?: string;
  message?: string;
  accepts?: X402PaymentRequirement[];
  paywall?: Record<string, unknown>;
}

export async function requestX402PaymentRequirement() {
  if (!hasX402BootstrapConfig()) {
    throw new Error(
      "x402 config is incomplete. Add ACE_PLATFORM_TOKEN and ACE_X402_ORDER_ID."
    );
  }

  const response = await fetch(
    `https://platform.acedata.cloud/api/v1/orders/${appConfig.x402.orderId}/pay/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${appConfig.ace.platformToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ pay_way: "X402" }),
      cache: "no-store"
    }
  );

  return {
    status: response.status,
    body: (await response.json()) as X402PaymentBootstrapResponse
  };
}

export async function completeX402Payment(paymentHeader: string) {
  void paymentHeader;
  // TODO: Wire the signed X-PAYMENT header using x402-js after wallet/order setup.
  throw new Error("x402 signing is not wired yet.");
}
