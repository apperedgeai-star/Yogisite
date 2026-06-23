"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { headerReveal } from "@/lib/animations";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        {...headerReveal}
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-all duration-300",
          scrolled
            ? "border-b border-[var(--border)] bg-black/60 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <Link href="#hero" className="flex items-center gap-3">
            <Image
              src="/logos/trm-icon.svg"
              alt="TRM"
              width={36}
              height={36}
              priority
            />
            <span className="flex flex-col leading-none">
              <span className="font-sans text-sm font-semibold tracking-wide text-[var(--gold)] md:text-base">
                Yogii Kumar
              </span>
              <span className="mt-1 hidden font-sans text-[10px] font-medium tracking-[0.16em] text-[var(--t3)] lg:block">
                Personal Branding · Business Branding · Tech &amp; AI
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={SITE.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full bg-[var(--gold)] px-5 py-2.5 font-sans text-sm font-semibold text-[var(--bg-primary)] transition-colors duration-200 hover:bg-[var(--gold-light)] md:inline-flex"
            >
              Book a Call
            </a>
            <button
              type="button"
              className="tap-target flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-primary)] md:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex flex-col bg-[var(--bg-primary)]/98 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between px-4 py-4">
              <span className="font-sans text-sm font-semibold text-[var(--gold)]">
                YOGII KUMAR
              </span>
              <button
                type="button"
                className="tap-target flex h-11 w-11 items-center justify-center"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-center justify-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-4xl text-[var(--text-primary)]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={SITE.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 rounded-full bg-[var(--gold)] px-8 py-3 font-sans text-sm font-semibold text-[var(--bg-primary)]"
              >
                Book a Call
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
