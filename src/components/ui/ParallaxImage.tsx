"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type ParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
  height?: string;
};

export function ParallaxImage({
  src,
  alt,
  className = "",
  height = "min-h-[500px]",
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.85], [1.15, 1]);

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden ${height} ${className}`}
    >
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <Image
          src={src}
          alt={alt}
          fill
          loading="lazy"
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </motion.div>
    </div>
  );
}
