"use client";

import { motion } from "framer-motion";
import { FaInstagram, FaFacebook, FaYoutube, FaLinkedin } from "react-icons/fa";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/animations";

const comparison = [
  ["Post on 1 page", "4 main accounts + 18 distribution touchpoints"],
  ["Hope algorithm picks it", "Multi-platform every day"],
  ["Charge ₹4–6L/month", "$2000/month (half the market)"],
  ["Zero distribution plan", "50K followers — guaranteed"],
  ["You remain invisible", "You appear everywhere. You become the authority."],
];

const igNodes = [
  "Fan Page",
  "Insights",
  "Official",
  "Business",
  "Stories",
  "Quotes",
  "Niche 01",
  "Niche 02",
  "Niche 03",
];

const ytNodes = [
  "Shorts",
  "Clips",
  "Daily",
  "Reels",
  "Highlights",
  "Moments",
  "Niche 04",
  "Niche 05",
  "Niche 06",
];

function NodeGrid({
  nodes,
  label,
  color,
  bg,
}: {
  nodes: string[];
  label: string;
  color: string;
  bg: string;
}) {
  return (
    <div>
      <p className="mb-3 text-center font-sans text-xs font-semibold uppercase tracking-wider" style={{ color }}>
        {label}
      </p>
      <div className="rounded-2xl p-4" style={{ background: bg }}>
        <div className="grid grid-cols-3 gap-3">
          {nodes.map((node) => (
            <div key={node} className="flex flex-col items-center gap-1">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white md:h-12 md:w-12"
                style={{ background: color }}
              >
                {label.includes("INSTAGRAM") ? "IG" : "YT"}
              </div>
              <span className="text-center text-[9px] text-[var(--text-muted)]">{node}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Mechanism() {
  return (
    <section id="mechanism" className="section-padding bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mb-12 max-w-2xl">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-[var(--gold)]">
            The Mechanism
          </p>
          <h2 className="mt-3 font-display text-4xl text-[var(--text-primary)] md:text-5xl">
            Distribution is the new king.
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div {...staggerContainer} className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              <span>What Others Do</span>
              <span className="text-[var(--gold)]">What We Do</span>
            </div>
            {comparison.map(([others, ours]) => (
              <motion.div
                key={others}
                variants={scaleIn}
                className="grid grid-cols-2 gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4 text-sm"
              >
                <span className="text-[var(--text-muted)]">{others}</span>
                <span className="text-[var(--text-primary)]">{ours}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fadeUp} className="relative">
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-center">
              <div className="hidden w-full max-w-[140px] md:block">
                <NodeGrid
                  nodes={igNodes}
                  label="9 × Instagram Pages"
                  color="#7B2FFF"
                  bg="rgba(123,47,255,0.08)"
                />
              </div>

              <div className="relative flex flex-col items-center">
                <div className="mechanism-pulse relative z-10 flex h-28 w-28 flex-col items-center justify-center rounded-full bg-[var(--gold)] text-center shadow-[0_0_60px_rgba(201,168,76,0.4)] md:h-32 md:w-32">
                  <span className="font-sans text-[10px] font-bold uppercase leading-tight text-[var(--bg-primary)]">
                    Your
                    <br />
                    Main Page
                  </span>
                </div>
                <div className="mt-4 flex gap-3 text-[var(--text-primary)]">
                  <FaInstagram size={18} />
                  <FaFacebook size={18} />
                  <FaYoutube size={18} />
                  <FaLinkedin size={18} />
                </div>
                <p className="mt-6 text-center font-sans text-xs font-medium uppercase tracking-[0.2em] text-[var(--gold)]">
                  18 Distribution Touchpoints
                </p>
              </div>

              <div className="hidden w-full max-w-[140px] md:block">
                <NodeGrid
                  nodes={ytNodes}
                  label="9 × YouTube Shorts"
                  color="#FF3B3B"
                  bg="rgba(255,59,59,0.08)"
                />
              </div>
            </div>

            {/* Mobile simplified */}
            <div className="mt-8 grid grid-cols-2 gap-4 md:hidden">
              <NodeGrid
                nodes={igNodes.slice(0, 4)}
                label="+ 9 Instagram"
                color="#7B2FFF"
                bg="rgba(123,47,255,0.08)"
              />
              <NodeGrid
                nodes={ytNodes.slice(0, 4)}
                label="+ 9 YouTube"
                color="#FF3B3B"
                bg="rgba(255,59,59,0.08)"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
