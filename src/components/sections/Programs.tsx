"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { ProgramCardMedia } from "@/components/ui/ProgramCardMedia";
import { ASSETS } from "@/lib/assets";
import { SITE } from "@/lib/site";

export default function Programs() {
  return (
    <section
      id="programs"
      className="section-surface section-surface--programs section-padding relative z-content"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="type-section mb-10 whitespace-pre-line md:mb-14">
          {"We don't just do.\nWe teach."}
        </h2>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <article className="program-card glass-card flex flex-col overflow-hidden p-8 md:p-10">
            <ProgramCardMedia src={ASSETS.programs.recunAI} />
            <span className="program-badge-pulse type-label mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-red-400/50 bg-red-950/40 px-4 py-1.5 text-red-300">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-400"
                aria-hidden
              />
              <span>Launching June 2026</span>
            </span>

            <h3 className="type-subhead">Recun Content & AI</h3>

            <p className="type-body mt-4">
              Learn AI tools, content creation, social media marketing, and how to build a career in this space — from the inside of a real working agency.
            </p>

            <p className="type-caption mt-6" style={{ color: "var(--t2)" }}>
              AI tools · Scripting · Distribution · Branding
            </p>
            <p className="type-caption mt-2">
              Intern-to-Employee pipeline for the best graduates
            </p>

            <div className="mt-8 space-y-2 border-t border-[var(--b1)] pt-8 type-body">
              <p style={{ color: "var(--t2)" }}>
                <span className="price-number text-xl">₹59,000</span>
                <span className="type-caption ml-2">with internship</span>
              </p>
              <p style={{ color: "var(--t3)" }}>
                <span className="price-number" style={{ color: "var(--t2)" }}>
                  ₹80,000
                </span>
                <span className="type-caption ml-2">without</span>
              </p>
            </div>

            <MagneticButton
              href={`mailto:${SITE.emails.yogii}?subject=Recun%20Content%20%26%20AI%20Program`}
              className="mt-8 !rounded-full !bg-[var(--g300)] !text-[#030303] hover:!bg-[var(--g200)]"
            >
              Apply Now →
            </MagneticButton>
          </article>

          <article className="program-card glass-card flex flex-col overflow-hidden p-8 md:p-10">
            <ProgramCardMedia src={ASSETS.programs.contentSeCrore} />
            <span className="program-badge-gradient mb-6 inline-flex w-fit rounded-full">
              <span className="type-label relative z-[1] rounded-full bg-[var(--void)] px-4 py-1.5">
                Coming Soon
              </span>
            </span>

            <h3 className="type-subhead">Content Se Crore</h3>

            <p className="type-body mt-4">
              A premium 4-month program where followers turn into customers. You will get the complete blueprint to build a sellable product or service — and a one-man-army system to grow and monetise it.
            </p>

            <p className="price-number mt-8 border-t border-[var(--b1)] pt-8 text-xl text-[var(--g300)]">
              ₹99,000
            </p>

            <MagneticButton
              href={`mailto:${SITE.emails.sales}?subject=Content%20Se%20Crore%20Waitlist`}
              variant="ghost"
              className="mt-8"
            >
              Join Waitlist
            </MagneticButton>
          </article>
        </div>
      </div>
    </section>
  );
}
