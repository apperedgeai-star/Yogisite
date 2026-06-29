"use client";

const WIDTH = 720;
const HEIGHT = 560;
const CENTER = { x: WIDTH / 2, y: 280 };

const PLATFORM_NODES = [
  { id: "instagram", label: "Instagram", short: "IG", x: 360, y: 150 },
  { id: "facebook", label: "Facebook", short: "FB", x: 180, y: 280 },
  { id: "youtube", label: "YouTube", short: "YT", x: 360, y: 410 },
  { id: "linkedin", label: "LinkedIn", short: "IN", x: 540, y: 280 },
] as const;

const DISTRIBUTION_NODES = [
  ...Array.from({ length: 9 }, (_, i) => ({
    id: `ig-touchpoint-${i + 1}`,
    label: `${i + 1}`,
    group: "IG",
    hub: "instagram",
    angle: 210 + i * 15,
    origin: { x: 360, y: 150 },
    radius: 136,
  })),
  ...Array.from({ length: 9 }, (_, i) => ({
    id: `yt-touchpoint-${i + 1}`,
    label: `${i + 1}`,
    group: "YT",
    hub: "youtube",
    angle: 30 + i * 15,
    origin: { x: 360, y: 410 },
    radius: 136,
  })),
] as const;

function polarPoint(origin: { x: number; y: number }, angle: number, radius: number) {
  const radians = (angle * Math.PI) / 180;
  return {
    x: origin.x + Math.cos(radians) * radius,
    y: origin.y + Math.sin(radians) * radius,
  };
}

export default function NodeDiagram() {
  const distributionNodes = DISTRIBUTION_NODES.map((node) => ({
    ...node,
    ...polarPoint(node.origin, node.angle, node.radius),
  }));

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
          </defs>

          <rect className="diagram-panel-bg" x="20" y="20" width="680" height="520" rx="28" />
          <circle className="diagram-ambient-ring" cx={CENTER.x} cy={CENTER.y} r="220" />
          <circle className="diagram-ambient-ring diagram-ambient-ring--inner" cx={CENTER.x} cy={CENTER.y} r="132" />
          <ellipse className="diagram-distribution-field" cx="360" cy="150" rx="168" ry="104" />
          <ellipse className="diagram-distribution-field" cx="360" cy="410" rx="168" ry="104" />

          {PLATFORM_NODES.map((node) => (
            <line
              key={`center-line-${node.id}`}
              className="diagram-line diagram-line--primary"
              x1={CENTER.x}
              y1={CENTER.y}
              x2={node.x}
              y2={node.y}
            />
          ))}

          {distributionNodes.map((node) => {
            const hub = hubById[node.hub];
            return (
              <line
                key={`dist-line-${node.id}`}
                className="diagram-line diagram-line--secondary"
                x1={hub.x}
                y1={hub.y}
                x2={node.x}
                y2={node.y}
              />
            );
          })}

          <g className="diagram-core" transform={`translate(${CENTER.x} ${CENTER.y})`}>
            <circle r="70" className="diagram-core-halo" filter="url(#diagramSoftGlow)" />
            <circle r="54" fill="url(#diagramGold)" />
            <circle r="64" className="diagram-center-ring" />
            <text y="-8" textAnchor="middle" className="diagram-center-text">
              YOGI
            </text>
            <text y="13" textAnchor="middle" className="diagram-center-subtext">
              AUTHORITY
            </text>
          </g>

          {PLATFORM_NODES.map((node) => (
            <g key={node.id} className={`diagram-platform-svg-node diagram-platform-svg-node--${node.id}`} transform={`translate(${node.x} ${node.y})`}>
              <rect x="-62" y="-34" width="124" height="68" rx="24" className="diagram-platform-card" />
              <circle cx="-34" cy="0" r="20" className="diagram-platform-badge" />
              <text x="-34" y="6" textAnchor="middle" className="diagram-platform-short">
                {node.short}
              </text>
              <text x="4" y="-3" textAnchor="middle" className="diagram-platform-label">
                {node.label}
              </text>
              <text x="4" y="15" textAnchor="middle" className="diagram-platform-caption">
                Main account
              </text>
            </g>
          ))}

          {distributionNodes.map((node) => (
            <g key={node.id} className={`diagram-touchpoint diagram-touchpoint--${node.group.toLowerCase()}`} transform={`translate(${node.x} ${node.y})`}>
              <circle r="17" className="diagram-touchpoint-bg" />
              <text y="-1" textAnchor="middle" className="diagram-touchpoint-group">
                {node.group}
              </text>
              <text y="11" textAnchor="middle" className="diagram-touchpoint-count">
                {node.label}
              </text>
            </g>
          ))}

          <g className="diagram-total-pill" transform="translate(360 516)">
            <rect x="-170" y="-19" width="340" height="38" rx="19" />
            <text textAnchor="middle" y="5">
              4 main accounts + 18 distribution touchpoints = 22
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
