"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  variant?: "filled" | "ghost";
  dataCursor?: string;
};

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  variant = "filled",
  dataCursor,
}: MagneticButtonProps) {
  const base = cn(
    "magnetic hoverable interactive tap-target inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-full px-8 py-4 font-satoshi text-sm font-medium tracking-wide transition-colors duration-300",
    variant === "filled"
      ? "border border-transparent bg-gold-300 text-void hover:bg-gold-200"
      : "border border-[var(--border-visible)] text-primary hover:border-gold-300 hover:text-gold-300",
    className
  );

  const cursorAttr = dataCursor ? { "data-cursor": dataCursor } : {};

  if (href) {
    return (
      <a
        href={href}
        className={base}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        {...cursorAttr}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={base} onClick={onClick} {...cursorAttr}>
      {children}
    </button>
  );
}
