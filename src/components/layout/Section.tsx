import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  tone?: "base" | "deep" | "elevated";
  border?: boolean;
  className?: string;
  innerClassName?: string;
  fullBleed?: boolean;
  children: ReactNode;
};

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  {
    id,
    tone = "base",
    border = true,
    className,
    innerClassName,
    fullBleed = false,
    children,
  },
  ref
) {
  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "section-block",
        `section-block--${tone}`,
        border && "section-block--border",
        className
      )}
    >
      {fullBleed ? children : (
        <div className={cn("site-container", innerClassName)}>{children}</div>
      )}
    </section>
  );
});

type SiteGridProps = {
  className?: string;
  children: ReactNode;
};

export function SiteGrid({ className, children }: SiteGridProps) {
  return <div className={cn("site-grid", className)}>{children}</div>;
}

type ColProps = {
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  spanMd?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  spanLg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  className?: string;
  children: ReactNode;
};

const SPAN: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
};

const SPAN_MD: Record<number, string> = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
  7: "md:col-span-7",
  8: "md:col-span-8",
  9: "md:col-span-9",
  10: "md:col-span-10",
  11: "md:col-span-11",
  12: "md:col-span-12",
};

const SPAN_LG: Record<number, string> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  6: "lg:col-span-6",
  7: "lg:col-span-7",
  8: "lg:col-span-8",
  9: "lg:col-span-9",
  10: "lg:col-span-10",
  11: "lg:col-span-11",
  12: "lg:col-span-12",
};

export function Col({ span = 12, spanMd, spanLg, className, children }: ColProps) {
  return (
    <div
      className={cn(
        SPAN[span] ?? SPAN[12],
        spanMd && (SPAN_MD[spanMd] ?? SPAN_MD[12]),
        spanLg && (SPAN_LG[spanLg] ?? SPAN_LG[12]),
        className
      )}
    >
      {children}
    </div>
  );
}
