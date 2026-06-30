"use client";

import type React from "react";

const WIDTH = 560;
const HEIGHT = 460;
const CENTER = { x: 280, y: 210 };

const PLATFORM_NODES = [
  { id: "instagram", label: "Instagram", short: "IG", x: 280, y: 82 },
  { id: "facebook", label: "Facebook", short: "FB", x: 124, y: 210 },
  { id: "linkedin", label: "LinkedIn", short: "IN", x: 436, y: 210 },
  { id: "youtube", label: "YouTube", short: "YT", x: 280, y: 338 },
] as const;

function distributionRow(
  prefix: "ig" | "yt",
  hub: "instagram" | "youtube",
  baseY: number
) {
  return Array.from({ length: 9 }, (_, i) => ({
    id: `${prefix}-touchpoint-${i + 1}`,
    label: `${prefix === "ig" ? "IG" : "YT"} ${i + 1}`,
    group: prefix,
    hub,
    x: 64 + i * 48,
    y: baseY,
  }));
}

const DISTRIBUTION_NODES = [
  ...distributionRow("ig", "instagram", 38),
  ...distributionRow("yt", "youtube", 382),
] as const;

const FLOW_PATHS = [
  "M280 82 C280 128 280 168 280 210",
  "M280 338 C280 292 280 252 280 210",
  "M124 210 C178 210 224 210 280 210",
  "M436 210 C382 210 336 210 280 210",
] as const;

export default function NodeDiagram() {
  const hubById = Object.fromEntries(PLATFORM_NODES.map((node) => [node.id, node]));

  return (
    <div
      className="node-diagram-wrap node-diagram-wrapper"
      role="img"
      aria-label="Four main social accounts feed 18 distribution touchpoints — 22 total channels building one brand authority."
    >
      <div className="node-diagram-svg-wrapper">
        <svg
          className="node-diagram-svg"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          width="100%"
          height="auto"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="diagramGold" cx="50%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#FFF3C4" />
              <stop offset="58%" stopColor="#D4A853" />
              <stop offset="100%" stopColor="#8F6E0C" />
            </radialGradient>
            <linearGradient id="diagramNodeSurface" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#24201A" />
              <stop offset="100%" stopColor="#0D0D0D" />
            </linearGradient>
            <filter id="diagramSoftGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="diagramTightShadow" x="-25%" y="-25%" width="150%" height="150%">
              <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#000000" floodOpacity="0.38" />
            </filter>
          </defs>

          <rect className="diagram-panel-bg" x="16" y="12" width="528" height="436" rx="26" />
          <path className="diagram-grid-line" d="M48 210H512" />
          <path className="diagram-grid-line" d="M280 36V424" />
          <circle className="diagram-ambient-ring" cx={CENTER.x} cy={CENTER.y} r="138" />
          <circle className="diagram-ambient-ring diagram-ambient-ring--inner" cx={CENTER.x} cy={CENTER.y} r="78" />
          <path className="diagram-distribution-field" d="M56 70 C116 24 444 24 504 70" />
          <path className="diagram-distribution-field" d="M56 390 C116 436 444 436 504 390" />

          {FLOW_PATHS.map((path, index) => (
            <path
              key={`flow-path-${index}`}
              className="diagram-line diagram-line--primary"
              d={path}
            />
          ))}

          {DISTRIBUTION_NODES.map((node) => {
            const hub = hubById[node.hub];
            const curveY = node.group === "ig" ? 96 : 324;
            return (
              <path
                key={`dist-line-${node.id}`}
                className="diagram-line diagram-line--secondary"
                d={`M${hub.x} ${hub.y} Q${(hub.x + node.x) / 2} ${curveY} ${node.x} ${node.y}`}
              />
            );
          })}

          <g className="diagram-authority-core">
            <circle cx={CENTER.x} cy={CENTER.y} r="68" className="diagram-core-halo" filter="url(#diagramSoftGlow)" />
            <circle cx={CENTER.x} cy={CENTER.y} r="50" className="diagram-core-shell" />
            <circle cx={CENTER.x} cy={CENTER.y} r="39" fill="url(#diagramGold)" />
            <circle cx={CENTER.x} cy={CENTER.y} r="56" className="diagram-center-ring" />
            <text x={CENTER.x} y={CENTER.y - 2} textAnchor="middle" className="diagram-center-text">
              BRAND
            </text>
            <text x={CENTER.x} y={CENTER.y + 16} textAnchor="middle" className="diagram-center-subtext">
              22 TOUCHPOINTS
            </text>
          </g>

          {PLATFORM_NODES.map((node) => (
            <g
              key={node.id}
              className={`diagram-platform-svg-node diagram-platform-svg-node--${node.id}`}
              transform={`translate(${node.x} ${node.y})`}
            >
              <rect x="-54" y="-28" width="108" height="56" rx="18" className="diagram-platform-card" filter="url(#diagramTightShadow)" />
              <circle cx="-32" cy="0" r="17" className="diagram-platform-badge" />
              <text x="-32" y="5" textAnchor="middle" className="diagram-platform-short">
                {node.short}
              </text>
              <text x="12" y="-3" textAnchor="middle" className="diagram-platform-label">
                {node.label}
              </text>
              <text x="12" y="12" textAnchor="middle" className="diagram-platform-caption">
                Main
              </text>
            </g>
          ))}

          <text x="280" y="24" textAnchor="middle" className="diagram-arc-label">
            9 Instagram distribution pages
          </text>
          <text x="280" y="448" textAnchor="middle" className="diagram-arc-label">
            9 YouTube distribution pages
          </text>

          {DISTRIBUTION_NODES.map((node, index) => (
            <g
              key={node.id}
              className={`diagram-touchpoint diagram-touchpoint--${node.group}`}
              style={{ "--touchpoint-delay": `${index * 90}ms` } as React.CSSProperties}
              transform={`translate(${node.x} ${node.y})`}
            >
              <rect x="-17" y="-11" width="34" height="22" rx="11" className="diagram-touchpoint-bg" />
              <text y="4" textAnchor="middle" className="diagram-touchpoint-label">
                {node.label}
              </text>
            </g>
          ))}

          <g className="diagram-total-pill" transform="translate(280 292)">
            <rect x="-138" y="-15" width="276" height="30" rx="15" />
            <text textAnchor="middle" y="4">
              4 main + 18 distribution = 22
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
