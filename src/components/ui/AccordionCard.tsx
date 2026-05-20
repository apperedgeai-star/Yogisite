"use client";

import { cn } from "@/lib/utils";

const OPEN_SHADOW = "0 0 0 1px var(--g300)";

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
  return (
    <div
      className={cn(
        "accordion-card rounded-sm border bg-[var(--card)] transition-[border-color,box-shadow] duration-300",
        open && "border-[var(--g300)]"
      )}
      style={{
        borderColor: open ? "var(--g300)" : "var(--b1)",
        boxShadow: open ? OPEN_SHADOW : "0 0 0 0px transparent",
      }}
    >
      <button
        type="button"
        className="tap-target hoverable flex min-h-[44px] w-full items-center justify-between gap-4 px-6 py-5 text-left md:px-8 md:py-6"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span
          className="font-satoshi font-medium"
          style={{ fontSize: "var(--f-base)", color: "var(--t1)" }}
        >
          {question}
        </span>
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-satoshi text-lg leading-none transition-[transform,border-color,background-color,color] duration-300",
            open
              ? "rotate-45 border-[var(--g300)] bg-[var(--g-glow)] text-[var(--g300)]"
              : "border-[var(--b2)] text-[var(--g300)]"
          )}
          aria-hidden
        >
          +
        </span>
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-[550ms] ease-[cubic-bezier(0.76,0,0.24,1)]",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div
            className="px-6 pb-6 font-satoshi leading-relaxed md:px-8 md:pb-8"
            style={{ fontSize: "var(--f-base)", color: "var(--t2)" }}
          >
            <p>{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
