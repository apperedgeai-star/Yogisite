"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { SITE } from "@/lib/site";

export default function Programs() {
  return (
    <section
      id="programs"
      className="section-padding relative z-content bg-[var(--surface)]"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="type-section mb-10 whitespace-pre-line md:mb-14">
          {"We don't just do.\nWe teach."}
        </h2>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <article className="program-card program-card--glass flex flex-col rounded-sm p-8 md:p-10">
            <span className="program-badge-pulse type-label mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-red-400/50 bg-red-950/40 px-4 py-1.5 text-red-300">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-400"
                aria-hidden
              />
              <span>Launching June 2026</span>
            </span>

            <h3 className="type-subhead">Recun Content & AI</h3>

            <p className="type-body mt-4">
              3-month in-office program · Surat · Max 10 Students
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
              href={`mailto:${SITE.email}?subject=Recun%20Content%20%26%20AI%20Program`}
              className="mt-8 !rounded-full !bg-[var(--g300)] !text-[#030303] hover:!bg-[var(--g200)]"
            >
              Apply Now →
            </MagneticButton>
          </article>

          <article className="program-card program-card--outline flex flex-col rounded-sm border border-[var(--b1)] bg-[var(--glass)] p-8 backdrop-blur-[16px] md:p-10">
            <span className="program-badge-gradient mb-6 inline-flex w-fit rounded-full">
              <span className="type-label relative z-[1] rounded-full bg-[var(--void)] px-4 py-1.5">
                Coming Soon
              </span>
            </span>

            <h3 className="type-subhead">Content Se Crore</h3>

            <p className="type-body mt-4">
              4-month premium program. Followers → Customers → Sellable Product.
            </p>

            <p className="price-number mt-8 border-t border-[var(--b1)] pt-8 text-xl text-[var(--g300)]">
              ₹99,000
            </p>

            <MagneticButton
              href={`mailto:${SITE.email}?subject=Content%20Se%20Crore%20Waitlist`}
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


