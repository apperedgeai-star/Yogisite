"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { loadGsap } from "@/lib/gsap-loader";
import { revertGsapScope } from "@/lib/gsap-scope";
import { ASSETS } from "@/lib/assets";
import { SITE } from "@/lib/site";
import MobileDrawer from "./MobileDrawer";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const SERVICE_TAGS = ["Personal Branding", "Business Branding", "Tech & AI"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const line1 = useRef<HTMLSpanElement>(null);
  const line2 = useRef<HTMLSpanElement>(null);
  const line3 = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const updateScrolled = useCallback((scroll: number) => {
    setScrolled(scroll > 80);
  }, []);

  useEffect(() => {
    const onScroll = () => updateScrolled(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [updateScrolled]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const l1 = line1.current;
    const l2 = line2.current;
    const l3 = line3.current;
    if (!l1 || !l2 || !l3) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    const navEl = navRef.current;

    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        if (menuOpen) {
          gsap.to(l1, { y: 7, rotation: 45, duration: 0.4, ease: "power3.inOut" });
          gsap.to(l2, { opacity: 0, duration: 0.25 });
          gsap.to(l3, { y: -7, rotation: -45, duration: 0.4, ease: "power3.inOut" });
        } else {
          gsap.to(l1, { y: 0, rotation: 0, duration: 0.4, ease: "power3.inOut" });
          gsap.to(l2, { opacity: 1, duration: 0.25 });
          gsap.to(l3, { y: 0, rotation: 0, duration: 0.4, ease: "power3.inOut" });
        }
      }, navEl ?? undefined) as { revert: () => void };
    });

    return () => {
      cancelled = true;
      loadGsap().then(({ ScrollTrigger }) => {
        revertGsapScope(ctx, ScrollTrigger, navEl);
      });
    };
  }, [menuOpen]);

  return (
    <>
      <header
        ref={navRef}
        className="navbar-safe fixed left-0 right-0 top-0 z-header"
        style={{
          background: scrolled ? "rgba(6, 6, 6, 0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--b1)" : "1px solid transparent",
          transition: "all 0.4s ease",
        }}
      >
        <div className="navbar-inner grid grid-cols-[1fr_auto] items-center gap-3 py-3.5 md:grid-cols-[1fr_auto_1fr] md:gap-4 md:py-5">
          <a
            href="#hero"
            className="hoverable interactive flex min-w-0 items-center gap-2.5 justify-self-start sm:gap-3"
          >
            <Image
              src={ASSETS.logo}
              alt="Yogii Kumar"
              width={36}
              height={36}
              className="h-9 w-9 shrink-0 object-contain"
              priority
            />
            <div className="min-w-0">
              <span className="type-nav-brand block truncate text-[13px] sm:text-base">
                Yogii Kumar
              </span>
              <span
                className="type-caption hidden lg:block"
                style={{ color: "var(--t4)", fontSize: "10px", letterSpacing: "0.08em" }}
              >
                {SERVICE_TAGS.join(" · ")}
              </span>
            </div>
          </a>

          <nav className="hidden items-center justify-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="type-nav-link hoverable nav-link relative transition-colors duration-300"
                style={{ color: "var(--t2)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--g300)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--t2)";
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center justify-end gap-4 justify-self-end lg:flex">
            <a
              href={SITE.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="type-button hoverable rounded-full border px-5 py-2 transition-colors duration-300"
              style={{
                borderColor: "var(--g-border)",
                color: "var(--t1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--g300)";
                e.currentTarget.style.color = "var(--void)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--t1)";
              }}
            >
              Book a Call
            </a>
          </div>

          <button
            type="button"
            className="tap-target hoverable relative z-[81] flex h-11 w-11 flex-col items-center justify-center justify-self-end lg:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              ref={line1}
              className="block h-px w-5 origin-center bg-primary"
            />
            <span ref={line2} className="mt-1.5 block h-px w-5 bg-primary" />
            <span
              ref={line3}
              className="mt-1.5 block h-px w-5 origin-center bg-primary"
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
