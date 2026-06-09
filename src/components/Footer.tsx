"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { SITE } from "@/lib/site";

const services = [
  "Personal Branding",
  "Content Distribution",
  "Business Branding",
  "Tech & AI",
  "Coaching & Consulting",
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-4xl px-4 py-20 text-center md:px-6">
        <motion.div {...fadeUp}>
          <Image
            src="/logos/recun-full-logo.svg"
            alt="The Recun Media"
            width={240}
            height={48}
            className="mx-auto"
          />

          <h2 className="mt-10 font-display text-4xl text-[var(--text-primary)] md:text-5xl">
            Stop being
            <br />
            invisible online.
          </h2>

          <p className="mx-auto mt-6 max-w-lg font-sans text-sm leading-relaxed text-[var(--text-muted)]">
            Book a 25-minute discovery call. No pitch deck. No generic proposal.
            A real conversation about your brand — and a dedicated plan built for you on the call.
          </p>

          <a
            href={SITE.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-[48px] items-center rounded-full bg-[var(--gold)] px-8 font-sans text-sm font-semibold text-[var(--bg-primary)] transition-all hover:scale-[1.04] hover:bg-[var(--gold-light)]"
          >
            Book a Discovery Call →
          </a>
        </motion.div>
      </div>

      <div className="border-t border-[var(--border)] px-4 py-12 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
              Services
            </p>
            <ul className="mt-4 space-y-2">
              {services.map((s) => (
                <li key={s} className="font-sans text-sm text-[var(--text-muted)]">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
              Contact
            </p>
            <ul className="mt-4 space-y-2 font-sans text-sm text-[var(--text-muted)]">
              <li>
                <a
                  href={`https://wa.me/${SITE.phoneTel.replace("+", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--gold)]"
                >
                  WhatsApp — {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-[var(--gold)]">
                  Email — {SITE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--border)] px-4 py-6 text-center">
        <p className="font-sans text-xs text-[var(--text-muted)]">
          © 2026 — All Rights Reserved · Recun Marketing 18 Pvt Ltd &nbsp;|&nbsp; Privacy · T&amp;C apply
        </p>
      </div>
    </footer>
  );
}
