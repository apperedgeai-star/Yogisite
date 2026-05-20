"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { loadGsap } from "@/lib/gsap-loader";
import { revertGsapScope } from "@/lib/gsap-scope";

const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
  { label: "Programs", href: "#programs" },
  { label: "Contact", href: "#contact" },
];

type OverlayMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function OverlayMenu({ open, onClose }: OverlayMenuProps) {
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !linksRef.current) return;

    let ctx: { revert: () => void } | undefined;
    let scrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger | undefined;
    let cancelled = false;

    loadGsap().then(({ gsap, ScrollTrigger: ST }) => {
      if (cancelled || !linksRef.current) return;
      scrollTrigger = ST;
      ctx = gsap.context(() => {
        gsap.fromTo(
          ".overlay-link-inner",
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.75,
            stagger: 0.06,
            delay: 0.3,
            ease: "power3.inOut",
          }
        );
      }, linksRef);
    });

    return () => {
      cancelled = true;
      const linksEl = linksRef.current;
      revertGsapScope(ctx, scrollTrigger, linksEl);
    };
  }, [open]);

  if (!open) return null;

  return (
    <motion.div
      className="fixed inset-0 z-overlay flex flex-col"
      style={{
        background: "rgba(5, 5, 5, 0.97)",
        backdropFilter: "blur(40px)",
      }}
      initial={{ clipPath: "circle(0% at 100% 0%)" }}
      animate={{ clipPath: "circle(150% at 100% 0%)" }}
      exit={{ clipPath: "circle(0% at 100% 0%)" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div className="flex items-center justify-between px-6 py-6 md:px-12">
        <a href="#" className="interactive flex items-center gap-3" onClick={onClose}>
          <span className="font-editorial text-[22px] text-gold-300">YK</span>
          <span className="hidden font-satoshi text-[11px] uppercase tracking-[0.3em] text-muted sm:inline">
            Recun Marketing 18
          </span>
        </a>
        <button
          type="button"
          onClick={onClose}
          className="interactive font-satoshi text-xs uppercase tracking-widest text-secondary hover:text-gold-300"
          aria-label="Close menu"
        >
          Close
        </button>
      </motion.div>

      <div
        ref={linksRef}
        className="flex flex-1 flex-col justify-center px-6 md:px-12 lg:px-20"
      >
        <nav className="flex flex-col gap-2 md:gap-4">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="overlay-link interactive group overflow-hidden font-editorial text-[clamp(48px,10vw,80px)] leading-[0.95] text-primary transition-[letter-spacing,color] duration-300 hover:tracking-wide hover:text-gold-300"
            >
              <span className="overlay-link-inner inline-block">
                <span className="mr-3 font-satoshi text-sm text-gold-300">
                  {String(i + 1).padStart(2, "0")} —
                </span>
                {link.label.toUpperCase()}
              </span>
            </a>
          ))}
        </nav>
      </div>

      <div className="h-px bg-gold-300/30 mx-6 md:mx-12" />

      <div className="grid gap-8 px-6 py-8 font-satoshi text-sm text-secondary md:grid-cols-2 md:px-12">
        <div className="space-y-2">
          <a href="tel:+917863033445" className="interactive block hover:text-primary">
            +91 7863033445
          </a>
          <a
            href="mailto:techie.yogi1@gmail.com"
            className="interactive block hover:text-primary"
          >
            techie.yogi1@gmail.com
          </a>
        </div>
        <div className="space-y-2 md:text-right">
          <a
            href="https://instagram.com/iamthatyogii"
            target="_blank"
            rel="noopener noreferrer"
            className="interactive block hover:text-primary"
          >
            @iamthatyogii
          </a>
          <a
            href="https://topmate.io/techieyogi"
            target="_blank"
            rel="noopener noreferrer"
            className="interactive block hover:text-primary"
          >
            topmate.io/techieyogi
          </a>
        </div>
      </div>
    </motion.div>
  );
}
