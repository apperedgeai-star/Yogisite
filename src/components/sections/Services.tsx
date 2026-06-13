"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ServiceImageBlock } from "@/components/ui/ServiceImageBlock";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ASSETS } from "@/lib/assets";
import {
  DRAGON_DELIVERABLES,
  DRAGON_WHY,
  JUPITER_AD_CREATIVES,
  JUPITER_IMPORTANT,
  JUPITER_INCLUDED,
  JUPITER_INTRO,
  JUPITER_METRICS,
  JUPITER_VIEWS_NOTE,
} from "@/lib/content";
import { SITE } from "@/lib/site";
import { cn, prefersReducedMotion } from "@/lib/utils";

const TIMELINE = [
  { months: "Month 1–2", milestone: "Setup + First 5K followers" },
  { months: "Month 3–4", milestone: "Momentum · 15–25K" },
  { months: "Month 5–6", milestone: "Authority locked · 50K+" },
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
    <div className={cn("surface-card card-padding", className)} style={style}>
      {children}
    </div>
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
      { threshold: 0.25 }
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
            <span className="relative z-[1] mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border border-[var(--g300)] bg-[var(--void)]" aria-hidden />
            <div style={{ opacity: lineReady ? 1 : 0, transitionDelay: `${i * 80}ms` }}>
              <p className="type-label" style={{ color: "var(--t3)" }}>{step.months}</p>
              <p className="type-body-strong mt-1">{step.milestone}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DragonsHeadTab() {
  return (
    <div className="grid grid-cols-1 items-start gap-4">
      <ServiceImageBlock
        src={ASSETS.services.dragon}
        alt="Dragon's Head"
        overlayLabel="Personal Branding System"
      />
      <BentoCell>
        <div className="flex flex-wrap gap-3">
          <span className="badge-gold">Most Popular</span>
          <span className="badge-red">5 Founders at a Time</span>
        </div>
        <header className="mt-6 max-w-2xl">
          <h3 className="type-subhead">Dragon&apos;s Head</h3>
          <p className="type-body mt-3">Personal Branding & Content Distribution System</p>
        </header>
        <p className="type-body mt-6 whitespace-pre-line">{DRAGON_WHY}</p>
      </BentoCell>

      <BentoCell>
        <p className="type-label mb-5" style={{ color: "var(--t3)" }}>What you get</p>
        <ul className="space-y-3">
          {DRAGON_DELIVERABLES.map((item) => (
            <li key={item} className="mechanism-item">
              <span className="mechanism-item-icon text-gold-300" aria-hidden>✓</span>
              {item}
            </li>
          ))}
        </ul>
      </BentoCell>

      <BentoCell>
        <p className="type-label mb-6" style={{ color: "var(--t3)" }}>Your 6-Month Journey</p>
        <JourneyTimeline />
      </BentoCell>

      <BentoCell>
        <span className="badge-gold">50K Followers or Money Back</span>
        <p className="price-number mt-4 text-[var(--f-2xl)]">$2,000 / 4 weeks</p>
        <p className="type-body mt-2">or $1,000 / 4 weeks without distribution</p>
        <p className="type-caption mt-4">6-month contract · $100 token confirms spot (adjusted against month one)</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="hero-cta-primary hoverable tap-target inline-flex w-full sm:w-auto">
            Secure Your Spot →
          </a>
          <p className="type-caption">Only 5 founders at a time. Quality over volume.</p>
        </div>
      </BentoCell>
    </div>
  );
}

function JupiterNodeTab() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <ServiceImageBlock src={ASSETS.services.jupiter} alt="Jupiter Node" overlayLabel="Campaign System" />
      <BentoCell>
        <h3 className="type-subhead">Jupiter Node</h3>
        <p className="type-body mt-2">Business Branding & Content Production Campaigns</p>
        <p className="type-body mt-4">{JUPITER_INTRO}</p>
        <p className="type-caption mt-3">50 pieces, 5 million views, done.</p>
      </BentoCell>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {JUPITER_METRICS.map((m) => (
          <BentoCell key={m.label}>
            <p className="metric-number text-[var(--f-xl)]">{m.value}</p>
            <p className="type-label mt-2">{m.label}</p>
            <p className="type-caption mt-2">{m.detail}</p>
          </BentoCell>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <BentoCell>
          <p className="type-label mb-4">Everything Included</p>
          <ul className="type-body space-y-2.5">
            {JUPITER_INCLUDED.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-gold-300" aria-hidden>•</span>
                {item}
              </li>
            ))}
          </ul>
        </BentoCell>
        <div className="space-y-4">
          <BentoCell className="border-[var(--b-gold)]">
            <p className="type-label mb-3">Important</p>
            <p className="type-body">{JUPITER_IMPORTANT}</p>
            <p className="type-caption mt-4 border-t border-[var(--b1)] pt-4">{JUPITER_VIEWS_NOTE}</p>
          </BentoCell>
          <BentoCell>
            <p className="type-label mb-3">Ad Creatives Bonus</p>
            <p className="type-body">{JUPITER_AD_CREATIVES}</p>
          </BentoCell>
        </div>
      </div>

      <BentoCell className="border-[var(--b-gold)]">
        <p className="type-label mb-2">Add-On: Influencer Outreach</p>
        <p className="type-body">15 Creators — <span className="price-number">+₹20,000</span> (or brand handles outreach for free)</p>
      </BentoCell>

      <BentoCell>
        <span className="badge-gold">5 Million Views or We Continue Free</span>
        <p className="price-number mt-4 text-[var(--f-2xl)]">Custom Pricing · Min. ₹4,00,000</p>
        <p className="type-body mt-4 font-medium text-gold-300">5 Million Views — Guaranteed</p>
        <p className="type-caption mt-2">
          If we do not hit 5M combined views, we keep going at zero cost until we do.
        </p>
        <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="hero-cta-secondary hoverable tap-target mt-6 inline-flex">
          Book Discovery Call →
        </a>
      </BentoCell>
    </div>
  );
}

export default function Services() {
  const [activeTab, setActiveTab] = useState<TabId>("dragon");

  return (
    <section id="services" className="section-surface section-surface--services section-padding relative z-content">
      <SectionHeader
        label="Services"
        title={<>Two systems.<br className="hidden sm:block" /> One goal.</>}
        className="section-intro mx-auto mb-10 max-w-7xl md:mb-12"
      />

      <div className="mx-auto max-w-7xl">
        <div
          className="services-tab-bar sticky z-[45] -mx-5 border-b bg-[rgba(10,10,10,0.92)] px-5 backdrop-blur-md md:-mx-12 md:px-12"
          style={{ top: "calc(env(safe-area-inset-top, 0px) + 4.25rem)", borderColor: "var(--b1)" }}
        >
          <div role="tablist" className="grid grid-cols-2">
            {TABS.map((tab) => {
              const selected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn("services-tab tap-target w-full cursor-pointer", selected && "services-tab--active")}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-8">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} {...TAB_MOTION}>
              {activeTab === "dragon" ? <DragonsHeadTab /> : <JupiterNodeTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
