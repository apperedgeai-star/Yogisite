"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { prefersReducedMotion } from "@/lib/utils";

const stats = [
  { value: 125, suffix: "M+", label: "VIEWS DELIVERED" },
  { value: 3, suffix: "+", label: "NATIONAL BRANDS" },
  { value: 10, suffix: "+", label: "A-LIST CREATORS" },
  { value: 2000, prefix: "$", label: "OR $1000 W/O DISTRIBUTION", isPrice: true },
];

function AnimatedStat({
  value,
  suffix = "",
  prefix = "",
  isPrice,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  isPrice?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionVal = useMotionValue(0);
  const display = useTransform(motionVal, (v) =>
    Math.round(v).toLocaleString()
  );
  const [text, setText] = useState(prefix ? `${prefix}0` : "0");

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setText(`${prefix}${value}${suffix}`);
      return;
    }
    const controls = animate(motionVal, value, {
      duration: 2,
      ease: "easeOut",
    });
    const unsub = display.on("change", (v) => setText(`${prefix}${v}${suffix}`));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, value, prefix, suffix, motionVal, display]);

  if (isPrice) {
    return (
      <span ref={ref} className="font-stats text-3xl font-bold text-[var(--gold)] md:text-4xl">
        {text}
      </span>
    );
  }

  return (
    <span ref={ref} className="font-stats text-3xl font-bold text-[var(--gold)] md:text-4xl">
      {text}
    </span>
  );
}

export default function StatStrip() {
  return (
    <motion.section
      {...fadeUp}
      className="border-y border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-12 md:px-6"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-4 md:gap-0">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col items-center text-center ${
              i < stats.length - 1 ? "md:border-r md:border-[var(--border)]" : ""
            }`}
          >
            <AnimatedStat
              value={stat.value}
              suffix={stat.suffix}
              prefix={stat.prefix}
              isPrice={stat.isPrice}
            />
            <p className="mt-2 font-stats text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--text-muted)] md:text-xs">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
