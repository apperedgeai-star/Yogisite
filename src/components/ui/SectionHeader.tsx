import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  label: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "section-head",
        align === "center" && "section-head--center mx-auto text-center",
        className
      )}
    >
      <p className="section-label">{label}</p>
      <h2 className="type-section mt-5">{title}</h2>
      {description ? (
        <p className="type-body section-head__desc mt-4">{description}</p>
      ) : null}
    </header>
  );
}
