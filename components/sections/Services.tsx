"use client";

import { useRef, useEffect, useState, type RefObject } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useGsapScope } from "@/hooks/useGsapScope";
import { cn, prefersReducedMotion } from "@/lib/utils";

const DRAGON_DELIVERABLES = [
  "20 premium videos/month (scripted, shot, edited)",
  "1 fully managed main page (daily posting)",
  "9 niche distribution pages — IG + YT",
  "Monthly strategy session + growth report",
];

const TIMELINE = [
  { range: "Month 1–2", outcome: "Setup + First 5K followers" },
  { range: "Month 3–4", outcome: "Momentum · 15–25K" },
  { range: "Month 5–6", outcome: "Authority locked · 50K+" },
];

const JUPITER_METRICS = [
  { value: "30", label: "In-Act Reels" },
  { value: "10", label: "AI Vid (≤30s)" },
  { value: "10", label: "Graphics Carousels" },
];

const COMPARISON_ROWS = [
  { label: "Pages Managed", other: "1", recun: "10" },
  { label: "Monthly Price", other: "₹4–6L", recun: "₹2L", highlight: true },
  { label: "Distribution", other: "None", recun: "9 Platforms", highlight: true },
  {
    label: "Guarantee",
    other: "None",
    recun: "Views + Followers",
    highlight: true,
  },
  {
    label: "Client Time",
    other: "Constant",
    recun: "4–5 Hours/Month",
    highlight: true,
  },
  {
    label: "Approach",
    other: "Content",
    recun: "Authority System",
    highlight: true,
  },
];

const PANEL_CLASS =
  "services-panel relative flex w-full shrink-0 flex-col min-h-[80vh] md:w-[85vw] md:max-w-[85vw]";

function ServiceNumber({ n }: { n: string }) {
  return (
    <span
      className="pointer-events-none absolute right-8 top-8 select-none font-editorial font-normal leading-none text-primary"
      style={{ fontSize: "clamp(64px, 12vw, 120px)", opacity: 0.08 }}
      aria-hidden
    >
      {n}
    </span>
  );
}

