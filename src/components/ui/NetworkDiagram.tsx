"use client";

import type { CSSProperties, ComponentType } from "react";
import Image from "next/image";
import {
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaFacebook,
  FaPodcast,
} from "react-icons/fa";
import { FaXTwitter, FaThreads } from "react-icons/fa6";
import { ASSETS } from "@/lib/assets";

const CX = 450;
const CY = 250;
const VB_W = 900;
const VB_H = 500;

type SatelliteConfig = {
  id: string;
  label: string;
  angle: number;
  radius: number;
  Icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  orbitDuration: number;
  orbitDelay: number;
  lineDelay: number;
};

const SATELLITES: SatelliteConfig[] = [
  {
    id: "ig-business",
    label: "IG Business",
    angle: 320,
    radius: 180,
    Icon: FaInstagram,
    orbitDuration: 8,
    orbitDelay: 0,
    lineDelay: 0,
  },
  {
    id: "ig-motivation",
    label: "IG Motivation",
    angle: 25,
    radius: 195,
    Icon: FaInstagram,
    orbitDuration: 10,
    orbitDelay: -0.8,
    lineDelay: 0.2,
  },
  {
    id: "ig-industry",
    label: "IG Industry",
    angle: 65,
    radius: 175,
    Icon: FaInstagram,
    orbitDuration: 9,
    orbitDelay: -1.6,
    lineDelay: 0.4,
  },
  {
    id: "yt-main",
    label: "YT Main",
    angle: 110,
    radius: 190,
    Icon: FaYoutube,
    orbitDuration: 11,
    orbitDelay: -2.4,
    lineDelay: 0.6,
  },
  {
    id: "yt-clips",
    label: "YT Clips",
    angle: 145,
    radius: 170,
    Icon: FaYoutube,
    orbitDuration: 7,
    orbitDelay: -3.2,
    lineDelay: 0.8,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    angle: 200,
    radius: 185,
    Icon: FaLinkedin,
    orbitDuration: 12,
    orbitDelay: -4,
    lineDelay: 1,
  },
  {
    id: "twitter",
    label: "Twitter/X",
    angle: 235,
    radius: 175,
    Icon: FaXTwitter,
    orbitDuration: 9,
    orbitDelay: -4.8,
    lineDelay: 1.2,
  },
  {
    id: "threads",
    label: "Threads",
    angle: 275,
    radius: 180,
    Icon: FaThreads,
    orbitDuration: 10,
    orbitDelay: -5.4,
    lineDelay: 1.4,
  },
  {
    id: "podcast",
    label: "Podcast",
    angle: 305,
    radius: 170,
    Icon: FaPodcast,
    orbitDuration: 8,
    orbitDelay: -6,
    lineDelay: 1.6,
  },
  {
    id: "facebook",
    label: "Facebook",
    angle: 170,
    radius: 185,
    Icon: FaFacebook,
    orbitDuration: 10,
    orbitDelay: -5.2,
    lineDelay: 1.3,
  },
];

const AMBIENT_PARTICLES = [
  { cx: 88, cy: 420, delay: 0, duration: 5, opacity: 0.22 },
  { cx: 210, cy: 460, delay: 0.6, duration: 6.2, opacity: 0.15 },
  { cx: 340, cy: 430, delay: 1.1, duration: 4.8, opacity: 0.32 },
  { cx: 520, cy: 455, delay: 0.3, duration: 6.8, opacity: 0.18 },
  { cx: 680, cy: 440, delay: 1.8, duration: 5.4, opacity: 0.28 },
  { cx: 820, cy: 390, delay: 0.9, duration: 7.1, opacity: 0.12 },
  { cx: 760, cy: 120, delay: 2.2, duration: 5.8, opacity: 0.35 },
  { cx: 600, cy: 80, delay: 1.4, duration: 4.5, opacity: 0.2 },
  { cx: 420, cy: 60, delay: 0.5, duration: 6.5, opacity: 0.26 },
  { cx: 240, cy: 95, delay: 2.6, duration: 5.2, opacity: 0.16 },
  { cx: 110, cy: 180, delay: 1.9, duration: 7.4, opacity: 0.3 },
  { cx: 850, cy: 260, delay: 2.8, duration: 4.9, opacity: 0.24 },
] as const;

