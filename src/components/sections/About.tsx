"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ASSETS } from "@/lib/assets";
import { FOUNDER_FACTS } from "@/lib/content";
import { SITE } from "@/lib/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Col, Section, SiteGrid } from "@/components/layout/Section";

function FactCard({
  label,
  short,
  full,
}: {
  label: string;
  short: string;
  full: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      className="fact-card"
      onClick={() => setOpen((o) => !o)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="fact-card-header">
        <span className="fact-label">{label}</span>
        <span className="fact-short">{short}</span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.p
            className="fact-full"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {full}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function About() {
  return (
    <Section id="about" tone="deep" className="founder-section">
      <SiteGrid className="items-start">
        <Col span={12} spanLg={6} className="order-2 lg:order-1">
          <SectionHeader label="The founder" title="Execution over everything." />
          <p className="type-caption -mt-2 text-gold-300">Former COO &amp; CMO</p>

          <p className="founder-bio-text type-body mt-6 max-w-prose">
            I believe in one simple truth: execution teaches more than education. From selling
            first-copy fashion on Instagram to leading high-growth startups — I engineer growth,
            not just talk about it.
          </p>

          <div className="fact-cards-grid mt-6">
            {FOUNDER_FACTS.map((fact) => (
              <FactCard key={fact.label} {...fact} />
            ))}
          </div>

          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta-primary hoverable tap-target mt-8 inline-flex"
          >
            Follow on Instagram →
          </a>
        </Col>

        <Col span={12} spanLg={6} className="order-1 lg:order-2">
          <div className="founder-image-container surface-card overflow-hidden lg:sticky lg:top-28">
            <Image
              src={ASSETS.portrait}
              alt="Yogii Kumar — Founder"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="founder-image object-cover"
              style={{ objectPosition: "top center" }}
            />
          </div>
        </Col>
      </SiteGrid>
    </Section>
  );
}
