"use client";

import { useRef, useState, useEffect } from "react";
import { loadGsap } from "@/lib/gsap-loader";
import { revertGsapScope } from "@/lib/gsap-scope";
import { cn } from "@/lib/utils";

const OPEN_SHADOW =
  "0 0 0 1px rgba(200,169,78,0.5), 0 8px 40px rgba(200,169,78,0.08)";
const CLOSED_SHADOW = "0 0 0 0px rgba(200,169,78,0), 0 0px 0px rgba(200,169,78,0)";

type AccordionCardProps = {
  question: string;
  answer: string;
  defaultOpen?: boolean;
};

export function AccordionCard({
  question,
  answer,
  defaultOpen = false,
}: AccordionCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cardEl = cardRef.current;
    return () => {
      if (!cardEl) return;
      loadGsap().then(({ ScrollTrigger }) => {
        revertGsapScope(undefined, ScrollTrigger, cardEl);
      });
    };
  }, []);

  const toggle = () => {
    const card = cardRef.current;
    const content = contentRef.current;
    const inner = innerRef.current;
    const icon = iconRef.current;
    if (!card || !content || !inner || !icon) return;

    loadGsap().then(({ gsap }) => {
      if (!open) {
        setOpen(true);
        gsap.set(content, { height: "auto" });
        const targetHeight = inner.offsetHeight;

        gsap.fromTo(
          content,
          { height: 0, opacity: 0 },
          {
            height: targetHeight,
            opacity: 1,
            duration: 0.55,
            ease: "power3.inOut",
            onComplete: () => {
              gsap.set(content, { height: "auto" });
            },
          }
        );

        gsap.to(card, {
          boxShadow: OPEN_SHADOW,
          borderColor: "rgba(200, 169, 78, 0.35)",
          duration: 0.4,
          ease: "power2.out",
        });

        gsap.to(icon, {
          rotation: 45,
          duration: 0.4,
          ease: "power2.inOut",
        });
      } else {
        gsap.to(content, {
          height: 0,
          opacity: 0,
          duration: 0.55,
          ease: "power3.inOut",
          onComplete: () => setOpen(false),
        });

        gsap.to(card, {
          boxShadow: CLOSED_SHADOW,
          borderColor: "var(--border-subtle)",
          duration: 0.4,
          ease: "power2.inOut",
        });

        gsap.to(icon, {
          rotation: 0,
          duration: 0.4,
          ease: "power2.inOut",
        });
      }
    });
  };

  const paragraphs = answer.split(/\n\n+/).filter(Boolean);

  return (
    <div
      ref={cardRef}
      className="accordion-card rounded-sm border border-[var(--border-subtle)] bg-[var(--bg-card)]"
      style={{ boxShadow: CLOSED_SHADOW }}
    >
      <button
        type="button"
        className="tap-target interactive flex min-h-[44px] w-full items-center justify-between gap-4 px-6 py-5 text-left md:px-8 md:py-6"
        onClick={toggle}
        aria-expanded={open}
      >
        <span className="font-satoshi text-base font-medium text-primary md:text-lg">
          {question}
        </span>
        <span
          ref={iconRef}
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--border-visible)] text-gold-300",
            open && "border-gold-300/60 bg-gold-500/15"
          )}
          aria-hidden
        >
          +
        </span>
      </button>

      <div ref={contentRef} className="h-0 overflow-hidden opacity-0">
        <div
          ref={innerRef}
          className="space-y-3 px-6 pb-6 font-satoshi text-sm leading-relaxed text-secondary md:px-8 md:pb-8 md:text-base"
        >
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
