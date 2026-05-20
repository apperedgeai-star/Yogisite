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
        <h2
          className="mb-10 whitespace-pre-line font-editorial font-normal md:mb-14"
          style={{
            fontSize: "var(--f-2xl)",
            color: "var(--t1)",
            lineHeight: 1.05,
          }}
        >
          {"We don't just do.\nWe teach."}
        </h2>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <article className="program-card program-card--glass flex flex-col rounded-sm p-8 md:p-10">
            <span className="program-badge-pulse mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-red-400/50 bg-red-950/40 px-4 py-1.5 font-satoshi uppercase text-red-300">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-400"
                aria-hidden
              />
              <span style={{ fontSize: "var(--f-xs)", letterSpacing: "0.2em" }}>
                Launching June 2026
              </span>
            </span>

            <h3
              className="font-editorial font-normal"
              style={{
                fontSize: "var(--f-xl)",
                color: "var(--t1)",
                lineHeight: 1.05,
              }}
            >
              Recun Content & AI
            </h3>

            <p
              className="mt-4 font-satoshi"
              style={{ fontSize: "var(--f-base)", color: "var(--t2)" }}
            >
              3-month in-office program · Surat · Max 10 Students
            </p>

            <p
              className="mt-6 font-satoshi"
              style={{ fontSize: "var(--f-sm)", color: "var(--t2)" }}
            >
              AI tools · Scripting · Distribution · Branding
            </p>
            <p
              className="mt-2 font-satoshi"
              style={{ fontSize: "var(--f-sm)", color: "var(--t3)" }}
            >
              Intern-to-Employee pipeline for the best graduates
            </p>

            <div className="mt-8 space-y-2 border-t border-[var(--b1)] pt-8 font-satoshi">
              <p style={{ color: "var(--t2)" }}>
                <span className="price-number" style={{ fontSize: "var(--f-lg)" }}>
                  ₹59,000
                </span>
                <span
                  className="ml-2"
                  style={{ fontSize: "var(--f-sm)", color: "var(--t3)" }}
                >
                  with internship
                </span>
              </p>
              <p style={{ color: "var(--t3)" }}>
                <span
                  className="price-number"
                  style={{ fontSize: "var(--f-base)", color: "var(--t2)" }}
                >
                  ₹80,000
                </span>
                <span className="ml-2" style={{ fontSize: "var(--f-sm)" }}>
                  without
                </span>
              </p>
            </div>

            <MagneticButton
              href={`mailto:${SITE.email}?subject=Recun%20Content%20%26%20AI%20Program`}
              className="mt-8 !rounded-full !bg-[var(--g300)] !text-black hover:!bg-[var(--g200)]"
            >
              Apply Now →
            </MagneticButton>
          </article>

          <article className="program-card program-card--outline flex flex-col rounded-sm border border-[var(--b1)] bg-[var(--glass)] p-8 backdrop-blur-[16px] md:p-10">
            <span className="program-badge-gradient mb-6 inline-flex w-fit rounded-full">
              <span
                className="relative z-[1] rounded-full bg-[var(--void)] px-4 py-1.5 font-satoshi uppercase text-[var(--g300)]"
                style={{ fontSize: "var(--f-xs)", letterSpacing: "0.2em" }}
              >
                Coming Soon
              </span>
            </span>

            <h3
              className="font-editorial font-normal"
              style={{
                fontSize: "var(--f-xl)",
                color: "var(--t1)",
                lineHeight: 1.05,
              }}
            >
              Content Se Crore
            </h3>

            <p
              className="mt-4 font-satoshi leading-relaxed"
              style={{ fontSize: "var(--f-base)", color: "var(--t2)" }}
            >
              4-month premium program. Followers → Customers → Sellable Product.
            </p>

            <p
              className="price-number mt-8 border-t border-[var(--b1)] pt-8"
              style={{ fontSize: "var(--f-xl)", color: "var(--g300)" }}
            >
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


