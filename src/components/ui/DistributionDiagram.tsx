"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const IG_NODES = Array.from({ length: 9 }, (_, index) => ({
  id: `ig-${index + 1}`,
  x: 120 + (index % 3) * 80,
  y: 95 + Math.floor(index / 3) * 78,
}));

const YT_NODES = Array.from({ length: 9 }, (_, index) => ({
  id: `yt-${index + 1}`,
  x: 660 + (index % 3) * 80,
  y: 95 + Math.floor(index / 3) * 78,
}));

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.75 },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: index * 0.08, duration: 0.4, ease: "easeOut" },
  }),
};

const lineVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (index: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { delay: 0.2 + index * 0.045, duration: 0.8, ease: "easeInOut" },
  }),
};

function TouchpointNode({
  x,
  y,
  label,
  tone,
  index,
}: {
  x: number;
  y: number;
  label: "IG" | "YT";
  tone: "ig" | "yt";
  index: number;
}) {
  return (
    <motion.g custom={index} variants={nodeVariants} style={{ willChange: "transform" }}>
      <circle
        cx={x}
        cy={y}
        r={24}
        className={tone === "ig" ? "distribution-node distribution-node--ig" : "distribution-node distribution-node--yt"}
      />
      <text x={x} y={y + 4} textAnchor="middle" className="distribution-node-label">
        {label}
      </text>
    </motion.g>
  );
}

export function DistributionDiagram() {
  const center = { x: 450, y: 205 };

  return (
    <div
      className="distribution-diagram-card"
      role="img"
      aria-label="Animated content distribution network with 9 Instagram pages, one main page, and 9 YouTube Shorts pages"
    >
      <svg viewBox="0 0 900 420" className="distribution-svg" aria-hidden>
        <AnimatePresence>
          <motion.g initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
            {IG_NODES.map((node, index) => (
              <motion.line
                key={`ig-line-${node.id}`}
                x1={node.x + 24}
                y1={node.y}
                x2={center.x - 62}
                y2={center.y}
                className="distribution-line distribution-line--ig"
                custom={index}
                variants={lineVariants}
                style={{ willChange: "transform" }}
              />
            ))}
            {YT_NODES.map((node, index) => (
              <motion.line
                key={`yt-line-${node.id}`}
                x1={center.x + 62}
                y1={center.y}
                x2={node.x - 24}
                y2={node.y}
                className="distribution-line distribution-line--yt"
                custom={index + 9}
                variants={lineVariants}
                style={{ willChange: "transform" }}
              />
            ))}

            {IG_NODES.map((node, index) => (
              <TouchpointNode key={node.id} {...node} label="IG" tone="ig" index={index} />
            ))}

            {YT_NODES.map((node, index) => (
              <TouchpointNode key={node.id} {...node} label="YT" tone="yt" index={index + 9} />
            ))}

            <motion.g
              custom={18}
              variants={nodeVariants}
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: `${center.x}px ${center.y}px`, willChange: "transform" }}
            >
              <circle cx={center.x} cy={center.y} r={64} className="distribution-center" />
              <text x={center.x} y={center.y - 8} textAnchor="middle" className="distribution-center-label">
                YOUR MAIN PAGE
              </text>
              <foreignObject x={center.x - 50} y={center.y + 8} width={100} height={28}>
                <div className="distribution-center-icons">
                  <FaInstagram />
                  <FaFacebook />
                  <FaYoutube />
                  <FaLinkedin />
                </div>
              </foreignObject>
            </motion.g>
          </motion.g>
        </AnimatePresence>
      </svg>
      <p className="distribution-touchpoints-label">18 DISTRIBUTION TOUCHPOINTS</p>
    </div>
  );
}

export default DistributionDiagram;