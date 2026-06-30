"use client";

const SIZE = 420;
const C = SIZE / 2;

const PLATFORMS = [
  { id: "ig", short: "IG", label: "Instagram", x: C, y: 58 },
  { id: "fb", short: "FB", label: "Facebook", x: 72, y: C },
  { id: "in", short: "IN", label: "LinkedIn", x: SIZE - 72, y: C },
  { id: "yt", short: "YT", label: "YouTube", x: C, y: SIZE - 58 },
] as const;

export default function NodeDiagram() {
  return (
    <div
      className="node-diagram-wrap node-diagram-wrapper node-diagram--clean"
      role="img"
      aria-label="Your brand at the center with four main social accounts and eighteen distribution touchpoints — twenty-two channels total."
    >
      <svg
        className="node-diagram-svg"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        width="100%"
        height="auto"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="coreGold" cx="50%" cy="42%" r="58%">
            <stop offset="0%" stopColor="#FFF4D0" />
            <stop offset="55%" stopColor="#D4A853" />
            <stop offset="100%" stopColor="#9A7420" />
          </radialGradient>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx={C} cy={C} r={C - 8} className="diagram-clean-ring diagram-clean-ring--outer" />
        <circle cx={C} cy={C} r={118} className="diagram-clean-ring diagram-clean-ring--mid" />
        <circle cx={C} cy={C} r={78} className="diagram-clean-ring diagram-clean-ring--inner" />

        {PLATFORMS.map((p) => (
          <line
            key={`line-${p.id}`}
            x1={C}
            y1={C}
            x2={p.x}
            y2={p.y}
            className="diagram-clean-spoke"
          />
        ))}

        <circle cx={C} cy={C} r={52} fill="url(#coreGold)" filter="url(#softGlow)" />
        <circle cx={C} cy={C} r={62} className="diagram-clean-core-ring" />
        <text x={C} y={C - 6} textAnchor="middle" className="diagram-clean-core-title">
          YOUR
        </text>
        <text x={C} y={C + 14} textAnchor="middle" className="diagram-clean-core-title">
          BRAND
        </text>

        {PLATFORMS.map((p) => (
          <g key={p.id} transform={`translate(${p.x} ${p.y})`}>
            <rect x="-44" y="-22" width="88" height="44" rx="14" className="diagram-clean-node" />
            <text y="-2" textAnchor="middle" className="diagram-clean-node-short">
              {p.short}
            </text>
            <text y="12" textAnchor="middle" className="diagram-clean-node-label">
              {p.label}
            </text>
          </g>
        ))}

        <g transform={`translate(${C} ${C - 100})`}>
          <rect x="-72" y="-12" width="144" height="24" rx="12" className="diagram-clean-badge" />
          <text textAnchor="middle" y="4" className="diagram-clean-badge-text">
            9 IG pages
          </text>
        </g>
        <g transform={`translate(${C} ${C + 100})`}>
          <rect x="-72" y="-12" width="144" height="24" rx="12" className="diagram-clean-badge" />
          <text textAnchor="middle" y="4" className="diagram-clean-badge-text">
            9 YT pages
          </text>
        </g>

        <text x={C} y={SIZE - 14} textAnchor="middle" className="diagram-clean-footer">
          4 main accounts + 18 distribution = 22 touchpoints
        </text>
      </svg>
    </div>
  );
}
