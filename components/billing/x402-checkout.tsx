"use client";

import { useState } from "react";

type CheckoutState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ready"; message: string; detail: string }
  | { status: "error"; message: string };

interface PaymentResponse {
  ready?: boolean;
  message?: string;
  status?: number;
  payment?: {
    accepts?: Array<{
      network?: string;
      asset?: string;
      maxAmountRequired?: string;
      payTo?: string;
    }>;
  };
}

export function X402Checkout() {
  const [state, setState] = useState<CheckoutState>({ status: "idle" });

  async function checkPaymentPath() {
    setState({ status: "loading" });

    try {
      const response = await fetch("/api/x402/requirements", {
        method: "POST"
      });
      const payload = (await response.json()) as PaymentResponse;

      if (!response.ok || !payload.ready) {
        setState({
          status: "error",
          message: payload.message || "x402 payment path is not ready."
        });
        return;
      }

      const requirement = payload.payment?.accepts?.[0];
      setState({
        status: "ready",
        message: payload.message || `Payment requirement received with HTTP ${payload.status}.`,
        detail: requirement
          ? `${requirement.network || "network"} / ${requirement.asset || "asset"} / ${requirement.maxAmountRequired || "amount"}`
          : "Ready for signed X-PAYMENT retry."
      });
    } catch (error) {
      setState({
        status: "error",
        message: error instanceof Error ? error.message : "x402 payment check failed."
      });
    }
  }

  return (
    <div className="x402-console">
      <div>
        <p className="eyebrow">x402 Checkout</p>
        <h2>Usage-based payments for campaign credits.</h2>
        <p>
          The server asks Ace for the x402 payment requirement, then a wallet-signed
          `X-PAYMENT` header can complete the order.
        </p>
      </div>
      <button
        type="button"
        className="button button-primary"
        onClick={checkPaymentPath}
        disabled={state.status === "loading"}
      >
        {state.status === "loading" ? "Checking..." : "Check x402 Path"}
      </button>
      {state.status === "ready" ? (
        <div className="x402-status x402-status-ready">
          <strong>{state.message}</strong>
          <p>{state.detail}</p>
        </div>
      ) : null}
      {state.status === "error" ? (
        <div className="x402-status">
          <strong>Setup needed</strong>
          <p>{state.message}</p>
        </div>
      ) : null}
    </div>
  );
}