function polarToCartesian(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CX + radius * Math.cos(rad),
    y: CY + radius * Math.sin(rad),
  };
}

function lineLength(x1: number, y1: number, x2: number, y2: number) {
  return Math.hypot(x2 - x1, y2 - y1);
}

function SatelliteNode({
  node,
}: {
  node: SatelliteConfig & { x: number; y: number };
}) {
  const Icon = node.Icon;
  const orbitStyle = {
    "--orbit-duration-x": `${node.orbitDuration}s`,
    "--orbit-delay": `${node.orbitDelay}s`,
  } as CSSProperties;

  return (
    <g transform={`translate(${node.x} ${node.y})`}>
      <foreignObject
        x={-48}
        y={-48}
        width={96}
        height={100}
        className="network-solar-foreign overflow-visible"
      >
        <div className="network-solar-satellite-orbit" style={orbitStyle}>
          <div className="network-solar-satellite-sphere" aria-hidden />
          <Icon className="network-solar-satellite-icon" aria-hidden />
          <span className="network-solar-satellite-label">{node.label}</span>
        </div>
      </foreignObject>
    </g>
  );
}

export function NetworkDiagram() {
  const nodes = SATELLITES.map((sat) => ({
    ...sat,
    ...polarToCartesian(sat.angle, sat.radius),
  }));

  return (
    <div
      className="network-diagram-card"
      role="img"
      aria-label="Animated distribution network: your main page connected to nine platform channels"
    >
      <Image
        src={ASSETS.networkShowcase}
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover opacity-[0.12]"
        aria-hidden
      />
      <svg
        className="network-solar-svg relative z-[1]"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {nodes.map((node) => {
          const len = Math.max(lineLength(CX, CY, node.x, node.y), 48);
          return (
            <line
              key={`line-${node.id}`}
              x1={CX}
              y1={CY}
              x2={node.x}
              y2={node.y}
              className="network-solar-line"
              style={
                {
                  "--line-len": len,
                  animationDelay: `${node.lineDelay}s`,
                } as CSSProperties
              }
            />
          );
        })}

        {[0, 1, 2].map((i) => (
          <circle
            key={`ring-${i}`}
            cx={CX}
            cy={CY}
            r={40}
            className="network-solar-ring"
            style={{ animationDelay: `${i}s` }}
          />
        ))}

        {AMBIENT_PARTICLES.map((p, i) => (
          <circle
            key={`particle-${i}`}
            cx={p.cx}
            cy={p.cy}
            r={1.5}
            className="network-solar-particle"
            style={
              {
                "--particle-opacity": p.opacity,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              } as CSSProperties
            }
          />
        ))}

        {nodes.map((node) => (
          <SatelliteNode key={node.id} node={node} />
        ))}

        <g transform={`translate(${CX} ${CY})`}>
          <foreignObject
            x={-52}
            y={-52}
            width={104}
            height={120}
            className="network-solar-foreign overflow-visible"
          >
            <div
                  className="network-solar-center-inner"
            >
              <div
                className="network-solar-center-sphere"
                aria-hidden
              />
              <p className="network-solar-center-label">
                YOUR
                <br />
                MAIN PAGE
              </p>
              <div className="network-solar-center-socials" aria-hidden>
                <FaInstagram className="network-solar-center-social" />
                <FaFacebook className="network-solar-center-social" />
                <FaYoutube className="network-solar-center-social" />
                <FaLinkedin className="network-solar-center-social" />
              </div>
            </div>
          </foreignObject>
        </g>
      </svg>
    </div>
  );
}

export default NetworkDiagram;
