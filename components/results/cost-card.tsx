import { formatCurrency } from "@/lib/utils";
import type { CostBreakdown } from "@/types/campaign";

interface CostCardProps {
  costs: CostBreakdown;
}

const rows = [
  ["Images", "imageCost"],
  ["QR", "qrCost"],
  ["Music", "musicCost"],
  ["Video", "videoCost"],
  ["Subtotal", "subtotal"],
  ["x402 discount", "x402Discount"],
  ["$ACE discount", "aceHolderDiscount"],
  ["Final total", "finalTotal"],
  ["Monthly stack", "traditionalMonthlyEstimate"],
  ["Savings", "savingsVsTraditional"]
] as const;

export function CostCard({ costs }: CostCardProps) {
  return (
    <section className="report-section cost-card report-cost">
      <div className="report-section-head">
        <p className="eyebrow">Economics</p>
        <h2>Campaign cost</h2>
      </div>
      <div className="cost-table">
        {rows.map(([label, key]) => (
          <div key={key} className={key === "finalTotal" ? "cost-row cost-row-strong" : "cost-row"}>
            <span>{label}</span>
            <strong>
              {key === "x402Discount" || key === "aceHolderDiscount" ? "-" : ""}
              {formatCurrency(costs[key])}
            </strong>
          </div>
        ))}
      </div>
    </section>
  );
}
