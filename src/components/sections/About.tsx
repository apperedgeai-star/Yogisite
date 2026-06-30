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

const BIO_SECTIONS = [
  { title: "Origin", paragraphs: FOUNDER_BIO.slice(0, 2) },
  { title: "Startup Operating Experience", paragraphs: FOUNDER_BIO.slice(2, 6) },
  { title: "Master's Union Decision", paragraphs: FOUNDER_BIO.slice(6, 9) },
  { title: "What I Bring", paragraphs: FOUNDER_BIO.slice(9) },
] as const;

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
  const [openBio, setOpenBio] = useState(0);

  return (
    <Section id="about" tone="deep" className="founder-section">
      <SiteGrid className="founder-layout items-start">
        <Col span={12} spanLg={7} className="order-2 lg:order-1">
          <div className="founder-copy-panel">
            <SectionHeader label="The founder" title="Execution over everything." />
            <p className="founder-subtitle type-caption text-gold-300">Former COO &amp; CMO</p>

            <div className="founder-bio-accordion mt-6">
              {BIO_SECTIONS.map((section, index) => {
                const open = openBio === index;
                return (
                  <article key={section.title} className="founder-bio-panel">
                    <button
                      type="button"
                      className="founder-bio-toggle"
                      onClick={() => setOpenBio(open ? -1 : index)}
                      aria-expanded={open}
                    >
                      <span>{section.title}</span>
                      <span aria-hidden>{open ? "Close" : "Read"}</span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="founder-bio-text space-y-4">
                            {section.paragraphs.map((paragraph) => (
                              <p key={paragraph} className="type-body">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="fact-cards-grid mt-6">
            {FOUNDER_FACTS.map((fact) => (
              <FactCard key={fact.label} {...fact} />
            ))}
          </div>

          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-btn hoverable tap-target mt-8 inline-flex items-center gap-2 rounded-full border border-white px-5 py-3 font-sans text-sm font-semibold text-white transition-colors duration-200"
          >
            <FaInstagram size={18} />
            Follow on Instagram
          </a>
        </Col>

        <Col span={12} spanLg={5} className="order-1 lg:order-2">
          <div className="founder-image-container surface-card overflow-hidden lg:sticky lg:top-28">
            <Image
              src={ASSETS.portrait}
              alt="Yogii Kumar — Founder"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="founder-image object-cover"
              style={{ objectFit: "cover", objectPosition: "center 18%" }}
            />
          </div>
        </Col>
      </SiteGrid>
    </Section>
  );
}
