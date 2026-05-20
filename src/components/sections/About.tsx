"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ASSETS } from "@/lib/assets";

const CREDENTIAL_PILLS = [
  "₹2 Cr Raised",
  "UAE Entity Built",
  "$1M+ SaaS",
  "Scholarship Declined",
];

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
    <section
      id="about"
      className="section-surface section-surface--about section-padding relative z-content overflow-hidden"
    >
      <div className="relative z-[1] mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] lg:items-start lg:gap-16">
        <div className="order-2 lg:order-1 lg:pr-6">
          <p className="about-founder-label">The Founder</p>

          <h2 className="about-founder-headline mt-6 whitespace-pre-line">
            {"Execution\nover\neverything."}
          </h2>

          <p className="about-body mt-8">
            Before founding Recun Marketing 18, Yogii Kumar was COO and CMO at
            two startups simultaneously. He secured ₹2 crore in funding for
            Festum Evento and built a UAE entity from the ground up.
          </p>

          <p className="about-body mt-6">
            He built an AI SaaS prototype valued at over $1 million before its
            public launch. Then walked away from it to focus on one thing:
            building authority for founders who deserve to be seen.
          </p>

          <blockquote className="about-pull mt-8">
            Master&apos;s Union selected me. Offered their highest-ever
            scholarship. I declined. I chose execution over education.
          </blockquote>

          <div className="mt-8 flex flex-wrap gap-2">
            {CREDENTIAL_PILLS.map((pill) => (
              <span key={pill} className="about-pill">
                {pill}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          ref={portraitRef}
          className="relative order-1 lg:order-2 lg:sticky lg:top-28"
        >
          <div className="about-portrait">
            <motion.div
              className="about-portrait__parallax absolute inset-0 overflow-hidden"
              style={{ y: parallax ? imageY : 0 }}
            >
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={ASSETS.portrait}
                  alt="Yogii Kumar — Founder, Recun Marketing 18"
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
