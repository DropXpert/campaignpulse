import { roundCurrency } from "@/lib/utils";
import type { CostBreakdown } from "@/types/campaign";

export function buildCostBreakdown(): CostBreakdown {
  const imageCost = 0.78;
  const qrCost = 0.14;
  const musicCost = 0.42;
  const videoCost = 1.25;
  const subtotal = roundCurrency(imageCost + qrCost + musicCost + videoCost);
  const x402Discount = roundCurrency(subtotal * 0.05);
  const aceHolderDiscount = roundCurrency(subtotal * 0.03);
  const finalTotal = roundCurrency(subtotal - x402Discount - aceHolderDiscount);
  const traditionalMonthlyEstimate = 74;
  const savingsVsTraditional = roundCurrency(traditionalMonthlyEstimate - finalTotal);

  return {
    imageCost,
    qrCost,
    musicCost,
    videoCost,
    subtotal,
    x402Discount,
    aceHolderDiscount,
    finalTotal,
    traditionalMonthlyEstimate,
    savingsVsTraditional
  };
}