function ComparisonTable({ className }: { className?: string }) {
  return (
    <div className={cn("w-full", className)}>
      <div className="mb-10 grid grid-cols-[1.15fr_0.9fr_0.9fr] gap-x-4 border-b border-[var(--border-subtle)] pb-4 font-satoshi text-[11px] uppercase tracking-[0.2em] text-muted">
        <span />
        <span className="text-center opacity-70">Others</span>
        <span className="border-l border-gold-300/30 pl-4 text-center text-gold-300">
          Recun
        </span>
      </div>
      <div className="divide-y divide-[var(--border-subtle)]">
        {COMPARISON_ROWS.map((row) => (
          <div
            key={row.label}
            className="compare-row grid grid-cols-[1.15fr_0.9fr_0.9fr] gap-x-4 py-4 font-satoshi text-sm md:text-base"
          >
            <span className="text-secondary">{row.label}</span>
            <span className="text-center text-muted opacity-80">
              {row.other}
            </span>
            <span
              className={cn(
                "border-l pl-4 text-center",
                row.highlight
                  ? "border-gold-300/35 text-gold-300"
                  : "border-[var(--border-subtle)] text-primary"
              )}
            >
              {row.recun}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DragonsHeadPanel({
  timelineProgressRef,
}: {
  timelineProgressRef: RefObject<HTMLDivElement>;
}) {
  return (
    <article
      className={cn(
        PANEL_CLASS,
        "border border-[var(--border-visible)] bg-elevated p-10 md:p-16"
      )}
      style={{ borderRadius: 2 }}
    >
      <ServiceNumber n="01" />

      <div className="mb-8 flex flex-wrap gap-3">
        <span className="rounded-full border border-gold-300/40 bg-gold-500/10 px-4 py-1.5 font-satoshi text-[11px] uppercase tracking-[0.25em] text-gold-300">
          Most Popular
        </span>
        <span className="rounded-full border border-red-400/40 bg-red-950/35 px-4 py-1.5 font-satoshi text-[11px] uppercase tracking-[0.25em] text-red-300">
          Only 5 Spots
        </span>
      </div>

      <header className="mb-10 max-w-3xl">
        <h3
          className="font-editorial font-normal text-primary"
          style={{ fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1.05 }}
        >
          Dragon&apos;s Head
        </h3>
        <p className="mt-3 font-satoshi text-base text-muted">
          Personal Branding & Content Distribution
        </p>
      </header>

      <div className="mb-12 grid flex-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <ul className="space-y-4">
          {DRAGON_DELIVERABLES.map((item) => (
            <li
              key={item}
              className="dragon-check flex gap-3 font-satoshi text-sm leading-relaxed text-secondary md:text-base"
            >
              <span className="mt-0.5 shrink-0 text-gold-300" aria-hidden>
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>

        <div className="relative pl-6">
          <div
            className="absolute bottom-0 left-[7px] top-0 w-px bg-[var(--border-subtle)]"
            aria-hidden
          />
          <div
            ref={timelineProgressRef}
            className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-gold-300"
            style={{ transform: "scaleY(0)" }}
            aria-hidden
          />
          <ol className="space-y-8">
            {TIMELINE.map((step) => (
              <li key={step.range} className="relative">
                <span
                  className="absolute -left-6 top-1.5 h-2.5 w-2.5 rounded-full border border-gold-300/60 bg-deep"
                  aria-hidden
                />
                <p className="font-satoshi text-xs uppercase tracking-widest text-gold-300/90">
                  {step.range}
                </p>
                <p className="mt-1 font-satoshi text-sm text-primary md:text-base">
                  {step.outcome}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <footer className="mt-auto flex flex-col gap-6 border-t border-[var(--border-subtle)] pt-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4">
          <span className="inline-block rounded-full border border-gold-300/50 px-4 py-2 font-satoshi text-[10px] uppercase tracking-[0.2em] text-gold-300">
            50K Followers or Money Back
          </span>
          <p
            className="font-editorial text-primary"
            style={{ fontSize: "clamp(28px, 3vw, 36px)" }}
          >
            ₹2,00,000 / month
          </p>
        </div>
        <MagneticButton href="https://topmate.io/techieyogi">
          Secure Your Spot →
        </MagneticButton>
      </footer>
    </article>
  );
}

function JupiterNodePanel() {
  return (
    <article
      className={cn(
        PANEL_CLASS,
        "border border-[var(--border-subtle)] bg-deep p-10 md:p-16"
      )}
      style={{ borderRadius: 2 }}
    >
      <ServiceNumber n="02" />

      <header className="mb-10 max-w-3xl">
        <h3
          className="font-editorial font-normal text-primary"
          style={{ fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1.05 }}
        >
          Jupiter Node
        </h3>
        <p className="mt-3 font-satoshi text-base text-muted">
          Result-Driven Campaign. Clear Finish Line.
        </p>
      </header>

      <div className="mb-10 grid grid-cols-3 gap-4">
        {JUPITER_METRICS.map((m) => (
          <div
            key={m.label}
            className="rounded-sm border border-[var(--border-visible)] bg-elevated/50 p-5 text-center"
          >
            <p
              className="font-editorial text-gold-300"
              style={{ fontSize: "clamp(36px, 4vw, 48px)", lineHeight: 1 }}
            >
              {m.value}
            </p>
            <p className="mt-2 font-satoshi text-[11px] uppercase tracking-wide text-muted">
              {m.label}
            </p>
          </div>
        ))}
      </div>

      <ul className="mb-8 space-y-2 font-satoshi text-sm text-secondary md:text-base">
        <li>· Daily stories</li>
        <li>· 2 PR activities</li>
        <li>· 3 meme collabs</li>
      </ul>

      <p className="mb-10 rounded-sm border border-gold-300/25 bg-gold-500/8 px-5 py-4 font-satoshi text-sm text-secondary">
        <span className="text-gold-300">Add-on:</span> Influencer Outreach for
        15 creators —{" "}
        <span className="text-primary">+₹20,000</span>
      </p>

      <footer className="mt-auto space-y-4 border-t border-[var(--border-subtle)] pt-8">
        <p className="font-satoshi text-[11px] uppercase tracking-[0.2em] text-gold-300">
          1 Million Views or We Continue Free
        </p>
        <p
          className="font-editorial text-primary"
          style={{ fontSize: "clamp(24px, 2.5vw, 36px)" }}
        >
          Custom Pricing · Min. ₹4,00,000
        </p>
        <MagneticButton href="https://topmate.io/techieyogi" variant="ghost">
          Book Discovery Call →
        </MagneticButton>
      </footer>
    </article>
  );
}

function ComparisonPanel({
  panelRef,
}: {
  panelRef: RefObject<HTMLElement>;
}) {
  return (
    <article
      ref={panelRef}
      className={cn(
        PANEL_CLASS,
        "justify-center border border-[var(--border-subtle)] bg-surface p-10 md:p-16"
      )}
      style={{ borderRadius: 2 }}
    >
      <h3
        className="mb-10 font-editorial font-normal text-primary"
        style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.05 }}
      >
        Why Recun Wins
      </h3>
      <ComparisonTable />
    </article>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelCRef = useRef<HTMLElement>(null);
  const timelineProgressRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsMobile(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useGsapScope(
    sectionRef,
    ({ gsap }) => {
      const track = trackRef.current;
      if (!track) return;
      const getScrollDistance = () =>
        track.scrollWidth - window.innerWidth + 120;

      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (timelineProgressRef.current) {
              const panelAProgress = Math.min(1, self.progress * 3);
              gsap.set(timelineProgressRef.current, {
                scaleY: panelAProgress,
              });
            }
          },
        },
      });

      gsap.from(".dragon-check", {
        x: -12,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: track.children[0],
          containerAnimation: tween,
          start: "left 70%",
          once: true,
        },
      });

      if (panelCRef.current) {
        gsap.from(panelCRef.current.querySelectorAll(".compare-row"), {
          y: 20,
          opacity: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panelCRef.current,
            containerAnimation: tween,
            start: "left 72%",
            once: true,
          },
        });
      }
    },
    [isMobile],
    !isMobile && !prefersReducedMotion()
  );

  useGsapScope(
    sectionRef,
    ({ gsap }) => {
      const panelA = sectionRef.current?.querySelector(".services-panel");
      if (panelA && timelineProgressRef.current) {
        gsap.to(timelineProgressRef.current, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: panelA,
            start: "top 80%",
            end: "bottom 60%",
            scrub: true,
          },
        });
      }

      if (!panelCRef.current) return;
      gsap.from(panelCRef.current.querySelectorAll(".compare-row"), {
        y: 20,
        opacity: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: panelCRef.current,
          start: "top 82%",
          once: true,
        },
      });
    },
    [isMobile],
    isMobile && !prefersReducedMotion()
  );

  const panels = (
    <>
      <DragonsHeadPanel timelineProgressRef={timelineProgressRef} />
      <JupiterNodePanel />
      <ComparisonPanel panelRef={panelCRef} />
    </>
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className="services-section relative z-content bg-surface"
    >
      <div className="section-padding pb-8 md:pb-12">
        <p className="mb-3 font-satoshi text-[11px] uppercase tracking-[0.4em] text-gold-300">
          Services
        </p>
        <h2
          className="font-editorial font-normal text-primary"
          style={{ fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.05 }}
        >
          Choose your system
        </h2>
      </div>

      {isMobile ? (
        <div className="flex flex-col gap-8 px-6 pb-24 md:px-12">
          {panels}
        </div>
      ) : (
        <div className="overflow-hidden pb-4">
          <div
            ref={trackRef}
            className="services-track flex w-max gap-6 px-6 md:gap-8 md:px-12"
          >
            {panels}
          </div>
        </div>
      )}
    </section>
  );
}
