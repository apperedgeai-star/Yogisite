"use client";

import { useEffect, useRef } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa6";

const SIZE = 560;
const CENTER = SIZE / 2;

const PLATFORM_NODES = [
  { id: "instagram", label: "Instagram", short: "IG", Icon: FaInstagram, angle: 270, r: 116 },
  { id: "facebook", label: "Facebook", short: "FB", Icon: FaFacebookF, angle: 0, r: 116 },
  { id: "youtube", label: "YouTube", short: "YT", Icon: FaYoutube, angle: 90, r: 116 },
  { id: "linkedin", label: "LinkedIn", short: "IN", Icon: FaLinkedinIn, angle: 180, r: 116 },
] as const;

const OUTER_NODES = [
  ...Array.from({ length: 9 }, (_, i) => ({
    id: `ig-niche-${i + 1}`,
    label: `IG ${i + 1}`,
    group: "IG",
    angle: 205 + i * 16.25,
    r: 222,
  })),
  ...Array.from({ length: 9 }, (_, i) => ({
    id: `yt-clips-${i + 1}`,
    label: `YT ${i + 1}`,
    group: "YT",
    angle: -25 + i * 16.25,
    r: 222,
  })),
] as const;

function point(angle: number, r: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: CENTER + Math.cos(rad) * r,
    y: CENTER + Math.sin(rad) * r,
  };
}

export default function NodeDiagram() {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let cancelled = false;
    const root = diagramRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting || cancelled) return;
        observer.disconnect();

        const { animate, stagger } = await import("animejs");
        if (cancelled) return;

        const lines = root.querySelectorAll(".diagram-line");
        const nodes = root.querySelectorAll(".diagram-html-node, .diagram-spoke-dot");

        animate(lines, {
          opacity: [0, 0.46],
          duration: 800,
          easing: "easeOutSine",
        });

        animate(nodes, {
          opacity: [0, 1],
          scale: [0, 1],
          delay: stagger(60, { from: "center" }),
          duration: 500,
          easing: "easeOutBack",
        });

        animate(root.querySelectorAll(".diagram-core"), {
          scale: [1, 1.06, 1],
          duration: 2400,
          easing: "easeInOutSine",
          loop: true,
        });

        animate(root.querySelectorAll(".diagram-spoke-dot"), {
          opacity: [0.25, 1, 0.25],
          scale: [0.75, 1.18, 0.75],
          duration: 2200,
          easing: "easeInOutSine",
          loop: true,
          delay: stagger(95),
        });

        animate(root.querySelectorAll(".diagram-outer-node-html"), {
          translateY: [-3, 3],
          duration: 2800,
          easing: "easeInOutSine",
          loop: true,
          alternate: true,
          delay: stagger(120),
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(root);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  const platformNodes = PLATFORM_NODES.map((node) => ({ ...node, ...point(node.angle, node.r) }));
  const outerNodes = OUTER_NODES.map((node) => ({ ...node, ...point(node.angle, node.r) }));

  return (
    <div ref={diagramRef} className="node-diagram-wrap" role="img" aria-label="22 touchpoint distribution network diagram">
      <svg className="node-diagram-svg" viewBox={`-40 -20 ${SIZE + 80} ${SIZE + 40}`} overflow="visible" aria-hidden>
        <defs>
          <radialGradient id="diagramGold" cx="50%" cy="38%" r="65%">
            <stop offset="0%" stopColor="#E8C97A" />
            <stop offset="65%" stopColor="#D4A853" />
            <stop offset="100%" stopColor="#8F6E0C" />
          </radialGradient>
          <filter id="diagramGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx={CENTER} cy={CENTER} r={235} className="diagram-orbit" />
        <circle cx={CENTER} cy={CENTER} r={172} className="diagram-orbit diagram-orbit--middle" />
        <circle cx={CENTER} cy={CENTER} r={116} className="diagram-orbit diagram-orbit--inner" />
        <circle cx={CENTER} cy={CENTER} r={46} className="diagram-core-halo" filter="url(#diagramGlow)" />

        {[...platformNodes, ...outerNodes].map((node) => (
          <line
            key={`line-${node.id}`}
            className="diagram-line will-animate"
            x1={CENTER}
            y1={CENTER}
            x2={node.x}
            y2={node.y}
          />
        ))}

        {outerNodes.map((node) => (
          <g
            key={node.id}
            transform={`translate(${node.x} ${node.y})`}
            className="diagram-spoke-dot"
          >
            <circle r={8} className="diagram-outer-bg" />
          </g>
        ))}

        <g transform={`translate(${CENTER} ${CENTER})`} className="diagram-core will-animate">
          <circle r={56} fill="url(#diagramGold)" />
          <circle r={68} className="diagram-center-ring" />
          <text y={-7} textAnchor="middle" className="diagram-center-text">
            YOUR
          </text>
          <text y={13} textAnchor="middle" className="diagram-center-text">
            MAIN PAGE
          </text>
        </g>
      </svg>

      <div className="diagram-html-layer" aria-hidden>
        {platformNodes.map(({ id, label, short, Icon, x, y }) => (
          <div
            key={id}
            className={`diagram-html-node diagram-platform-node diagram-platform-node--${id}`}
            style={{ left: `${(x / SIZE) * 100}%`, top: `${(y / SIZE) * 100}%` }}
          >
            <span className="diagram-icon-shell">
              <Icon aria-hidden />
            </span>
            <span className="diagram-node-label">{label}</span>
            <span className="diagram-node-short">{short}</span>
          </div>
        ))}

        {outerNodes.map(({ id, label, group, x, y }) => (
          <div
            key={id}
            className="diagram-html-node diagram-outer-node-html"
            style={{ left: `${(x / SIZE) * 100}%`, top: `${(y / SIZE) * 100}%` }}
          >
            <span>{group}</span>
            <small>{label}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
