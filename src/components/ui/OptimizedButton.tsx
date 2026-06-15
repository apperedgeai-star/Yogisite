"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-gold hover:bg-gold-light text-void shadow-lg hover:shadow-xl active:scale-95",
        secondary: "bg-card border border-b1 text-t1 hover:bg-card-hover hover:border-b-gold",
        ghost: "text-t1 hover:text-gold hover:bg-glass",
        accent: "bg-gradient-to-r from-gold to-gold-light text-void hover:shadow-glow",
      },
      size: {
        sm: "text-sm px-4 py-2",
        md: "text-base px-6 py-3",
        lg: "text-lg px-8 py-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface OptimizedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  loading?: boolean;
}

export function OptimizedButton({
  variant,
  size,
  className,
  children,
  icon,
  loading,
  ...props
}: OptimizedButtonProps) {
  return (
    <button
      className={clsx(buttonVariants({ variant, size }), className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
          {children}
        </>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}
