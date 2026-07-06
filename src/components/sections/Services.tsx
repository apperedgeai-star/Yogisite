"use client";

import {
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { ServiceImageBlock } from "@/components/ui/ServiceImageBlock";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Col, Section, SiteGrid } from "@/components/layout/Section";
import { ASSETS } from "@/lib/assets";
import {
  DRAGON_DELIVERABLES,
  DRAGON_WHY,
  JUPITER_AD_CREATIVES,
  JUPITER_IMPORTANT,
  JUPITER_INCLUDED,
  JUPITER_OPENING,
  JUPITER_METRICS,
  JUPITER_VIEWS_NOTE,
} from "@/lib/content";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

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

function ServiceCell({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("surface-card service-cell", className)}>
      {children}
    </div>
  );
}

function JourneyTimeline() {
  return (
    <div className="service-timeline">
      <ul className="space-y-5">
        {TIMELINE.map((step, i) => (
          <li key={step.months} className="relative flex gap-4">
            <span className="service-timeline__dot" aria-hidden>{i + 1}</span>
            <div>
              <p className="type-label text-[var(--t3)]">{step.months}</p>
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
    <SiteGrid className="items-start">
      <Col span={12} spanLg={5}>
        <ServiceImageBlock
          src={ASSETS.services.dragon}
          alt="Dragon's Head"
          overlayLabel="Personal Branding System"
          priority
          objectPosition="center 42%"
        />
      </Col>

      <Col span={12} spanLg={7}>
        <ServiceCell className="service-hero-cell">
        <div className="flex flex-wrap gap-3">
          <span className="badge-gold">Most Popular</span>
          <span className="badge-red">5 FOUNDERS AT A TIME</span>
        </div>
        <header className="mt-6 max-w-2xl">
          <h3 className="type-subhead">Dragon&apos;s Head</h3>
          <p className="type-body mt-3">Personal Branding & Content Distribution System</p>
        </header>
        <p className="type-label mt-6">Why Dragon&apos;s Head?</p>
        <p className="type-body mt-3 max-w-3xl whitespace-pre-line">{DRAGON_WHY}</p>
        </ServiceCell>
      </Col>

      <Col span={12} spanLg={4}>
      <ServiceCell>
        <p className="type-label mb-5 text-[var(--t3)]">What you get</p>
        <ul className="space-y-3">
          {DRAGON_DELIVERABLES.map((item) => (
            <li key={item} className="mechanism-item">
              <span className="mechanism-item-icon text-gold-300" aria-hidden>✓</span>
              {item}
            </li>
          ))}
        </ul>
      </ServiceCell>
      </Col>

      <Col span={12} spanLg={4}>
      <ServiceCell>
        <p className="type-label mb-6 text-[var(--t3)]">Your 6-Month Journey</p>
        <JourneyTimeline />
      </ServiceCell>
      </Col>

      <Col span={12} spanLg={4}>
      <ServiceCell className="service-price-cell">
        <span className="badge-gold">50K Followers or Money Back</span>
        <p className="price-number mt-4 text-[clamp(2rem,4vw,3rem)]">$2,000</p>
        <p className="type-label mt-1">/ 4 weeks</p>
        <p className="type-body mt-2">or $1,000 / 4 weeks without distribution</p>
        <p className="type-caption mt-4">6-month contract · $100 token confirms spot (adjusted against month one)</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="hero-cta-primary hoverable tap-target inline-flex w-full sm:w-auto">
            Claim your spot →
          </a>
          <p className="type-caption">We work with only 5 founders at a time. Quality over volume.</p>
        </div>
      </ServiceCell>
      </Col>
    </SiteGrid>
  );
}

function JupiterNodeTab() {
  return (
    <SiteGrid className="items-start">
      <Col span={12} spanLg={5}>
        <ServiceImageBlock
          src={ASSETS.services.jupiter}
          alt="Jupiter Node"
          overlayLabel="Campaign System"
          priority
          objectPosition="center 38%"
        />
      </Col>

      <Col span={12} spanLg={7}>
      <ServiceCell className="service-hero-cell">
        <h3 className="type-subhead">Jupiter Node</h3>
        <span className="badge-gold">5 MILLION VIEWS OR WE CONTINUE FREE</span>
        <p className="type-body mt-4">Business Branding & Content Production Campaigns</p>
        <p className="type-body mt-4">{JUPITER_OPENING}</p>
        <p className="type-caption mt-3">50 pieces, 5 million views, done.</p>
      </ServiceCell>
      </Col>

      <Col span={12}>
      <div className="service-metrics-grid">
        {JUPITER_METRICS.map((m) => (
          <ServiceCell key={m.label} className="service-metric-cell">
            <p className="metric-number text-[var(--f-xl)]">{m.value}</p>
            <p className="type-label mt-2">{m.label}</p>
            <p className="type-caption mt-2">{m.detail}</p>
          </ServiceCell>
        ))}
      </div>
      </Col>

      <Col span={12} spanLg={6}>
        <ServiceCell>
          <p className="type-label mb-4">Everything Included</p>
          <ul className="type-body space-y-2.5">
            {JUPITER_INCLUDED.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-gold-300" aria-hidden>•</span>
                {item}
              </li>
            ))}
          </ul>
        </ServiceCell>
      </Col>

      <Col span={12} spanLg={6}>
        <div className="grid gap-4">
          <ServiceCell className="border-[var(--b-gold)]">
            <p className="type-label mb-3">Important</p>
            <p className="type-body">{JUPITER_IMPORTANT}</p>
          </ServiceCell>
          <ServiceCell>
            <p className="type-label mb-3">Ad Creatives Bonus</p>
            <p className="type-body">{JUPITER_AD_CREATIVES}</p>
          </ServiceCell>
          <ServiceCell>
            <p className="type-label mb-3">Note on 5M Views Guarantee</p>
            <p className="type-caption">{JUPITER_VIEWS_NOTE}</p>
          </ServiceCell>
        </div>
      </Col>

      <Col span={12} spanLg={5}>
      <ServiceCell className="border-[var(--b-gold)]">
        <p className="type-label mb-2">Add-On: Influencer Outreach</p>
        <p className="type-body">15 Creators — <span className="price-number">+$240</span> (or brand handles outreach for free)</p>
      </ServiceCell>
      </Col>

      <Col span={12} spanLg={7}>
      <ServiceCell className="service-price-cell">
        <span className="badge-gold">5 Million Views or We Continue Free</span>
        <p className="price-number mt-4 text-[clamp(2rem,4vw,3rem)]">$4,000 USD</p>
        <p className="type-body mt-4 font-medium text-gold-300">5 Million Views — Guaranteed</p>
        <p className="type-caption mt-2">
          If we do not hit 5M combined views, we keep going at zero cost until we do.
        </p>
        <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="hero-cta-primary hoverable tap-target mt-6 inline-flex w-full sm:w-auto">
          Book a Discovery Call →
        </a>
      </ServiceCell>
      </Col>
    </SiteGrid>
  );
}

export default function Services() {
  const [activeTab, setActiveTab] = useState<TabId>("dragon");

  useEffect(() => {
    [ASSETS.services.dragon, ASSETS.services.jupiter].forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  return (
    <Section id="services" tone="elevated" fullBleed>
      <div className="site-container">
        <SectionHeader
          label="Services"
          title={
            <>
              Two systems.
              <br />
              One goal.
            </>
          }
          className="mb-10 md:mb-12"
        />
      </div>

      <div className="site-container">
        <div
          className="services-tab-bar sticky z-[45] border-y bg-[var(--void)]/95 backdrop-blur-md"
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

        <div className="pt-8 md:pt-10">
          <div className={activeTab === "dragon" ? "block" : "hidden"} aria-hidden={activeTab !== "dragon"}>
            <DragonsHeadTab />
          </div>
          <div className={activeTab === "jupiter" ? "block" : "hidden"} aria-hidden={activeTab !== "jupiter"}>
            <JupiterNodeTab />
          </div>
        </div>
      </div>
    </Section>
  );
}
