"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/animations";

const creators = [
  { name: "Nawaz Shaikh", followers: "1.6M+", session: "Ghostwriting Session", initials: "NS" },
  { name: "Riya Upreti", followers: "1M", session: "Ghostwriting Session", initials: "RU" },
  { name: "Shubhankar Sen Gupta", followers: "35K+", session: "Strategy Session", initials: "SG" },
  { name: "Viplav Panghal", followers: "215K+", session: "Generative AI Sessions and Content Strategy", initials: "VP" },
  { name: "Gaurav Rawat", followers: "100K+", session: "Generative AI Sessions and Content Strategy", initials: "GR" },
  { name: "RJ Dheeraj", followers: "70K+", session: "PR Collab Session", initials: "RD" },
  { name: "Karthik Naidu", followers: "—", session: "SAAS & Marketing Sessions", initials: "KN" },
  { name: "Romil Mavani", followers: "—", session: "Mavani Solutions IT Agency · Business Consultancy", initials: "RM" },
  { name: "Undisclosed", followers: "—", session: "Travel Agency · Sales Session", initials: "—" },
  { name: "Undisclosed", followers: "—", session: "Marketing Agency · Business Consultancy", initials: "—" },
  { name: "Undisclosed", followers: "—", session: "Sales Session", initials: "—" },
  { name: "Undisclosed", followers: "—", session: "SAAS Solution", initials: "—" },
];

export default function RealConversations() {
  return (
    <section className="section-padding bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          {...fadeUp}
          className="mb-4 font-display text-4xl text-[var(--text-primary)] md:text-5xl"
        >
          Real Conversations. Real Collaboration.
        </motion.h2>

        <motion.div
          {...staggerContainer}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {creators.map((c, i) => (
            <motion.div
              key={`${c.name}-${i}`}
              variants={scaleIn}
              className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-5"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--gold)] font-sans text-sm font-bold text-[var(--gold)]">
                  {c.initials}
                </div>
                <div>
                  <p className="font-sans font-semibold text-[var(--text-primary)]">{c.name}</p>
                  <p className="font-stats text-xl font-bold text-[var(--gold)]">{c.followers}</p>
                  <p className="mt-1 font-sans text-xs text-[var(--text-muted)]">{c.session}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
