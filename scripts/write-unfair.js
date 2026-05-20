const fs = require("fs");
const d = "div";
const close = (tag) => `</${tag}>`;
const open = (tag, cls) => `<${tag}${cls ? ` className="${cls}"` : ""}>`;

const content = `"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const cards = [
  { title: "The Problem With Others", icon: "✕", iconClass: "text-red-400", items: ["Post on 1 page", "Hope algorithm picks it", "₹4-6L/month", "No distribution plan"] },
  { title: "Our System", icon: "✓", iconClass: "text-accent", items: ["1 main page + 9 distribution pages", "Strategic multi-platform distribution", "₹2L/month (half the market rate)", "50K followers — Guaranteed"] },
  { title: "The CDN Network", icon: "◎", iconClass: "text-accent", items: ["Center: YOUR MAIN PAGE", "9 satellites: IG Business, Motivation, Industry, YT Clips…", "Pulsing gold connection lines"], diagram: true },
];

export default function UnfairAdvantage() {
  const sectionRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".advantage-card").forEach((card) => {
        gsap.from(card, { y: 60, opacity: 0, duration: 0.8, ease: [0.76, 0, 0.24, 1], scrollTrigger: { trigger: card, start: "top 85%" } });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative z-content bg-black">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:z-sticky lg:self-start">
          <p className="mb-4 font-satoshi text-xs uppercase tracking-[0.3em] text-accent">Unfair Advantage</p>
          <h2 className="font-editorial text-4xl leading-tight text-white md:text-6xl">Distribution is the new king.</h2>
        </div>
        <motion.div className="flex flex-col gap-6">
          {cards.map((card) => (
            <article key={card.title} className="advantage-card glass-card rounded-2xl p-8">
              <div className="mb-4 flex items-center gap-3">
                <span className={\`text-2xl \${card.iconClass}\`}>{card.icon}</span>
                <h3 className="font-satoshi text-lg font-medium">{card.title}</h3>
              </div>
              <ul className="space-y-2 font-satoshi text-sm text-muted">
                {card.items.map((item) => (
                  <li key={item} className="flex gap-2"><span className="text-accent">·</span>{item}</li>
                ))}
              </ul>
              {card.diagram && (
                <div className="relative mt-8 flex h-48 items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent bg-accent/10 font-satoshi text-[10px]">MAIN</div>
                  {[0,1,2,3,4,5,6,7,8].map((i) => {
                    const angle = (i / 9) * Math.PI * 2;
                    return (
                      <div key={i} className="absolute h-8 w-8 animate-pulse rounded-full border border-accent/40 bg-black"
                        style={{ transform: \`translate(\${Math.cos(angle)*70}px, \${Math.sin(angle)*70}px)\` }} />
                    );
                  })}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
`;

fs.writeFileSync("components/sections/UnfairAdvantage.tsx", content.replace(/<motion\.div/g, "<div").replace(/<\/motion\.motion\.div>/g, "</div>"));
