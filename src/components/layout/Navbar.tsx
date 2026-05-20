"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { loadGsap } from "@/lib/gsap-loader";
import { revertGsapScope } from "@/lib/gsap-scope";
import { SITE } from "@/lib/site";
import { useLenis } from "@/providers/LenisProvider";
import MobileDrawer from "./MobileDrawer";
import SoundToggle from "@/components/ui/SoundToggle";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis();
  const line1 = useRef<HTMLSpanElement>(null);
  const line2 = useRef<HTMLSpanElement>(null);
  const line3 = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const updateScrolled = useCallback((scroll: number) => {
    setScrolled(scroll > 80);
  }, []);

  useEffect(() => {
    if (!lenis) return;
    const onScroll = (e: { scroll: number }) => updateScrolled(e.scroll);
    lenis.on("scroll", onScroll);
    updateScrolled(lenis.scroll);
    return () => lenis.off("scroll", onScroll);
  }, [lenis, updateScrolled]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (menuOpen && lenis) lenis.stop();
    else if (lenis) lenis.start();
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, lenis]);

  useEffect(() => {
    const l1 = line1.current;
    const l2 = line2.current;
    const l3 = line3.current;
    if (!l1 || !l2 || !l3) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    loadGsap().then(({ gsap, ScrollTrigger }) => {
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
      }, navRef) as { revert: () => void };
    });

    return () => {
      cancelled = true;
      const navEl = navRef.current;
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
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-4 md:px-12 md:py-5">
          <a
            href="#"
            className="hoverable interactive flex items-center gap-3 justify-self-start"
          >
            <span
              className="font-editorial text-gold-300"
              style={{ fontSize: 20 }}
            >
              YK
            </span>
            <span
              className="hidden font-satoshi uppercase lg:inline"
              style={{
                fontSize: 10,
                letterSpacing: "0.35em",
                color: "var(--t3)",
              }}
            >
              Recun Marketing 18
            </span>
          </a>

          <nav className="hidden items-center justify-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hoverable nav-link relative font-satoshi transition-colors duration-300"
                style={{ fontSize: 13, color: "var(--t2)" }}
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
              className="hoverable rounded-full border px-5 py-2 font-satoshi transition-colors duration-300"
              style={{
                fontSize: 12,
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
            <SoundToggle variant="inline" />
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
