"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";

export default function Programs() {
  return (
    <section
      id="programs"
      className="section-padding relative z-content bg-surface"
    >
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 font-satoshi text-[11px] uppercase tracking-[0.5em] text-gold-300">
          Beyond the Agency
        </p>
        <h2
          className="mb-12 font-editorial font-normal text-primary md:mb-16"
          style={{ fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 1.05 }}
        >
          We don&apos;t just do. We teach.
        </h2>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Card 1 — Recun Content & AI */}
          <article className="program-card program-card--glass flex flex-col rounded-sm p-8 md:p-10">
            <span className="program-badge-pulse mb-6 inline-flex w-fit rounded-full border border-red-400/50 bg-red-950/40 px-4 py-1.5 font-satoshi text-[10px] uppercase tracking-[0.2em] text-red-300">
              Launching June 2026
            </span>

            <h3
              className="font-editorial font-normal text-primary"
              style={{ fontSize: "clamp(32px, 3.5vw, 42px)", lineHeight: 1.05 }}
            >
              Recun Content & AI
            </h3>

            <p className="mt-4 font-satoshi text-[15px] leading-relaxed text-muted">
              3-month in-office program · Surat · Max 10 Students
            </p>

            <ul className="mt-6 space-y-2 font-satoshi text-sm text-secondary md:text-[15px]">
              <li>AI tools · Short-form scripting · Distribution · Branding</li>
              <li>Intern-to-Employee pipeline for top graduates</li>
            </ul>

            <div className="mt-8 space-y-2 border-t border-[var(--border-subtle)] pt-8 font-satoshi">
              <p className="text-secondary">
                <span className="text-xl text-primary md:text-2xl">₹59,000</span>
                <span className="ml-2 text-sm text-muted">
                  with internship commitment
                </span>
              </p>
              <p className="text-muted">
                <span className="text-lg text-secondary">₹80,000</span>
                <span className="ml-2 text-sm">without</span>
              </p>
            </div>

            <MagneticButton
              href="mailto:techie.yogi1@gmail.com?subject=Recun%20Content%20%26%20AI%20Program"
              className="mt-auto !rounded-full !border !border-gold-300 !bg-transparent !text-gold-300 hover:!bg-gold-300/10"
            >
              Apply Now
            </MagneticButton>
          </article>

          {/* Card 2 — Content Se Crore */}
          <article className="program-card flex flex-col rounded-sm border border-[var(--border-subtle)] bg-[var(--bg-card)] p-8 backdrop-blur-md md:p-10">
            <span className="program-badge-gradient mb-6 inline-flex w-fit rounded-full px-4 py-1.5 font-satoshi text-[10px] uppercase tracking-[0.2em] text-gold-300">
              <span className="relative z-[1] rounded-full bg-deep px-3 py-0.5">
                Coming Soon
              </span>
            </span>

            <h3
              className="font-editorial font-normal text-primary"
              style={{ fontSize: "clamp(32px, 3.5vw, 42px)", lineHeight: 1.05 }}
            >
              Content Se Crore
            </h3>

            <p className="mt-4 font-satoshi text-[15px] leading-relaxed text-muted">
              4-month premium program
            </p>

            <ul className="mt-6 space-y-2 font-satoshi text-sm text-secondary md:text-[15px]">
              <li>Followers → Customers → Sellable Product</li>
              <li>Blueprint to build authority that converts</li>
            </ul>

            <p className="mt-8 border-t border-[var(--border-subtle)] pt-8 font-editorial text-3xl text-gold-300 md:text-4xl">
              ₹99,000
            </p>

            <MagneticButton
              href="mailto:techie.yogi1@gmail.com?subject=Content%20Se%20Crore%20Waitlist"
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
