import { cn } from "@/lib/utils";

interface StatusPillProps {
  status: "ready" | "pending";
}

export function StatusPill({ status }: StatusPillProps) {
  return (
    <span
      className={cn(
        "status-pill",
        status === "ready" ? "status-pill-ready" : "status-pill-pending"
      )}
    >
      {status === "ready" ? "Ready" : "Pending"}
    </span>
  );
}
