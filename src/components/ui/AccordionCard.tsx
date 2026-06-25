"use client";

import { useEffect, useRef } from "react";
import { cn, prefersReducedMotion } from "@/lib/utils";

type AccordionCardProps = {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
};

export function AccordionCard({
  question,
  answer,
  open,
  onToggle,
}: AccordionCardProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const body = bodyRef.current;
    const inner = innerRef.current;
    const root = itemRef.current;
    if (!body || !inner || !root) return;

    if (prefersReducedMotion()) {
      body.style.height = open ? "auto" : "0px";
      body.style.opacity = open ? "1" : "0";
      return;
    }

    let cancelled = false;

    import("animejs").then(({ animate }) => {
      if (cancelled) return;

      if (open) {
        body.style.height = "0px";
        body.style.opacity = "0";
        animate(body, {
          height: [0, inner.scrollHeight],
          opacity: [0, 1],
          duration: 400,
          easing: "easeOutQuad",
          complete: () => {
            body.style.height = "auto";
          },
        });
      } else {
        animate(body, {
          height: [body.offsetHeight, 0],
          opacity: [1, 0],
          duration: 320,
          easing: "easeOutQuad",
        });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [open]);

  return (
    <div
      ref={itemRef}
      className={cn("faq-item glass-card", open && "faq-item--open glass-card-gold")}
    >
      <button
        type="button"
        className="faq-trigger tap-target hoverable flex w-full cursor-pointer items-start justify-between gap-6 text-left"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className="faq-question">{question}</span>
        <span
          className={cn("faq-icon faq-toggle", open && "faq-toggle--open")}
          aria-hidden
        >
          +
        </span>
      </button>

      <div
        ref={bodyRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div ref={innerRef} className="faq-answer">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}
