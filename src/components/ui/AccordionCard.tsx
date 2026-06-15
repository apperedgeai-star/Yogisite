"use client";

import { useEffect, useRef } from "react";
import { cn, prefersReducedMotion } from "@/lib/utils";
import { loadGsap } from "@/lib/gsap-loader";
import type { GsapContextHandle } from "@/lib/gsap-scope";

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
    let ctx: GsapContextHandle | undefined;

    loadGsap().then(({ gsap }) => {
      if (cancelled) return;

      ctx = gsap.context(() => {
        if (open) {
          gsap.set(body, { height: "auto", opacity: 0 });
          const h = inner.offsetHeight;
          gsap.fromTo(
            body,
            { height: 0, opacity: 0 },
            {
              height: h,
              opacity: 1,
              duration: 0.45,
              ease: "power3.out",
              onComplete: () => {
                gsap.set(body, { height: "auto" });
              },
            }
          );
        } else {
          const h = body.offsetHeight;
          gsap.fromTo(
            body,
            { height: h, opacity: 1 },
            {
              height: 0,
              opacity: 0,
              duration: 0.35,
              ease: "power3.inOut",
            }
          );
        }
      }, root) as GsapContextHandle;
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [open]);

  return (
    <div
      ref={itemRef}
      className={cn("faq-item glass-card", open && "faq-item--open glass-card-gold")}
    >
      <button
        type="button"
        className="tap-target hoverable flex w-full cursor-pointer items-start justify-between gap-6 text-left"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className="faq-question">{question}</span>
        <span
          className={cn("faq-toggle", open && "faq-toggle--open")}
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
