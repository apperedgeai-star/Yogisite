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
    let loopTimer: number | undefined;
    const root = diagramRef.current;
    if (!root || animationStarted.current) return;
    animationStarted.current = true;

    const allNodes = root.querySelectorAll<HTMLElement | SVGElement>(
      '[data-node="hero-node"], [data-node="main-platform"], [data-node="dist-node"], [data-node="dist-dot"]'
    );
    const allLines = root.querySelectorAll<SVGLineElement>('[data-node="connection-line"]');
    const centerGlow = root.querySelector<SVGCircleElement>('[data-node="center-glow"]');

    allNodes.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "scale(0)";
      el.style.transformOrigin = "center";
    });

    allLines.forEach((line) => {
      const length = line.getTotalLength?.() ?? 200;
      line.style.opacity = "0";
      line.style.strokeDasharray = `${length}`;
      line.style.strokeDashoffset = `${length}`;
    });

    if (centerGlow) {
      centerGlow.style.opacity = "0";
      centerGlow.style.transform = "scale(0.3)";
      centerGlow.style.transformOrigin = "center";
    }

    const revealAll = () => {
      allNodes.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "scale(1)";
      });
      allLines.forEach((line) => {
        line.style.opacity = "0.35";
        line.style.strokeDashoffset = "0";
      });
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

      const { animate, stagger, createTimeline } = await import("animejs");
      if (cancelled) return;

      const entrance = createTimeline();

      entrance
        .add(centerGlow ? [centerGlow] : [], {
          opacity: [0, 1],
          scale: [0.2, 1],
          duration: 500,
        }, 0)
        .add(root.querySelectorAll('[data-node="hero-node"]'), {
          opacity: [0, 1],
          scale: [0, 1],
          duration: 600,
          easing: "easeOutBack",
        }, 200)
        .add(allLines, {
          strokeDashoffset: 0,
          opacity: [0, 0.3],
          duration: 700,
          delay: stagger(20),
        }, 350)
        .add(root.querySelectorAll('[data-node="main-platform"]'), {
          opacity: [0, 1],
          scale: [0, 1],
          duration: 500,
          delay: stagger(80),
          easing: "easeOutBack",
        }, 500)
        .add(root.querySelectorAll('[data-node="dist-node"], [data-node="dist-dot"]'), {
          opacity: [0, 1],
          scale: [0, 1],
          duration: 400,
          delay: stagger(40, { from: "center" }),
          easing: "easeOutBack",
        }, 750);

      loopTimer = window.setTimeout(() => {
        if (cancelled) return;

        animate(root.querySelectorAll('[data-node="dist-node"], [data-node="dist-dot"]'), {
          scale: [1, 1.12, 1],
          opacity: [1, 0.7, 1],
          duration: 3000,
          delay: stagger(150, { from: "center" }),
          loop: true,
          easing: "easeInOutSine",
        });

        animate(allLines, {
          opacity: [0.15, 0.45, 0.15],
          duration: 2400,
          delay: stagger(60),
          loop: true,
          easing: "easeInOutSine",
        });

        if (centerGlow) {
          animate(centerGlow, {
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8],
            duration: 2000,
            loop: true,
            easing: "easeInOutSine",
          });
        }

        animate(root.querySelectorAll('[data-node="main-platform"]'), {
          scale: [1, 1.05, 1],
          duration: 2800,
          delay: stagger(700),
          loop: true,
          easing: "easeInOutSine",
        });

        animate(root.querySelectorAll('[data-node="hero-node"]'), {
          opacity: [1, 0.85, 1],
          duration: 3500,
          loop: true,
          easing: "easeInOutSine",
        });
      }, 2600);
    };

    startAnimation();

    return () => {
      cancelled = true;
      if (loopTimer) window.clearTimeout(loopTimer);
    };
  }, []);

  const platformNodes = PLATFORM_NODES.map((node) => ({ ...node, ...point(node.angle, node.r) }));
  const outerNodes = OUTER_NODES.map((node) => ({ ...node, ...point(node.angle, node.r) }));

  return (
    <div ref={diagramRef} className="node-diagram-wrap node-diagram-wrapper" role="img" aria-label="22 touchpoint distribution network diagram">
      <div className="node-diagram-svg-wrapper">
      <svg className="node-diagram-svg" viewBox={`-40 -20 ${SIZE + 80} ${SIZE + 40}`} width="100%" height="auto" overflow="visible" style={{ display: "block", overflow: "visible" }} aria-hidden>
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

        {outerNodes.map((node) => (
          <g
            key={node.id}
            data-node="dist-node"
            data-type={node.group.toLowerCase()}
            data-index={node.label.split(" ")[1]}
            transform={`translate(${node.x} ${node.y})`}
            className="diagram-spoke-dot"
          >
            <circle r={8} className="diagram-outer-bg" />
          </g>
        ))}

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

        {outerNodes.map(({ id, label, group, x, y }) => (
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
  );
}
