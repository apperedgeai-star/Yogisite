"use client";

import { motion } from "framer-motion";
import { prefersReducedMotion } from "@/lib/utils";

type SplitRevealProps = {
  text: string;
  delay?: number;
  className?: string;
};

export function SplitReveal({
  text,
  delay = 0,
  className = "",
}: SplitRevealProps) {
  const lines = text.split("\n");
  const reduced = prefersReducedMotion();

  if (reduced) {
    return (
      <div className={className}>
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      {lines.map((line, i) => (
        <div key={i} style={{ overflow: "hidden" }}>
          <motion.div
            initial={{ y: "100%", rotateX: 10 }}
            whileInView={{ y: "0%", rotateX: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.12,
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{ transformOrigin: "bottom" }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
