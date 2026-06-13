"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ASSETS } from "@/lib/assets";
import { FOUNDER_BIO } from "@/lib/content";
import { SITE } from "@/lib/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Col, Section, SiteGrid } from "@/components/layout/Section";

export default function About() {
  const portraitRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: portraitRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]);
  const [parallax, setParallax] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setParallax(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <Section id="about" tone="deep">
      <SiteGrid className="items-start">
        <Col span={12} spanLg={6} className="order-2 lg:order-1">
          <SectionHeader label="The founder" title="Execution over everything." />
          <p className="type-caption -mt-2 text-gold-300">Former COO &amp; CMO</p>

          <div className="mt-8 space-y-5 border-t border-[var(--b1)] pt-8">
            {FOUNDER_BIO.map((para) => (
              <p key={para.slice(0, 40)} className="about-body max-w-prose">
                {para}
              </p>
            ))}
          </div>

          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta-primary hoverable tap-target mt-10 inline-flex"
          >
            Follow on Instagram →
          </a>
        </Col>

        <Col span={12} spanLg={6} className="order-1 lg:order-2">
          <motion.div ref={portraitRef} className="lg:sticky lg:top-28">
            <div className="about-portrait surface-card overflow-hidden">
              <motion.div
                className="about-portrait__parallax absolute inset-0 overflow-hidden"
                style={{ y: parallax ? imageY : 0 }}
              >
                <Image
                  src={ASSETS.portrait}
                  alt="Yogii Kumar — Founder"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                  style={{ objectPosition: "center top" }}
                />
              </motion.div>
              <div className="about-portrait__fade" aria-hidden />
            </div>
          </motion.div>
        </Col>
      </SiteGrid>
    </Section>
  );
}
