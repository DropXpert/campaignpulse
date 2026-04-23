import { Suspense } from "react";
import { ResultsShell } from "@/components/results/results-shell";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function ResultsPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <Suspense
        fallback={
          <section className="results-panel loading-state">
            <div>
              <div className="spinner" aria-hidden="true" />
              <h2>Loading campaign</h2>
              <p>Preparing output.</p>
            </div>
          </section>
        }
      >
        <ResultsShell />
      </Suspense>
      <SiteFooter />
    </main>
  );
}
