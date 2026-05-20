"use client";

import { AccordionCard } from "@/components/ui/AccordionCard";

const FAQ_ITEMS = [
  {
    q: "What is the Content Distribution Network?",
    a: "Managing 10 pages total — 1 main + 9 distribution — each targeting a different audience angle simultaneously. One message, maximum reach.",
  },
  {
    q: "Do you work with clients outside Surat?",
    a: "Geography has never stopped us. Everything runs remotely.\n\nShoots handled on-location anywhere in India.",
  },
  {
    q: "What niches do you work with?",
    a: "All of them. Real estate, finance, law, medicine, manufacturing, tech, food, fashion — if you have expertise, we build authority around it.",
  },
  {
    q: "Is the ₹5,000 token refundable?",
    a: "It is fully adjusted against your first month's payment.\n\nIt secures your spot in our maximum 5-client system.",
  },
  {
    q: "How much of my time is required monthly?",
    a: "Only 4–5 hours. One batch shoot and one strategy call.\n\nWe handle everything else. Your job is to show up and perform.",
  },
  {
    q: "What if the guarantee isn't met in 6 months?",
    a: "We return your full investment OR continue delivering at zero cost until we hit the number.\n\nWe don't offer escape clauses.",
  },
] as const;

export default function FAQ() {
  return (
    <section
      id="faq"
      className="section-padding relative z-content bg-deep"
    >
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-center font-satoshi text-[11px] uppercase tracking-[0.5em] text-gold-300">
          FAQ
        </p>
        <h2
          className="mb-12 text-center font-editorial font-normal text-primary md:mb-16"
          style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.05 }}
        >
          Straight answers.
        </h2>

        <div className="space-y-3 md:space-y-4">
          {FAQ_ITEMS.map((item) => (
            <AccordionCard
              key={item.q}
              question={item.q}
              answer={item.a}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
