"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ASSETS } from "@/lib/assets";

const BODY_COPY = `COO and CMO at two startups simultaneously.
Secured ₹2 crore in funding for Festum Evento.
Established a UAE entity from scratch.
Built an AI SaaS prototype valued at $1M+ pre-launch.`;

const CREDENTIAL_PILLS = [
  "₹2 Cr Raised",
  "UAE Entity",
  "$1M+ SaaS",
  "35% Scholarship Declined",
];

export default function About() {
  const portraitRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: portraitRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const [parallax, setParallax] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setParallax(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section id="about" className="section-padding relative z-content bg-[var(--void)]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
        {/* Left — copy (below portrait on mobile) */}
        <div className="order-2 lg:order-1 lg:pr-4">
          <p
            className="font-satoshi uppercase"
            style={{
              fontSize: "var(--f-xs)",
              letterSpacing: "0.45em",
              color: "var(--g300)",
            }}
          >
            The Founder
          </p>

          <h2
            className="mt-6 whitespace-pre-line font-editorial font-normal"
            style={{
              fontSize: "var(--f-3xl)",
              lineHeight: 0.88,
              color: "var(--t1)",
            }}
          >
            {"Execution\nover\neverything."}
          </h2>

          <p
            className="mt-8 whitespace-pre-line font-satoshi leading-relaxed"
            style={{
              fontSize: "var(--f-base)",
              color: "var(--t2)",
            }}
          >
            {BODY_COPY}
          </p>

          <blockquote
            className="mx-auto mt-8 max-w-md border-0 px-2 text-center font-editorial italic lg:mx-0 lg:max-w-none lg:border-l-2 lg:pl-5 lg:text-left"
            style={{
              borderColor: "var(--g300)",
              fontSize: "clamp(22px, 5vw, var(--f-md))",
              color: "var(--g200)",
              lineHeight: 1.25,
            }}
          >
            &ldquo;I chose execution over education.&rdquo;
          </blockquote>

          <div className="mt-6 flex flex-wrap gap-2">
            {CREDENTIAL_PILLS.map((pill) => (
              <span
                key={pill}
                className="rounded-full border px-4 py-1.5 font-satoshi tracking-wide"
                style={{
                  fontSize: "var(--f-xs)",
                  borderColor: "var(--b-gold)",
                  color: "var(--g300)",
                }}
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Right — portrait (first on mobile) */}
        <div
          ref={portraitRef}
          className="relative order-1 lg:order-2 lg:sticky lg:top-28"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm lg:aspect-auto lg:h-[700px]">
            <motion.div
              className="absolute inset-0 h-full w-full lg:h-[110%] lg:-top-[5%]"
              style={{ y: parallax ? imageY : 0 }}
            >
              <Image
                src={ASSETS.portrait}
                alt="Yogii Kumar — Founder, Recun Marketing 18"
                fill
                priority={false}
                loading="lazy"
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            <div
              className="pointer-events-none absolute inset-0 z-[1]"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 55%, var(--void) 100%)",
              }}
              aria-hidden
            />

            <span
              className="pointer-events-none absolute right-2 top-1/2 z-[2] origin-center -translate-y-1/2 rotate-[-90deg] font-satoshi uppercase"
              style={{
                fontSize: 10,
                letterSpacing: "0.35em",
                color: "var(--t4)",
              }}
              aria-hidden
            >
              ©YK
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

