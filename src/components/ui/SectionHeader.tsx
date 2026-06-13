import type { ReactNode } from "react";

type SectionHeaderProps = {
  label: string;
  title: ReactNode;
  description?: string;
  className?: string;
};

export function SectionHeader({
  label,
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <header className={`section-head ${className}`}>
      <p className="type-label">{label}</p>
      <h2 className="type-section mt-3">{title}</h2>
      {description ? (
        <p className="type-body mt-4 max-w-2xl">{description}</p>
      ) : null}
    </header>
  );
}
