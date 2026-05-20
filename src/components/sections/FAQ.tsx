"use client";

import { useState } from "react";
import { AccordionCard } from "@/components/ui/AccordionCard";

const FAQ_ITEMS = [
  {
    q: "What is the Content Distribution Network?",
    a: "We manage 10 pages total — 1 main page you own completely, plus 9 distribution pages that push the same audience toward you from 10 different angles, every single day. Most agencies fight for attention on 1 channel. We give you 10.",
  },
  {
    q: "Do you work with clients outside Surat?",
    a: "Geography has never stopped us. Every element of our system runs remotely. For shoots, we travel to you or set up a local production crew. Our clients are spread across India and internationally.",
  },
  {
    q: "What niches do you work with?",
    a: "All of them. Real estate, finance, law, medicine, manufacturing, tech, food, fashion, coaching — if you have genuine expertise, we build unassailable authority around it.",
  },
  {
    q: "Is the ₹5,000 token refundable?",
    a: "It's fully adjusted against your first month's invoice — not lost. It exists to confirm your spot in our maximum 5-client system. We don't hold spots for people who aren't ready to move.",
  },
  {
    q: "How much of my time is actually required?",
    a: "4 to 5 hours per month. One batch shoot, one strategy call. We handle every script, every edit, every post, every caption, every engagement, every report. Your job is to show up and perform. Ours is everything else.",
  },
  {
    q: "What happens if the guarantee isn't hit?",
    a: "We return your full investment or we keep going at zero cost until we hit the number. No escape clauses. No fine print. The guarantee is the guarantee.",
  },
] as const;

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="section-surface section-surface--faq section-padding relative z-content"
    >
      <div className="mx-auto max-w-3xl">
        <p className="type-label mb-4">FAQ</p>
        <h2 className="type-section mb-10 md:mb-14">
          Straight answers.
        </h2>

        <div>
          {FAQ_ITEMS.map((item, index) => (
            <AccordionCard
              key={item.q}
              question={item.q}
              answer={item.a}
              open={openIndex === index}
              onToggle={() =>
                setOpenIndex((current) =>
                  current === index ? null : index
                )
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

