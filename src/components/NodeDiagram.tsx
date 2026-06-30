"use client";

import type React from "react";

const WIDTH = 500;
const HEIGHT = 420;
const CENTER = { x: 250, y: 205 };

const PLATFORM_NODES = [
  { id: "instagram", label: "Instagram", short: "IG", x: 250, y: 100 },
  { id: "facebook", label: "Facebook", short: "FB", x: 108, y: 205 },
  { id: "linkedin", label: "LinkedIn", short: "IN", x: 392, y: 205 },
  { id: "youtube", label: "YouTube", short: "YT", x: 250, y: 310 },
] as const;

const DISTRIBUTION_NODES = [
  ...Array.from({ length: 9 }, (_, i) => ({
    id: `ig-touchpoint-${i + 1}`,
    label: `IG ${i + 1}`,
    group: "ig",
    hub: "instagram",
    x: 88 + i * 40.5,
    y: 50 + Math.abs(i - 4) * 4,
  })),
  ...Array.from({ length: 9 }, (_, i) => ({
    id: `yt-touchpoint-${i + 1}`,
    label: `YT ${i + 1}`,
    group: "yt",
    hub: "youtube",
    x: 88 + i * 40.5,
    y: 360 - Math.abs(i - 4) * 4,
  })),
] as const;

const FLOW_PATHS = [
  "M250 100 C250 140 250 164 250 205",
  "M250 310 C250 270 250 246 250 205",
  "M108 205 C162 205 196 205 250 205",
  "M392 205 C338 205 304 205 250 205",
] as const;

export default function NodeDiagram() {
  const hubById = Object.fromEntries(PLATFORM_NODES.map((node) => [node.id, node]));

  return (
    <div
      className="node-diagram-wrap node-diagram-wrapper"
      role="img"
      aria-label="Yogi turns 4 main social accounts into 18 additional distribution touchpoints, creating 22 total touchpoints."
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

          <rect className="diagram-panel-bg" x="12" y="10" width="476" height="400" rx="26" />
          <path className="diagram-grid-line" d="M42 205H458" />
          <path className="diagram-grid-line" d="M250 30V390" />
          <circle className="diagram-ambient-ring" cx={CENTER.x} cy={CENTER.y} r="132" />
          <circle className="diagram-ambient-ring diagram-ambient-ring--inner" cx={CENTER.x} cy={CENTER.y} r="74" />
          <path className="diagram-distribution-field" d="M62 78 C112 30 388 30 438 78" />
          <path className="diagram-distribution-field" d="M62 342 C112 390 388 390 438 342" />

          {FLOW_PATHS.map((path, index) => (
            <path
              key={`flow-path-${index}`}
              className="diagram-line diagram-line--primary"
              d={path}
            />
          ))}

          {DISTRIBUTION_NODES.map((node) => {
            const hub = hubById[node.hub];
            return (
              <path
                key={`dist-line-${node.id}`}
                className="diagram-line diagram-line--secondary"
                d={`M${hub.x} ${hub.y} Q${(hub.x + node.x) / 2} ${node.group === "ig" ? 88 : 326} ${node.x} ${node.y}`}
              />
            );
          })}

          <g className="diagram-authority-core">
            <circle cx={CENTER.x} cy={CENTER.y} r="70" className="diagram-core-halo" filter="url(#diagramSoftGlow)" />
            <circle cx={CENTER.x} cy={CENTER.y} r="52" className="diagram-core-shell" />
            <circle cx={CENTER.x} cy={CENTER.y} r="41" fill="url(#diagramGold)" />
            <circle cx={CENTER.x} cy={CENTER.y} r="58" className="diagram-center-ring" />
            <text x={CENTER.x} y={CENTER.y - 10} textAnchor="middle" className="diagram-center-text">
              YOGI
            </text>
            <text x={CENTER.x} y={CENTER.y + 10} textAnchor="middle" className="diagram-center-subtext">
              AUTHORITY
            </text>
            <text x={CENTER.x} y={CENTER.y + 29} textAnchor="middle" className="diagram-center-count">
              22 TOUCHPOINTS
            </text>
          </g>

          {PLATFORM_NODES.map((node) => (
            <g key={node.id} className={`diagram-platform-svg-node diagram-platform-svg-node--${node.id}`} transform={`translate(${node.x} ${node.y})`}>
              <rect x="-60" y="-30" width="120" height="60" rx="20" className="diagram-platform-card" filter="url(#diagramTightShadow)" />
              <circle cx="-36" cy="0" r="19" className="diagram-platform-badge" />
              <text x="-36" y="5" textAnchor="middle" className="diagram-platform-short">
                {node.short}
              </text>
              <text x="14" y="-4" textAnchor="middle" className="diagram-platform-label">
                {node.label}
              </text>
              <text x="14" y="13" textAnchor="middle" className="diagram-platform-caption">
                Main
              </text>
            </g>
          ))}

          <text x="250" y="28" textAnchor="middle" className="diagram-arc-label">
            9 Instagram distribution pages
          </text>
          <text x="250" y="392" textAnchor="middle" className="diagram-arc-label">
            9 YouTube distribution pages
          </text>

          {DISTRIBUTION_NODES.map((node, index) => (
            <g
              key={node.id}
              className={`diagram-touchpoint diagram-touchpoint--${node.group}`}
              style={{ "--touchpoint-delay": `${index * 90}ms` } as React.CSSProperties}
              transform={`translate(${node.x} ${node.y})`}
            >
              <rect x="-19" y="-12" width="38" height="24" rx="12" className="diagram-touchpoint-bg" />
              <text y="4" textAnchor="middle" className="diagram-touchpoint-label">
                {node.label}
              </text>
            </g>
          ))}

          <g className="diagram-total-pill" transform="translate(250 258)">
            <rect x="-150" y="-18" width="300" height="36" rx="18" />
            <text textAnchor="middle" y="4">
              4 main accounts + 18 distribution touchpoints = 22
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
