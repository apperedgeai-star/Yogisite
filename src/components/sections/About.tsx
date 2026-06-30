"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { ASSETS } from "@/lib/assets";
import { FOUNDER_BIO, FOUNDER_FACTS } from "@/lib/content";
import { SITE } from "@/lib/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Col, Section, SiteGrid } from "@/components/layout/Section";

function FounderBioPanel() {
  return (
    <div
      className="founder-bio-scroll-viewport"
      aria-label="Founder biography"
      tabIndex={0}
    >
      <div className="founder-bio-scroll-track">
        {FOUNDER_BIO.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="founder-bio-scroll-line type-body">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

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
  const toggle = () => setOpen((o) => !o);

  return (
    <motion.div
      layout
      className="fact-card founder-info-card"
      onClick={toggle}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggle();
        }
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      role="button"
      tabIndex={0}
      aria-expanded={open}
    >
      <div className="fact-card-header">
        <span className="fact-label">{label}</span>
        <span className="fact-short">{short}</span>
        <span className="fact-hint">{open ? "Close" : "Hover / click"}</span>
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
      <SiteGrid className="founder-layout">
        <Col span={12} spanLg={7} className="order-2 lg:order-1">
          <div className="founder-copy-panel">
            <SectionHeader label="The founder" title="Execution over everything." />
            <p className="founder-subtitle type-caption text-gold-300">Former COO &amp; CMO</p>
            <div className="founder-bio-wrap mt-5">
              <FounderBioPanel />
            </div>
          </div>
        </Col>

        <Col span={12} spanLg={5} className="order-1 lg:order-2">
          <div className="founder-image-container surface-card overflow-hidden">
            <Image
              src={ASSETS.portrait}
              alt="Yogii Kumar — Founder"
              width={600}
              height={750}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="founder-image h-full w-full"
              style={{ objectFit: "cover", objectPosition: "center 18%" }}
              priority
            />
          </div>
        </Col>

        <Col span={12} className="order-3">
          <div className="fact-cards-grid founder-facts-grid">
            {FOUNDER_FACTS.map((fact) => (
              <FactCard key={fact.label} {...fact} />
            ))}
          </div>

          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-btn hoverable tap-target mt-6 inline-flex items-center gap-2 rounded-full border border-white px-5 py-3 font-sans text-sm font-semibold text-white transition-colors duration-200"
          >
            <FaInstagram size={18} />
            Follow on Instagram
          </a>
        </Col>
      </SiteGrid>
    </Section>
  );
}
