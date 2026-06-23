"use client";

import { useState } from "react";
import { AccordionCard } from "@/components/ui/AccordionCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Col, Section, SiteGrid } from "@/components/layout/Section";
import { FAQ_ITEMS } from "@/lib/content";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section id="faq" tone="base" className="faq-section">
      <SiteGrid>
        <Col span={12} spanLg={8} className="lg:col-start-3">
          <SectionHeader label="FAQ" title="Straight answers." className="mb-10 md:mb-12" />
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
        </Col>
      </SiteGrid>
    </Section>
  );
}
