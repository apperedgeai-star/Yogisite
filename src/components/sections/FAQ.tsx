"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AccordionCard } from "@/components/ui/AccordionCard";
import { FAQ_ITEMS } from "@/lib/content";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-surface section-surface--faq section-padding relative z-content">
      <div className="mx-auto max-w-3xl">
        <SectionHeader label="FAQ" title="Straight answers." className="mb-10 md:mb-14" />
        <div>
          {FAQ_ITEMS.map((item, index) => (
            <AccordionCard
              key={item.q}
              question={item.q}
              answer={item.a}
              open={openIndex === index}
              onToggle={() => setOpenIndex((c) => (c === index ? null : index))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
