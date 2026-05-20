"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import { useGsapScope } from "@/hooks/useGsapScope";
import { prefersReducedMotion } from "@/lib/utils";

type Step = {
  n: string;
  title: string;
  desc: string;
  link?: { href: string; label: string };
  icon: ReactNode;
};

function IconPlay() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1" />
      <path d="M8 6.5v7l6-3.5-6-3.5z" fill="currentColor" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="3" y="4" width="14" height="13" rx="1" stroke="currentColor" strokeWidth="1" />
      <path d="M3 8h14M7 2v3M13 2v3" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="5" y="9" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1" />
      <path
        d="M7 9V6a3 3 0 016 0v3"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconRocket() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 3l2 7h-4l2-7zM6 12l-2 5 6-2 6 2-2-5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="9" r="1.5" fill="currentColor" />
    </svg>
  );
}

const STEPS: Step[] = [
  {
    n: "01",
    title: "Watch the VSL",
    desc: "A detailed WhatsApp video explaining our model. No fluff. No sales tactics.",
    icon: <IconPlay />,
  },
  {
    n: "02",
    title: "Book Discovery Call",
    desc: "25 minutes with Yogii Kumar. A dedicated growth strategy built for your niche.",
    link: {
      href: "https://topmate.io/techieyogi",
      label: "topmate.io/techieyogi",
    },
    icon: <IconCalendar />,
  },
  {
    n: "03",
    title: "Pay ₹5,000 Token",
    desc: "Confirms your spot in our 5-client maximum system. Adjusted against Month 1.",
    icon: <IconLock />,
  },
  {
    n: "04",
    title: "We Build Authority",
    desc: "Onboarding Week 1. Content live Week 2. Requires only 4–5 hours of your time per month.",
    icon: <IconRocket />,
  },
];

function stepThreshold(index: number, total: number) {
  if (index === 0) return 0;
  return (index / (total - 1)) * 0.88;
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lineHeight, setLineHeight] = useState(0);
  const activeSteps = useRef<Set<number>>(new Set());

  useEffect(() => {
    const measure = () => {
      if (timelineRef.current) {
        setLineHeight(timelineRef.current.offsetHeight);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (timelineRef.current) ro.observe(timelineRef.current);
    return () => ro.disconnect();
  }, []);

  useGsapScope(
    sectionRef,
    ({ gsap, ScrollTrigger }) => {
      const line = lineRef.current;
      if (!line || lineHeight <= 0) return;

      const reduced = prefersReducedMotion();
      if (reduced) {
        nodeRefs.current.forEach((node) =>
          node?.classList.add("timeline-node--active")
        );
        contentRefs.current.forEach((el) => {
          if (el) gsap.set(el, { opacity: 1, y: 0 });
        });
        gsap.set(line, { strokeDashoffset: 0 });
        return;
      }

      gsap.set(line, {
        strokeDasharray: lineHeight,
        strokeDashoffset: lineHeight,
      });

      gsap.to(line, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 75%",
          end: "bottom 55%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      ScrollTrigger.create({
        trigger: timelineRef.current,
        start: "top 75%",
        end: "bottom 55%",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          STEPS.forEach((_, i) => {
            const shouldActivate = progress >= stepThreshold(i, STEPS.length);
            const node = nodeRefs.current[i];
            const content = contentRefs.current[i];

            if (shouldActivate && !activeSteps.current.has(i)) {
              activeSteps.current.add(i);
              node?.classList.add("timeline-node--active");
              if (content) {
                gsap.to(content, {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  ease: "power3.out",
                });
              }
            } else if (!shouldActivate && activeSteps.current.has(i)) {
              activeSteps.current.delete(i);
              node?.classList.remove("timeline-node--active");
              if (content) {
                gsap.to(content, {
                  opacity: 0.3,
                  y: 14,
                  duration: 0.35,
                  ease: "power2.in",
                });
              }
            }
          });
        },
      });
    },
    [lineHeight],
    lineHeight > 0
  );

  useEffect(() => {
    const steps = activeSteps.current;
    return () => {
      steps.clear();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="section-padding relative z-content bg-deep"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-4 font-satoshi text-[11px] uppercase tracking-[0.5em] text-gold-300">
          The Process
        </p>
        <h2
          className="mb-14 font-editorial font-normal text-primary md:mb-20"
          style={{ fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 1.05 }}
        >
          Simple. Ruthlessly efficient.
        </h2>
      </div>

      <div className="mx-auto max-w-2xl">
        <div ref={timelineRef} className="timeline relative pl-10 md:pl-12">
          <svg
            className="pointer-events-none absolute left-[15px] top-0 md:left-[19px]"
            width="2"
            height={lineHeight || 1}
            aria-hidden
          >
            <line
              x1="1"
              y1="0"
              x2="1"
              y2={lineHeight}
              stroke="var(--border-subtle)"
              strokeWidth="1"
            />
            <line
              ref={lineRef}
              x1="1"
              y1="0"
              x2="1"
              y2={lineHeight}
              stroke="var(--gold-300)"
              strokeWidth="1"
            />
          </svg>

          <ol className="relative space-y-14 md:space-y-20">
            {STEPS.map((step, i) => (
              <li key={step.n} className="timeline-step relative">
                <div
                  ref={(el) => {
                    nodeRefs.current[i] = el;
                  }}
                  className="timeline-node absolute -left-10 top-1 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-gold-300/40 bg-deep md:-left-12"
                  aria-hidden
                />

                <div
                  ref={(el) => {
                    contentRefs.current[i] = el;
                  }}
                  className="timeline-step-content"
                  style={{ opacity: 0, transform: "translateY(16px)" }}
                >
                  <div className="mb-4 flex items-center gap-3 text-gold-300/80">
                    {step.icon}
                    <span className="font-satoshi text-[11px] uppercase tracking-[0.35em] text-gold-300">
                      Step {step.n}
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl text-primary md:text-3xl">
                    {step.title}
                  </h3>

                  <p className="mt-3 font-satoshi text-sm leading-relaxed text-secondary md:text-base">
                    {step.desc}
                  </p>

                  {step.link && (
                    <a
                      href={step.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="interactive mt-3 inline-block font-satoshi text-sm text-gold-300 underline-offset-4 hover:underline"
                    >
                      {step.link.label}
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
