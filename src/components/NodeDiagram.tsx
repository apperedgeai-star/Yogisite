"use client";

import type { CSSProperties, ComponentType } from "react";
import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import { prefersReducedMotion } from "@/lib/utils";

const SIZE = 480;
const CX = 240;
const CY = 240;
const INNER_R = 108;
const OUTER_R = 172;

type Planet = {
  id: string;
  label: string;
  angle: number;
  Icon: ComponentType<{ className?: string; style?: CSSProperties; "aria-hidden"?: boolean }>;
  brandColor: string;
  floatDelay: number;
  lineDelay: number;
};

const MAIN_PLANETS: Planet[] = [
  { id: "ig", label: "Instagram", angle: -90, Icon: FaInstagram, brandColor: "#E4405F", floatDelay: 0, lineDelay: 0 },
  { id: "fb", label: "Facebook", angle: 180, Icon: FaFacebook, brandColor: "#1877F2", floatDelay: 0.4, lineDelay: 0.15 },
  { id: "in", label: "LinkedIn", angle: 0, Icon: FaLinkedin, brandColor: "#0A66C2", floatDelay: 0.8, lineDelay: 0.3 },
  { id: "yt", label: "YouTube", angle: 90, Icon: FaYoutube, brandColor: "#FF0000", floatDelay: 1.2, lineDelay: 0.45 },
];

function polar(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CX + radius * Math.cos(rad),
    y: CY + radius * Math.sin(rad),
  };
}

function arcDots(startAngle: number, endAngle: number, count: number, radius: number) {
  return Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0.5 : i / (count - 1);
    const angle = startAngle + (endAngle - startAngle) * t;
    return polar(angle, radius);
  });
}

const IG_DIST = arcDots(205, 335, 9, OUTER_R);
const YT_DIST = arcDots(25, 155, 9, OUTER_R);

function lineLength(x1: number, y1: number, x2: number, y2: number) {
  return Math.hypot(x2 - x1, y2 - y1);
}

function PlanetNode({
  x,
  y,
  planet,
}: {
  x: number;
  y: number;
  planet: Planet;
}) {
  const Icon = planet.Icon;
  const floatStyle = {
    "--float-delay": `${planet.floatDelay}s`,
  } as CSSProperties;

  return (
    <g transform={`translate(${x} ${y})`}>
      <foreignObject x={-44} y={-44} width={88} height={96} className="brand-solar-foreign">
        <div className="brand-solar-planet" style={floatStyle}>
          <div className="brand-solar-planet-halo" aria-hidden />
          <Icon
            className="brand-solar-planet-icon"
            style={{ color: planet.brandColor }}
            aria-hidden
          />
          <span className="brand-solar-planet-label">{planet.label}</span>
        </div>
      </foreignObject>
    </g>
  );
}

export default function NodeDiagram() {
  const reduced = prefersReducedMotion();
  const planets = MAIN_PLANETS.map((p) => ({
    ...p,
    ...polar(p.angle, INNER_R),
  }));

  return (
    <div
      className="brand-solar-diagram"
      role="img"
      aria-label="Solar-system view of your brand at the center, four main social platforms on the inner orbit, and eighteen distribution touchpoints on the outer orbit — twenty-two channels total."
    >
      <svg
        className="brand-solar-svg"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          <radialGradient id="brandSolarCore" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#FFF6D8" />
            <stop offset="55%" stopColor="#D4A853" />
            <stop offset="100%" stopColor="#7A5E14" />
          </radialGradient>
        </defs>

        {/* Orbit paths */}
        <circle cx={CX} cy={CY} r={OUTER_R} className="brand-solar-orbit-ring brand-solar-orbit-ring--outer" />
        <circle cx={CX} cy={CY} r={INNER_R} className="brand-solar-orbit-ring brand-solar-orbit-ring--inner" />
        <circle cx={CX} cy={CY} r={62} className="brand-solar-orbit-ring brand-solar-orbit-ring--core" />

        {/* Pulse rings */}
        {[0, 1, 2].map((i) => (
          <circle
            key={`pulse-${i}`}
            cx={CX}
            cy={CY}
            r={48}
            className="brand-solar-pulse"
            style={{ animationDelay: `${i * 0.8}s` }}
          />
        ))}

        {/* Spokes to main platforms */}
        {planets.map((planet) => {
          const len = Math.max(lineLength(CX, CY, planet.x, planet.y), 40);
          return (
            <line
              key={`spoke-${planet.id}`}
              x1={CX}
              y1={CY}
              x2={planet.x}
              y2={planet.y}
              className="brand-solar-spoke"
              style={
                {
                  "--line-len": len,
                  animationDelay: `${planet.lineDelay}s`,
                } as CSSProperties
              }
            />
          );
        })}

        {/* Distribution satellites — slow orbit */}
        <g
          className={reduced ? undefined : "brand-solar-dist-orbit"}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          {IG_DIST.map((dot, i) => (
            <circle
              key={`ig-dot-${i}`}
              cx={dot.x}
              cy={dot.y}
              r={5}
              className="brand-solar-dot brand-solar-dot--ig"
              style={{ animationDelay: `${i * 0.12}s` }}
            />
          ))}
          {YT_DIST.map((dot, i) => (
            <circle
              key={`yt-dot-${i}`}
              cx={dot.x}
              cy={dot.y}
              r={5}
              className="brand-solar-dot brand-solar-dot--yt"
              style={{ animationDelay: `${i * 0.12 + 0.5}s` }}
            />
          ))}
        </g>

        {/* Arc labels */}
        <text x={CX} y={42} textAnchor="middle" className="brand-solar-arc-label">
          9 Instagram distribution pages
        </text>
        <text x={CX} y={SIZE - 36} textAnchor="middle" className="brand-solar-arc-label">
          9 YouTube distribution pages
        </text>

        {/* Main platform planets */}
        {planets.map((planet) => (
          <PlanetNode key={planet.id} x={planet.x} y={planet.y} planet={planet} />
        ))}

        {/* Center sun — YOUR BRAND */}
        <g transform={`translate(${CX} ${CY})`}>
          <circle r={46} className="brand-solar-core-halo" />
          <circle r={38} fill="url(#brandSolarCore)" className="brand-solar-core-disc" />
          <foreignObject x={-52} y={-52} width={104} height={104} className="brand-solar-foreign">
            <div className="brand-solar-core">
              <p className="brand-solar-core-title">YOUR</p>
              <p className="brand-solar-core-title">BRAND</p>
              <p className="brand-solar-core-sub">22 touchpoints</p>
            </div>
          </foreignObject>
        </g>
      </svg>

      <div className="brand-solar-legend">
        <div className="brand-solar-legend-item">
          <FaInstagram className="brand-solar-legend-icon" style={{ color: "#E4405F" }} aria-hidden />
          <span>4 main accounts</span>
        </div>
        <div className="brand-solar-legend-item">
          <span className="brand-solar-legend-dots" aria-hidden>
            <span className="brand-solar-dot brand-solar-dot--ig" />
            <span className="brand-solar-dot brand-solar-dot--yt" />
          </span>
          <span>18 distribution pages</span>
        </div>
        <div className="brand-solar-legend-item brand-solar-legend-item--total">
          <span>4 + 18 = 22 channels</span>
        </div>
      </div>
    </div>
  );
}
