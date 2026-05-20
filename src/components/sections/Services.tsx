"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SITE } from "@/lib/site";
import { cn, prefersReducedMotion } from "@/lib/utils";

const DRAGON_DELIVERABLES = [
  "20 premium videos/month (scripted, shot, edited)",
  "1 fully managed main page — daily posting + engagement",
  "9 niche distribution pages across IG & YT",
  "Monthly strategy session + growth report",
];

const TIMELINE = [
  { months: "Month 1–2", milestone: "Setup + First 5K followers" },
  { months: "Month 3–4", milestone: "Momentum · 15–25K" },
  { months: "Month 5–6", milestone: "Authority locked · 50K+" },
];

const JUPITER_METRICS = [
  { value: "30", label: "In-Act Reels" },
  { value: "10", label: "AI Videos ≤30s" },
  { value: "10", label: "Graphic Carousels" },
];

const JUPITER_INCLUSIONS = [
  "Daily stories",
  "2 PR activities",
  "3 meme page collaborations",
  "Full content creation (repurposable as ads)",
];

const TABS = [
  { id: "dragon", label: "Dragon's Head" },
  { id: "jupiter", label: "Jupiter Node" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const TAB_MOTION = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.35, ease: "easeOut" },
};

function BentoCell({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-sm border bg-[var(--surface)] p-6 md:p-8",
        className
      )}
      style={{ borderColor: "var(--b1)", ...style }}
    >
      {children}
    </div>
  );
}

function GhostNumber({ children }: { children: string }) {
  return (
    <span
      className="pointer-events-none absolute right-4 top-4 select-none font-editorial md:right-6 md:top-6"
      style={{
        fontSize: 120,
        lineHeight: 1,
        color: "var(--t1)",
        opacity: 0.06,
      }}
      aria-hidden
    >
      {children}
    </span>
  );
}

function JourneyTimeline() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [lineReady, setLineReady] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      setLineReady(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLineReady(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="relative pl-8">
      <div
        className="absolute bottom-3 left-[7px] top-3 w-px origin-top bg-[var(--b1)] transition-transform duration-[800ms] ease-out"
        style={{ transform: lineReady ? "scaleY(1)" : "scaleY(0)" }}
        aria-hidden
      />
      <ul className="space-y-6">
        {TIMELINE.map((step, i) => (
          <li key={step.months} className="relative flex gap-4">
            <span
              className="relative z-[1] mt-1.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-[var(--g300)] bg-[var(--void)]"
              aria-hidden
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--g300)]" />
            </span>
            <div
              className="transition-all duration-500 ease-out"
              style={{
                opacity: lineReady ? 1 : 0,
                transform: lineReady ? "translateY(0)" : "translateY(8px)",
                transitionDelay: lineReady ? `${i * 80}ms` : "0ms",
              }}
            >
              <p
                className="font-satoshi uppercase"
                style={{
                  fontSize: "var(--f-xs)",
                  letterSpacing: "0.25em",
                  color: "var(--t3)",
                }}
              >
                {step.months}
              </p>
              <p
                className="mt-1 font-satoshi"
                style={{ fontSize: "var(--f-base)", color: "var(--t1)" }}
              >
                {step.milestone}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DragonsHeadTab() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <BentoCell className="lg:col-span-2">
        <GhostNumber>01</GhostNumber>
        <div className="relative z-[1] flex flex-wrap gap-3">
          <span className="badge-gold">Most Popular</span>
          <span className="badge-red">Only 5 Spots</span>
        </div>
        <header className="relative z-[1] mt-6 max-w-2xl">
          <h3
            className="font-editorial font-normal"
            style={{ fontSize: "var(--f-3xl)", color: "var(--t1)", lineHeight: 1.05 }}
          >
            Dragon&apos;s Head
          </h3>
          <p
            className="mt-3 font-satoshi"
            style={{ fontSize: "var(--f-base)", color: "var(--t2)" }}
          >
            Personal Branding & Content Distribution System
          </p>
        </header>
      </BentoCell>

      <BentoCell>
        <p
          className="mb-5 font-satoshi uppercase"
          style={{
            fontSize: "var(--f-xs)",
            letterSpacing: "0.3em",
            color: "var(--t3)",
          }}
        >
          What you get
        </p>
        <ul className="space-y-3">
          {DRAGON_DELIVERABLES.map((item) => (
            <li
              key={item}
              className="flex gap-3 font-satoshi"
              style={{ fontSize: "var(--f-base)", color: "var(--t2)" }}
            >
              <span className="shrink-0 text-[var(--g300)]" aria-hidden>
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </BentoCell>

      <BentoCell>
        <p
          className="mb-6 font-satoshi uppercase"
          style={{
            fontSize: "var(--f-xs)",
            letterSpacing: "0.3em",
            color: "var(--t3)",
          }}
        >
          Your 6-Month Journey
        </p>
        <JourneyTimeline />
      </BentoCell>

      <BentoCell className="lg:col-span-2">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span
              className="inline-block rounded-full border px-4 py-1.5 font-satoshi uppercase"
              style={{
                fontSize: "var(--f-xs)",
                letterSpacing: "0.25em",
                borderColor: "var(--g-border)",
                color: "var(--g300)",
              }}
            >
              50K Followers or Money Back
            </span>
            <p
              className="mt-4 font-editorial"
              style={{ fontSize: "var(--f-2xl)", color: "var(--t1)", lineHeight: 1.1 }}
            >
              ₹2,00,000 / month
            </p>
            <p
              className="mt-2 font-satoshi"
              style={{ fontSize: "var(--f-sm)", color: "var(--t3)" }}
            >
              6-month contract · ₹5,000 token confirms spot
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <MagneticButton
              href={SITE.booking}
              className="!bg-[var(--g300)] !text-black hover:!bg-[var(--g200)]"
            >
              Secure Your Spot →
            </MagneticButton>
            <p
              className="font-satoshi"
              style={{ fontSize: "var(--f-xs)", color: "var(--t3)" }}
            >
              Only 5 clients at a time
            </p>
          </div>
        </div>
      </BentoCell>
    </div>
  );
}

function JupiterNodeTab() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <BentoCell>
        <GhostNumber>02</GhostNumber>
        <header className="relative z-[1] max-w-2xl">
          <h3
            className="font-editorial font-normal"
            style={{ fontSize: "var(--f-3xl)", color: "var(--t1)", lineHeight: 1.05 }}
          >
            Jupiter Node
          </h3>
          <p
            className="mt-3 font-satoshi"
            style={{ fontSize: "var(--f-base)", color: "var(--t2)" }}
          >
            Result-Driven Campaign. Clear Finish Line.
          </p>
        </header>
      </BentoCell>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {JUPITER_METRICS.map((m) => (
          <BentoCell key={m.label} className="text-center">
            <p
              className="font-editorial"
              style={{ fontSize: "var(--f-xl)", color: "var(--g300)", lineHeight: 1 }}
            >
              {m.value}
            </p>
            <p
              className="mt-3 font-satoshi uppercase"
              style={{
                fontSize: "var(--f-xs)",
                letterSpacing: "0.25em",
                color: "var(--t3)",
              }}
            >
              {m.label}
            </p>
          </BentoCell>
        ))}
      </div>

      <BentoCell>
        <ul className="space-y-2.5 font-satoshi" style={{ fontSize: "var(--f-base)", color: "var(--t2)" }}>
          {JUPITER_INCLUSIONS.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[var(--g300)]" aria-hidden>
                •
              </span>
              {item}
            </li>
          ))}
        </ul>
      </BentoCell>

      <BentoCell
        className="border-[var(--b-gold)]"
        style={{ background: "var(--glass)", borderColor: "var(--b-gold)" }}
      >
        <p className="font-satoshi" style={{ fontSize: "var(--f-base)", color: "var(--t2)" }}>
          <span className="text-[var(--g300)]">Add-On:</span> Influencer Outreach
          for 15 Creators —{" "}
          <span style={{ color: "var(--t1)" }}>+₹20,000</span>
        </p>
        <p
          className="mt-2 font-satoshi"
          style={{ fontSize: "var(--f-sm)", color: "var(--t3)" }}
        >
          Or brand handles outreach for free
        </p>
      </BentoCell>

      <BentoCell>
        <span
          className="inline-block rounded-full border px-4 py-1.5 font-satoshi uppercase"
          style={{
            fontSize: "var(--f-xs)",
            letterSpacing: "0.25em",
            borderColor: "var(--g-border)",
            color: "var(--g300)",
          }}
        >
          1 Million Views or We Continue Free
        </span>
        <p
          className="mt-4 font-editorial"
          style={{ fontSize: "var(--f-2xl)", color: "var(--t1)", lineHeight: 1.1 }}
        >
          Custom Pricing · Min. ₹4,00,000
        </p>
        <div className="mt-6">
          <MagneticButton href={SITE.booking} variant="ghost">
            Book Discovery Call →
          </MagneticButton>
        </div>
      </BentoCell>
    </div>
  );
}

