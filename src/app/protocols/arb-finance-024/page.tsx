import React from "react";
import { arbFinance024 } from "@/data/protocol-arb-finance-024";

export default function ArbFinance024Page() {
  const p = arbFinance024;

  return (
    <main className="min-h-screen bg-black text-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-12 space-y-12">
        {/* HERO */}
        <section className="space-y-4">
          <p className="text-xs tracking-[0.3em] text-red-400 uppercase">
            Executive Protocol · {p.id}
          </p>

          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {p.title}
          </h1>

          <p className="text-sm text-slate-400">
            {p.subdomain} · Domain: {p.domain} · Classification:{" "}
            <span className="text-red-400 font-medium">{p.classification}</span>
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <span className="inline-flex items-center rounded-full border border-red-500/50 px-3 py-1 text-xs uppercase tracking-widest text-red-300">
              Business Impact · {p.businessImpact}
            </span>

            <span className="text-xs text-slate-500">
              ~{p.docsCount} documents · ~{Math.round(p.wordCount / 1000)}k words
            </span>
          </div>

          <p className="max-w-2xl text-sm text-slate-300">
            {p.shortDescription}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={p.checkoutUrl}
              className="inline-flex items-center rounded-md bg-red-500 px-5 py-2 text-sm font-medium text-black hover:bg-red-400 transition"
            >
              Acquire Protocol License · ${p.priceUsd.toLocaleString()}
            </a>

            <a
              href="#sample"
              className="inline-flex items-center rounded-md border border-slate-700 px-4 py-2 text-xs font-medium text-slate-200 hover:bg-slate-900 transition"
            >
              View Sample I/O
            </a>
          </div>
        </section>

        {/* WHAT'S INSIDE */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold tracking-tight">
            What you get inside this Executive Protocol
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-4 space-y-2">
              <h3 className="text-sm font-semibold text-slate-100">
                1. Core Protocol Engine
              </h3>
              <p className="text-xs text-slate-400">
                Full ARB-FINANCE-024 enterprise system prompt, input/output JSON
                schemas, constraints, guardrails, reasoning framework, and
                failure modes for derivatives pricing and risk.
              </p>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-4 space-y-2">
              <h3 className="text-sm font-semibold text-slate-100">
                2. Document Suite
              </h3>
              <p className="text-xs text-slate-400">
                ~{Math.round(p.wordCount / 1000)}k words across implementation
                guides, case studies, regulatory briefs, validation playbooks,
                ROI calculators, onboarding and training materials.
              </p>
              <ul className="mt-2 space-y-1 text-xs text-slate-300">
                {p.whatsIncluded.slice(0, 5).map((item) => (
                  <li key={item}>• {item}</li>
                ))}
                {p.whatsIncluded.length > 5 && (
                  <li className="text-slate-500">• …and more</li>
                )}
              </ul>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-4 space-y-2">
              <h3 className="text-sm font-semibold text-slate-100">
                3. License
              </h3>
              <p className="text-xs text-slate-400">
                Single‑organization, internal use license. Unlimited internal
                users. 12 months of protocol updates. No resale, no use for
                client work without a separate agency/enterprise license.
              </p>
              <p className="pt-2 text-xs text-slate-500">
                Recommended for derivatives desks, risk teams, quant teams,
                treasury, and regulatory affairs.
              </p>
            </div>
          </div>
        </section>

        {/* SAMPLE I/O */}
        <section id="sample" className="space-y-4">
          <h2 className="text-lg font-semibold tracking-tight">
            Sample input / output (redacted)
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-300">
                  INPUT JSON (derivative profile excerpt)
                </span>
              </div>
              <pre className="max-h-80 overflow-auto rounded-lg border border-slate-800 bg-slate-950 p-3 text-[11px] leading-relaxed text-slate-200">
                {p.sampleInput}
              </pre>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-300">
                  OUTPUT JSON (valuation & risk excerpt)
                </span>
              </div>
              <pre className="max-h-80 overflow-auto rounded-lg border border-slate-800 bg-slate-950 p-3 text-[11px] leading-relaxed text-slate-200">
                {p.sampleOutput}
              </pre>
            </div>
          </div>

          <p className="text-[11px] text-slate-500">
            This is an illustrative excerpt. Full protocol includes complete
            valuationResults, riskMetrics, scenarioAnalysis, creditRiskAnalysis,
            portfolioImpact, hedgingAnalysis, modelValidation, regulatory
            compliance, liquidity assessment, sensitivity analysis, trading
            recommendations, and audit trail.
          </p>
        </section>

        {/* PRICING / CTA */}
        <section className="space-y-4 border-t border-slate-900 pt-8">
          <h2 className="text-lg font-semibold tracking-tight">
            Licensing & pricing
          </h2>

          <div className="grid gap-6 md:grid-cols-[2fr,3fr]">
            <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-4 space-y-2">
              <h3 className="text-sm font-semibold text-slate-100">
                Single‑organization protocol license
              </h3>
              <p className="text-xs text-slate-400">
                Internal use across your derivatives, risk, and quant teams.
                Includes the full ARB-FINANCE-024 prompt system and complete
                document suite, plus 12 months of protocol updates.
              </p>
              <p className="pt-2 text-sm font-semibold text-red-400">
                ${p.priceUsd.toLocaleString()} one‑time
              </p>

              <a
                href={p.checkoutUrl}
                className="mt-3 inline-flex items-center rounded-md bg-red-500 px-4 py-2 text-xs font-medium text-black hover:bg-red-400 transition"
              >
                Acquire Protocol License
              </a>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-4 space-y-2">
              <h3 className="text-sm font-semibold text-slate-100">
                Advisory sprint (optional add‑on)
              </h3>
              <p className="text-xs text-slate-400">
                For desks that want help adapting the protocol to their stack:
                4‑week remote sprint, 3× workshops with your risk/quant/tech
                teams, tailored templates and internal documentation.
              </p>
              <p className="pt-2 text-xs text-slate-500">
                Priced separately. Recommended for complex portfolios or highly
                regulated environments.
              </p>
              <a
                href="mailto:you@yourdomain.com?subject=ARB-FINANCE-024%20Advisory%20Sprint"
                className="mt-3 inline-flex items-center rounded-md border border-slate-700 px-4 py-2 text-xs font-medium text-slate-200 hover:bg-slate-900 transition"
              >
                Discuss advisory sprint →
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}