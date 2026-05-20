"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { SITE } from "@/lib/site";
import { cn, prefersReducedMotion } from "@/lib/utils";

const STEPS = [
  {
    num: "01",
    title: "Watch the VSL",
    body: "A straight walkthrough on WhatsApp — how we distribute, what you commit, and what we deliver. No pitch theatre.",
  },
  {
    num: "02",
    title: "Book Discovery Call",
    body: "25 minutes with Yogii Kumar. We map your niche, your offer, and a distribution plan built for your market.",
    link: SITE.booking,
  },
  {
    num: "03",
    title: "Pay ₹5,000 Token",
    body: "Reserves your slot. Five clients max at a time. Credited fully against month one.",
  },
  {
    num: "04",
    title: "We Build Authority",
    body: "Onboarding week one. Content live week two. Your time: one batch shoot and one strategy call per month.",
  },
] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lineHeight, setLineHeight] = useState(0);
  const [activeThrough, setActiveThrough] = useState(-1);

  const measureLine = useCallback(() => {
    if (timelineRef.current) {
      setLineHeight(timelineRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    measureLine();
    const ro = new ResizeObserver(measureLine);
    if (timelineRef.current) ro.observe(timelineRef.current);
    return () => ro.disconnect();
  }, [measureLine]);

  useEffect(() => {
    const timeline = timelineRef.current;
    const line = lineRef.current;
    if (!timeline || !line || lineHeight <= 0) return;

    if (prefersReducedMotion()) {
      line.style.strokeDasharray = `${lineHeight}`;
      line.style.strokeDashoffset = "0";
      setActiveThrough(STEPS.length - 1);
      nodeRefs.current.forEach((node) =>
        node?.classList.add("timeline-node--active")
      );
      return;
    }

    line.style.strokeDasharray = `${lineHeight}`;
    line.style.strokeDashoffset = `${lineHeight}`;

    const updateProgress = () => {
      const rect = timeline.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.78;
      const end = vh * 0.35;
      const scrollable = rect.height + start - end;
      const progress = clamp((start - rect.top) / scrollable, 0, 1);

      line.style.strokeDashoffset = `${lineHeight * (1 - progress)}`;

      let active = -1;
      STEPS.forEach((_, i) => {
        const threshold = i === 0 ? 0 : (i / (STEPS.length - 1)) * 0.92;
        if (progress >= threshold) active = i;
      });

      setActiveThrough((prev) => {
        if (prev === active) return prev;
        nodeRefs.current.forEach((node, i) => {
          if (!node) return;
          if (i <= active) node.classList.add("timeline-node--active");
          else node.classList.remove("timeline-node--active");
        });
        return active;
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    const observer = new IntersectionObserver(
      () => updateProgress(),
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );
    observer.observe(timeline);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      observer.disconnect();
    };
  }, [lineHeight]);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="section-padding relative z-content bg-[var(--deep)]"
    >
      <div className="section-intro mx-auto max-w-2xl">
        <p className="type-label mb-4">How It Works</p>
        <h2 className="type-section">Simple. Ruthlessly efficient.</h2>
        <p className="type-body mt-after-headline">
          Requires only 4–5 hours of your time per month.
        </p>
      </div>

      <div className="mx-auto mt-14 max-w-2xl md:mt-20">
        <div ref={timelineRef} className="relative pl-12 md:pl-14">
          <svg
            className="pointer-events-none absolute left-[19px] top-0 md:left-[23px]"
            width="2"
            height={Math.max(lineHeight, 1)}
            aria-hidden
          >
            <line
              x1="1"
              y1="0"
              x2="1"
              y2={lineHeight}
              stroke="var(--b1)"
              strokeWidth="1"
            />
            <line
              ref={lineRef}
              x1="1"
              y1="0"
              x2="1"
              y2={lineHeight}
              stroke="var(--g300)"
              strokeWidth="1"
            />
          </svg>

          <ol className="relative space-y-12 md:space-y-16">
            {STEPS.map((step, i) => (
              <li key={step.num} className="relative">
                <div
                  ref={(el) => {
                    nodeRefs.current[i] = el;
                  }}
                  className={cn(
                    "timeline-node absolute -left-12 top-1 h-[10px] w-[10px] -translate-x-1/2 rounded-full border border-[var(--g300)]/40 bg-[var(--deep)] md:-left-14",
                    i <= activeThrough && "timeline-node--active"
                  )}
                  aria-hidden
                />

                <div
                  className={cn(
                    "pl-2 transition-opacity duration-500",
                    i <= activeThrough ? "opacity-100" : "opacity-40"
                  )}
                >
                  <span className="step-number mb-3 block">{step.num}</span>

                  <h3 className="type-subhead">{step.title}</h3>

                  <p className="type-body mt-3">
                    {step.body}
                  </p>

                  {"link" in step && step.link && (
                    <a
                      href={step.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="type-caption hoverable mt-3 inline-block transition-colors hover:text-[var(--g300)]"
                      style={{ color: "var(--g300)" }}
                    >
                      {SITE.booking.replace("https://", "")}
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}


