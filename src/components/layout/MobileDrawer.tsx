"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { loadGsap } from "@/lib/gsap-loader";
import { revertGsapScope } from "@/lib/gsap-scope";
import { SITE } from "@/lib/site";

const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileDrawer({ open, onClose }: MobileDrawerProps) {
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
          ".drawer-link-inner",
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            delay: 0.15,
            ease: "power3.out",
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
      style={{ background: "rgba(3, 3, 3, 0.98)" }}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex items-center justify-end px-5 py-6">
        <button
          type="button"
          onClick={onClose}
          className="tap-target hoverable font-satoshi text-xs uppercase tracking-widest text-secondary transition-colors hover:text-gold-300"
          aria-label="Close menu"
        >
          Close
        </button>
      </div>

      <div
        ref={linksRef}
        className="flex flex-1 flex-col justify-center px-5"
      >
        <nav className="flex flex-col gap-2">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="hoverable tap-target drawer-link group overflow-hidden font-editorial leading-[0.95] text-primary transition-colors duration-300 hover:text-gold-300"
              style={{ fontSize: "clamp(40px, 10vw, 52px)" }}
            >
              <span className="drawer-link-inner inline-block">
                <span
                  className="mr-3 font-satoshi text-sm text-gold-300"
                  style={{ letterSpacing: "0.2em" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {link.label}
              </span>
            </a>
          ))}
        </nav>
      </div>

      <div
        className="border-t px-5 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] font-satoshi text-sm"
        style={{ borderColor: "var(--b1)", color: "var(--t2)" }}
      >
        <div className="flex flex-col gap-4">
          <a
            href={`tel:${SITE.phoneTel}`}
            className="tap-target hoverable text-base transition-colors hover:text-gold-300"
          >
            {SITE.phone}
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="tap-target hoverable transition-colors hover:text-gold-300"
          >
            {SITE.email}
          </a>
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-target hoverable transition-colors hover:text-gold-300"
          >
            {SITE.instagramHandle}
          </a>
          <a
            href={SITE.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-target hoverable font-medium text-gold-300 transition-colors"
          >
            Book a call →
          </a>
        </div>
      </div>
    </motion.div>
  );
}
