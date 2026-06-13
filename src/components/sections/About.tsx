"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ASSETS } from "@/lib/assets";
import { FOUNDER_BIO } from "@/lib/content";
import { SITE } from "@/lib/site";

export default function About() {
  const portraitRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: portraitRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const [parallax, setParallax] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setParallax(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section id="about" className="section-surface section-surface--about section-padding relative z-content overflow-hidden">
      <div className="relative z-[1] mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] lg:items-start lg:gap-16">
        <div className="order-2 lg:order-1 lg:pr-6">
          <p className="about-founder-label">The Founder</p>
          <p className="type-caption mt-2 text-gold-300">Former COO &amp; CMO</p>
          <h2 className="about-founder-headline mt-6">Execution over everything.</h2>

          <div className="mt-8 space-y-6">
            {FOUNDER_BIO.map((para) => (
              <p key={para.slice(0, 40)} className="about-body">{para}</p>
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
        </div>

        <motion.div ref={portraitRef} className="relative order-1 lg:order-2 lg:sticky lg:top-28">
          <div className="about-portrait">
            <motion.div className="about-portrait__parallax absolute inset-0 overflow-hidden" style={{ y: parallax ? imageY : 0 }}>
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={ASSETS.portrait}
                  alt="Yogii Kumar — Founder"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover"
                  style={{ objectPosition: "center top" }}
                />
              </div>
            </motion.div>
            <div className="about-portrait__fade" aria-hidden />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
