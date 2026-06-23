"use client";

import { useEffect } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const SIZE = 560;
const CENTER = SIZE / 2;

const PLATFORM_NODES = [
  { id: "instagram", label: "Instagram", angle: 270, r: 112, Icon: FaInstagram },
  { id: "facebook", label: "Facebook", angle: 0, r: 112, Icon: FaFacebook },
  { id: "youtube", label: "YouTube", angle: 90, r: 112, Icon: FaYoutube },
  { id: "linkedin", label: "LinkedIn", angle: 180, r: 112, Icon: FaLinkedin },
] as const;

const OUTER_NODES = [
  ...Array.from({ length: 9 }, (_, i) => ({
    id: `ig-niche-${i + 1}`,
    label: `IG Niche ${i + 1}`,
    angle: -90 + i * 20,
    r: 220,
  })),
  ...Array.from({ length: 9 }, (_, i) => ({
    id: `yt-clips-${i + 1}`,
    label: `YT Clips ${i + 1}`,
    angle: 90 + i * 20,
    r: 220,
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
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let cancelled = false;
    import("animejs").then(({ animate, stagger }) => {
      if (cancelled) return;

      animate(".diagram-center", {
        scale: [1, 1.06, 1],
        duration: 2400,
        easing: "easeInOutSine",
        loop: true,
      });

      animate(".diagram-node", {
        opacity: [0, 1],
        scale: [0.6, 1],
        delay: stagger(80, { from: "center" }),
        duration: 600,
        easing: "easeOutExpo",
      });

      document.querySelectorAll(".diagram-line").forEach((line, index) => {
        const len = (line as SVGLineElement).getTotalLength?.() ?? 100;
        animate(line, {
          strokeDasharray: len,
          strokeDashoffset: [len, 0],
          opacity: [0, 0.42],
          delay: index * 36,
          duration: 850,
          easing: "easeOutQuad",
        });
      });

      animate(".diagram-outer-node", {
        translateY: [-3, 3],
        duration: 2800,
        easing: "easeInOutSine",
        loop: true,
        alternate: true,
        delay: stagger(120),
      });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const platformNodes = PLATFORM_NODES.map((node) => ({ ...node, ...point(node.angle, node.r) }));
  const outerNodes = OUTER_NODES.map((node) => ({ ...node, ...point(node.angle, node.r) }));

  return (
    <div className="node-diagram-wrap" role="img" aria-label="22 touchpoint distribution network diagram">
      <svg className="node-diagram-svg" viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden>
        <defs>
          <radialGradient id="diagramGold" cx="50%" cy="38%" r="65%">
            <stop offset="0%" stopColor="#E8C97A" />
            <stop offset="65%" stopColor="#D4A853" />
            <stop offset="100%" stopColor="#8F6E0C" />
          </radialGradient>
        </defs>

        <circle cx={CENTER} cy={CENTER} r={235} className="diagram-orbit" />
        <circle cx={CENTER} cy={CENTER} r={112} className="diagram-orbit diagram-orbit--inner" />

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

        {platformNodes.map(({ Icon, ...node }) => (
          <g key={node.id} transform={`translate(${node.x} ${node.y})`} className="diagram-node">
            <circle r={30} className="diagram-platform-bg" />
            <Icon className="diagram-platform-icon" x={-10} y={-10} />
            <text y={48} textAnchor="middle" className="diagram-label">
              {node.label}
            </text>
          </g>
        ))}

        {outerNodes.map((node) => (
          <g
            key={node.id}
            transform={`translate(${node.x} ${node.y})`}
            className="diagram-node diagram-outer-node"
          >
            <circle r={21} className="diagram-outer-bg" />
            <text y={4} textAnchor="middle" className="diagram-outer-text">
              {node.label.includes("IG") ? "IG" : "YT"}
            </text>
            <text y={38} textAnchor="middle" className="diagram-label diagram-label--small">
              {node.label}
            </text>
          </g>
        ))}

        <g transform={`translate(${CENTER} ${CENTER})`} className="diagram-center diagram-node will-animate">
          <circle r={44} fill="url(#diagramGold)" />
          <circle r={54} className="diagram-center-ring" />
          <text y={-5} textAnchor="middle" className="diagram-center-text">
            YOUR
          </text>
          <text y={12} textAnchor="middle" className="diagram-center-text">
            MAIN PAGE
          </text>
        </g>
      </svg>
    </div>
  );
}
