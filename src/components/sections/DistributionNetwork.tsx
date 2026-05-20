"use client";

const NODES = [
  { label: "IG Business", angle: -90 },
  { label: "IG Motivation", angle: -50 },
  { label: "IG Industry", angle: -10 },
  { label: "YT Main", angle: 30 },
  { label: "YT Clips", angle: 70 },
  { label: "LinkedIn", angle: 110 },
  { label: "Twitter/X", angle: 150 },
  { label: "Threads", angle: 190 },
  { label: "Podcast", angle: 230 },
] as const;

const CX = 200;
const CY = 200;
const R = 118;
const NODE_R = 28;
const LABEL_OFFSET = 42;

function polar(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CX + Math.cos(rad) * radius,
    y: CY + Math.sin(rad) * radius,
  };
}

export function DistributionNetwork() {
  return (
    <div className="relative flex min-h-[360px] items-center justify-center py-4">
      <svg
        viewBox="0 0 400 440"
        overflow="visible"
        className="h-auto w-full max-w-md"
        aria-hidden
      >
        {NODES.map((node, i) => {
          const end = polar(node.angle, R);
          return (
            <line
              key={`line-${node.label}`}
              x1={CX}
              y1={CY}
              x2={end.x}
              y2={end.y}
              stroke="rgba(212, 168, 67, 0.45)"
              strokeWidth={1}
              className="network-line"
              style={{ animationDelay: `${i * 0.12}s` }}
            />
          );
        })}

        <circle
          cx={CX}
          cy={CY}
          r={36}
          fill="var(--g-glow)"
          stroke="var(--g300)"
          strokeWidth={1}
        />
        <text
          x={CX}
          y={CY - 4}
          textAnchor="middle"
          fill="rgba(240, 220, 160, 0.9)"
          className="font-satoshi text-[9px] uppercase tracking-wider"
        >
          Your
        </text>
        <text
          x={CX}
          y={CY + 10}
          textAnchor="middle"
          fill="rgba(240, 220, 160, 0.9)"
          className="font-satoshi text-[9px] uppercase tracking-wider"
        >
          Main Page
        </text>

        {NODES.map((node, i) => {
          const pos = polar(node.angle, R);
          const labelPos = polar(node.angle, R + LABEL_OFFSET);
          return (
            <g key={node.label}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={NODE_R}
                fill="transparent"
                stroke="var(--g-border)"
                strokeWidth={1}
                className="network-node"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
              <text
                x={labelPos.x}
                y={labelPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(240, 237, 232, 0.55)"
                className="font-satoshi text-[7px] uppercase tracking-wide md:text-[8px]"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
