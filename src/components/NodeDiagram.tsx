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
  const animationStarted = useRef(false);

  useEffect(() => {
    let cancelled = false;
    let orbitalStyle: HTMLStyleElement | undefined;
    const root = diagramRef.current;
    if (!root || animationStarted.current) return;
    animationStarted.current = true;

    orbitalStyle = document.createElement("style");
    orbitalStyle.setAttribute("data-node-anim", "true");
    orbitalStyle.textContent = `
      .ig-orbit-ring,
      .ig-orbit-label-ring {
        animation: swing-cw 8s ease-in-out infinite;
        transform-origin: ${CENTER}px ${CENTER - 116}px;
        transform-box: fill-box;
      }

      .yt-orbit-ring,
      .yt-orbit-label-ring {
        animation: swing-ccw 10s ease-in-out infinite;
        transform-origin: ${CENTER}px ${CENTER + 116}px;
        transform-box: fill-box;
      }

      [data-node="center-glow"] {
        animation: glow-breathe 2.8s ease-in-out infinite;
        transform-box: fill-box;
        transform-origin: center;
      }

      [data-node="main-platform"] {
        animation: platform-pulse 3.2s ease-in-out infinite;
        transform-box: fill-box;
        transform-origin: center;
      }

      [data-node="connection-line"] {
        animation: line-flow 2.2s ease-in-out infinite;
      }

      [data-node="hero-node"] {
        animation: hero-drift 5s ease-in-out infinite;
        transform-box: fill-box;
        transform-origin: center;
      }

      @keyframes swing-cw {
        0% { transform: rotate(0deg); }
        25% { transform: rotate(18deg); }
        50% { transform: rotate(0deg); }
        75% { transform: rotate(-18deg); }
        100% { transform: rotate(0deg); }
      }

      @keyframes swing-ccw {
        0% { transform: rotate(0deg); }
        25% { transform: rotate(-20deg); }
        50% { transform: rotate(0deg); }
        75% { transform: rotate(20deg); }
        100% { transform: rotate(0deg); }
      }

      @keyframes glow-breathe {
        0%, 100% { opacity: 0.65; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.22); }
      }

      @keyframes platform-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.07); }
      }

      @keyframes line-flow {
        0%, 100% { opacity: 0.18; }
        50% { opacity: 0.48; }
      }

      @keyframes hero-drift {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-5px) scale(1.03); }
      }

      @media (prefers-reduced-motion: reduce) {
        .ig-orbit-ring,
        .ig-orbit-label-ring,
        .yt-orbit-ring,
        .yt-orbit-label-ring,
        [data-node="center-glow"],
        [data-node="main-platform"],
        [data-node="connection-line"],
        [data-node="hero-node"] {
          animation: none !important;
        }
      }
    `;
    document.head.appendChild(orbitalStyle);

    const revealAll = () => {
      root.querySelectorAll<HTMLElement | SVGElement>(
        '[data-node="hero-node"], [data-node="main-platform"], [data-node="dist-node"], [data-node="dist-dot"], .ig-orbit-ring, .yt-orbit-ring, .ig-orbit-label-ring, .yt-orbit-label-ring'
      ).forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "scale(1)";
      });
      root.querySelectorAll<SVGLineElement>('[data-node="connection-line"]').forEach((line) => {
        line.style.opacity = "0.35";
        line.style.strokeDashoffset = "0";
      });
      const centerGlow = root.querySelector<SVGCircleElement>('[data-node="center-glow"]');
      if (centerGlow) {
        centerGlow.style.opacity = "1";
        centerGlow.style.transform = "scale(1)";
      }
    };

    const startAnimation = async () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        revealAll();
        return;
      }

      const { stagger, createTimeline } = await import("animejs");
      if (cancelled) return;

      const platforms = root.querySelectorAll('[data-node="main-platform"]');
      const hero = root.querySelector('[data-node="hero-node"]');
      const lines = root.querySelectorAll('[data-node="connection-line"]');
      const igRing = root.querySelector('.ig-orbit-ring');
      const ytRing = root.querySelector('.yt-orbit-ring');
      const igLabelRing = root.querySelector('.ig-orbit-label-ring');
      const ytLabelRing = root.querySelector('.yt-orbit-label-ring');
      const glow = root.querySelector('[data-node="center-glow"]');

      [...platforms, ...(hero ? [hero] : [])].forEach((el) => {
        (el as HTMLElement).style.opacity = "0";
        (el as HTMLElement).style.transform = "scale(0)";
      });
      lines.forEach((el) => {
        (el as HTMLElement).style.opacity = "0";
      });
      [igRing, ytRing, igLabelRing, ytLabelRing, glow].forEach((el) => {
        if (el) (el as HTMLElement).style.opacity = "0";
      });

      const entrance = createTimeline();

      entrance
        .add(glow ? [glow] : [], {
          opacity: [0, 1],
          scale: [0, 1],
          duration: 500,
        }, 0)
        .add(root.querySelectorAll('[data-node="hero-node"]'), {
          opacity: [0, 1],
          scale: [0, 1],
          duration: 600,
          easing: "easeOutBack",
        }, 200)
        .add(lines, {
          opacity: [0, 0.3],
          duration: 600,
          delay: stagger(20),
        }, 350)
        .add(root.querySelectorAll('[data-node="main-platform"]'), {
          opacity: [0, 1],
          scale: [0, 1],
          duration: 550,
          delay: stagger(100),
          easing: "easeOutBack",
        }, 550)
        .add('.ig-orbit-ring, .ig-orbit-label-ring', {
          opacity: [0, 1],
          duration: 700,
        }, 800)
        .add('.yt-orbit-ring, .yt-orbit-label-ring', {
          opacity: [0, 1],
          duration: 700,
        }, 1000);
    };

    startAnimation();

    return () => {
      cancelled = true;
      document.querySelector('[data-node-anim="true"]')?.remove();
    };
  }, []);

  const platformNodes = PLATFORM_NODES.map((node) => ({ ...node, ...point(node.angle, node.r) }));
  const outerNodes = OUTER_NODES.map((node) => ({ ...node, ...point(node.angle, node.r) }));
  const igOuterNodes = outerNodes.filter((node) => node.group === "IG");
  const ytOuterNodes = outerNodes.filter((node) => node.group === "YT");

  return (
    <div
      ref={diagramRef}
      className="node-diagram-wrap node-diagram-wrapper"
      role="img"
      aria-label="22 touchpoint distribution network diagram"
    >
      <div className="node-diagram-svg-wrapper">
      <svg className="node-diagram-svg" viewBox={`-120 -100 ${SIZE + 240} ${SIZE + 200}`} width="100%" height="auto" overflow="visible" style={{ display: "block", overflow: "visible" }} aria-hidden>
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
        <circle data-node="center-glow" cx={CENTER} cy={CENTER} r={46} className="diagram-core-halo" filter="url(#diagramGlow)" />

        {[...platformNodes, ...outerNodes].map((node) => (
          <line
            key={`line-${node.id}`}
            data-node="connection-line"
            className="diagram-line will-animate"
            x1={CENTER}
            y1={CENTER}
            x2={node.x}
            y2={node.y}
          />
        ))}

        <g className="ig-orbit-ring">
          {igOuterNodes.map((node) => (
            <g
              key={node.id}
              data-node="dist-dot"
              data-type={node.group.toLowerCase()}
              data-index={node.label.split(" ")[1]}
              transform={`translate(${node.x} ${node.y})`}
              className="diagram-spoke-dot"
            >
              <circle r={8} className="diagram-outer-bg" />
            </g>
          ))}
        </g>

        <g className="yt-orbit-ring">
          {ytOuterNodes.map((node) => (
            <g
              key={node.id}
              data-node="dist-dot"
              data-type={node.group.toLowerCase()}
              data-index={node.label.split(" ")[1]}
              transform={`translate(${node.x} ${node.y})`}
              className="diagram-spoke-dot"
            >
              <circle r={8} className="diagram-outer-bg" />
            </g>
          ))}
        </g>

        <g data-node="hero-node" transform={`translate(${CENTER} ${CENTER})`} className="diagram-core will-animate">
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
            data-node="main-platform"
            data-platform={id}
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

        <div className="ig-orbit-label-ring">
          {igOuterNodes.map(({ id, label, group, x, y }) => (
            <div
              key={id}
              data-node="dist-node"
              data-type={group.toLowerCase()}
              data-index={label.split(" ")[1]}
              className="diagram-html-node diagram-outer-node-html"
              style={{ left: `${(x / SIZE) * 100}%`, top: `${(y / SIZE) * 100}%` }}
            >
              <span>{group}</span>
              <small>{label}</small>
            </div>
          ))}
        </div>

        <div className="yt-orbit-label-ring">
          {ytOuterNodes.map(({ id, label, group, x, y }) => (
            <div
              key={id}
              data-node="dist-node"
              data-type={group.toLowerCase()}
              data-index={label.split(" ")[1]}
              className="diagram-html-node diagram-outer-node-html"
              style={{ left: `${(x / SIZE) * 100}%`, top: `${(y / SIZE) * 100}%` }}
            >
              <span>{group}</span>
              <small>{label}</small>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
