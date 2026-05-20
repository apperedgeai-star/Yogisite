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

function polar(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CX + Math.cos(rad) * radius,
    y: CY + Math.sin(rad) * radius,
  };
}

export function DistributionNetwork() {
  return (
    <div className="relative flex min-h-[320px] items-center justify-center py-4">
      <svg
        viewBox="0 0 400 400"
        className="h-auto w-full max-w-md"
        aria-hidden
      >
        {NODES.map((node, i) => {
          const end = polar(node.angle, R);
          return (
            <line
              key={node.label}
              x1={CX}
              y1={CY}
              x2={end.x}
              y2={end.y}
              stroke="var(--gold-400)"
              strokeWidth={1}
              strokeOpacity={0.45}
              className="network-line"
              style={{ animationDelay: `${i * 0.12}s` }}
            />
          );
        })}

        <circle
          cx={CX}
          cy={CY}
          r={36}
          fill="rgba(200, 169, 78, 0.12)"
          stroke="var(--gold-300)"
          strokeWidth={1}
        />
        <text
          x={CX}
          y={CY - 4}
          textAnchor="middle"
          className="fill-gold-200 font-satoshi text-[9px] uppercase tracking-wider"
        >
          Your
        </text>
        <text
          x={CX}
          y={CY + 10}
          textAnchor="middle"
          className="fill-gold-200 font-satoshi text-[9px] uppercase tracking-wider"
        >
          Main Page
        </text>

        {NODES.map((node, i) => {
          const pos = polar(node.angle, R);
          return (
            <g key={node.label}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={14}
                fill="var(--bg-deep)"
                stroke="var(--gold-400)"
                strokeWidth={1}
                strokeOpacity={0.6}
                className="network-node"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
              <text
                x={pos.x}
                y={pos.y + 28}
                textAnchor="middle"
                className="fill-muted font-satoshi text-[7px] uppercase tracking-wide md:text-[8px]"
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
