import { NextResponse } from "next/server";
import { hasX402BootstrapConfig } from "@/lib/config";
import { requestX402PaymentRequirement } from "@/lib/x402/client";

export async function POST() {
  if (!hasX402BootstrapConfig()) {
    return NextResponse.json(
      {
        ready: false,
        message:
          "x402 is not configured. Add ACE_PLATFORM_TOKEN and ACE_X402_ORDER_ID."
      },
      { status: 200 }
    );
  }

  try {
    const result = await requestX402PaymentRequirement();
    const hasRequirement =
      result.status === 402 &&
      Array.isArray(result.body.accepts) &&
      result.body.accepts.length > 0;
    const alreadyPaid = result.status >= 200 && result.status < 300;

    if (!hasRequirement && !alreadyPaid) {
      const message =
        result.status === 401
          ? "Ace platform token is invalid, expired, or missing access for this order."
          : result.body.message ||
            result.body.detail ||
            result.body.error ||
            `Ace returned HTTP ${result.status}.`;

      return NextResponse.json({
        ready: false,
        status: result.status,
        message
      });
    }

    return NextResponse.json({
      ready: true,
      status: result.status,
      message: hasRequirement
        ? "Payment requirement received."
        : "Order is already payable or completed.",
      payment: result.body
    });
  } catch (error) {
    return NextResponse.json(
      {
        ready: false,
        message: error instanceof Error ? error.message : "x402 request failed."
      },
      { status: 500 }
    );
  }
}