export default function Services() {
  const [activeTab, setActiveTab] = useState<TabId>("dragon");

  return (
    <section
      id="services"
      className="section-padding relative z-content bg-[var(--surface)]"
    >
      <header className="mx-auto mb-10 max-w-7xl text-center md:mb-12">
        <p
          className="mb-4 font-satoshi uppercase"
          style={{
            fontSize: "var(--f-xs)",
            letterSpacing: "0.45em",
            color: "var(--g300)",
          }}
        >
          Services
        </p>
        <h2
          className="font-editorial font-normal whitespace-pre-line"
          style={{
            fontSize: "var(--f-2xl)",
            color: "var(--t1)",
            lineHeight: 1.05,
          }}
        >
          {"Two systems.\nOne goal."}
        </h2>
      </header>

      <div className="mx-auto max-w-7xl">
        <div
          className="services-tab-bar sticky z-[45] -mx-5 border-b bg-[var(--surface)]/95 px-5 backdrop-blur-md md:-mx-12 md:px-12"
          style={{
            top: "calc(env(safe-area-inset-top, 0px) + 4.25rem)",
            borderColor: "var(--b1)",
          }}
        >
          <div
            role="tablist"
            aria-label="Service offerings"
            className="grid grid-cols-2"
          >
            {TABS.map((tab) => {
              const selected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "tap-target flex min-h-[48px] items-center justify-center py-3 font-satoshi transition-[color,border-color] duration-300",
                    "border-b-2"
                  )}
                  style={{
                    fontSize: "var(--f-sm)",
                    borderBottomColor: selected ? "var(--g300)" : "transparent",
                    color: selected ? "var(--g300)" : "var(--t3)",
                  }}
                  onMouseEnter={(e) => {
                    if (!selected) e.currentTarget.style.color = "var(--t2)";
                  }}
                  onMouseLeave={(e) => {
                    if (!selected) e.currentTarget.style.color = "var(--t3)";
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              role="tabpanel"
              id={`panel-${activeTab}`}
              aria-labelledby={`tab-${activeTab}`}
              {...TAB_MOTION}
            >
              {activeTab === "dragon" ? (
                <DragonsHeadTab />
              ) : (
                <JupiterNodeTab />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

