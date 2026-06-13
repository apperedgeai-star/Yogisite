"use client";

import Image from "next/image";
import { ProgramCardMedia } from "@/components/ui/ProgramCardMedia";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ASSETS } from "@/lib/assets";
import { SITE } from "@/lib/site";

export default function Programs() {
  return (
    <section id="programs" className="section-surface section-surface--programs section-padding relative z-content">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="Education"
          title="We don't just do. We teach."
          className="mb-10 md:mb-14"
        />

        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          <article className="surface-card flex flex-col overflow-hidden">
            <ProgramCardMedia src={ASSETS.programs.recunAI} />
            <div className="flex flex-1 flex-col p-6 md:p-8">
              <span className="tag-pill tag-pill--alert mb-4 w-fit">Launching June 2026</span>
              <h3 className="type-subhead">Recun Content &amp; AI</h3>
              <p className="type-body mt-3">
                AI tools, content creation, and distribution — taught from inside a working agency.
              </p>
              <p className="type-body-strong mt-6">
                <span className="price-number text-xl">₹59,000</span>
                <span className="type-caption ml-2 font-normal">with internship</span>
              </p>
              <a
                href={`mailto:${SITE.emails.yogii}?subject=Recun%20Content%20%26%20AI%20Program`}
                className="hero-cta-primary hoverable tap-target mt-6 inline-flex w-full sm:w-auto"
              >
                Apply Now →
              </a>
            </div>
          </article>

          <article className="surface-card flex flex-col overflow-hidden">
            <ProgramCardMedia src={ASSETS.programs.contentSeCrore} />
            <div className="flex flex-1 flex-col p-6 md:p-8">
              <span className="tag-pill mb-4 w-fit">Coming Soon</span>
              <h3 className="type-subhead">Content Se Crore</h3>
              <p className="type-body mt-3">
                Four months to turn followers into customers — product, system, and monetisation blueprint.
              </p>
              <p className="price-number mt-6 text-xl text-gold-300">₹99,000</p>
              <a
                href={`mailto:${SITE.emails.sales}?subject=Content%20Se%20Crore%20Waitlist`}
                className="hero-cta-secondary hoverable tap-target mt-6 inline-flex w-full sm:w-auto"
              >
                Join Waitlist
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
